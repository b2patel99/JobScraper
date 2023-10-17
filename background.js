
console.log('Background script is running');
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'startScraping') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length > 0) {
                const activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, { action: 'initiateScraping' }, function (response){
                    console.log("Response from content script:", response);
                });
                console.log("background sent message to content");
            }
        });
    }
 });



