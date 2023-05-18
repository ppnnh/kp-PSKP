import AppError from '../errors/appError.js'

const ErrorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.status).json({message: err.message})
    }
    return         res.render("error.hbs",{error: "Unexcepted error"})

}

export default ErrorHandler