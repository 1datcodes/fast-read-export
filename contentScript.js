// contentscript.js

// Function to extract and log text content from the page
function extractTextContent() {
    const textContent = document.body.textContent;
    console.log('Text Content:', textContent);

    // You can perform additional actions with the extracted text here
}

// Execute the content script when the page has finished loading
document.addEventListener('DOMContentLoaded', extractTextContent);
