function addPizzaToCart(id){
    let children=document.getElementById(`pizzaItem${id}`).children
    let products = [];
    // let ids=[]
    if(localStorage.getItem('pizza')){
        products = JSON.parse(localStorage.getItem('pizza'));
        // ids=JSON.parse(document.cookie.substring(document.cookie.indexOf("pizza" + "=")).substring(6))
    }
    let elId=products.findIndex(el=>el.id==id)
    console.log(elId)
    if (elId!=-1){
        products[elId].quantity+=1
        // ids.push(id)
    }else{
        // ids.push(id)
        products.push({'id' : id, 'img': children[0].src,'name' : children[1].innerText,'weight':+children[2].innerText.split(" ")[0], 'size':+children[3].innerText.split(" ")[0],'price' : +children[4].innerText.split(" ")[0], "quantity":1});
    }
    localStorage.setItem('pizza', JSON.stringify(products));
    console.log(products)
    // console.log(ids)
    // document.cookie="pizza"+"="+JSON.stringify(ids)
    // console.log(document.cookie)
}

function addDrinkToCart(id){
    let children=document.getElementById(`drinkItem${id}`).children
    let products = [];
    // let ids=[]
    if(localStorage.getItem('drink')){
        products = JSON.parse(localStorage.getItem('drink'));
        // ids=JSON.parse(document.cookie.substring(document.cookie.indexOf("drink" + "=")).substring(6))

    }
    let elId=products.findIndex(el=>el.id==id)
    console.log(elId)
    if (elId!=-1){
        products[elId].quantity+=1
    }else{
        // ids.push(id)
        products.push({'id' : id, 'img':children[0].src, 'name' : children[1].innerText,'volume':+children[2].innerText.split(" ")[0], 'price' : +children[3].innerText.split(" ")[0], "quantity":1});
    }
    localStorage.setItem('drink', JSON.stringify(products));
    // document.cookie="drink"+"="+JSON.stringify(ids)

}