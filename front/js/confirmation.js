
//displaying the order number in conformation page and clear the localstorge

let confirm = document.getElementsByClassName('confirmation');

let itemID = sessionStorage.getItem('orderId');

let orderConfirm = document.getElementById('orderId');

orderConfirm.innerHTML = itemID;

console.log(orderConfirm);

sessionStorage.clear();

window.localStorage.clear('cart');

