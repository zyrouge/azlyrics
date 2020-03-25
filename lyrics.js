let azlyrics;
let readline;
let chalk;
let rl;
let cheerio;
let axios;
try {
    azlyrics = require("./src/index");
    readline = require('readline');
    chalk = require('chalk');
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    cheerio = require("cheerio");
    axios = require("axios");
} catch (e) {
    return console.log(`Dependencies not found! Use "npm i" to install it!`);
}
const credits = `
/***
 *     /$$$$$$$$                                                            
 *    |_____ $$                                                             
 *         /$$/  /$$   /$$  /$$$$$$   /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$ 
 *        /$$/  | $$  | $$ /$$__  $$ /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$
 *       /$$/   | $$  | $$| $$  \__/| $$  \ $$| $$  | $$| $$  \ $$| $$$$$$$$
 *      /$$/    | $$  | $$| $$      | $$  | $$| $$  | $$| $$  | $$| $$_____/
 *     /$$$$$$$$|  $$$$$$$| $$      |  $$$$$$/|  $$$$$$/|  $$$$$$$|  $$$$$$$
 *    |________/ \____  $$|__/       \______/  \______/  \____  $$ \_______/
 *               /$$  | $$                               /$$  \ $$          
 *              |  $$$$$$/                              |  $$$$$$/          
 *               \______/                                \______/           
 */
`;

rl.question(chalk.green('Enter the name of the song: '), async (answer) => {
    if(answer) {
        azlyrics.search(answer)
        .then(link => {
            azlyrics.fetch(link)
            .then(result => {
                console.log(`${chalk.blue.underline('Author:')} ${result.author}`);
                console.log(`${chalk.blue.underline('Lyrics:')}\n${result.lyrics.split("<br>").join("")}`);
                console.log(chalk.green(`Thanks for using me!`));
                console.log(chalk.cyan(credits));
            })
            .catch(e => {
                console.log(`${chalk.red.bgRedBright.underline(`No Lyrics was found!`)}`);
                console.log(chalk.green(`Thanks for using me!`));
                console.log(chalk.cyan(credits));
            });
        })
        .catch(e => {
            console.log(`${chalk.red.bgRedBright.underline(`No Lyrics was found!`)}`);
            console.log(chalk.green(`Thanks for using me!`));
            console.log(chalk.cyan(credits));
        });
    } else {
        console.log(`${chalk.red.bgRedBright.underline(`No song name was provided!`)}`);
        console.log(chalk.green(`Thanks for using me!`));
        console.log(chalk.cyan(credits));
    }
    rl.close();
});
