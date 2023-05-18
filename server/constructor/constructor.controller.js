import prisma from "../index.js"
const ingredient=prisma.ingredient

async function getAll (req,resp){
    let ingredients=await ingredient.findMany()
    if (!ingredients){
        resp.render("error.hbs",{error: "Ingredients are not found"})
    }
    else {
        resp.render("constructor.hbs",{data: ingredients, name: ingredients.name, image: ingredients.image,  price: ingredients.price, weight: ingredients.weight})
    }
}

export default {getAll}