//import { indeedConfig, linkedinConfig } from './config.js';

const puppeteer = require('puppeteer');

function getSiteConfig(url) {
    if (/indeed\.com/.test(url)) {
        return indeedConfig;
    } else if (/linkedin\.com/.test(url)) {
        return linkedinConfig;
    }
    // Add more site configurations as needed
}
console.log("reached content");
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'initiateScraping') {
        const config = getSiteConfig(window.location.href)
        const url = window.location.href;
        const data = scrapeBoard(config, url);
        sendResponse(data);
    }
 });

function scrapeBoard(config, url) {
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.text(); // Extract the response body as text
        } else {
            console.error('Failed to fetch page. Status:', response.status);
        }
    })
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Define your scraping logic using DOM methods
        const jobTitle = doc.querySelector('body > div.application-outlet > div.authentication-outlet > div > div.job-view-layout.jobs-details > div.grid > div > div:nth-child(1) > div > div > div.p5 > div.display-flex.justify-space-between.flex-wrap > h1').textContent;
        const company = doc.querySelector('body > div.application-outlet > div.authentication-outlet > div > div.job-view-layout.jobs-details > div.grid > div > div:nth-child(1) > div > div > div.p5 > div.job-details-jobs-unified-top-card__primary-description > div > a').textContent;
        const location = doc.querySelector('body > div.application-outlet > div.authentication-outlet > div > div.job-view-layout.jobs-details > div.grid > div > div:nth-child(1) > div > div > div.p5 > div.job-details-jobs-unified-top-card__primary-description > div > span:nth-child(2)').textContent;
        const description = doc.querySelector('#job-details').textContent;

        const scrapedData = {
            Title: jobTitle,
            Company: company,
            Location: location,
            Description: description,
        };

        console.log(scrapedData);
    })
    .catch(error => {
        console.error('Error during fetch request:', error);
    });
}



const indeedConfig = {
    jobTitleXPath: '//*[@id="vjs-container"]/div/div/div/div[1]/div/div[1]/div[1]/h2', 
    companyXPath: '//*[@id="vjs-container"]/div/div/div/div[1]/div/div[1]/div[2]/div/div/div/div[1]/div/span/a/text()',
    locationXPath: '//*[@id="vjs-container"]/div/div/div/div[1]/div/div[1]/div[2]/div/div/div/div[2]/div',       
    descriptionXPath: '//*[@id="jobDescriptionText"]', 
};

const linkedinConfig = {
    jobTitleXPath: '/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[1]/h1', 
    companyXPath: '/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[2]/div/a/text()',
    locationXPath: '/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[2]/div/text()',       
    descriptionXPath: '//*[@id="job-details"]', 
};