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

 async function postPizzeria (req,resp){
    resp.render("postPizzeria.hbs",{
        name: "",
        address: "",
        image: ""
    })
 }


export default {postPizza, postDrink, postPizzeria}