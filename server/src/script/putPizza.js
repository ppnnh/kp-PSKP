async function Update(){
    const children=document.getElementById('count').children;
    const count=document.getElementById('count').children.length;
     const data={};
    for(let i=0;i<count;i++){
        data[`${children[i].name}`]=`${children[i].value}`;
    }
    
    var formBody = [];
    for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    let id=document.getElementById("id").value
    console.log(id)
    fetch(`/pizza/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
    window.location.href='/pizza'
    
}