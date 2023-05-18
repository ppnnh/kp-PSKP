function search() {
    let input = document.getElementById("inputSearch");
    let filter = input.value.toUpperCase();
    let ul = document.getElementById("container");
    let li = ul.getElementsByClassName("pizzaItem");
    let a
    switch (document.getElementById("selectID").value){
        case "name": 
            a=1
            break
        case "weight":
            a=2
            break
        case "size":
            a=3
            break
        case "price":
            a=4
            break
    }
// Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
    for (let i = 0; i < li.length; i++) {
        let aa = li[i].children[a].innerText;
        if (aa.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
document.addEventListener('keyup', search);