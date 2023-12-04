// background.js

// Event listener for messages from the popup
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      // Log the message received from the popup
      console.log('Message from Popup:', request);
  
      // You can perform additional actions based on the message here
  
      // Sending a response back to the popup (optional)
      sendResponse({ response: 'Message received in background.js' });
    }
  );
  