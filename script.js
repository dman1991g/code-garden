document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const navLinks = sidebar.querySelectorAll('a');

  // Open sidebar
  menuBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
  });

  // Close sidebar
  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });

  // Optional: close sidebar when a link is clicked (mobile behavior)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
      }
    });
  });
});