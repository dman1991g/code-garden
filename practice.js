// Starter code for each editor
const starterHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>About Me</title>
</head>
<body>
  <h1>Hello, I'm [Your Name]</h1>
  <p>This is my first practice page!</p>
</body>
</html>
`;

const starterCSS = `
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  text-align: center;
}
h1 {
  color: #007BFF;
}
`;

const starterJS = `
document.body.insertAdjacentHTML("beforeend", "<p>JavaScript is working!</p>");
`;

// DOM elements
const htmlEditor = document.getElementById("editor-html");
const cssEditor = document.getElementById("editor-css");
const jsEditor = document.getElementById("editor-js");
const runBtn = document.getElementById("run-btn");
const resetBtn = document.getElementById("reset-btn");
const previewFrame = document.getElementById("preview");

// Load starter code
htmlEditor.value = starterHTML.trim();
cssEditor.value = starterCSS.trim();
jsEditor.value = starterJS.trim();

// Function to run code
function runCode() {
  const htmlCode = htmlEditor.value;
  const cssCode = `<style>${cssEditor.value}</style>`;
  const jsCode = `<script>${jsEditor.value}<\/script>`;
  
  const preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
  preview.open();
  preview.write(htmlCode + cssCode + jsCode);
  preview.close();
}

// Reset code
function resetCode() {
  htmlEditor.value = starterHTML.trim();
  cssEditor.value = starterCSS.trim();
  jsEditor.value = starterJS.trim();
  runCode();
}

// Tab switching
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active from all buttons
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Hide all editors
    document.querySelectorAll(".editor").forEach(ed => ed.classList.add("hidden"));
    // Show the selected editor
    document.getElementById("editor-" + btn.dataset.tab).classList.remove("hidden");
  });
});

// Run starter code on load
runCode();

// Button listeners
runBtn.addEventListener("click", runCode);
resetBtn.addEventListener("click", resetCode);