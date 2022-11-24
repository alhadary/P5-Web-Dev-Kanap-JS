
let urlParams = new URLSearchParams(window.location.search);
let idParam = urlParams.get('id');
// console.log(idParam);
//  console.log('test');
fetch('http://localhost:3000/api/products/' + idParam)
    .then(res => res.json())
    .then(data => {

        // let itemImage = document.getElementsByClassName("item__img")[0].getElementsByTagName('img');
        let itemImage = document.getElementsByClassName("item__img")[0].getElementsByTagName('img');

        // console.log(itemImage)
        itemImage[0].setAttribute('src', data.imageUrl);
        itemImage[0].setAttribute('alt', data.altTxt);
        

        let itemPrice = document.getElementById('price');
        itemPrice.innerHTML = data.price;

        let itemName = document.getElementById('title');
        itemName.innerHTML = data.name;

        let itemDescription = document.getElementById('description');
        itemDescription.innerHTML = data.description;

        let itemColor = document.getElementById('colors');
        for (i = 0; i <= data.colors.length; i++) {
            let selectOption = document.createElement('option');
            // selectOption.value = data.colors[i];
            selectOption.textContent = data.colors[i];
            itemColor.appendChild(selectOption);
        }

        let itemQuantity = document.getElementById('quantity');

        document.getElementById('addToCart').addEventListener('click', function () {
            if ((itemColor.value == "") || (itemQuantity.value == 0)) {
                // let alertMsg = document.getElementsByClassName('item__content__settings__quantity');
                alert('please select color and quantity');
            } else {

                let selectProudect = data;
                let itemColor = document.getElementById('colors').value;
                let itemQuantity = document.getElementById('quantity').value;

                selectProudect.quantity = itemQuantity;
                selectProudect.colors = itemColor;
            
                if (localStorage.getItem('cart') != null) {
                    let cart = JSON.parse(localStorage.getItem('cart'));
                    ////
                    let index = cart.findIndex(x => x._id == selectProudect._id && x.colors == selectProudect.colors)
                    if (index == -1) {
                        cart.push(selectProudect);

                        localStorage.setItem('cart', JSON.stringify(cart));
                    } else {
                        cart[index].quantity = parseInt(cart[index].quantity) + parseInt(selectProudect.quantity)
                        localStorage.setItem('cart', JSON.stringify(cart));
                    }
                    // cart.push(selectProudect);
                    // localStorage.setItem('cart', JSON.stringify(cart));
            
                } else {
                    localStorage.setItem('cart', JSON.stringify([selectProudect]));
                }
            }
        })
        });

       
       
        

  
    
