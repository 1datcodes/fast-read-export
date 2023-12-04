document.addEventListener("DOMContentLoaded", function() {
    // Popup logic here
    // TODO: Export button, Resize function
    const textInput = document.getElementById('text-input');
    const speedInput = document.getElementById('speed-input');
    const fontSizeInput = document.getElementById('font-size-input');
    const runButton = document.getElementById('run-button');
    const pauseResumeButton = document.getElementById('pause-resume-button');
    //const exportButton = document.getElementById('export-button');
    const popupContent = document.getElementById('popup-content');

    const speedLabel = document.getElementById('speed-label');
    const fontSizeLabel = document.getElementById('font-size-label');

    let isRunning = false; // Track animation state
    
    /* Couldn't implement resizing on time
    const resizeHandle = document.getElementById('resize-handle');
    let isResizing = false;
    let minWidth = 100;
    let minHeight = 100;
    */

    // For animation
    let animationInterval;
    let words;
    let currentWordIndex = 0;
    let lastWordPosition = 0;

    // Initialize canvas immediately
    generateTextAnimation("Waiting...", speedInput.value, fontSizeInput.value);

    runButton.addEventListener('click', function() {
        // Handle the "Run" button click
        const text = textInput.value;
        const speed = speedInput.value;
        const fontSize = fontSizeInput.value;
        isRunning = true;

        // Debug
        console.log('Text: ' + text);
        console.log('Speed: ' + speed);
        console.log('FontSize: ' + fontSize);

        // Generate animation
        lastWordPosition = 0;
        pauseResumeButton.textContent = 'Pause';
        generateTextAnimation(text, speed, fontSize);
    });

    pauseResumeButton.addEventListener('click', function() {
        if (isRunning) {
            // Stop playback
            clearInterval(animationInterval);
            pauseResumeButton.textContent = 'Resume';
        } else {
            // When resuming, allow user to change speed and font size
            const speed = speedInput.value;
            const fontSize = fontSizeInput.value;

            console.log('Resuming from word: ' + words[currentWordIndex - 1]);
            console.log('Speed: ' + speed);
            console.log('FontSize: ' + fontSize);

            generateTextAnimation(textInput.value.substring(lastWordPosition), speed, fontSize);
            pauseResumeButton.textContent = 'Pause';
        }

        isRunning = !isRunning;
    });

    speedInput.addEventListener('change', function() {
        speedLabel.textContent = speedInput.value + ' wpm';
    });

    fontSizeInput.addEventListener('change', function() {
        fontSizeLabel.textContent = fontSizeInput.value + ' pt';
    });

    function generateTextAnimation(text, speed, fontSize) {
        // Parse the input string into words
        words = text.split(/\s+/).filter(word => word.trim() != '');
        
        // Initiate canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas size to match #popup-content
        canvas.width = popupContent.clientWidth;
        canvas.height = popupContent.clientHeight;

        // console.log(canvas.width, canvas.height);
        // console.log(popupContent.offsetWidth, popupContent.offsetHeight);

        // Set initial canvas state
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Add border styling
        canvas.style.border = '2px solid black';

        // Animation logic here
        context.fillStyle = 'black';
        context.font = fontSize + 'px Arial';

        // Add canvas to the popup content
        popupContent.innerHTML = '';
        popupContent.appendChild(canvas);

        // Display each word at the center of the canvas
        currentWordIndex = 0;

        // Calculate the interval duration based on speed
        const wordsPerMinute = speed;
        const millisecondsPerWord = (60 / wordsPerMinute) * 1000;

        // Start the animation interval
        animationInterval = setInterval(displayNextWord, millisecondsPerWord);
    }

    function displayNextWord() {
        if (currentWordIndex < words.length) {
            const canvas = document.querySelector('canvas');
            const context = canvas.getContext('2d');

            // Clear previous content
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Display the current word at the center of the canvas
            const currentWord = words[currentWordIndex];
            const textWidth = context.measureText(currentWord).width;
            const x = (canvas.width - textWidth) / 2;
            const y = canvas.height / 2;

            context.fillStyle = 'black';
            context.fillText(currentWord, x, y);

            // Move to the next word
            lastWordPosition = textInput.value.indexOf(words[currentWordIndex], lastWordPosition)
                                                       + words[currentWordIndex].length + 1;
            currentWordIndex++;
        } else {
            // End of animation
            clearInterval(animationInterval);
            isRunning = false;
            pauseResumeButton.textContent = 'Resume';
        }
    }

    /*
    exportButton.addEventListener('click', function() {
        // Handle the "export" button click
        const text = textInput.value;
        // TODO: export the video here

        console.log('Exporting text: ', text);
        exportTextToVideo(text);
    });

    function exportTextToVideo(text) {
        // Send the text to the server for export
        fetch('/export-video', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        })
        .then(response => response.blob())
        .then(videoBlob => {
            // Simulate a download link for the video
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(videoBlob);
            downloadLink.download = 'exported_video.mp4';
            downloadLink.click();
        })
        .catch(error => console.error('Error exporting the video: ' + error));
    }
    */
    /*
    resizeHandle.addEventListener('mousedown', function() {
        isResizing = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', function() {
            isResizing = false;
            document.removeEventListener('mousemove', handleMouseMove);
        });
    });

    function handleMouseMove(event) {
        if (isResizing) {
            const newWidth = Math.max(event.pageX, minWidth);
            const newHeight = Math.max(event.pageY, minHeight);

            // Update the size of #popup-content with smooth animation
            requestAnimationFrame(() => {
                popupContent.style.width = newWidth + 'px';
                popupContent.style.height = newHeight + 'px';
            })

            // Update the canvas size
            const canvas = document.querySelector('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Debug
            console.log('Popup content size: ' + popupContent.offsetWidth, 'x', popupContent.offsetHeight);
            console.log('Canvas size: ', canvas.width, 'x', canvas.height);
        }
    }
    */
});