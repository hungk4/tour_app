// tour-images
const tourImages = document.querySelector(".tour-images");
if(tourImages) {
  const swiper = new Swiper('.swiper', {
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
}
// End tour-images

// alert-add-cart-success
const alertAddCartSucccess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-success]");
  if(elementAlert) {
    elementAlert.classList.remove("alert-hidden");
    setTimeout(() => {
      elementAlert.classList.add("alert-hidden");
    }, 3000);
  }
}
// end alert-add-cart-success

// Gio hang
const cart = localStorage.getItem("cart");
if(!cart){
  localStorage.setItem("cart", JSON.stringify([]));
}
const fromAddToCart = document.querySelector("[form-add-to-cart]");
if(fromAddToCart){
  fromAddToCart.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = fromAddToCart.querySelector("input[name='quantity']");

    const tourId = parseInt(fromAddToCart.getAttribute("tour-id"));
    const value = parseInt(input.value);

    if(tourId && value > 0){
      const cartJS = JSON.parse(localStorage.getItem("cart"));
  
      const existTour = cartJS.find((element) => {
        return element.tourId == tourId
      })
  
      if(existTour){
        existTour.quantity = existTour.quantity + value;
      } else {
        cartJS.push({
          tourId: tourId,
          quantity: value
        })
      }
      
      localStorage.setItem("cart", JSON.stringify(cartJS));

      alertAddCartSucccess();
    }
    
  })
}
// End Gio hang
