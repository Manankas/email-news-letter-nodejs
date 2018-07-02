import * as express from 'express';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';

const app = express();
app.use(express.static(__dirname + '/public'));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'xxx@xxx.com',
        pass: 'xxxx'
    },
    tls: { rejectUnauthorized: false }
});

app.get('/sendmail', function(req, res) {
    ejs.renderFile(__dirname + '/public/test.ejs', { name: 'Tsiry' }, function(err, data) {
        console.log('__dirname ======================>', __dirname);
        if (err) {
            console.log(err);
        } else {
            var mainOptions = {
                from: 'xxxx@xxx.com',
                to: 'tsirymanankasina@gmail.com',
                subject: `TEST HTML`,
                html: data
            };
            console.log('html data ======================>', mainOptions.html);
            transporter.sendMail(mainOptions, function(err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });
        }
    });
    res.send('Message sent');
});

app.listen(8080);
