var productList = window.localStorage.getItem('product-list');
productList = productList === null || productList === '' ? [] : productList;
productList = productList.length > 0 ? JSON.parse(productList) : [];


var productsCount = 0;
for(var i=0; i<productList.length; i++) {
    productsCount = productsCount + productList[i].count;
}

$('.cart-count p').html(productsCount);

$('#cart').click(function(){

    $('#cart a').attr('href','./checkout.html');
})

$('.logo').click(function(){

    location.assign('./index.html')
})

$('checkout-container').append($('nav-bar'));