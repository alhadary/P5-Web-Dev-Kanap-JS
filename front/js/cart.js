let cartFromlocalstorage = localStorage.getItem("cart");
let products = JSON.parse(cartFromlocalstorage);
calculateTotals();
// console.log(cartFromlocalstorage);
if (products != null) {
  products.forEach(product => {
    populateCart(product);
  });
};
function populateCart(product) {

    let cartItem = document.getElementById("cart__items");

    let article = document.createElement("article");

    article.className = ("cart__item");
    article.setAttribute('data-id', product._id);
    article.setAttribute('data-color', product.color);
    cartItem.appendChild(article);

    let imageDev = document.createElement("div");
    imageDev.className = "cart__item__img";
    article.appendChild(imageDev);

    let imgeCart = document.createElement("img");

    imgeCart.setAttribute("src", product.imageUrl);
    imgeCart.setAttribute("alt", product.altTxt);
    imageDev.appendChild(imgeCart);
    // article.appendChild(imgeCart);
    let cartContent = document.createElement("div");
    cartContent.className = 'cart__item__content';
    article.appendChild(cartContent);

    let cartDesc = document.createElement("div");
    cartDesc.className = 'cart__item__content__description';
    cartContent.appendChild(cartDesc);

    let productName = document.createElement("h2");
     productName.innerHTML=product.name;////
    cartDesc.appendChild(productName);

    let productColor = document.createElement("p");
    productColor.innerHTML= product.colors;//
    cartDesc.appendChild(productColor);

    let productPrice = document.createElement("p");
    productPrice.innerText= product.description;
    productPrice.innerHTML=product.price;

    cartDesc.appendChild(productPrice);

    let contentSett = document.createElement("div");
    contentSett.className = 'cart__item__content__settings';
    article.appendChild(contentSett);
    contentSett.appendChild(cartContent);


    let contentQuantity = document.createElement("div");
    contentQuantity.className = 'cart__item__content__settings__quantity';
    contentSett.appendChild(contentQuantity);

    myQte = document.createElement("p");
    myQte.innerText = 'Quantity :';
    contentQuantity.appendChild(myQte);


    cartInput = document.createElement("input");
    // set Attribute for input //
    cartInput.setAttribute('type', 'number');
    cartInput.className = 'itemQuantity';
    contentQuantity.appendChild(cartInput);

      cartInput.setAttribute('name',product.quantity)
     cartInput.setAttribute('name', 'itemQuantity');
     cartInput.setAttribute('min', '1');
     cartInput.setAttribute('name', '100');
    cartInput.setAttribute('value', product.quantity);
    // contentQuantity.appendChild(cartInput);

    let cartDelte = document.createElement("div");
    contentSett.appendChild(cartDelte);
    
    let delteItem = document.createElement("p");
    delteItem.className = 'deleteItem';
    delteItem.innerText = 'Delete';
    cartDelte.appendChild(delteItem);
    

    // console.log(article);
}

            //Form Vlaidaton
document.getElementById("order").addEventListener("click", function (e) {
  e.preventDefault();
  validateinputs()
     if (products == null || products.length ==0) {
               alert('Your cart is empty')
          }else {
              processForm(e) 
          }
});
let productTosubmit = [];

function processForm(e) {                       
    
     let customerInfoTosSUbmit = {
  contact: {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
  },
  products: productTosubmit,
};
  console.log(customerInfoTosSUbmit);
    products.forEach(selectedProudect => {
    productTosubmit.push(selectedProudect._id)
    });
    fetch('http://localhost:3000/api/products/order', {
    method: 'Post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customerInfoTosSUbmit),
  })
    .then(response => response.json())
    .then(data => {
      //  console.log(data)
      sessionStorage.setItem('orderId', data.orderId)
      window.location.href = 'confirmation.html';
    });
};

  function validateinputs() {
    document.getElementById('firstNameErrorMsg').innerText = "";
    document.getElementById('lastNameErrorMsg').innerText = "";
    document.getElementById('addressErrorMsg').innerText = "";
    document.getElementById('addressErrorMsg').innerText = "";
    document.getElementById('cityErrorMsg').innerText = "";
    document.getElementById('emailErrorMsg').innerText = "";

    let isFormmvalid = true;
  
    if (document.getElementById('firstName').value == "") {
      document.getElementById('firstNameErrorMsg').innerText = "Name is empty";
         
      isFormmvalid = true;
    }
    if (document.getElementById('lastName').value == "") {
      document.getElementById('lastNameErrorMsg').innerText = "Last Name is empty";
         
      isFormmvalid = false;
    }
    if (document.getElementById('address').value == "") {
      document.getElementById('addressErrorMsg').innerText = "The address is empty";
         
      isFormmvalid = false;
    }
    if (document.getElementById('city').value == "") {
      document.getElementById('cityErrorMsg').innerText = "The City is empty";
      isFormmvalid = false;
    }
  
    let emailreg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if (!emailreg.test(document.getElementById('email').value)) {
              
      document.getElementById('emailErrorMsg').innerText = "The email address is not correct";
      isFormmvalid = false;
    }
  
    return isFormmvalid;     
    
     
}

     // Calculate totals
  
function calculateTotals() {
  Alltotal = 0;
  Alluantity = 0;
  products.forEach(product => {
    let total = parseInt(product.price) * parseInt(product.quantity);
    Alltotal += total;
    Alluantity += parseInt(product.quantity);
    document.getElementById('totalQuantity').innerText = Alluantity;
    document.getElementById('totalPrice').innerText = Alltotal;

  });
};
//////////////// need more works////
function qutChange() {
  
     var item = this.closest('article');
     let _id = item.dataset.id;  
     let color = item.dataset.color;  
     let newQut = this.value;
    
     var updatd_product = products.find(x => x._id == _id & x.color == color );
     updatd_product = newQut;
    
     localStorage.setItem('cart', JSON.stringify(  products));
     
     calculateTotals();
     
}
let inputs = document.getElementsByClassName('itemQuantity');
for (let i of inputs) {
  i.addEventListener('change', qutChange);
}
//////////////Delete Items///////////

  const removeItems = document.querySelectorAll('.deleteItem');

removeItems.forEach(item => {
  item.addEventListener('click', function handleClick(e) {
       e.preventDefault();
       var id = this.closest("article").dataset.id;
       var color = this.closest("article").dataset.color;
    
       let index = products.findIndex(x => x._id == id && x.color == color);
       products.splice(index, 1)
       var newCart = products
       localStorage.setItem('cart', JSON.stringify(newCart));
   
         let cartItem = document.getElementById("cart__items");
       cartItem.innerHTML = '';
       products = newCart
       newCart.forEach(product => {
      populateCart(product);
 });

calculateTotals();
  });
});

          

