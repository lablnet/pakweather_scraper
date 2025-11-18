require('dotenv').config();

/**
 * Get the browser.
 * 
 * @param {object} params - The browser params.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {object} - The browser.
 */
const getBrowser = async (params) => {
    const defaultParams = process.env.USE_PROXY === 'true' ? {
        proxy: {
            server: process.env.PROXY_SERVER,
            username: process.env.PROXY_USERNAME,
            password: process.env.PROXY_PASSWORD 
        }
    } : {};
    params = Object.assign(defaultParams, params);
    const { chromium } = require('playwright');
    const browser = await chromium.launch(params);
    return browser
}

/**
 * Get the browser and page with the given params.
 * 
 * @param {boolean} headless - The headless mode.
 * @param {string} waitUntil - The wait until.
 * @param {boolean} javaScriptEnabled - The java script enabled.
 * @param {boolean} blockImages - The block images.
 * @param {boolean} blockVideos - The block videos.
 * @param {boolean} blockScripts - The block scripts.
 * @param {boolean} blockCookies - The block cookies.
 * @param {boolean} blockMedia - The block media.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {browser, page} - The browser and page.
 */
const getBrowserAndPage = async ({
    headless = false,
    waitUntil = 'load',
    javaScriptEnabled = true,
    blockImages = true,
    blockVideos = true,
    blockScripts = true,
    blockCookies = true,
    blockMedia = true,
} = {}) => {
    const browser = await getBrowser({
      headless: headless,
      waitUntil: waitUntil,
      javaScriptEnabled: javaScriptEnabled
    })
    const context = await browser.newContext()
    const page = await context.newPage({ target: 'tab' })
  
    // Interception for resource loading and cookie blocking
    await page.route('**/*', async route => {
      const request = route.request()
  
      // Block images, videos, scripts, and cookies to speed up the page load
      if (
        (blockVideos && request.resourceType() === 'video') ||
        (blockMedia && request.resourceType() === 'media') ||
        (blockImages && request.resourceType() === 'image') ||
        (blockScripts && request.resourceType() === 'script') ||
        (blockCookies && request.url().includes('Notice'))
      ) {
        route.abort()
      } else {
        // Remove 'Set-Cookie' headers from the response to block cookies
        const response = await route.continue()
        if (response && blockCookies) {
          const headers = response.headers()
           // Strip Set-Cookie headers from the response
          delete headers['set-cookie']
        }
      }
    })
  
    // Automatically reject or handle cookie consent dialogs
    page.on('dialog', async dialog => {
      if (dialog.message().includes('cookie')) {
        await dialog.dismiss()
      } else {
        await dialog.accept()
      }
    })
    return { browser, page }
}

/**
 * Wait for the given time.
 * 
 * @param {number} wait - The time to wait.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {object} - The browser and page.
 */
const _wait = async (wait) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, wait);
    });
}

/**
 * Navigate to the given url.
 * 
 * @param {object} page - The page object.
 * @param {string} url - The url to navigate.
 * @param {number} wait - The time to wait.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {object} - The page object.
 */
const navigate = async (page, url, wait = 0, timeout = 90000) => {
    // validate the url.
    if (!url)
        throw new Error('Url is required');
    // navigate to the url.
    await page.goto(url, { waitUntil: 'load', timeout: timeout});

    // wait for the given time.
    if (wait > 0) await _wait(wait);

    // return the page.
    return page;
}

/**
 * Get the element.
 * 
 * @param {object} page - The page object.
 * @param {string} type - The type of selector.
 * @param {string} selector - The selector.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {object} - The element.
 */
const elem = async (page, type, selector, wait = 0, timeout = 60000, multiple = false) => {
    let element = page;
    if (!selector)
        throw new Error('Selector is required');
    // ID, CLASS, TAG, XPATH, and, Attribute.
    switch (type) {
        case 'id':
            element = await page.locator(`[id=${selector}]`, { timeout: timeout });
            break;
        case 'class':
            element = await page.locator(`[class=${selector}]`, { timeout: timeout });
            break;
        case 'css':
            element = page.locator(selector, { timeout: timeout });
            break;    
        case 'tag':
            element = await page.locator(selector), { timeout: timeout };
            break;
        case 'xpath':
            element = await page.locator(`xpath=${selector}`, { timeout: timeout });
            break;
        defaut:
            throw new Error('Invalid selector type');
    }
    if (wait > 0) {
        await _wait(wait);
    }
    if (!element) {
        throw new Error('Element not found');
    }

    return multiple ? await element.all() : await element.first();
}

/**
 * Input the value in the given selector.
 * 
 * @param {object} page - The page object.
 * @param {string} type - The type of selector.
 * @param {string} selector - The selector.
 * @param {string} value - The value to input.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {object} - The page object.
 */
const input = async (page, type, selector, value, wait = 0) => {
    let element = await elem(page, type, selector, wait);
    await element.type(value);
    return page;
}

/**
 * Click on the given selector.
 * 
 * @param {object} page - The page object.
 * @param {string} type - The type of selector.
 * @param {string} selector - The selector.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {object} - The page object.
 */
const click = async (page, type, selector) => {
    let element = await elem(page, type, selector);
    await element.click();
    return page;
}

/**
 * Double click on the given selector.
 * 
 * @param {object} page - The page object.
 * @param {string} type - The type of selector.
 * @param {string} selector - The selector.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {object} - The page object.
 */
const doubleClick = async (page, type, selector) => {
    let element = await elem(page, type, selector);
    await element.dblclick();
    return page;
}

/**
 * Click on the checkbox.
 * 
 * @param {object} page - The page object.
 * @param {string} type - The type of selector.
 * @param {string} selector - The selector.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {object} - The page object.
 */
const clickCheckBox = async (page, type, selector) => {
    let element = await elem(page, type, selector);
    await element.check();
    return page;
}

/**
 * Get the data from the given selector.
 * 
 * @param {object} page - The page object.
 * @param {string} type - The type of selector.
 * @param {string} selector - The selector.
 * @param {string} data_type - The type of data to get.
 * 
 * @since v1.0.2
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * 
 * @returns {string} - The data.
 */
const getData = async (page, type, selector, data_type = 'default', wait = 0) => {
    let element = await elem(page, type, selector);
    switch (data_type) {
        case 'text':
            return await element.textContent();
        case 'html':
            return await element.innerHTML();
        case 'value':
            return await element.value();
        default:
            return await element.innerText();
    }
}

module.exports = {
    getBrowser,
    navigate,
    elem,
    input,
    click,
    doubleClick,
    clickCheckBox,
    getData,
    _wait,
    getBrowserAndPage
}
