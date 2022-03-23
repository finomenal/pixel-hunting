export const HELP = `
    '--old', '-o' {String} - old domain (f.e. "https://old-domain.com" or "https://old-domain.com/en")
    '--new', '-n' {String} - new domain (f.e. "https://new-domain.com" or "https://new-domain.com/en")
    '--main-selector', '-m' {String} - selector to get full height (body by default)
    '--width', '-w' {Number} - browser screen width (1440 by default)
    '--page', '-p' {String[]} - list of pages (f.e. "/about", "/contacts")
    '--await', '-a' {String[]} - expected elements selectors
    '--conceal', '-c' {String[]} - hidden elements selectors
    '--sitemap', '-s' {Boolean} - get list of pages from sitemap ({oldDomain}/sitemap.xml)
    '--help', '-h' {Boolean} - help
`

export const ADD_DOMAINS = 'Please, add "--old" and "--new" args. Write "--help" for more information';

export const ADD_CORRECT_PAGES = 'Please, enter correct pages (ex. /about). Write "--help" for more information';

export const DONE = 'Report is done';
