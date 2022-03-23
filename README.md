# pixel-hunting
Utility to compare pages between two stages.

## Installation
```bash
$ npm install -g @finomenal/pixel-hunting
```

## How it works

**Compare english home page**
```bash
ph -o https://old-domain.com/en/ -n https://new-domain.com/en/
```
The utility will compare the pages and create a new folder in the current path with the results of the image comparison.

## Options

```
    '--old', '-o' {String} - old domain (f.e. "https://old-domain.com" or "https://old-domain.com/en")
    '--new', '-n' {String} - new domain (f.e. "https://new-domain.com" or "https://new-domain.com/en")
    '--main-selector', '-m' {String} - selector to get full height (body by default)
    '--width', '-w' {Number} - browser screen width (1440 by default)
    '--page', '-p' {String[]} - list of pages (f.e. "/about", "/contacts")
    '--await', '-a' {String[]} - expected elements selectors
    '--conceal', '-c' {String[]} - hidden elements selectors
    '--sitemap', '-s' {Boolean} - get list of pages from sitemap ({oldDomain}/sitemap.xml)
    '--help', '-h' {Boolean} - help
```

## Usage

**Wait promo popup showing**
```bash
ph -o https://old-domain.com/en/ -n https://new-domain.com/en/ -a ".popup-promo"
```

**Hide cookie popup**
```bash
ph -o https://old-domain.com/en/ -n https://new-domain.com/en/ -c ".cookie-popup"
```

**Compare multiple pages**
```bash
ph -o https://old-domain.com -n https://new-domain.com -p "/" -p "/en/" -p "/de/"
```

**Compare pages from sitemap**
```bash
ph -o https://old-domain.com -n https://new-domain.com -s
```

**Compare for mobile devices**
```bash
ph -o https://old-domain.com -n https://new-domain.com -w 375
```

## License

[MIT](https://github.com/finomenal/pixel-hunting/blob/main/LICENSE)