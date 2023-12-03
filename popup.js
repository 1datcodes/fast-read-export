document.addEventListener("DOMContentLoaded", function() {
    // TODO: Popup logic here
    const textInput = document.getElementById('text-input');
    const speedInput = document.getElementById('speed-input');
    const fontSizeInput = document.getElementById('font-size-input');
    const runButton = document.getElementById('run-button');

    runButton.addEventListener('click', function() {
        // Handle the "Run" button click
        const text = textInput.value;
        const speed = speedInput.value;
        const fontSize = fontSizeInput.value;

        // TODO: text to video logic here
        console.log('Text: ' + text);
        console.log('Speed: ' + speed);
        console.log('FontSize: ' + fontSize);

        // TODO: export logic here
    });
});