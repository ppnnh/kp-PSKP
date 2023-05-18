import prisma from "../index.js"

async function deletePizza (req, resp){
    let pizzas=await prisma.pizza.findUnique({
        where:{
            id: +req.params.id
        }
    })
    if (!pizzas){
        resp.render("error.hbs",{error: "Pizza is not found"})
    } else {
        resp.render("deletePizza.hbs",{
            id: pizzas.id
        })
    }
}

async function deleteDrink (req, resp){
    let drinks=await prisma.drink.findUnique({
        where:{
            id: +req.params.id
        }
    })
    if (!drinks){
        resp.render("error.hbs",{error: "Drink is not found"})
    } else {
        resp.render("deleteDrink.hbs",{
            id: drinks.id
        })
    }
}

export default {deletePizza, deleteDrink}