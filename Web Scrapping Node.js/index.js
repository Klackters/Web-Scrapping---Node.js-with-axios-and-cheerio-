/* O objetivo desta aplicação é fazer um web scrapping no site da wikipedia, na seção que fala sobre os filmes vencedores do prêmio óscar desde 1929 */

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://pt.wikipedia.org/wiki/Oscar_de_melhor_filme';

async function getMovies() {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const list = [];
    $(".wikitable tbody tr").each((i, elem) => {
        const name = $(elem).find('td[style*="background:#FAEB86"]').last().text().replace("\n", "");
        if(name !== ''){
            const year = $(elem).find('td[style*="background:#FAEB86"]').first().prev('td').text().replace("\n", "").slice(-4);
            movie = { name, year };
            list.push(movie);
        }
    });

    console.log(list);

}

getMovies();