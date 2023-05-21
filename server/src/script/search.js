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


var checkboxes = document.querySelectorAll('.checkbox');
console.log(checkboxes)
let enabledSettings = []

let arraybefore=[]
let arrayafter=[]

var checkboxe = document.getElementsByClassName('checkbox');
    for (var index = 0; index < checkboxe.length; index++) {
        if (checkboxe[index].checked) {
            arraybefore.push(+checkboxe[index].value); // положим в массив выбранный
        }
    }

checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    var checkboxes = document.getElementsByClassName('checkbox');
    arrayafter=[]
    // var checkboxesChecked = []; // можно в массиве их хранить, если нужно использовать 
    for (var index = 0; index < checkboxes.length; index++) {
        if (checkboxes[index].checked) {
            arrayafter.push(+checkboxes[index].value); // положим в массив выбранный
        }
    }

    console.log("before",arraybefore)
    console.log("after",arrayafter)
    const arr3 = arraybefore.filter(e=>arrayafter.findIndex(i=>i == e) === -1);

    console.log(arr3)
    let array=[]
    for (let i=0;i<document.querySelectorAll('.pizzaItem').length;i++){
        array.push(document.getElementById(`ingredients${i}`).textContent.replace(/\D/g, " ").split(' ').map(Number).filter(function(item) {
            return item !== 0
        }))
    }
    // const array1=array.filter(arr =>  arr.includes(arr3[0]))
    console.log(array)
    // console.log(array1)
    for (let i=0;i<document.querySelectorAll('.pizzaItem').length;i++){
        if(document.getElementById(`ingredients${i}`).textContent.replace(/\D/g, " ").split(' ').map(Number).filter(function(item) {
            return item !== 0
        }).includes(arr3[arr3.length-1])){
            document.getElementById(`ingredients${i}`).parentElement.style.display = 'none'
        } else {
            document.getElementById(`ingredients${i}`).parentElement.style.display = 'block'
        }
    }
  })
});
