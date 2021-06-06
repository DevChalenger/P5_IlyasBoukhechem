basket();
function basket() {
  //Get Item in Local storage //
  let products = JSON.parse(localStorage.getItem("product"));
  //Get element In Local Storage to html//
  const addElement = document.querySelector("#ProductListInBasket");
  //Show a div with a empty message if there are no content in the local storage//
  if (products === null || products == 0) {
    const basketEmpty = `<div class="d-flex align-items-center h4 justify-content-center displayPrimaryColor"><span class= "mr-2 ">Le panier est vide</span> <i class="fas fa-trash "></i></div>`;
    addElement.innerHTML = basketEmpty;
    console.log("Le contenu du panier est vide");
  } else {
    //Clone the contents of each product in the cart//
    for (let b = 0; b < products.length; b++) {
      const product = document.getElementById("Template");
      const clone = document.importNode(product.content, true);
      clone.querySelector("#Name").textContent = products[b].nomDuProduit;
      clone.querySelector("#Quantity").textContent = products[b].quantité;
      clone.querySelector("#Price").textContent =
        products[b].prixDuProduit / 100 + ".00 €";
      clone.querySelector("#TotalPriceOfProduct").textContent =
        (products[b].quantité * products[b].prixDuProduit) / 100 + ".00 €";
      document.getElementById("AddProduct").appendChild(clone);
    }
  }

  if (products !== null) {
    //Delete function for each product//
    let deleteBasket = document.querySelectorAll("#Delete");
    for (let d = 0; d < deleteBasket.length; d++) {
      deleteBasket[d].addEventListener("click", function () {
        let deleteSelect = products[d];
        console.log(deleteSelect);
        products = products.filter(
          (elementsDelete) => elementsDelete !== deleteSelect
        );
        console.log(products);
        localStorage.setItem("product", JSON.stringify(products));
        alert(`Vous avez suprimer ce produit de votre panier`);
        window.location.href = "Panier.html";
      });
    }

    //Delete for all products//
    let deleteBasketAll = document.querySelector("#DeleteAll");
    deleteBasketAll.addEventListener("click", function () {
      localStorage.removeItem("product");
      alert("Votre panier à été vidé");
      window.location.href = "Panier.html";
    });

    // Calcul total Price of basket//
    let totalPrice = 0;

    for (p = 0; p < products.length; p++) {
      let priceProduct = products[p].prixDuProduit * products[p].quantité;
      totalPrice += priceProduct;
    }
    const getTotalPrice = document.querySelector("#TotalPriceOfAllProduct");
    getTotalPrice.innerHTML = totalPrice / 100 + ".00 €";

    console.log(totalPrice);

    //--------------Send Order to the backend----------------//
    const buttonSendForm = document.querySelector("#SendButton");
    buttonSendForm.addEventListener("click", async function (event) {
      event.preventDefault();

      //Add value in Form in the local storage//
      const contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        email: document.querySelector("#email").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
      };

      let ids = [];

      for (let a = 0; a < products.length; a++) {
        ids.push(products[a]._id);
      }
      console.log(ids);
      const sendInformationToBackend = { contact, products: ids };
      console.log(sendInformationToBackend);
      //------------Control Form--------------//
      const controleInput = (value) => {
        return /^[A-Za-z]{1,17}$/.test(value);
      };
      //Control first name//
      function controlFirstName() {
        const controlValueFirstName = contact.firstName;
        if (controleInput(controlValueFirstName)) {
          console.log("Prénom Valide");
          return true;
        } else {
          alert("Veuillez remplir le champ avec un prénom valide");
          return false;
        }
      }
      //Control last name//
      function controlLastName() {
        const controlValueLastName = contact.lastName;
        if (controleInput(controlValueLastName)) {
          console.log("Nom Valide");
          return true;
        } else {
          alert("Veuillez remplir le champ avec un nom valide");
          return false;
        }
      }
      //Control email//
      function controlEmail() {
        const controlValueEmail = contact.email;
        if (
          /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(
            controlValueEmail
          )
        ) {
          console.log("Email Valide");
          return true;
        } else {
          alert("Veuillez remplir le champ avec un email valide");
          return false;
        }
      }
      //Control address//
      function controlAddress() {
        const controlValueAddress = contact.address;
        if (/^\d+\s[A-z]+\s[A-z]+$/.test(controlValueAddress)) {
          console.log("Adresse Valide");
          return true;
        } else {
          alert("Veuillez remplir le champ avec une adresse valide");
          return false;
        }
      }
      //Control city//
      function controlCity() {
        const controlValueCity = contact.city;
        if (controleInput(controlValueCity)) {
          console.log("Ville Valide");
          return true;
        } else {
          alert("Veuillez remplir le champ avec une ville existante");
          return false;
        }
      }
      //show form if the value is true//
      if (
        controlFirstName() &&
        controlLastName() &&
        controlCity() &&
        controlEmail() &&
        controlAddress()
      ) {
        localStorage.setItem("contact", JSON.stringify(contact));
        //redirection if the guest confirm the order//
        if (window.confirm("Voulez-vous confirmé la commande")) {
          //information send to the backend//
          const requestOrder = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sendInformationToBackend),
          };
          //request order api//
          try {
            const responseOrder = await fetch(
              "http://localhost:3000/api/cameras/order",
              requestOrder
            );
            if (responseOrder.ok) {
              const elementsOrder = await responseOrder.json();
              console.log(elementsOrder.orderId);
              let orderCommand = {
                productId: elementsOrder.orderId,
                totalPrice: totalPrice,
              };
              console.log(orderCommand);
              console.log(totalPrice);
              sessionStorage.setItem("order", JSON.stringify(orderCommand));
              localStorage.removeItem("product");
              window.location.href = "Confirmation.html";
              return elementsOrder;
            }
          } catch (errOrder) {
            alert("Une erreur est survenu : désolé pour ce contre-temps ");
          }
        }
      } else {
        alert("La commande ne peut pas être validé ");
      }
    });
  }
  //Save input in form for a next order//
  const setForm = localStorage.getItem("contact");
  const setFormConvert = JSON.parse(setForm);
  function setFormField(input) {
    document.querySelector(`#${input}`).value = setFormConvert[input];
  }
  setFormField("firstName");
  setFormField("lastName");
  setFormField("email");
  setFormField("address");
  setFormField("city");
  console.log(setFormConvert);
}
