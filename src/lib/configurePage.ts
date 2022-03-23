import type { Page } from 'playwright-core';

const configurePage = async (browserPage: Page, waitSelectors: string[], hideSelectors: string[]) => {
	await browserPage.waitForLoadState('domcontentloaded');

	for (const selector of waitSelectors) {
		await browserPage.waitForSelector(selector);
	}

	for (const selector of hideSelectors) {
		await browserPage.$eval(selector, (elem) => { elem.style.display = 'none' });
	}
}

export default configurePage;
