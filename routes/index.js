const express = require('express');
const markdown = require('markdown').markdown;
const router = express.Router();

const fs = require('fs');
const path = require('path');

const md = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf8');
const html = markdown.toHTML(md);

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: process.env.APP_NAME,
    content: html
  });
});

module.exports = router;
