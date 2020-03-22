//how do unit test work in express js
//exception handling ....throw....server dies or request gets denied
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const { check, validationResult } = require('express-validator');
var mailer = require('express-mailer');



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
    next();
  });

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mcqueen',
    password: 'shivani123',
    port: 5432,
  })

  mailer.extend(app, {
    from: 'shivaniravi97@gmail.com',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
      user: 'shivaniravi97@gmail.com',
      pass: 'shraavani97'
    }
  });
  
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  
  app.get('/sendmail', (request, response) => { 
    response.status(200).send("Received");
  });

//   app.get('/sendmail', function (req, res, next) {
//     app.mailer.send('email', {
//       to: 'shivani.pr@surya-soft.com', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
//       subject: 'Test Email', // REQUIRED.
//       otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
//     }, function (err) {
//       if (err) {
//         // handle error
//         console.log(err);
//         res.send('There was an error sending the email');
//         return;
//       }
//       res.status(200).send('Email Sent');
//     });
//   });





  app.post('/sendmail', 
  [
    check('email').isEmail(),
  ],
  (request, response) => 
  {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() })
    }
    const { email } = request.body
    pool.query('INSERT INTO send (email) VALUES ($1)', [email], (error, result) => {
      if (error) {
        throw error
      }
    })
    app.mailer.send('email', {
        to: [email], 
        subject: 'Test Email',
        otherProperty: 'Other Property' 
      }, function (err){ 
        if (err) {
          console.log(err);
          response.status(403).send('There was an error sending the email');
          return;
        }
        else{
          response.status(200).send('Email Sent');
        }
       
      });
  });

  module.exports = app.get('/', (request, response) => {
    response.status(200).send("hello");
  });

  module.exports = app.post('/users', [
    check('name').isLength({ min: 3 }),
    check('email').isEmail(),
  ],(request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() })
    }
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  });

   app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
