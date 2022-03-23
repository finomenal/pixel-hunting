import fetch from 'node-fetch';

const getSiteMap = async (oldDomain: string) => {
	const siteMapResp = await fetch(`${oldDomain}/sitemap.xml`);
	const siteMap = await siteMapResp.text();
	const arr = siteMap.match(/<loc>(.[^<]+)<\/loc>/g);
	const neededData = arr?.map(site => site.replace(/<(|\/)loc>/g, '').replace(/http(s?):\/\/[^/]+/g, '')) || [];
	return neededData;
};

export default getSiteMap;
