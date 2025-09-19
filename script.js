import { auth, database } from 'firebaseConfig.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { ref as dbRef, set, get } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

document.addEventListener('DOMContentLoaded', () => {
  // =======================
  // Mobile Drawer Toggle
  // =======================
  const toggleBtn = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  // =======================
  // Install Prompt
  // =======================
  const installBtn = document.getElementById('installBtn');
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    if (installBtn) {
      installBtn.style.display = 'inline-block';

      installBtn.addEventListener('click', () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
          console.log(
            `User ${choiceResult.outcome === 'accepted' ? 'accepted' : 'dismissed'} the install prompt`
          );
          deferredPrompt = null;
        });
      });
    }
  });

  // =======================
  // Progress Tracking
  // =======================
  onAuthStateChanged(auth, (user) => {
    if (user && !user.isAnonymous) {
      showCheckboxes();
      loadProgress(user.uid);
    } else {
      hideCheckboxes();
    }
  });

  function showCheckboxes() {
    document.querySelectorAll('.lesson-checkbox, input[type="checkbox"][data-lesson]').forEach(cb => {
      cb.style.display = 'inline-block';
    });
  }

  function hideCheckboxes() {
    document.querySelectorAll('.lesson-checkbox, input[type="checkbox"][data-lesson]').forEach(cb => {
      cb.style.display = 'none';
    });
  }

  function loadProgress(uid) {
    const progressRef = dbRef(database, `progress/${uid}`);
    get(progressRef).then((snapshot) => {
      if (snapshot.exists()) {
        const completedLessons = snapshot.val();
        Object.keys(completedLessons).forEach(lessonId => {
          const checkbox = document.querySelector(`[data-lesson="${lessonId}"]`);
          if (checkbox) checkbox.checked = true;
        });
      }
    });

    document.querySelectorAll('input[type="checkbox"][data-lesson]').forEach(cb => {
      cb.addEventListener('change', () => {
        saveProgress(uid, cb.dataset.lesson, cb.checked);
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