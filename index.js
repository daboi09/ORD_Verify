const express = require('express');
// const mysql = require('mysql2');
const { Op } = require('sequelize');
const Criminal = require('./models/Criminal');
const IDflag = require('./models/IDflag');
const Tesseract =  require( 'tesseract.js');
const multer = require('multer');
const handlebars = require('express-handlebars');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const moment = require('moment');
const now = moment();
const upload = multer({ storage: storage })

// Express code section
const app = express()

app.use(express.static('public'));

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main', partialsDir: path.join(__dirname, 'views/partials'),}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/upload', upload.single('image'), (req, res) => {
  Tesseract.recognize(req.file.path, 'eng', { logger: m => console.log(m) })
    .then(({ data: { text } }) => {
      Criminal.findAll({ attributes: ['criminal_name'] })
        .then(criminals => {
          let criminalFound = false;

          criminals.forEach(criminal => {
            if (text.includes(criminal.criminal_name)) {
              console.log("criminal found");
              const msg = "Your name is found in the criminal database";
              res.render('programs/verification_not_ok', { msg });
              criminalFound = true;
            }
          });

          if (!criminalFound) {
            IDflag.findAll({ attributes: ['identification'] })
              .then(id => {
                let isIdentificationSuspected = false;
                id.forEach(identify => {
                  if (text.includes(identify.identification)) {
                    isIdentificationSuspected = true;
                  }
                });
          
                if (isIdentificationSuspected) {
                  const msg = "Your identification is suspected to be stolen or wanted";
                  return res.render('programs/verification_not_ok', { msg });
                } else {
                  res.redirect('/verify_yes');
                }
              })
              .catch(err => {
                // Handle any potential errors from the database query or other issues
                console.error(err);
                res.status(500).send("An error occurred during verification.");
              });
          }
          
        });
    });
});

const mainRoute = require('./routes/main');
app.use('/',mainRoute)

// Bring in database connection
const wantedDB = require('./config/DBConnection');
// Connects to MySQL database
wantedDB.setUpDB(false); // To set up database with new tables set (true)s

  app.listen(5000, () =>{
    console.log("App listening on port 5000")
  })

// notes:
// no need relistic face api, just fake
// have admin panel to crud
// send email
// maybe use id for now
// two seperate screen for face and id
