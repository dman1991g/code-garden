import { auth, database } from './firebaseConfig.js';
import {
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import {
  ref as dbRef,
  get,
  set
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

// Nav toggle
document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const installBtn = document.getElementById('installBtn');
  const progressSection = document.getElementById('progressSection');

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Handle install prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    installBtn.style.display = 'inline-block';
    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        console.log(`User ${choiceResult.outcome === 'accepted' ? 'accepted' : 'dismissed'} the install prompt`);
        deferredPrompt = null;
      });
    });
  });

  // Handle progress checkboxes for logged-in users
  onAuthStateChanged(auth, async (user) => {
    if (user && !user.isAnonymous) {
      if (progressSection) progressSection.style.display = 'block';
      const uid = user.uid;
      const progressRef = dbRef(database, `progress/${uid}`);
      let completed = {};

      try {
        const snapshot = await get(progressRef);
        completed = snapshot.exists() ? snapshot.val() : {};
      } catch (err) {
        console.error('Error loading progress:', err);
      }

      // Go through each lesson link and attach a checkbox
      document.querySelectorAll('li > a').forEach((link, index) => {
        const lessonId = `lesson-${index}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('lesson-checkbox');
        checkbox.dataset.lessonId = lessonId;
        checkbox.checked = completed[lessonId] === true;

        checkbox.addEventListener('change', async () => {
          completed[lessonId] = checkbox.checked;
          try {
            await set(progressRef, completed);
          } catch (err) {
            console.error('Error saving progress:', err);
          }
        });

        link.parentElement.appendChild(checkbox);
      });
    } else {
      if (progressSection) progressSection.style.display = 'none';
    }
  });
});