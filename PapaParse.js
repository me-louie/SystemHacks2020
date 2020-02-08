const rp = require('request-promise');
const cheerio = require('cheerio');
const urlAbout = 'http://www.papajohns.ca/aboutus.html';
const puppeteer = require('puppeteer');

function accessEvents(url) {
    return puppeteer.launch()
        .then((browser) => {
            return browser.newPage().then((page) => {
                return page.goto(url)
                    .then(() => {
                        return page.content();
                    })
                    .finally(() => {
                        browser.close();
                    });
            })
        })
        .catch((err) => {
            console.log(err);
        });
}

function papaParse(url) {
    return new Promise((resolve, reject) => {
        accessEvents(url)
            .then((html) => {
                let text = [];
                let $ = cheerio.load(html);
                let data = $('body').find('p').text();
                text.push(data);
                resolve(text);
            })
            .catch((err) => {
                console.log(err);
                return reject(err);
            })
    });
}

papaParse(urlAbout)
    .then((text) => {
        console.log(text);
    }).catch((err) => {
        console.log(err);
    });
