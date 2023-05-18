window.onload=function removeDummy() {
    var elem = document.getElementById('menu');
    elem.parentNode.removeChild(elem);
    return false;
}