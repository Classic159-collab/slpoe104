let stock = {
    chaos: 100,
    divine: 50,
    exalted: 30,
    mirror: 5
};

let cart = {};

function addToCart(currency, name, price) {
    if (stock[currency] > 0) {
        if (!cart[currency]) {
            cart[currency] = { name: name, price: price, quantity: 0 };
        }
        cart[currency].quantity++;
        updateCartUI();
    } else {
        alert("สินค้าไม่เพียงพอ!");
    }
}

function removeFromCart(currency) {
    if (cart[currency] && cart[currency].quantity > 0) {
        cart[currency].quantity--;
        if (cart[currency].quantity === 0) {
            delete cart[currency];
        }
        updateCartUI();
    }
}

function updateCartUI() {
    let cartList = document.getElementById("cart-list");
    let totalPrice = document.getElementById("total-price");
    cartList.innerHTML = "";
    let total = 0;

    for (let key in cart) {
        let item = document.createElement("li");

        let minusButton = document.createElement("button");
        minusButton.innerText = "➖";
        minusButton.onclick = () => removeFromCart(key);

        let plusButton = document.createElement("button");
        plusButton.innerText = "➕";
        plusButton.onclick = () => addToCart(key, cart[key].name, cart[key].price);

        item.innerText = `${cart[key].name} x ${cart[key].quantity} (฿${(cart[key].price * cart[key].quantity).toFixed(2)})`;
        total += cart[key].price * cart[key].quantity;

        item.prepend(minusButton);
        item.append(plusButton);
        cartList.appendChild(item);
    }

    totalPrice.innerText = total.toFixed(2);
}

function checkout() {
    for (let key in cart) {
        if (stock[key] >= cart[key].quantity) {
            stock[key] -= cart[key].quantity;
            document.getElementById(key + "_stock").innerText = stock[key];

            let logMessage = `🕒 ${new Date().toLocaleTimeString()} - ซื้อ ${cart[key].quantity} ${cart[key].name} รวม ${cart[key].quantity * cart[key].price} บาท`;
            addTransaction(logMessage);
        } else {
            alert(`สินค้า ${cart[key].name} ไม่พอ!`);
            return;
        }
    }
    cart = {};
    updateCartUI();
}

function addTransaction(message) {
    let historyList = document.getElementById("transaction-history");
    let listItem = document.createElement("li");
    listItem.innerText = message;
    historyList.prepend(listItem);

    while (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastChild);
    }
}
