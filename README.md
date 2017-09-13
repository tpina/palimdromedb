# Palindrome Database

Service that stores a number of palindromes. 

A palindrome is a word or phrase/string that reads the same backwards as forwards, independent of spaces and punctuation.

An example could be 'Dammit I'm Mad'.

The service has a simple REST interface that presents two endpoints:

- An endpoint that accepts a string parameter, that will return true if the string is palindrome (and false otherwise) 
- An endpoint that returns a list of the last 10 palindromes the system has received in the last 10 minutes (there is no need to persist the palindromes, it is OK to keep them in memory)

## How to

**Install dependencies**
```bash
yarn
```
In alternative run `npm install`

**Run**
```bash
yarn start
```
In alternative run `npm start`

You should see the folowing message on the console.
```bash
Server started successfully. Waiting for incoming connections to PalindromeDB API...
```

**Run Test Suite**
```bash
yarn test
```
In alternative run `npm test`

**Usage**
- Check the api is running by doing navigating to: `http://localhost:3000/api`

You should get a response like the one below
```json
{
  "message": "PalindromeDB API is up and running"
}
```

- Check the last 10 palindromes the system has received in the last 10 minutes
 - Using postman or other tool of your preference, make a *get* request to: `http://localhost:3000/api/palindromes`
- Check if a string is a palindrome
 - Using postman or other tool of your preference, make a *post* request to: `http://localhost:3000/api/isPalindrome`

_The request body should be_
```json
{
    "toEvaluate": "is this string a palindrome? Nah..."
}
```

***Response Types***
The server always replies with a json object of this format:
```json
{
    "isPalindrome": {
        "originalStr": "tiago",
        "stripped": "tiago",
        "palindrome": false, //true if the string is a palindrome
        "timestamp": 1503346494553
    }
}
```

**Assumptions**
- If a string is not a palindrome it will *not* be stored and therefore won't appear in the `GET http://localhost:3000/api/palindromes` request.
- I'm writing server logs to the console and to log files under a `./log` folder.
- If you request for a palindrome already in the system, its timestamp gets updated.

**Improvments**

Some features were not implemented.

- Improved test coverage. Only created the basic scenarios but did not have time to implement the tests for business logic (`utils.js` file).
- If you don't send the post request in the right format you will see the default error page with the stack trace. A nicer error handling solution should be implemented.
- Add persistence and a scalable caching machanism
