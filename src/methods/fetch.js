/**
 * @file fetch.js - Fetches Link fetched Search Function
 * @author ZYROUGE
 * @returns Promise { <pending> }
 */

const axios = require("axios");
const cheerio = require("cheerio");

module.exports = link => {
    return new Promise((resolve, reject) => {
        if(!link || link.length == 0) reject(`(ParamsError) Valid Link was not passed.`);
        if(typeof link !== "string") reject(`(ParamsError) Link must be a string.`);
        axios.get(`${link}`)
        .then(response => {
            try {
                const data = response.data;
                const content = data.split(`<!-- content -->`)[1].split(`<!-- MxM banner -->`)[0];
                const $ = cheerio.load(content);
                const author = $('.lyricsh').text().replace("Lyrics", "").trim();
                const lyrics = content.split(`<!-- Usage of azlyrics.com content by any third-party lyrics provider is prohibited by our licensing agreement. Sorry about that. -->`)[1].split(`</div>`)[0];
                resolve({
                    author: author,
                    lyrics: lyrics
                });
            } catch (e) {
                reject(`(ResultError) No lyrics was found.`);
            }
        })
        .catch(e => reject(`(ModuleError) Error occured in Axios.`))
    });
};