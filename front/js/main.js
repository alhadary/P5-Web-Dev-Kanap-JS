fetch(`http://localhost:3000/api/products`)
    .then(Response => Response.json())
    .then(data => displayProducts(data));
     console.log(data);
function displayProducts(data) {
    
    let myItems = document.getElementById('items');
    for (let i = 0; i < data.length; i++) {

        let product = document.createElement('a');
        product.setAttribute("href", `./product.html?id=${data[i]._id}`);

        let article = document.createElement('article');
        product.appendChild(article);

        let productImage = document.createElement("img");
        productImage.setAttribute("src", data[i].imageUrl);
        productImage.setAttribute("alt", data[i].altTxt);
        article.appendChild(productImage);

        let productName = document.createElement("h3");
        productName.innerText = data[i].name;
        article.appendChild(productName);

        let productDescripion = document.createElement("p");
        productDescripion.innerText = data[i].description;
        article.appendChild(productDescripion);

        myItems.appendChild(product);
        // console.log(product);

    }

   

}
