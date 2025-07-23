import { auth, database } from './firebaseConfig.js';
import {
  onAuthStateChanged,
  signInAnonymously
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

  // Show/hide progress tracking based on sign-in status
  onAuthStateChanged(auth, (user) => {
    if (user && !user.isAnonymous) {
      progressSection.style.display = 'block'; // Show progress tracker
      loadProgress(user.uid);
    } else {
      progressSection.style.display = 'none'; // Hide progress tracker
    }
  });
});

// Example: Load progress (you can adapt this)
async function loadProgress(uid) {
  const progressRef = dbRef(database, `progress/${uid}`);
  try {
    const snapshot = await get(progressRef);
    if (snapshot.exists()) {
      const completedLessons = snapshot.val();
      console.log('Completed lessons:', completedLessons);
      // You can use this to update the UI (checkmarks, styles, etc.)
    }
  } catch (error) {
    console.error('Failed to load progress:', error);
  }
}