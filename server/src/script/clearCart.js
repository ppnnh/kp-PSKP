function clearCart(){
    localStorage.clear()
    // document.cookie="pizza"+"="+""+";"+'max-age'+"="+"-1"
    // document.cookie="drink"+"="+""+";"+'max-age'+"="+"-1"

    window.location.reload()
}