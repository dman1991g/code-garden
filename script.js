document.addEventListener('DOMContentLoaded', () => {
  const pdfLinks = document.querySelectorAll('#pdf-list a');
  const pdfViewer = document.getElementById('pdf-viewer');
  const pdfFrame = document.getElementById('pdf-frame');
  const backButton = document.getElementById('back-button');
  const pdfList = document.getElementById('pdf-list');

  pdfLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault(); // Prevent default link navigation

      const pdfUrl = link.getAttribute('data-pdf');
      if (pdfUrl) {
        pdfFrame.src = pdfUrl;
        pdfViewer.classList.remove('hidden');
        pdfList.style.display = 'none';
      }
    });
  });

  backButton.addEventListener('click', () => {
    pdfFrame.src = '';
    pdfViewer.classList.add('hidden');
    pdfList.style.display = 'block';
  });
});