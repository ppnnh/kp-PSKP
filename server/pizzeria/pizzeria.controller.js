import prisma from "../index.js"
import { v4 as uuidv4 } from 'uuid';
import path from 'path'

const __dirname = path.resolve(path.dirname(''));
const pizzeria=prisma.pizzeria

async function getAll (req,resp){
    let pizzerias=await pizzeria.findMany({
        
    })
    if (!pizzerias){
        resp.render("error.hbs",{error: "Pizzerias are not found"})
    } else{
        resp.render("all.pizzeria.hbs",{data: pizzerias,id: pizzerias.id, name: pizzerias.name, address: pizzerias.address, image: pizzerias.image})
    }
}

async function getUnique (req,resp){
    const id=req.params.id
    let pizzerias=await pizzeria.findUnique({
        where: {
            id: +id
        },
        include: {pizza: true, drink: true}
    })
    if (!pizzerias){
        resp.render("error.hbs",{error: "Pizzeria is not found"})
    } else {
        resp.render("one.pizzeria.hbs",{data: pizzerias,id: pizzerias.id, name: pizzerias.name, address: pizzerias.address, image: pizzerias.image, pizza: pizzerias.pizza, drink: pizzerias.drink })
    }
}

async function addPizzeria (req,resp){
    console.log(req.files)
    console.log(req.body)
    const {image} = req.files
    const fileName = uuidv4() + '.png';
    image.mv(path.resolve(__dirname, '.', 'src/pizzeria', fileName));

    const newPizzeria={
            name: req.body.name,
            address: req.body.address,
            image: `/static/pizzeria/${fileName}`
    }
    let pizzerias=await pizzeria.findFirst({
        where:{
            name: newDrink.name
        }
    })
    
    if (pizzerias){
        resp.render("error.hbs",{error: "Pizzeria is already exist"})
    }
    else {
        await pizzeria.create({
            data:{
                name: newPizzeria.name,
                address: newPizzeria.address,
                image: newPizzeria.image
            }
        })
        resp.redirect(303,"/pizzeria")
    }
}

async function updatePizzeria (req,resp){
    const newPizzeria={
        name: req.body.name,
        address: req.body.address,
        pizza: req.body.pizza
    }
    let pizzerias=await pizzeria.update({
        data:{
            name: newPizzeria.name,
            address: newPizzeria.address,
            pizza:{
                connect: newPizzeria.pizza.map(id=>({
                    id: +id
                }))
            }
        },
        where:{
            id: +req.params.id
        }   
   })
   if (!pizzerias){
        resp.render("error.hbs",{error: "Pizzeria is not updated"})
    } else {
        resp.redirect(303,"../../pizzeria")
    }
}

async function getPizzaToAdd (req,resp){
    let pizzerias=await pizzeria.findMany({
        where: {
            id: +req.params.id
        },
        include: {pizza: true}
    })
    let array=[]
        for (let i=0;i<pizzerias[0].pizza.length;i++){
            array.push(pizzerias[0].pizza[i].id)
        }
        console.log(array)

        let pizzas=await prisma.pizza.findMany({
            where:{
                id:{
                    notIn: array
                }
            }
        })
    if (!pizzerias){
        resp.render("error.hbs",{error: "Pizzerias are not found"})
    } else {
        resp.render("putPizzeria.hbs",{pizzeriaPizza: pizzerias[0].pizza, pizza: pizzas, id: pizzerias[0].id, name: pizzerias[0].name, address: pizzerias[0].address, image: pizzerias[0].image})
    }
}

export default {getAll,getUnique,getPizzaToAdd, updatePizzeria, addPizzeria}