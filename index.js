var cardWrapper = document.getElementById('card-wrapper');

var bannerImages = ["https://imgur.com/96OnkX7.png", "https://imgur.com/KtGxwnN.png", "https://imgur.com/sfjg9R8.png", "https://imgur.com/p0wdadG.png"];

var rightNav = document.getElementById('right-nav');
var leftNav = document.getElementById('left-nav');
var bannerImage = document.getElementById('banner-image');
var currentImage = bannerImages[0];

var position=-1;

rightNav.onclick = navigateToRight;
leftNav.onclick = navigateToLeft;


function navigateToLeft(){
    for(i=0;i<bannerImages.length;i++)
    {
        if(bannerImage.src == bannerImages[i])
        {
           if(i == 0)
           {
               position = bannerImages.length-1;
           } 
           else
               position = i-1;
        }
        
    }
    bannerImage.src = bannerImages[position];
}

function navigateToRight(){
    for(i=0;i<bannerImages.length;i++)
    {
        if(bannerImage.src == bannerImages[i])
        {
           if(i == bannerImages.length-1)
           {
               position = 0;
           } 
           else
               position = i+1;
        }
        
    }
    bannerImage.src = bannerImages[position];
}

var imageAutoChange = setInterval(navigateToRight, 5000);


var imageNav = document.getElementsByClassName('nav-container');
var imageContainer = document.getElementsByClassName('image-container');
imageContainer[0].onmouseover = function(){
    imageNav[0].style.display = "flex";
}

imageContainer[0].onmouseout = function(){
    imageNav[0].style.display = "none";
}

var productRender = new XMLHttpRequest();
productRender.open("GET","https://5d76bf96515d1a0014085cf9.mockapi.io/product",true);
productRender.onreadystatechange = function() {
    
    console.log(this.readyState);
    if(this.readyState === 4) {
        try{
            console.log(this.readyState)
            var productCardDetails = JSON.parse(this.responseText);
            for(i=0;i<productCardDetails.length;i++)
            {
                renderProductCard(productCardDetails[i].preview, productCardDetails[i].name, productCardDetails[i].brand, productCardDetails[i].price, productCardDetails[i].isAccessory,productCardDetails[i].id);
            }
        }
        catch(e){
            console.log(e)
        }
    }
}
productRender.send();

var productCardWrapper = document.getElementById('clothing-card-wrapper');
var accessoryCardWrapper = document.getElementById('accessory-card-wrapper');
var productCard = renderProductCard;

function renderProductCard(image, name, brand, price, isaccessory,productId)
{
    var productWrapper = document.createElement('div');
    productWrapper.className = "product-card";
    var cardImageWrapper = document.createElement('a');
    cardImageWrapper.id = productId;
    cardImageWrapper.className = "card-image-wrapper";
    cardImageWrapper.href = "./product.html?=" + productId;
    var cardImage = document.createElement('img');
    cardImage.className = "card-image";
    cardImage.src = image;
    cardImageWrapper.appendChild(cardImage);
    var cardDescription = document.createElement('div');
    cardDescription.className = "card-description";
    var productName = document.createElement('p');
    productName.className = "product-name desc-style";
    productName.innerText = name;
    cardDescription.appendChild(productName);
    var productBrand = document.createElement('p');
    productBrand.className = "product-brand desc-style";
    productBrand.innerHTML = brand;
    cardDescription.appendChild(productBrand);
    var productPrice = document.createElement('p');
    productPrice.className = "product-price desc-style";
    productPrice.innerHTML = "Rs " + price;
    cardDescription.appendChild(productPrice);

    productWrapper.appendChild(cardImageWrapper);
    productWrapper.appendChild(cardDescription);

    if(isaccessory === false)
       productCardWrapper.appendChild(productWrapper);  
    else
       accessoryCardWrapper.appendChild(productWrapper);

}

