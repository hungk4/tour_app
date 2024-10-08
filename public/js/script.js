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

const showMiniCart = () => {
  const miniCart = document.querySelector("span[mini-cart]");
  if(miniCart){
    const cart = JSON.parse(localStorage.getItem("cart"));
    miniCart.innerHTML = cart.length;
  }
}
showMiniCart();
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
      showMiniCart();
    }
    
  })
}
// End Gio hang

// xoa san pham trong gio hang
const deleteItemInCart = () => {
  const listButtonDelete = document.querySelectorAll("[btn-delete]");
  if(listButtonDelete.length > 0){
    listButtonDelete.forEach((button) => {
      button.addEventListener("click", () => {
        const tourId = button.getAttribute("btn-delete");
        var cart = JSON.parse(localStorage.getItem("cart"));
        
        cart = cart.filter((item) => {
          return item.tourId != tourId;
        })
        cart = JSON.stringify(cart);

        localStorage.setItem("cart", cart);

        window.location.reload();
      })
    })
  }
}
// end xoa pham trong gio hang

// vẽ tour vào giỏ hàng
const tableCart = document.querySelector("[table-cart]");

if(tableCart){
  fetch("/cart/list-json", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: localStorage.getItem("cart")
  })
    .then(res => res.json())
    .then(data => {
      const htmlArray = data.tours.map((item, index) => `
          <tr>
            <td>${index+1}</td>
            <td>
              <img src="${item.image}" alt="${item.title}" width="80px"/>
            </td>
            <td>
              <a href="/tours/detail/${item.slug}">${item.title}</a>
            </td>
            <td>
              ${item.price.toLocaleString()}đ
            </td>
            <td>
              <input type="number" name="quantity" value="${item.quantity}" min="1" item-id="${item.tourId}" style="width: 60px"/>
            </td>
            <td>
                ${item.total.toLocaleString()}đ
            </td>
            <td>
              <button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button>
            </td>
          </tr>
      `);
      
      const tbody = tableCart.querySelector("tbody");
      tbody.innerHTML = htmlArray.join("");

      const totalPrice = document.querySelector("[total-price]");
      totalPrice.innerHTML = data.total.toLocaleString();

      deleteItemInCart();
    })

}
// end vẽ tour vào giỏ hàng

