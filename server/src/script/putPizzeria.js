// import {io} from "socket.io-client"

// const notify = document.querySelector("#notification")
// const message = document.querySelector("#message")
const button = document.querySelector("button")
// const header = document.querySelector("#header")

// const socket = io("http://localhost:3001")
// socket.on("response", data => {
//     notify.textContent = data  
//     header.style.backgroundColor = "#3F4E4F"
//     header.style.height = "20px"
// })

// function printMessage(e) {
//     e.preventDefault()
//     socket.emit("message", "Pizza added")
// }

// async function Update(){
//     const children=document.getElementById('count').children;
//     const count=document.getElementById('count').children.length;
//      const data={};
//     for(let i=0;i<count;i++){
//         data[`${children[i].name}`]=`${children[i].value}`;
//     }
//     let idPizza=document.getElementById("selectPizza").value
//     let array=[]
//     array.push(+idPizza)
//     data["pizza"]=array

//     console.log(JSON.stringify(data))

//     let id=document.getElementById("id").value

//     socket.on("response", data => {
//         notify.textContent = data  
//         header.style.backgroundColor = "#3F4E4F"
//         header.style.height = "20px"
//     })

//     printMessage()
//     console.log("ok")
//     fetch(`/pizzeria/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     window.location.href=`/pizzeria/${id}`
// }



async function printMessage(e) {
    e.preventDefault()
    socket.emit("message", "Pizza added")  

    const children=document.getElementById('count').children;
        const count=document.getElementById('count').children.length;
         const data={};
        for(let i=0;i<count;i++){
            data[`${children[i].name}`]=`${children[i].value}`;
        }
        let idPizza=document.getElementById("selectPizza").value
        let array=[]
        array.push(+idPizza)
        data["pizza"]=array
    
        console.log(JSON.stringify(data))
    
        let id=document.getElementById("id").value


        
    fetch(`/pizzeria/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }) 
    window.location.href=`/pizzeria/${id}`

}


button.addEventListener("click", printMessage)