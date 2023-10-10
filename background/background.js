chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    console.log("message received");
    if (request.action === 'startScraping') {
      // Forward the startScraping message to the content script
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        console.log(activeTab);
        if (activeTab) {
          chrome.runtime.sendMessage({ action: 'beginScraping' });
          console.log("message sent to content");
        }
      });
    }
});

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.action === 'scrapedData') {
    console.log(request.data);
  } else if (request.action === 'scrapingFailed') {
    console.log(request.data);
  }
});
