let cartFromlocalstorage = localStorage.getItem("cart");
let products = JSON.parse(cartFromlocalstorage);
// console.log(cartFromlocalstorage);

products.forEach(product => {
      populateCart(product);
 });
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
    

    console.log(article);
}