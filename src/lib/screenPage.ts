import { PNG } from 'pngjs';
import * as playwright from 'playwright';
import configurePage from './configurePage';

const screenPage = async (url: string, browserPage: playwright.Page, mainSelector: string, waitSelectors: string[], hideSelectors: string[], width: number, height?: number) => {
    await browserPage.goto(url);

    try {
        await configurePage(browserPage, waitSelectors, hideSelectors);
    } catch {}

    let pageHeight = height;
    if (!pageHeight) {
        pageHeight = await browserPage.$eval(mainSelector, node => node.clientHeight);
    }

    await browserPage.setViewportSize({ width, height: pageHeight });
    const imgBuffer = await browserPage.screenshot();
    const img = PNG.sync.read(imgBuffer);

    return { imgBuffer, img, pageHeight };
}

export default screenPage;
