const rp = require('request-promise');
const cheerio = require('cheerio');
const urlAbout = 'https://www.axiomzen.co/about';
const urlCareer = 'https://www.axiomzen.co/careers';



function zenParse(url) {
    return new Promise((resolve, reject) => {
        rp(url)
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

zenParse(urlAbout)
    .then((text) => {
        console.log(text);
    }).catch((err) => {
        console.log(err);
    });

zenParse(urlCareer)
    .then((text) => {
        console.log(text);
    }).catch((err) => {
        console.log(err);
});
