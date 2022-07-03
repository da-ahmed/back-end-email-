const express = require('express')
const app = express()
const parkings = require('./parkings.json')
const Mailjet = require('node-mailjet');
const router = express.Router();


//var cors = require('cors')
//const corsOption = {
   // origin: ['http://localhost:3000'],
//};
//app.use(cors(corsOption));


app.get('/emailsend', (req,res) => {
    let subject = req.query.subject;
    let name = req.query.name;
    let body = req.query.body;
    let email = req.query.email

    const mailjet = Mailjet.apiConnect('b6769d2a35e81ed5ac70769d7079b318',
        'cc5a2a38606b8e718f8e372c7699dfd1',
    );

    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "testdevahm@gmail.com",
                        Name: "Mailjet Pilot"
                    },
                    To: [
                        {
                            Email: "ahmedbarkouti@gmail.com",
                            Name: "passenger 1"
                        }
                    ],
                    Subject: subject,
                    TextPart: name,
                    HTMLPart: '<h3>'+name+'/'+email+'</h3>'+'<br/>'+body
                }
            ]
        })


        .then((result) => {
            console.log(result.body,res.body)
            if (true) {
                res.send(200, { message: 'ok' });
            }
        })
        .catch((err) => {
            console.log(err.statusCode)
            if (true) {
                res.send(404, { message: 'not ok ' });
            }
        })





})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})

