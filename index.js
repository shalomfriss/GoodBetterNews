#!/usr/bin/env node

//Kudos: https://github.com/DatanewsOrg/google-news-js
//https://github.com/sindresorhus/terminal-link
const readline      = require("readline");
const shell         = require("shelljs");
const program       = require("commander");
const chalk         = require("chalk");
const boxen         = require("boxen");
const { showHeadlines } = require('./lib/search');

const { runPrompt, TOPICS } = require('./lib/questions');


const HEADLINES_RSS = 'https://news.google.com/news/rss';
const TOPICS_RSS    = 'https://news.google.com/news/rss/headlines/section/topic/';
const GEO_RSS       = 'https://news.google.com/news/rss/headlines/section/geo/';
const SEARCH_RSS    = 'https://news.google.com/rss/search?q=';

program.version('1.0.0');
program.option('-n, --headlines <num>', 'Show top n headlines');
program.parse(process.argv);

if(program.headlines) {
  showHeadlines(program.headlines);
  return  
}

const handleEscKeypress = () => {
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => {
    if (chunk === '\u001b') {
      process.exit(0);
    }
  });
};

handleEscKeypress();
runPrompt();

