import { auth, database } from './firebaseConfig.js';
import {
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import {
  ref as dbRef,
  set,
  get
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  const installBtn = document.getElementById('installBtn');
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

  // Progress Tracking Setup
  onAuthStateChanged(auth, (user) => {
    if (user && !user.isAnonymous) {
      showCheckboxes();
      loadProgress(user.uid);
    } else {
      hideCheckboxes();
    }
  });

  function showCheckboxes() {
    document.querySelectorAll('.lesson-checkbox').forEach(cb => {
      cb.style.display = 'inline-block';
    });
  }

  function hideCheckboxes() {
    document.querySelectorAll('.lesson-checkbox').forEach(cb => {
      cb.style.display = 'none';
    });
  }

  function loadProgress(uid) {
    const progressRef = dbRef(database, `progress/${uid}`);
    get(progressRef).then((snapshot) => {
      if (snapshot.exists()) {
        const completedLessons = snapshot.val();
        Object.keys(completedLessons).forEach(lessonId => {
          const checkbox = document.getElementById(lessonId);
          if (checkbox) {
            checkbox.checked = true;
          }
        });
      }
    });

    // Attach listeners to checkboxes
    document.querySelectorAll('.lesson-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        saveProgress(uid, cb.id, cb.checked);
      });
    });
  }

  function saveProgress(uid, lessonId, isChecked) {
    const lessonRef = dbRef(database, `progress/${uid}/${lessonId}`);
    if (isChecked) {
      set(lessonRef, true);
    } else {
      set(lessonRef, null);
    }
  }
});