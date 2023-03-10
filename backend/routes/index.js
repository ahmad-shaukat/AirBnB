const express = require('express');
const router = express.Router();
const apiRouter = require('./api')
// const csurf = require('csurf');

// router.get('/hello/world', function(req, res) {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.send('Hello World!');
// });
router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken()
    res.cookie('XSRF-TOKEN', csrfToken)
    res.status(200).json({
        'XSRF-TOKEN': csrfToken
    })
})

// fetch('/api/test', {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({ hello: 'world' })
// }).then(res => res.json()).then(data => console.log(data));
router.use('/api', apiRouter)
module.exports = router;