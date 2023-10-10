import { indeedConfig, linkedinConfig } from './config';


function getSiteConfig(url) {
    if (/indeed\.com/.test(url)) {
        return indeedConfig;
    } else if (/linkedin\.com/.test(url)) {
        return linkedinConfig;
    }
    // Add more site configurations as needed
}

// Get the site configuration and initiate scraping when the extension button is clicked
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.action === 'beginScraping') {
        console.log("message received from background/popup");
        const siteConfig = getSiteConfig(window.location.href);
        if (siteConfig) {
            try {
                const config = siteConfig;
                const url = window.location.href;

                const jobTitleElement = await page.$x(config.jobTitleXPath);
                const title = await jobTitleElement[0].textContent();

                const jobCompanyElement = await page.$x(config.companyXPath);
                const company = await jobCompanyElement[0].textContent();

                const jobLocationElement = await page.$x(config.locationXPath);
                const location = await jobLocationElement[0].textContent();

                const jobDescriptionElement = await page.$x(config.descriptionXPath);
                const description = await jobDescriptionElement[0].textContent();

                const scrapedData = {
                    Title: title,
                    Company: company,
                    Location: location,
                    Description: description,
                };
                // Send the scraped data to popup.js
                chrome.runtime.sendMessage({ action: 'scrapedData', data: scrapedData });
                console.log(scrapedData);
            } catch (error) {
                chrome.runtime.sendMessage({ action: 'scrapingFailed', data: { error: 'Scraping failed' } });
            }
        }
    }
});
