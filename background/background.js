// Function to start scraping when a message is received from popup.js
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log("message received");
//     if (request.action === 'startScraping') {
//         // Forward the startScraping message to content.js
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//             const activeTab = tabs[0];
//             if (activeTab) {
//                 chrome.scripting.executeScript({
//                     target: { tabId: activeTab.id },
//                     function: initiateScrapingScript
//                 });
//             }
//         });
//     }
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("message received");
    if (request.action === 'startScraping') {
      // Forward the startScraping message to the content script
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        console.log(activeTab);
        if (activeTab) {
          chrome.tabs.sendMessage(activeTab.id, { action: 'startScraping' });
          console.log("message sent to content");
        }
      });
    }
  });
  

// function initiateScrapingScript() {
//     // Send a message to content.js to start scraping
//     console.log("message sent to content");
//     chrome.runtime.sendMessage({ action: 'startScraping' });
// }

// chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
//   if (request.action === 'scrapeJobInfo') {
//       try {
//           const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
//           const activeTab = tabs[0];

//           if (!activeTab) {
//               console.error('No active tab found.');
//               sendResponse({ error: 'No active tab found.' });
//               return;
//           }

//           const siteConfig = getSiteConfig(activeTab.url);
//           if (!siteConfig) {
//               console.error('Site not supported.');
//               sendResponse({ error: 'Site not supported.' });
//               return;
//           }

//           const scrapedData = await scrapeData(siteConfig, activeTab.url);
//           sendResponse(scrapedData);
//       } catch (error) {
//           console.error('Scraping error:', error);
//           sendResponse({ error: 'Scraping failed' });
//       }
//   }
// });

// function getSiteConfig(url) {
//   if (/indeed\.com/.test(url)) {
//       return indeedConfig;
//   } else if (/linkedin\.com/.test(url)) {
//       return linkedinConfig;
//   }
//   // Can add more sites when adding support later.
// }


// async function scrapeData(config, url) {
//     const browser = await chrome.runtime.connectNative('dnlhlkiflhgeffkaaanoecjljcjenpha');
//     const page = await browser.newPage();
//     try {
//       await page.goto(url);

//       const jobTitleElement = await page.$x(config.jobTitleXPath);
//       const title = await jobTitleElement[0].textContent();
  
//       const jobCompanyElement = await page.$x(config.companyXPath);
//       const company = await jobCompanyElement[0].textContent();
  
//       const jobLocationElement = await page.$x(config.locationXPath);
//       const location = await jobLocationElement[0].textContent();
  
//       const jobDescriptionElement = await page.$x(config.descriptionXPath);
//       const description = await jobDescriptionElement[0].textContent();

//       const scrapedData = {
//         Title: title,
//         Company: company,
//         Location: location,
//         Description: description,
//       };
//       return scrapedData;
//     } catch (error) {
//       console.error('Scraping error:', error);
//       return { error: 'Scraping failed' };
//     } finally {
//       await browser.close();
//     }
//   }