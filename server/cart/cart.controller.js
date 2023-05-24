import prisma from "../index.js"
import { LocalStorage} from "node-localstorage"
// import { cookie } from "express/lib/response"

async function Cart (req, resp){
        let admin
        if (req.user.role=="admin"){
                admin=true
        } else{
                admin=false
        }
        // let pizza=req.cookies.pizza
        // let drink=req.cookies.drink

        // let arrayPizza=pizza.replace(/\D/g, " ").split(' ').map(Number).filter(function(item) {
        //         return item !== 0})
        // let arrayDrink=drink.replace(/\D/g, " ").split(' ').map(Number).filter(function(item) {
        //         return item !== 0})
        
        let pizzerias=await prisma.pizzeria.findMany({
               include:{
                      pizza:{
                        select:{id: true}
                      },
                      drink:{
                              select:{id: true}
                      }
               },
        //        where:{
        //                 pizza:{
        //                        some:{
        //                                AND:[{
        //                                        id: arrayPizza[0]
        //                                },
        //                                 {
        //                                         id: arrayPizza[1]
        //                                 }]
        //                        }
        //                 }
        //                 ,
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