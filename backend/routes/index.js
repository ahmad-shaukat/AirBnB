const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const { error } = require('console');
router.use('/api', apiRouter)


// router.get('/api/csrf/restore', (req, res) => {
//     const csrfToken = req.csrfToken()
//     res.cookie('XSRF-TOKEN', csrfToken)
//     res.status(200).json({
//         'XSRF-TOKEN': csrfToken
//     })
// })





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

if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken())
        return res.json({})
    })
}
module.exports = router;