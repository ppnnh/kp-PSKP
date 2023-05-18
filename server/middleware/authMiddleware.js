import jwt from 'jsonwebtoken'
import cookies from 'js-cookie'
import AppError from '../errors/appError.js'

const auth = (req, res, next) => {
    try {
       const token = req.cookies.token
        if (!token) {
            throw new Error('Autorization required')
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.render("error.hbs",{error: e})
    }
}

export default auth