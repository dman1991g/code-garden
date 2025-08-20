document.addEventListener("DOMContentLoaded", () => {
  const htmlEditor = document.getElementById("html-editor");
  const cssEditor = document.getElementById("css-editor");
  const jsEditor = document.getElementById("js-editor");
  const runBtn = document.getElementById("run-btn");
  const resetBtn = document.getElementById("reset-btn");
  const previewFrame = document.getElementById("preview");

  const starterHTML = `<h1>Hello, I'm [Your Name]</h1>
<p>This is my first practice page!</p>`;
  const starterCSS = `body { font-family: Arial, sans-serif; background: #f5f5f5; } h1 { color: #3f51b5; }`;
  const starterJS = `console.log("Welcome to your first practice page!");`;

  // Load starter code
  htmlEditor.value = starterHTML;
  cssEditor.value = starterCSS;
  jsEditor.value = starterJS;

  function runCode() {
    const code = `
<!DOCTYPE html>
<html>
<head>
  <style>${cssEditor.value}</style>
</head>
<body>
  ${htmlEditor.value}
  <script>${jsEditor.value}<\/script>
</body>
</html>
    `;
    const preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    preview.open();
    preview.write(code);
    preview.close();
  }

  function resetCode() {
    htmlEditor.value = starterHTML;
    cssEditor.value = starterCSS;
    jsEditor.value = starterJS;
    runCode();
  }

  runBtn.addEventListener("click", runCode);
  resetBtn.addEventListener("click", resetCode);

  // Initial render
  runCode();
});