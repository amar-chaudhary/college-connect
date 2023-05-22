const storage = require('node-sessionstorage')

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

function checkIsTeacher(req, res, next) {
    storage.setItem('status', req.user.status)
    storage.setItem('u_name', req.user.name)
    storage.setItem('email', req.user.email)
    if (req.user.status === "teacher") {
        return next();
    } else {
        res.redirect("/");
    }
}

function checkIsNotTeacher(req, res, next) {
    storage.setItem('status', req.user.status)
    storage.setItem('u_name', req.user.name)
    storage.setItem('email', req.user.email)
    if (req.user.status !== "teacher") {
        return next();
    } else {
        res.redirect("/trdashboard");
    }
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
    checkIsTeacher,
    checkIsNotTeacher
}