import prisma from "../index.js"
const client=prisma.client
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import AppError from '../errors/appError.js'

const makeJwt = (id, email, role) => {
    return jwt.sign(
        {id,email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

async function signup(req, res, next) {
    const {email, password, role="user"} = req.body
    try {
        if (!email || !password) {
            throw new Error('Inter email and password')
        }
        if (role !== 'user') {
            throw new Error('The role is possible: USER')
        }
        const hash = await bcrypt.hash(password, 5)
        const user = await client.create({data:{email: email, password: hash}})
        const token = makeJwt(user.id, user.email, user.role)
        req.user=user
        res.cookie("token",token)
        res.redirect("/pizza")
    } catch(e) {
        res.render("error.hbs",{error: e})
    }
}

async function login(req, res, next) {
    try {
        const {email, password} = req.body
        // const user = await client.getByEmail(email)
        const user=await client.findFirst({
            where:{
                email:email
            }
        })

        let compare = bcrypt.compareSync(password, user.password)
        if (!compare) {
            throw new Error('Incorrect password')
        }
        const token = makeJwt(user.id, user.email, user.role)
        req.user=user
        res.cookie("token",token)
        res.redirect("/pizza")
    } catch(e) {
        res.render("error.hbs",{error: e})

    }
}

async function logout (req, res, next){
    try {
        res.clearCookie("token")
        res.redirect("/")
    }
    catch (e){
        res.render("error.hbs",{error: e})

    }
}

async function getOne(req, res, next) {
    try {
        if (!req.user.id) {
            throw new Error('No id specified')
        }
        console.log(req.user)

        const user = await client.findUnique({where:{id:req.user.id}})
        res.render("user.hbs",{user: user, email: user.email, role: user.role})
    } catch(e) {
        res.render("error.hbs",{error: e})

    }
}

async function loginPage (req, res, next){
    res.render("login.hbs")
}

async function signUpPage (req, res, next){
    res.render("signUp.hbs")
}

async function index (req, res, next){
    res.render("index.hbs")
}


export default {signup, logout, login,  getOne, loginPage, signUpPage, index}