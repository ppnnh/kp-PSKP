async function Delete(){ 
    const id=document.getElementById('id').value;
    const response=await fetch(`/pizza/${id}`,{method:'DELETE'});
    window.location.href='/pizza'
}