import type { Config } from '../types';
import sharp from 'sharp';
import { PNG } from 'pngjs';
import * as playwright from 'playwright';
import pixelmatch from 'pixelmatch';
import path from 'path';
import fs from 'fs';
import writeMessage from './writeMessage';
import getUrlFileName from './getUrlFileName';
import screenPage from './screenPage';

const comparePage = async ({
	"--width": width = 1440, "--old": oldUrl, "--new": newUrl, "--await": waitSelectors = [], "--conceal": hideSelectors = [], "--main-selector": mainSelector = 'body'
}: Config) => {
	if (!oldUrl || !newUrl) throw new Error('err');

	const browser = await playwright.chromium.launch();

	try {
		const context = await browser.newContext({ viewport: { width, height: 100000 } });
		const browserPage = await context.newPage();

		const { imgBuffer: oldImgBuffer, img: oldImg, pageHeight } = await screenPage(oldUrl, browserPage, mainSelector, waitSelectors, hideSelectors, width);
		writeMessage('20%');

		const { imgBuffer: newImgBuffer, img: newImg } = await screenPage(newUrl, browserPage, mainSelector, waitSelectors, hideSelectors, width, pageHeight);
		writeMessage('40%');

		const diff = new PNG({ width, height: pageHeight });
		writeMessage('50%');

		pixelmatch(oldImg.data, newImg.data, diff.data, width, pageHeight, { threshold: 0 });
		writeMessage('60%');

		const diffImageBuffer = PNG.sync.write(diff);
		writeMessage('70%');

		const full = new PNG({ width: width * 3, height: pageHeight });
		const fullCorrect = PNG.sync.write(full);
		const diffFileFolder = path.join(process.cwd(), 'pixel-hunting');
		writeMessage('90%');

		if (!fs.existsSync(diffFileFolder)) fs.mkdirSync(diffFileFolder, { recursive: true });

		await sharp(fullCorrect)
			.composite([
				{ input: oldImgBuffer, left: 0, top: 0 },
				{ input: diffImageBuffer, left: width, top: 0 },
				{ input: newImgBuffer, left: width * 2, top: 0 }
			])
			.toFile(path.join(diffFileFolder, `${getUrlFileName(oldUrl)}--${getUrlFileName(newUrl)}.png`));
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.log(e.message);
		}
	}

	await browser.close();
};

export default comparePage;
