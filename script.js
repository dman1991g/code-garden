document.addEventListener('DOMContentLoaded', () => {
  const pdfLinks = document.querySelectorAll('#pdf-list a');
  const pdfViewer = document.getElementById('pdf-viewer');
  const pdfFrame = document.getElementById('pdf-frame');
  const backButton = document.getElementById('back-button');
  const pdfList = document.getElementById('pdf-list');

  pdfViewer.style.display = 'none';
  backButton.style.display = 'none';

  pdfLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const pdfUrl = link.getAttribute('data-pdf');
      if (pdfUrl) {
        pdfFrame.src = pdfUrl;
        pdfViewer.style.display = 'block';
        backButton.style.display = 'inline-block';
        pdfList.style.display = 'none';
      }
    });
  });

  backButton.addEventListener('click', () => {
    pdfFrame.src = '';
    pdfViewer.style.display = 'none';
    backButton.style.display = 'none';
    pdfList.style.display = 'block';
  });
});