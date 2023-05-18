import prisma from "../index.js"

async function postPizza (req,resp){
    let ingredients=await prisma.ingredient.findMany()
   resp.render("postPizza.hbs",{
        name: "",
        size: "",
        weight: "",
        price: "",
        image: "",
        ingredient: ingredients,
        ingredientName: ingredients.name
   })
}

async function postDrink (req,resp){
    resp.render("postDrink.hbs",{
        name: "",
        volume: "",
        price: "",
        image: ""
    })
 }


export default {postPizza, postDrink}