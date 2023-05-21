import prisma from "../index.js"

async function Cart (req, resp){
        let admin
        if (req.user.role=="admin"){
                admin=true
        } else{
                admin=false
        }
        let pizzerias=await prisma.pizzeria.findMany({
                
        })
        if (!pizzerias){
                resp.render("error.hbs",{error: "Pizzerias are not found"})
        } else{
                resp.render("cart.hbs",{admin:admin,data: pizzerias,id: pizzerias.id, name: pizzerias.name, address: pizzerias.address, image: pizzerias.image})

        }
}

export default {Cart}