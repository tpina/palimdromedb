//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

let host = 'http://localhost:3000'

chai.use(chaiHttp);

describe('Palindrome', () => {
    /*
     * Test the /GET /api
    */
    describe('/GET /api', () => {
        it('it should GET api health check', (done) => {
            chai.request(host)
                .get('/api')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.equal('PalindromeDB API is up and running')
                    done();
                });
        });
    });

    /*
    * Test the /GET /api/palindromes
    */
    describe('/GET /api/palindromes', () => {
        it('it should GET all the plaindromes - No palindromes exist in the system', (done) => {
            chai.request(host)
                .get('/api/palindromes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.equal('No palindromes are in the system')
                    done();
                });
        });
    });

    /*
    * Tests for the /POST route
    */
    describe('/POST isPalindrome', () => {
        it('it should POST a string to check if is palindrome (true)', (done) => {
            let str = {
                toEvaluate: 'Eye'
            }
            chai.request(host)
                .post('/api/isPalindrome')
                .send(str)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    let respondeBody = res.body.isPalindrome
                    respondeBody.should.have.property('palindrome').eql(true);
                    respondeBody.should.have.property('stripped').eql('eye');
                    done();
                });
        });

        it('it should POST a string to check if is palindrome (false)', (done) => {
            let str = {
                toEvaluate: 'Tiago'
            }
            chai.request(host)
                .post('/api/isPalindrome')
                .send(str)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    let respondeBody = res.body.isPalindrome
                    respondeBody.should.have.property('palindrome').eql(false);
                    respondeBody.should.have.property('stripped').eql('tiago');
                    done();
                });
        });
    });

});