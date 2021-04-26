var productID = window.location.href.split('=')[1];
var productQuantity;
var productData = null;


$.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + productID, function(responseText) {
    productData = responseText;
    $('#thumbnail').attr('src', responseText.preview)
    $('#product-name').html(responseText.name);
    $('#product-brand').html(responseText.brand);
    $('#description').html(responseText.description);
    $('#product-price').html(responseText.price);

    for(var i=0; i<responseText.photos.length; i++) {
        $('#preview-images').append(PreviewImagesRender(responseText.photos[i], i));
    }
})

function PreviewImagesRender(url, pos) {
    var image = document.createElement('img');
    image.src = url

    if(pos === 0) {
        image.classList.add("active");
    }


    image.onclick = function() {
        $('#preview-images img').removeClass("active")
        image.classList.add("active");
        $('#thumbnail').attr('src', url);
    }

    return image;
}

$("#cart-btn").click(function() {
    
    var productList = window.localStorage.getItem('product-list');
    
    productList = productList === null || productList === '' ? [] : productList;
    productList = productList.length > 0 ? JSON.parse(productList) : [];

   
    console.log(productList);

    var Position = -1;
    for(var i=0; i < productList.length; i++) {
        
        if((productList[i].id) == (productData.id)) {
            Position = i;
        }
    }

    if(Position > -1) {
        productList[Position].count = productList[Position].count + 1;
        console.log(productList[Position].count);
        window.localStorage.setItem('product-list', JSON.stringify(productList));
    } else {
        productData.count = 1;
        productList.push(productData);
        console.log(productList);
        window.localStorage.setItem('product-list', JSON.stringify(productList));
    }

    var totalCount = 0;
    for(var i=0; i<productList.length; i++) {
        totalCount = totalCount + productList[i].count;
    }

    $('.cart-count p').html(totalCount);
});
