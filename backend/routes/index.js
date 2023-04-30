const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const { error } = require('console');


router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken()
    res.cookie('XSRF-TOKEN', csrfToken)
    res.status(200).json({
        'XSRF-TOKEN': csrfToken
    })
})




router.use('/api', apiRouter)

// static Route
// serve react build files in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });

    // server the static assets in the frontend's build folder 
    router.use(express.static(path.resolve("../frontend/build")))

    // serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
          path.resolve(__dirname, '../../frontend', 'build', 'index.html')  
        )
        
    })
}
// fetch('/api/test', {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({ hello: 'world' })
// }).then(res => res.json()).then(data => console.log(data));

// Add a XSRF-TOKEN cookie in development 
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken())
        return res.json({})
    })
}
module.exports = router;