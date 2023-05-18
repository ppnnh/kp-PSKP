import prisma from "../index.js"
import { v4 as uuidv4 } from 'uuid';
import path from 'path'
const __dirname = path.resolve(path.dirname(''));
const pizza=prisma.pizza

async function getAll (req,resp){
    let pizzas=await pizza.findMany()
    if (!pizzas){
        resp.render("error.hbs",{error: "Pizzas are not found"})
    }
    else {
        resp.render("all.pizzas.hbs",{data: pizzas,id: pizzas.id, name: pizzas.name, image: pizzas.image, size: pizzas.size, price: pizzas.price, weight: pizzas.weight})
    }
}

async function getUnique (req,resp){
    const id=req.params.id
    let pizzas=await pizza.findUnique({
        include: {
            ingredient: true
        },
        where: {
            id: +id
        }
    })
    if (!pizzas){
        resp.render("error.hbs",{error: "Pizza is not found"})
    }
    else {
        resp.render("one.pizza.hbs",{data: pizzas,id: pizzas.id, name: pizzas.name, image: pizzas.image, size: pizzas.size, price: pizzas.price, weight: pizzas.weight, ingredient:pizzas.ingredient})
    }
}

async function addPizza (req,resp){
    console.log(req.body)
    console.log(req.files)
    var clone = Object.assign({},req.body)
    delete clone.name
    delete clone.weight
    delete clone.size
    delete clone.price
    delete clone.image
    console.log(clone)

    const {image} = req.files
    const fileName = uuidv4() + '.png';
    image.mv(path.resolve(__dirname, '.', 'src/pizza', fileName));

    const ingredient=Object.keys(clone).map(function(k){return +clone[k]});
    console.log(ingredient)
    const newPizza={
            name: req.body.name,
            size: +req.body.size,
            weight: +req.body.weight,
            price: +req.body.price,
            image: `/static/pizza/${fileName}`,
            ingredient: req.body.ingredient
    }
    let pizzas=await pizza.findFirst({
        where:{
            name: newPizza.name
        }
    })
    if (pizzas){
        resp.render("error.hbs",{error: "Pizza is already exist"})
    }
    else {
        await pizza.create({
            data:{
                name: newPizza.name,
                size: +newPizza.size,
                weight: +newPizza.weight,
                price: +newPizza.price,
                image: newPizza.image,
                ingredient:{
                    connect: ingredient.map(id => ({
                        id: +id,
                    })),
                }
        },
        })
        resp.redirect(303,"/pizza")
    }
}

async function updatePizza (req,resp){
    const newPizza={
        name: req.body.name,
        size: +req.body.size,
        weight: +req.body.weight,
        price: +req.body.price
        // ,ingredient: req.body.ingredient
    }
    let pizzas=await pizza.update({
        data:{
            name: newPizza.name,
            size: +newPizza.size,
            weight: +newPizza.weight,
            price: +newPizza.price
            // ,ingredient:{
            //     set: newPizza.ingredient.map(id=>({
            //         id: +id
            //     }))
            // }
        },
        where:{
            id: +req.params.id
        }   
   })
   
    if (!pizzas){
        resp.render("error.hbs",{error: "Pizza is not updated"})
    } else {
        resp.redirect(303,"../../pizza")
    }
}

async function deletePizza (req,resp){
    let pizzas=await pizza.delete({
        where: {
            id: +req.params.id
        }
    })
    if (!pizzas){
        resp.render("error.hbs",{error: "Pizza is not found"})
    } else{
        resp.redirect(303,"/pizza")
    }
}

export default {getAll,getUnique,addPizza,updatePizza,deletePizza}