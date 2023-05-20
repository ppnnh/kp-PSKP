
  window.onload= () => {
    let pizza=localStorage.getItem("pizza")
    let drink=localStorage.getItem("drink")
    let totalPricePizza
    let totalPriceDrink
    let n=0
    let d=0
    if (pizza){
      let pizzaItems=JSON.parse(pizza)
      a="<table><tr><td id='hide'>id</td><td>name</td><td>price</td><td>quantity</td><td>total price</td></tr>"
      for (let i=0;i<pizzaItems.length;i++){
        totalPricePizza=pizzaItems[i].quantity*pizzaItems[i].price

        a+=`<tr><td id='hide'>${pizzaItems[i].id}</td><td>${pizzaItems[i].name}</td><td>${pizzaItems[i].price}</td><td>${pizzaItems[i].quantity}</td><td>${totalPricePizza}</td></tr>`
        
        n+=totalPricePizza
      }
      a+="</table>"
      document.getElementById("pizza").innerHTML=a      
    } else{
      document.getElementById("pizza").innerHTML="There are no pizzas"
    }
    if (drink){
        let drinkItems=JSON.parse(drink)
        a="<table><tr><td id='hide'>id</td><td>name</td><td>price</td><td>quantity</td><td>total price</td></tr>"
        for (let i=0;i<drinkItems.length;i++){
          totalPriceDrink=drinkItems[i].quantity*drinkItems[i].price
  
          a+=`<tr><td id='hide'>${drinkItems[i].id}</td><td>${drinkItems[i].name}</td><td>${drinkItems[i].price}</td><td>${drinkItems[i].quantity}</td><td>${totalPriceDrink}</td></tr>`
          d+=totalPriceDrink
        }
        a+="</table>"
        document.getElementById("drink").innerHTML=a
    } else{
      document.getElementById("drink").innerHTML="There are no drinks"
    }
    document.getElementById("totalPrice").innerHTML=`Total price of cart: ${n+d}`

  
}

async function order(){
  let pizza=JSON.parse(localStorage.getItem("pizza"))
  let drink=JSON.parse(localStorage.getItem("drink"))
  let totalPrice=document.getElementById("totalPrice").innerText.split(" ")[4]

  let orderToPizza=pizza.map(el=>{
    return new Object({
      "B":el.id,
      "quantity":el.quantity,
      "totalPrice":el.price
    })
  })

  let drinkToorder=drink.map(el=>{
    return new Object({
      "A":el.id,
      "quantity":el.quantity,
      "totalPrice":el.price
    })
  })
  let data={
    "orderTopizza":orderToPizza,
    "drinkToorder": drinkToorder,
    "totalPrice": totalPrice
  }
  console.log(JSON.stringify(data))
  fetch("/order",{
    method: "POST",
    headers:{
      "Content-Type":"application/json",

    },
    body: JSON.stringify(data)
  }).then(data=>{
    localStorage.clear()
    document.getElementById("cart").innerHTML="Cart is empty"
  }).catch(err=>{
    console.log(err)
  })
}