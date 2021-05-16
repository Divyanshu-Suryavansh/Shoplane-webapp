var checkoutWrapper = $('#checkout-cards-wrapper');
var checkoutSection = $('#checkout-section');
var finalAmount = 0;
var productsOrdered = [];

var productList = window.localStorage.getItem('product-list');

productList = productList ===null|| productList === '' ? [] : productList;
productList = productList.length > 0 ? JSON.parse(productList) : [];

for(i=0;i<productList.length;i++)
{
    console.log(productList[i]);
    createCheckoutCards(productList[i]);
    finalAmount += productList[i].count*productList[i].price;
    var productInfo = {
        id : productList[0].id,
        brand : productList[0].brand,
        name : productList[0].name,
        price : productList[0].price,
        preview : productList[0].preview,
        isAccessory : productList[0].isAccessory
   }
   productsOrdered.push(productInfo);
}

function createCheckoutCards(val){
     
    var checkoutCard = document.createElement('div');
    checkoutCard.className = "checkout-card";
    checkoutWrapper.append(checkoutCard);
    var productImageWrapper = document.createElement('div');
    productImageWrapper.className = "checkout-img-wrapper";
    checkoutCard.appendChild(productImageWrapper);
    var productImage = document.createElement('img');
    productImage.className = "checkout-image";
    productImage.src = val.preview;
    productImage.alt = "checkout-product";
    productImageWrapper.appendChild(productImage);
    var infoWrapper = document.createElement('div');
    infoWrapper.className = "info-wrapper";
    checkoutCard.appendChild(infoWrapper);
    var checkoutProductName = document.createElement('p');
    checkoutProductName.className = "cart-product-name";
    checkoutProductName.innerHTML = val.name;
    infoWrapper.appendChild(checkoutProductName);
    var qtyCostWrapper = document.createElement('div');
    qtyCostWrapper.className = "qty-cost-wrapper";
    infoWrapper.appendChild(qtyCostWrapper);
    var checkoutProductQty = document.createElement('p');
    checkoutProductQty.className = "cart-product-qty";
    checkoutProductQty.innerHTML = "Quantity : " + val.count;
    qtyCostWrapper.appendChild(checkoutProductQty);
    var checkoutProductAmount = document.createElement('p');
    checkoutProductAmount.className = "cart-product-cost";
    checkoutProductAmount.innerHTML = "Rs : " + val.price*val.count;
    qtyCostWrapper.appendChild(checkoutProductAmount);
}

function createFinalValueCard(amount) {

    var finalValueWrapper = document.createElement('div');
    finalValueWrapper.className = "final-value-wrapper";
    checkoutSection.append(finalValueWrapper);
    var finalValueCard = document.createElement('div');
    finalValueCard.className = "final-value-card";
    finalValueWrapper.appendChild(finalValueCard);
    var amountTitle = document.createElement('p');
    amountTitle.className = "amount-title";
    amountTitle.innerHTML = "Total Amount";
    finalValueCard.appendChild(amountTitle);
    var amountValue =  document.createElement('p');
    amountValue.className = "amount-value";
    amountValue.innerHTML = "Amount : Rs " + amount;
    finalValueCard.appendChild(amountValue);
    var placeOrderBtn = document.createElement('button');
    placeOrderBtn.id = "place-order-btn";
    placeOrderBtn.innerHTML = "Place Order";
    finalValueWrapper.appendChild(placeOrderBtn);
}

var amountCard = createFinalValueCard(finalAmount);


var OrderBtn = document.getElementById('place-order-btn');

var orderInfo = {
   amount: finalAmount,
   products: productsOrdered
}

var successMsg = document.getElementById('success-wrapper');


OrderBtn.onclick = function() {

    console.log('click working');
    
    var http = new XMLHttpRequest();
http.open('POST','https://5d76bf96515d1a0014085cf9.mockapi.io/order',true);
http.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

http.onreadystatechange = function(){
if(this.readyState === 4 && http.status == 200)
{
    console.log(http.status);
    location.assign('./confirmation.html');
    localStorage.setItem("response-message","success");
    localStorage.setItem("product-list","");    
}
else
  console.log(http.status);
  location.assign('./confirmation.html');
  localStorage.setItem("response-message","failure"); 
}
http.send(JSON.stringify(orderInfo));
}

