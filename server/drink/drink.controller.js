import prisma from "../index.js"
import { v4 as uuidv4 } from 'uuid';
import path from 'path'

const __dirname = path.resolve(path.dirname(''));
const drink=prisma.drink

async function getAll (req,resp){
    let admin
    if (req.user.role=="admin"){
        admin=true
    } else{
        admin=false
    }
    let drinks=await drink.findMany()
    if (!drinks){
        resp.render("error.hbs",{error: "Drinks are not found"})
    }
    else {
        resp.render("all.drink.hbs",{admin: admin,data: drinks,id: drinks.id, name: drinks.name, image: drinks.image, volume: drinks.volume, price: drinks.price})
    }
}

async function getUnique (req,resp){
    let admin
    if (req.user.role=="admin"){
        admin=true
    } else{
        admin=false
    }
    const id=req.params.id
    let drinks=await drink.findUnique({
        where: {
            id: +id
        }
    })
    if (!drinks){
        resp.render("error.hbs",{error: "Drink is not found"})
    }
    else {
        resp.render("one.drink.hbs",{admin: admin,data: drinks,id: drinks.id, name: drinks.name, image: drinks.image, price: drinks.price, volume: drinks.volume})
    }
}

async function addDrink (req,resp){
    console.log(req.files)
    console.log(req.body)
    const {image} = req.files
    const fileName = uuidv4() + '.png';
    image.mv(path.resolve(__dirname, '.', 'src/drink', fileName));

    const newDrink={
            name: req.body.name,
            volume: +req.body.volume,
            price: +req.body.price,
            image: `/static/drink/${fileName}`
    }
    let drinks=await drink.findFirst({
        where:{
            name: newDrink.name
        }
    })
    
    if (drinks){
        resp.render("error.hbs",{error: "Drink is already exist"})
    }
    else {
        await drink.create({
            data:{
                name: newDrink.name,
                volume: +newDrink.volume,
                price: +newDrink.price,
                image: newDrink.image
            }
        })
        resp.redirect(303,"/drink")
    }
}

async function updateDrink (req,resp){
    const newDrink={
        name: req.body.name,
        volume: +req.body.volume,
        price: +req.body.price
    }
    let drinks=await drink.update({
        data:{
            name: newDrink.name,
            volume: +newDrink.volume,
            price: +newDrink.price
        },
        where:{
            id: +req.params.id
        }   
   })

    if (!drinks){
        resp.render("error.hbs",{error: "Drink is not updated"})
    } else {
        resp.redirect(303,"../../drink")
    }
}

async function deleteDrink (req,resp){
    let drinks=await drink.delete({
        where: {
            id: +req.params.id
        }
    })
    if (!drinks){
        resp.render("error.hbs",{error: "Drink is not found"})
    } else {
        resp.redirect(303, "/drink")
    }
}

export default {getAll,getUnique,addDrink,updateDrink,deleteDrink}