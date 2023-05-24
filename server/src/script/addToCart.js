function addPizzaToCart(id){
    let children=document.getElementById(`pizzaItem${id}`).children
    let products = [];
    let ids=[]
    if(localStorage.getItem('pizza')){
        products = JSON.parse(localStorage.getItem('pizza'));
    }
    let elId=products.findIndex(el=>el.id==id)
    console.log(elId)
    if (elId!=-1){
        products[elId].quantity+=1
    }else{
        products.push({'id' : id, 'img': children[0].src,'name' : children[1].innerText,'weight':+children[2].innerText.split(" ")[0], 'size':+children[3].innerText.split(" ")[0],'price' : +children[4].innerText.split(" ")[0], "quantity":1});
    }
    localStorage.setItem('pizza', JSON.stringify(products));
    // document.cookie(`id:${}`)
}

function addDrinkToCart(id){
    let children=document.getElementById(`drinkItem${id}`).children
    let products = [];
    if(localStorage.getItem('drink')){
        products = JSON.parse(localStorage.getItem('drink'));
    }
    let elId=products.findIndex(el=>el.id==id)
    console.log(elId)
    if (elId!=-1){
        products[elId].quantity+=1
    }else{
        products.push({'id' : id, 'img':children[0].src, 'name' : children[1].innerText,'volume':+children[2].innerText.split(" ")[0], 'price' : +children[3].innerText.split(" ")[0], "quantity":1});
    }
    localStorage.setItem('drink', JSON.stringify(products));
}