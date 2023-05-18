import AppError from '../errors/AppError.js'

const admin = (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            throw new Error("You don't have administrator rights")
        }
        next()
    } catch (e) {
        res.render("error.hbs",{error: e})
    }
}

export default admin