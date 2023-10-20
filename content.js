console.log("reached content");
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'initiateScraping') {
        const config = getSiteConfig(window.location.href)
        const data = scrapeBoard(config);
        sendResponse(data);
    }
 });

function scrapeBoard(config) {
    const titleElement = document.querySelector(config.titleSelector);
    const jobTitle = titleElement.textContent.trim();
    const companyElement = document.querySelector(config.companySelector);
    const company = companyElement.textContent.trim();
    const locationElement = document.querySelector(config.locationSelector);
    const location = locationElement.textContent.trim();
    const descriptionElement = document.querySelector(config.descriptionSelector);
    const description = descriptionElement.textContent.trim();
    const scrapedData = {
        Title: jobTitle,
        Company: company,
        Location: location,
        Description: description,
    }
    return scrapedData;
}

function getSiteConfig(url) {
    if (/indeed\.com/.test(url)) {
        return indeedConfig;
    } else if (/linkedin\.com/.test(url)) {
        return linkedinConfig;
    }
    // Add more site configurations as needed
}

const indeedConfig = {
    titleSelector: '.jobsearch-JobInfoHeader-title',
    companySelector: '.css-775knl',
    locationSelector: 'div[data-testid="inlineHeader-companyLocation"] > div',       
    descriptionSelector: '#jobDescriptionText',
};

const linkedinConfig = {
    titleSelector: '.t-24.t-bold.job-details-jobs-unified-top-card__job-title', 
    companySelector: '/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[2]/div/a/text()',
    locationSelector: '/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/div[2]/div/text()',       
    descriptionSelector: '//*[@id="job-details"]', 
};

