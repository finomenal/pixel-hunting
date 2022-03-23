const getUrlFileName = (url: string) => {
	return url.replace(/http(s?):\/\/|\/$/g, '').replace(/\.|:|\?|=/g, '_').replace(/\//g, '__');
};

export default getUrlFileName;
