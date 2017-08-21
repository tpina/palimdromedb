var winston = require('winston');
var Utils = require('../utils');

var PalindromHandler = function () {
  this.palindromes = handlePalindromeList;
  this.isPalindrome = handleIsPalindromeRequest;
};

var existingPalindromes = new Map();

function handlePalindromeList(req, res) {
  winston.log(
    'info',
    'List all palindromes in the system. ' +
    'Request from address ' +
    req.connection.remoteAddress +
    '.'
  );
  if (existingPalindromes.size === 0) {
    res.status(200).json({ message: 'No palindromes are in the system' });
  } else {
    res.status(200).json(Utils.getLatestPalindromes(existingPalindromes));
  }
}

function handleIsPalindromeRequest(req, res) {
  winston.log(
    'info',
    'Check if [' +
    req.body.toEvaluate +
    '] is palindrome. ' +
    'Request from address ' +
    req.connection.remoteAddress +
    '.'
  );
  let toEvaluate = req.body.toEvaluate;
  let result = Utils.isPalindrome(toEvaluate);
  if (result.palindrome && !existingPalindromes.has(result.stripped))
    existingPalindromes = Utils.storePalindrome(existingPalindromes, result);
  res.send({ isPalindrome: result });
}

module.exports = PalindromHandler;
