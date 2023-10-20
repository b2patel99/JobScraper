document.addEventListener('DOMContentLoaded', function () {
    const startScrapingButton = document.getElementById('scrapeButton');
    scrapeButton.addEventListener('click', function () {
        // Send a message to the background script when the button is clicked
        chrome.runtime.sendMessage({ action: 'startScraping' });
    });
 });

// Listen for messages sent from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    //displayScrapedData(message.data);
    generateQRCode(message.data);
    console.log(message.data);
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

    const linkElement = document.createElement('p');
    linkElement.textContent = 'Link: ' + data.Url;
    // Clear the content of the "result" div before adding new data
    resultDiv.innerHTML = '';

    // Append the created elements to the "result" div
    resultDiv.appendChild(jobTitleElement);
    resultDiv.appendChild(companyElement);
    resultDiv.appendChild(locationElement);
    resultDiv.appendChild(descriptionElement);
    resultDiv.appendChild(linkElement);
}

function generateQRCode(data) {
    const qrCodeDiv = document.getElementById('qrcode');
    
    // Create a new div element to hold the QR code
    const newQRCodeDiv = document.createElement('div');
    
    // Generate the QR code in the new div
    let code = new QRCode(newQRCodeDiv, {
        text: data,
        width: 128,
        height: 128
    });
    
    // Replace the existing QR code div with the new one
    qrCodeDiv.innerHTML = '';
    qrCodeDiv.appendChild(newQRCodeDiv);
}

