//get items from local storage in cart page
let cartFromlocalstorage = localStorage.getItem("cart");
let products = JSON.parse(cartFromlocalstorage);


if (products != null) {
  products.forEach(product => {
    
    populateCart(product);
  });
};

//showing the selected items description in cart page

async function populateCart(product) {
     let  Price
  
  
  product.price  = await  fetch('http://localhost:3000/api/products/' + product._id)
        .then(res => res.json())
    .then(data => {
      Price = data.price
      return Price
        });
  console.log('price',product)
    let cartItem = document.getElementById("cart__items");

    let article = document.createElement("article");

    article.className = ("cart__item");
    article.setAttribute('data-id', product._id);
    article.setAttribute('data-color', product.colors);
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
         // console.log(product);

  //console.log(product.price);
    let productPrice = document.createElement("p");
    // productPrice.innerText= product.description;
    productPrice.innerText=product.price ? product.price : Price;

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
  //delteItem.onclick = deletecartItem(delteItem)
  calculateTotals();
    let removeItems = document.querySelectorAll('.deleteItem');

removeItems.forEach(item => {
  item.addEventListener('click', function () {
       //e.preventDefault();
       var id = this.closest("article").dataset.id;
       var color = this.closest("article").dataset.color;
    
       let index = products.findIndex(x => x._id == id && x.colors == color);
    if(index == -1) return true  
    products.splice(index, 1)
    var newCart = products
    
       localStorage.setItem('cart', JSON.stringify(newCart));
    
    // console.log(cart);
         let cartItem = document.getElementById("cart__items");
       cartItem.innerHTML = '';
    products = newCart
    
       newCart.forEach(product => {
         populateCart(product);
         
 });
calculateTotals();

  });
});
calculateTotals();
    // console.log(article);
}

  

// adding click event on orded button
document.getElementById("order").addEventListener("click", function (e) {
  e.preventDefault();
  var formIsvalied =validateinputs();
  
     if (products == null || products.length ==0 ) {
               alert('Your cart is empty')
     }
     else if (formIsvalied == false) {
       return;
  }
     else {
              processForm(e) 
  }
});
let productTosubmit = [];
     // processForm to check user input
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

     //Form Vlaidaton

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
         
      isFormmvalid = false;
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

     // calculate the total products cost
  
function calculateTotals() {
  Alltotal = 0;
  Alluantity = 0;
  if (products.length > 0) {
    products.forEach(product => {


      let total = parseInt(product.price) * parseInt(product.quantity);
      Alltotal += total;
      Alluantity += parseInt(product.quantity);
      document.getElementById('totalQuantity').innerText = Alluantity;
      document.getElementById('totalPrice').innerText = Alltotal;

    });
  } else {
     document.getElementById('totalQuantity').innerText = Alluantity;
      document.getElementById('totalPrice').innerText = Alltotal;
  }
};
 // changing the quantaty and total when user change the quantaty

function qutChange() {
  
     var item = this.closest('article');
     let _id = item.dataset.id;  
     let color = item.dataset.color;  
     let newQut = this.value;
    
     var updatd_product = products.find(x => x._id == _id & x.color == color );
     updatd_product = newQut;
    
     localStorage.setItem('cart', JSON.stringify( products));
     
     calculateTotals();
     
}
let inputs = document.getElementsByClassName('itemQuantity');
for (let i of inputs) {
  i.addEventListener('change', qutChange);
  
}
//////////////Delete Items///////////

  

// function deletecartItem(item) {
//   console.log(item)
//   var id = item.closest("article").dataset.id;
//        var color = item.closest("article").dataset.color;
    
//        let index = products.findIndex(x => x._id == id && x.colors == color);
//        products.splice(index, 1)
//        var newCart = products
//        localStorage.setItem('cart', JSON.stringify(newCart));
   
//          let cartItem = document.getElementById("cart__items");
//        cartItem.innerHTML = '';
//        products = newCart
//        newCart.forEach(product => {
//       populateCart(product);
//  });

//}
          

