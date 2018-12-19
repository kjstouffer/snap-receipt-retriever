## Snap-billing info

Get Latest billing info for your snap fitness account!

### About

Gathering billing receipts from webpages can be cumbersome and time consuming, why not have a script do it for you?

This script uses puppeteer https://github.com/GoogleChrome/puppeteer to login and take a screenshot of the latest billing info for your snap fitness account.

### how to run:

#### MacOS

Install homebrew (see https://brew.sh/)
Install node `brew install nodejs`
Install npm `brew install npm`
Install puppeteer `npm install puppeteer`

then run `SNAP_FITNESS_USERNAME=emailaddress SNAP_FITNESS_PASSWORD=password node index.js`

The screenshot of your billing info will be saved as `element.png`
