// import app from '../index';
const chai = require("chai");
const chaiHttp = require("chai-http");
var app = require("../index");
const assert=require('chai').assert;


chai.use(chaiHttp);
chai.should();

// it("should get all students record", (done) => {
//     chai.request(app)
//         .get('/')
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             done();
//          });
// });
// describe("Students", () => {
    describe("GET /", () => {
        it('status 200',function(){
            chai.request(app)
            .get('/')
            .end((err, res) => {
                            res.should.have.status(200);
                         });
                        });

            it('status 200 get method',function(){
            chai.request(app)
            .get('/users')
            .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                         });
                        });
        
                        
            it('status 201',function(){
                let users = {
                    name: "pavana",
                    email: "pavana@gmail.com"
                }
                chai.request(app)
                .post('/users')
                .send(users)
                .end((err, res) => {
                                res.should.have.status(201);
                                res.body.should.be.a('object');
                                // res.should.have.length(3);
                                if(err!=null){
                                    throw {myError:'throwing error to fail test'}
                                }
                                
                             });
                             
                            });
             });
        
        
    // });



// ----------------------------------------------------------------------------
// const assert=require('chai').assert;
// const app = require('../app');

// describe('App',function(){
//     it('appshould return hello',function(){
//         assert.equal(app(),'hello');
//     });
// });

// ---------------------------------------------------------------------------------------
// app.get('/', (request, response) => {
//     response.json({ info: 'Node.js, Express, and Postgres API' })
//   });

// import chai from 'chai';
// import chaiHttp from 'chai-http';