const news = require('gnews');
const terminalLink = require('terminal-link');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



const main = async () => {
 
  rl.question("What news should I search for? (hit enter for the latest 10 headlines): ", function(searchTerm) {
    
    if(searchTerm == undefined || ! searchTerm) {
      showHeadlines()
      rl.close();
      return
    }

    rl.question("How many results should I show? ", function(resultNumber) {    
      newsSearch(`${searchTerm}`, `${resultNumber}`)
      rl.close();
    });
    
  });


  rl.on("close", function() {
    //console.log("\nGoodbye citizen.");
    //process.exit(0);
  }); 
  //results.forEach(print);
};

const showHeadlines = async () => {
  console.log('Headlines');
  const heads = await news.headlines({n : 10});
  for (let article of heads) {
    const link = terminalLink(article.pubDate + " : " + article.title, article.link);
    console.log(link);
  }
  process.exit(0);
}

const newsSearch = async (searchTerm, resultNumber) => {
    var theNum = resultNumber
    if(!resultNumber) {
      theNum = 10
    }
    const results = await news.search(`${searchTerm}`, {n : theNum});
    var count = 1
    for (let article of results) {
      const link = terminalLink(count.toString().padStart(resultNumber.toString().length, "0") + ") " + article.pubDate + " : " + article.title, article.link);
      console.log(link);
      count += 1
    }
}
main();