// signin.js

import { auth, database } from './firebaseConfig.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  onAuthStateChanged,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { ref, set } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const usernameInput = document.getElementById('username');
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const continueGuestBtn = document.getElementById('continueAsGuest');

  // Sign Up
  signUpButton.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const username = usernameInput.value.trim();

    if (!email || !password || !username) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });
      await set(ref(database, 'usernames/' + user.uid), username);

      window.location.href = 'index.html';
    } catch (error) {
      alert(error.message);
    }
  });

  // Sign In
  signInButton.addEventListener('click', async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.displayName) {
        const username = prompt('Please enter a username:');
        if (username) {
          await updateProfile(user, { displayName: username });
          await set(ref(database, 'usernames/' + user.uid), username);
        }
      }

      window.location.href = 'index.html';
    } catch (error) {
      alert(error.message);
    }
  });

  // Continue as Guest
  continueGuestBtn.addEventListener('click', async () => {
    try {
      const result = await signInAnonymously(auth);
      console.log('Signed in as guest:', result.user.uid);
      window.location.href = 'index.html';
    } catch (error) {
      alert('Failed to sign in as guest: ' + error.message);
    }
  });

  // Redirect if already signed in
  onAuthStateChanged(auth, user => {
    if (user) {
      window.location.href = 'index.html';
    }
  });
});