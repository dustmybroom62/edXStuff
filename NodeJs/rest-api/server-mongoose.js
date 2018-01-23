const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/edx-course-db')

const Account = mongoose.model('Account',
    {
        name: String,
        balance: Number
    }
);

let app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

app.get('/accounts', (req, res) => {
    Account
        .find((err, accounts) => {
            if (err) res.status(500).send(err);
            else res.status(200).send(accounts);
        });
});

app.post('/accounts', (req, res) => {
    let newAccount = new Account(req.body);
    newAccount.save((err) => {
        if (err) res.status(500).send(err);
        else res.status(201).send(newAccount);
    });
});

app.put('/accounts/:id', (req, res) => {
    let changes = req.body;
    //Account
    //    .findById(req.params.id, (err, found) => {
    //        if (err) res.status(500).send(err);
    //        else if (null == found) res.status(404).send();
    //        else {
    //            found.update(changes, (err, raw) => {
    //                if (err) res.status(500).send(err);
    //                else res.status(200).send(raw);
    //            });
    //        }
    //    });

    Account.findByIdAndUpdate(req.params.id, changes, (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(result);
    });
});

app.delete('/accounts/:id', (req, res) => {
    //Account
    //    .findById(req.params.id, (err, found) => {
    //        if (err) res.status(500).send(err);
    //        else if (null == found) res.status(404).send();
    //        else {
    //            found.remove((err, product) => {
    //                if (err) res.status(500).send(err);
    //                else res.status(204).send();
    //            });
    //        }
    //    });

    Account.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) res.status(500).send(err);
        else res.status(204).send(result);
    });
});

app.listen(3000);

