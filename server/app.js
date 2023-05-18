import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import prisma from "./index.js"
import cors from "cors"
import fileUpload from "express-fileupload"


import errorHandler from "./middleware/errorHandler.js"

import jwtRoutes from "./jwt/jwt.routes.js"

import pizzaRoutes from "../server/pizza/pizza.routes.js"
import pizzeriaRoutes from "../server/pizzeria/pizzeria.routes.js"
import constructorRoutes from "../server/constructor/constructor.routes.js"
import drinkRoutes from "../server/drink/drink.routes.js" 
import cartRoutes from "../server/cart/cart.routes.js"
import orderRoutes from "../server/order/order.routes.js"

import postRoutes from "../server/post/post.routes.js"
import putRoutes from "../server/put/put.routes.js"
import deleteRoutes from "../server/delete/delete.routes.js"

let app=express()

import expressHbs from "express-handlebars"
import hbs from "hbs"


async function main(){
    app.engine("hbs", expressHbs.engine(
        {
            layoutsDir: "./views/layouts", 
            defaultLayout: "main",
            extname: "hbs",
            helpers: {
                logout: () => {
                    return '<a href="/logout" onclick="clearCart()">logout</a>';
                },
            }
        },
    ))
    app.set("view engine", "hbs");
    app.use(express.json())
    app.use(fileUpload());
    app.use(bodyParser())
    app.use(cors())
    hbs.registerPartials("./views/partials");
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(cookieParser());
    app.use("/static", express.static("src"));

    app.use("/pizza",pizzaRoutes)
    app.use("/drink",drinkRoutes)
    app.use("/pizzeria",pizzeriaRoutes)
    app.use("/constructor",constructorRoutes)
    app.use("/cart",cartRoutes)
    app.use("/order",orderRoutes)

    app.use("/post",postRoutes)
    app.use("/update",putRoutes)
    app.use("/delete",deleteRoutes)

    app.use("/",jwtRoutes)
    

    app.use(errorHandler)

    app.listen(3000)
}
main()
.then(async ()=>{await prisma.$disconnect()})
.catch(async e=>{
    console.log(e)
    await prisma.$disconnect()
})

