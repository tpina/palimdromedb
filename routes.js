/**
 * Routes file
 */
function setup(app, handlers) {
  app.get("/api", handlers.api);
  app.get("/api/palindromes", handlers.palindrome.palindromes);
  app.post("/api/isPalindrome", handlers.palindrome.isPalindrome);
}

exports.setup = setup;
