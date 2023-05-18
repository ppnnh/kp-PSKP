async function Delete(){ 
    const id=document.getElementById('id').value;
    const response=await fetch(`/drink/${id}`,{method:'DELETE'});
    window.location.href='/drink'
}