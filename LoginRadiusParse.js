const rp = require('request-promise');
const cheerio = require('cheerio');
const urlAbout = 'https://www.loginradius.com/about-us/';
const urlCareer = 'https://www.loginradius.com/careers/';



function zenParse(url) {
    return new Promise((resolve, reject) => {
        rp(url)
            .then((html) => {
                let text = [];
                let $ = cheerio.load(html);
                let data = $('body').find('p').text().split('\n');
                let data2 = data.join('').replace(/\s\s+/g, ' ');
                // console.log(data2);
                // console.log(data[0]);
                text.push(data2);
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
        // console.log(text.length);
    }).catch((err) => {
        console.log(err);
    });

zenParse(urlCareer)
    .then((text) => {
        console.log(text);
    }).catch((err) => {
        console.log(err);
});
