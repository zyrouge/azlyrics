/**
 * @file search.js - Search Function
 * @author ZYROUGE
 * @returns Promise { <pending> }
 */

const axios = require("axios");

module.exports = terms => {
    return new Promise((resolve, reject) => {
        if(!terms || terms.length == 0) reject(`(ParamsError) Parameters was not passed.`);
        if(typeof terms !== "string") reject(`(ParamsError) Parameters must be a string.`);
        axios.get(`https://search.azlyrics.com/search.php?q=${terms}`)
        .then(response => {
            let result = false;
            try {
                const data = response.data;
                result = data.split(`Song results:`)[1].split(`<tr><td class="text-left visitedlyr">`)[1].trim().split(`<a href="`)[1].split(`" target`)[0].trim(); //(`<tr><td class="text-left visitedlyr">`);
                resolve(result);
            } catch (e) {
                reject(`(ResultError) No results was found.`);
            }
        })
        .catch((e) => reject(`(ModuleError) Error occured in Axios.`));
    });
};