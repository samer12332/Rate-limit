const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const port = 5000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 min.
    max: 5, //limit each IP to 5 requiest
    message: 'Too many API requests from this IP, please try again after 15 min.'
});

const loginAccountLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 min.
    max: 5, //limit each IP to 5 requiest
    message: 'Try again after 15 min.'
});

//app.use(limiter);
app.use('/api', limiter);

app.get('/api/v1', (req, res) => {
    res.json([
        {
            'id': 1,
            'title': 'NodeJs',
            'description': 'Javascript runtime built on Chrome\'s V8 JavaScript engine'
        }
    ]);
});

app.get('/login', loginAccountLimiter, (req, res) => {
    res.send('Imaginary login form.');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});