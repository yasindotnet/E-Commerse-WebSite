// Modify the addToCart function to update the cart in local storage
function addToCart(productName, productPrice, productTag) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = cartItems ? JSON.parse(cartItems) : {};

    const existingProduct = cartItems[productTag];

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cartItems[productTag] = {
            name: productName,
            price: productPrice,
            quantity: 1,
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    alert(`${productName} added to cart!`);
    displayCart();
}
function getProductByTag(productTag) {

    const products = {
        'T-shirt': { price: 50.00 },
        'Apple Watch': { price: 350.00 },
        'Adidas Shoes': { price: 250.00 },
        'Puma T-shirt': { price: 80.00 },
        'Puma Shoes':{price:350.00},
        'Red T-shirt':{price:50.00},
        'Hair Cap':{price:40.00},
        'Sunglass':{price:50.00},
        'Wallet':{price:60.00}
    };

    return products[productTag] || { price: 0.00 }; 
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = cartItems ? JSON.parse(cartItems) : {};
    let productContainer = document.getElementById('cart-body');
    let cartTotal = document.getElementById('cart-total');

    if (productContainer) {
        productContainer.innerHTML = '';
        let subtotal = 0;

        Object.entries(cartItems).map(([tag, item]) => {
            const product = getProductByTag(tag);

            productContainer.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>$${(product.price * item.quantity).toFixed(2)}</td>
                    <td><button onclick="deleteItem('${tag}')">Delete</button></td>
                </tr>
            `;

            subtotal += product.price * item.quantity;
        });

        cartTotal.textContent = 'Subtotal: $' + subtotal.toFixed(2);
    }
}

displayCart();
function deleteItem(productTag) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = cartItems ? JSON.parse(cartItems) : {};

    const deletedProduct = cartItems[productTag];

    if (deletedProduct) {
        deletedProduct.quantity--;
        if (deletedProduct.quantity === 0) {
            delete cartItems[productTag];
        }

        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        displayCart();
    }
}


