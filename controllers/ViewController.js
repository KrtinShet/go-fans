const catchAsync = require('../utils/catchAsync');


exports.getHomePage = catchAsync(async (req, res, next) => {
    res.render('home.ejs', { title: "Home" })
    // res.send('index')
    // res.render('index.ejs')
});

exports.NotFound = catchAsync(async (req, res, next) => {
    res.render('404.ejs', { title: "404" })
});