// Starter code (users can edit this)
const starterCode = `
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

const editor = document.getElementById("editor");
const runBtn = document.getElementById("run-btn");
const previewFrame = document.getElementById("preview");

// Load starter code into the editor
editor.value = starterCode;

// Function to run the code
function runCode() {
  const code = editor.value;
  const preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
  preview.open();
  preview.write(code);
  preview.close();
}

// Run starter code on load
runCode();

// Run button listener
runBtn.addEventListener("click", runCode);