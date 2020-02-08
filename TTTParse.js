const rp = require('request-promise');
const cheerio = require('cheerio');
const urlAbout = 'https://ttt.studio/company/';
const urlCareer = 'https://ttt.studio/careers/';



function tttParse(url) {
    return new Promise((resolve, reject) => {
        rp(url)
            .then((html) => {
                let text = [];
                let $ = cheerio.load(html);
                var t = $('div').contents().map(function() {
                    return (this.type === 'text') ? $(this).text() : '';
                }).get().join('').trim().replace(/(\t{2,}|\n)/gm, "");
                // let allDivs = $('div:not(:has(*))').text();
                // let data = $('body').find('.para').text();
                // let dataP = $('body').find('p').text();
                // text.push(allDivs);
                // text.push(data);
                // text.push(dataP);
                text.push(t);
                resolve(text);
            })
            .catch((err) => {
                console.log(err);
                return reject(err);
            })
    });
}

tttParse(urlAbout)
    .then((text) => {
        console.log(text);
    }).catch((err) => {
        console.log(err);
    });

tttParse(urlCareer)
    .then((text) => {
        console.log(text);
    }).catch((err) => {
        console.log(err);
});
