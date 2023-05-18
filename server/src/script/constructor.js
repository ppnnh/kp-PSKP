let totalPrice=5
let totalWeight=100


function insertIngredient(e){
    let ingredient=e.getAttribute("class")
    let tag=document.createElement("img")
    tag.src=`/static/ingredient/${ingredient}.png`
    tag.id=`${ingredient}`
    tag.style="position:absolute"
    tag.width="300"
    let sauce=document.getElementById(`Sauce`)
    let cheese=document.getElementById(`Cheese`)
    if (document.getElementById(`${ingredient}`)==undefined && sauce==undefined && cheese==undefined){
        base.after(tag)
        totalPrice+=parseFloat(document.getElementById(`price ${ingredient}`).textContent)
        totalWeight+=parseFloat(document.getElementById(`weight ${ingredient}`).textContent)
    
        totalPrice=Number(totalPrice.toFixed(1))
        document.getElementById("totalPrice").innerHTML=`Price: ${totalPrice}`
        document.getElementById("totalWeight").innerHTML=`Weight: ${totalWeight}`
    } else if (document.getElementById(`${ingredient}`)==undefined && sauce!==undefined && cheese==undefined){
        sauce.after(tag)
        totalPrice+=parseFloat(document.getElementById(`price ${ingredient}`).textContent)
        totalWeight+=parseFloat(document.getElementById(`weight ${ingredient}`).textContent)
        totalPrice=Number(totalPrice.toFixed(1))

    
        document.getElementById("totalPrice").innerHTML=`Price: ${totalPrice}`
        document.getElementById("totalWeight").innerHTML=`Weight: ${totalWeight}`
    } else if (document.getElementById(`${ingredient}`)==undefined && ingredient=="Sauce"){
        cheese.before(tag)
        totalPrice+=parseFloat(document.getElementById(`price ${ingredient}`).textContent)
        totalWeight+=parseFloat(document.getElementById(`weight ${ingredient}`).textContent)
        totalPrice=Number(totalPrice.toFixed(1))

    
        document.getElementById("totalPrice").innerHTML=`Price: ${totalPrice}`
        document.getElementById("totalWeight").innerHTML=`Weight: ${totalWeight}`
    } else if(document.getElementById(`${ingredient}`)==undefined){
        cheese.after(tag)
        totalPrice+=parseFloat(document.getElementById(`price ${ingredient}`).textContent)
        totalWeight+=parseFloat(document.getElementById(`weight ${ingredient}`).textContent)
        totalPrice=Number(totalPrice.toFixed(1))

    
        document.getElementById("totalPrice").innerHTML=`Price: ${totalPrice}`
        document.getElementById("totalWeight").innerHTML=`Weight: ${totalWeight}`
    }

   
}

function deleteIngredient(e){
    let ingredient=e.getAttribute("class")

    let tag=document.getElementById(`${ingredient}`)
    if (tag==undefined){
    } else {
        tag.remove()

        totalPrice-=parseFloat(document.getElementById(`price ${ingredient}`).textContent)
        totalWeight-=parseFloat(document.getElementById(`weight ${ingredient}`).textContent)

        document.getElementById("totalPrice").innerHTML=`Price: ${totalPrice}`
        document.getElementById("totalWeight").innerHTML=`Weight: ${totalWeight}`
    }

    
}
