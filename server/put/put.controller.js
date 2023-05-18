import prisma from "../index.js"
async function putPizza (req,resp){
    let pizzas=await prisma.pizza.findUnique({
        where:{
            id: +req.params.id
        }
    })
   resp.render("putPizza.hbs",{
        id: pizzas.id,
        name: pizzas.name,
        size: pizzas.size,
        weight:pizzas.weight,
        price: pizzas.price,
        image: pizzas.image
   })
}

async function putDrink (req,resp){
    let drinks=await prisma.drink.findUnique({
        where:{
            id: +req.params.id
        }
    })
    resp.render("putDrink.hbs",{
        id: drinks.id,
        name: drinks.name,
        volume: drinks.volume,
        price: drinks.price,
        image: drinks.image
    })
 }


export default {putPizza, putDrink}