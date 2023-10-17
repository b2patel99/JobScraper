document.addEventListener('DOMContentLoaded', function () {
    const startScrapingButton = document.getElementById('scrapeButton');
    scrapeButton.addEventListener('click', function () {
        // Send a message to the background script when the button is clicked
        chrome.runtime.sendMessage({ action: 'startScraping' });
    });
 });

function displayScrapedData(data) {
    // Retrieve a reference to the HTML element with the ID "result"
    const resultDiv = document.getElementById('result');

    // Create HTML elements to display each piece of data
    const jobTitleElement = document.createElement('p');
    jobTitleElement.textContent = 'Job Title: ' + data.Title;

    const companyElement = document.createElement('p');
    companyElement.textContent = 'Company: ' + data.Company;

    const locationElement = document.createElement('p');
    locationElement.textContent = 'Location: ' + data.Location;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = 'Description: ' + data.Description;

    // Clear the content of the "result" div before adding new data
    resultDiv.innerHTML = '';

    // Append the created elements to the "result" div
    resultDiv.appendChild(jobTitleElement);
    resultDiv.appendChild(companyElement);
    resultDiv.appendChild(locationElement);
    resultDiv.appendChild(descriptionElement);
}





// document.addEventListener('DOMContentLoaded', function() {
//     const scrapeButton = document.getElementById('scrapeButton');
//     scrapeButton.addEventListener('click', function() {
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//             const activeTab = tabs[0];
//             if (activeTab) {
//                 chrome.scripting.executeScript({
//                     target: { tabId: activeTab.id },
//                     function: initiateScraping
//                 });
//             }
//         });
//     });
// });