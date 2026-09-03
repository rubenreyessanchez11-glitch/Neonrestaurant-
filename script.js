const products = [

  {
    id:"classic",
    name:"Classic Neon Burger",
    price:120,
    cat:"main",
    emoji:"🍔",
    desc:"Beef patty, cheese, lettuce, tomato and house sauce.",
    c1:"#4d1c2f",
    c2:"#1b1728"
  },

  {
    id:"hotdog",
    name:"Retro Hot Dog",
    price:70,
    cat:"main",
    emoji:"🌭",
    desc:"Grilled sausage, crispy onions, mustard and ketchup.",
    c1:"#643016",
    c2:"#1e1613"
  },

  {
    id:"fries",
    name:"Arcade Fries",
    price:25,
    cat:"side",
    emoji:"🍟",
    desc:"Crispy salted fries with optional neon sauce.",
    c1:"#5a4710",
    c2:"#1d1a12"
  },

  {
    id:"coca",
    name:"Coca-Cola",
    price:30,
    cat:"drink",
    emoji:"🥤",
    desc:"Cold classic soda.",
    c1:"#4f1313",
    c2:"#171117"
  },

  {
    id:"water",
    name:"Bottled Water",
    price:20,
    cat:"drink",
    emoji:"💧",
    desc:"Chilled natural water.",
    c1:"#103c4b",
    c2:"#111a20"
  },

  {
    id:"malt",
    name:"Malt Drink 0.0",
    price:37,
    cat:"drink",
    emoji:"🍺",
    desc:"Non-alcoholic malt-style drink.",
    c1:"#55400f",
    c2:"#1f1a12"
  },

  {
    id:"cake",
    name:"Chocolate Cake",
    price:45,
    cat:"dessert",
    emoji:"🍰",
    desc:"Chocolate cake with neon sugar sprinkles.",
    c1:"#44241a",
    c2:"#24131b"
  },

  {
    id:"icecream",
    name:"Vanilla Ice Cream",
    price:25,
    cat:"dessert",
    emoji:"🍨",
    desc:"Creamy vanilla scoop with chocolate drizzle.",
    c1:"#53452a",
    c2:"#1f1a18"
  },

  {
    id:"flan",
    name:"Classic Flan",
    price:33,
    cat:"dessert",
    emoji:"🍮",
    desc:"Caramel flan, house style.",
    c1:"#5f3c10",
    c2:"#201812"
  },

  {
    id:"double",
    name:"Double Pixel Burger",
    price:165,
    cat:"main",
    emoji:"🍔",
    desc:"Double beef, double cheese and smoky sauce.",
    c1:"#3d1535",
    c2:"#181627"
  },

  {
    id:"chicken",
    name:"Cyber Chicken Burger",
    price:135,
    cat:"main",
    emoji:"🍗",
    desc:"Crispy chicken, slaw and spicy mayo.",
    c1:"#594113",
    c2:"#221a13"
  },

  {
    id:"rings",
    name:"Neon Onion Rings",
    price:55,
    cat:"side",
    emoji:"🧅",
    desc:"Crunchy onion rings with ranch dip.",
    c1:"#5a3e13",
    c2:"#201813"
  },

  {
    id:"shake",
    name:"Pink Galaxy Shake",
    price:65,
    cat:"drink",
    emoji:"🥤",
    desc:"Strawberry milkshake with whipped cream.",
    c1:"#5d193f",
    c2:"#211523"
  },

  {
    id:"lemonade",
    name:"Electric Lemonade",
    price:45,
    cat:"drink",
    emoji:"🍋",
    desc:"Fresh lemonade with mint.",
    c1:"#4a4e10",
    c2:"#172015"
  },

  {
    id:"brownie",
    name:"Midnight Brownie",
    price:50,
    cat:"dessert",
    emoji:"🍫",
    desc:"Warm brownie with vanilla topping.",
    c1:"#3d241a",
    c2:"#161318"
  }

];


const qty = {};

products.forEach(product => {

  qty[product.id] = 0;

});


const menuGrid =
  document.getElementById("menuGrid");

const cart =
  document.getElementById("cart");

const overlay =
  document.getElementById("overlay");

const modal =
  document.getElementById("modal");



function money(number){

  return "$" +
    Number(number).toLocaleString("en-US");

}



function labelCat(category){

  const categories = {

    main:"Burger / Main",

    side:"Side",

    drink:"Drink",

    dessert:"Dessert"

  };

  return categories[category];

}



function renderMenu(filter = "all"){

  const list =

    filter === "all"

      ? products

      : products.filter(

          product =>
            product.cat === filter

        );


  menuGrid.innerHTML =

    list.map(product => `

      <article class="menu-card">


        <div
          class="food-art"
          style="
            --food1:${product.c1};
            --food2:${product.c2};
          "
        >

          <div class="food-emoji">

            ${product.emoji}

          </div>

        </div>


        <div class="menu-info">


          <div class="menu-top">

            <h3>
              ${product.name}
            </h3>

            <span class="menu-price">

              ${money(product.price)}

            </span>

          </div>


          <p>

            ${product.desc}

          </p>


          <div class="menu-bottom">


            <span class="category">

              ${labelCat(product.cat)}

            </span>


            <div class="qty">


              <button
                onclick="
                  changeQty(
                    '${product.id}',
                    -1
                  )
                "
              >
                −
              </button>


              <input
                id="q-${product.id}"
                value="${qty[product.id]}"
                readonly
              >


              <button
                onclick="
                  changeQty(
                    '${product.id}',
                    1
                  )
                "
              >
                +
              </button>


            </div>


          </div>


        </div>


      </article>

    `).join("");

}



window.changeQty = function(
  id,
  delta
){

  qty[id] =
    Math.max(
      0,
      qty[id] + delta
    );


  const input =
    document.getElementById(
      "q-" + id
    );


  if(input){

    input.value =
      qty[id];

  }


  renderCart();

};



function renderCart(){

  const selected =

    products.filter(

      product =>
        qty[product.id] > 0

    );


  const count =

    selected.reduce(

      (sum,product) =>

        sum +
        qty[product.id],

      0

    );


  const subtotal =

    selected.reduce(

      (sum,product) =>

        sum +
        product.price *
        qty[product.id],

      0

    );


  const service =

    Math.round(
      subtotal * .05
    );


  const total =

    subtotal +
    service;


  document
    .getElementById("cartCount")
    .textContent =
      count;


  document
    .getElementById("subtotal")
    .textContent =
      money(subtotal);


  document
    .getElementById("service")
    .textContent =
      money(service);


  document
    .getElementById("total")
    .textContent =
      money(total);


  document
    .getElementById("cartItems")
    .innerHTML =

      selected.length

      ?

      selected.map(product => `

        <div class="cart-item">

          <div>

            <b>
              ${product.name}
            </b>

            <small>

              ${qty[product.id]}

              ×

              ${money(product.price)}

            </small>

          </div>

          <b>

            ${money(
              qty[product.id] *
              product.price
            )}

          </b>

        </div>

      `).join("")

      :

      `

      <div class="cart-empty">

        Your order is empty.

        <br>

        Add products from the menu.

      </div>

      `;

}



function openCart(){

  cart.classList.add(
    "open"
  );

  overlay.classList.add(
    "show"
  );

}



function closeCart(){

  cart.classList.remove(
    "open"
  );


  if(
    !modal.classList.contains(
      "show"
    )
  ){

    overlay.classList.remove(
      "show"
    );

  }

}



function showModal(){

  closeCart();


  overlay.classList.add(
    "show"
  );


  modal.classList.add(
    "show"
  );

}



function closeModal(){

  modal.classList.remove(
    "show"
  );


  overlay.classList.remove(
    "show"
  );

}



document
  .getElementById("openCart")
  .addEventListener(
    "click",
    openCart
  );


document
  .getElementById("closeCart")
  .addEventListener(
    "click",
    closeCart
  );


document
  .getElementById("clearCart")
  .addEventListener(
    "click",
    () => {

      products.forEach(
        product => {

          qty[product.id] = 0;

        }
      );


      const active =

        document.querySelector(
          ".filter.active"
        );


      renderMenu(

        active
          ? active.dataset.filter
          : "all"

      );


      renderCart();

    }
  );


document
  .getElementById("confirmOrder")
  .addEventListener(
    "click",
    () => {

      const hasProducts =

        products.some(

          product =>
            qty[product.id] > 0

        );


      if(!hasProducts){

        alert(
          "Add at least one product first."
        );

        return;

      }


      showModal();

    }
  );


document
  .getElementById("closeModal")
  .addEventListener(
    "click",
    closeModal
  );


overlay.addEventListener(
  "click",
  () => {

    closeCart();

    closeModal();

  }
);



document
  .querySelectorAll(".filter")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".filter")
          .forEach(
            filterButton => {

              filterButton
                .classList
                .remove("active");

            }
          );


        button
          .classList
          .add("active");


        renderMenu(
          button.dataset.filter
        );

      }
    );

  });



renderMenu();

renderCart();
