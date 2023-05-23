import prisma from "../index.js"
import { LocalStorage} from "node-localstorage"

async function Cart (req, resp){
        let admin
        if (req.user.role=="admin"){
                admin=true
        } else{
                admin=false
        }
        // let pizza=req.headers.Pizza
        // let drink=req.headers.Drink
        // console.log(pizza)
        // let arrayPizza=[]
        // let arrayDrink=[]
        // let pizzaItems=JSON.parse(pizza)
        // for (let i=0;i<pizzaItems.length;i++){
        //         arrayPizza.push(pizzaItems[i].id)
        // }
        // let drinkItems=JSON.parse(drink)
        // for (let i=0;i<drinkItems.length;i++){
        //         arrayDrink.push(drinkItems[i].id)
        // }
        let pizzerias=await prisma.pizzeria.findMany({
        //        include:{
        //               pizza:{
        //                 select:{id: true}
        //               },
        //               drink:{
        //                       select:{id: true}
        //               }
        //        },
        //        where:{
        //                 pizza:{
        //                         some:{
        //                                 id: {in: arrayPizza}}
        //                 },
        //                 drink:{
        //                         some:{
        //                                 id: {in: arrayDrink}}
        //                 }
        //             }
                
        })
        console.log(pizzerias)
        if (!pizzerias){
                resp.render("error.hbs",{error: "Pizzerias are not found"})
        } else{
                resp.render("cart.hbs",{admin:admin,data: pizzerias,id: pizzerias.id, name: pizzerias.name, address: pizzerias.address, image: pizzerias.image})
                // resp.json(pizzerias)
        }
}

export default {Cart}