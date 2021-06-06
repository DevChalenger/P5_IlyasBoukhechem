article();

async function article() {
  //Get the API Id//

  const object = await getApiId();

  const title = document.querySelector("#title");
  const images = document.querySelector("#ArticleImages");
  const description = document.querySelector("#description");
  const price = document.querySelector("#price");

  //add API content by Id//

  title.textContent = object.name;
  images.src = object.imageUrl;
  images.alt = object.name + " picture";
  description.textContent = object.description;
  price.textContent = object.price / 100 + ".00 €";

  //Select List lenses content by Id//

  for (let l = 0; l < object.lenses.length; l++) {
    const product = document.getElementById("TemplateLenses");
    const clone = document.importNode(product.content, true);
    clone.querySelector("#lensesStyle").textContent = object.lenses[l];
    clone.querySelector("#lensesStyle").value = object.lenses[l];
    document.getElementById("lenses").appendChild(clone);
  }

  //Selected option, quantity and button in product page//

  const idSelect = document.querySelector("#lenses");
  const buttonSend = document.querySelector("#SendButton");
  const quantitySelect = document.querySelector("#Quantity-Numbers");

  //Button Send to Basket//

  buttonSend.addEventListener("click", function () {
    const choixQuantity = quantitySelect.value;
    const choixSelect = idSelect.value;
    //create a product array in the basket//
    let productSelected = {
      nomDuProduit: object.name,
      _id: object._id,
      quantité: choixQuantity,
      prixDuProduit: object.price,
    };
    console.log(productSelected);
    console.log(buttonSend);
    //create a empty array if there is not product in the local storage//
    let productRegisteredInLocalStorage = JSON.parse(
      localStorage.getItem("product")
    );
    if (!productRegisteredInLocalStorage) {
      productRegisteredInLocalStorage = [];
    }
    productRegisteredInLocalStorage.push(productSelected);
    localStorage.setItem(
      "product",
      JSON.stringify(productRegisteredInLocalStorage)
    );
    //redirection to the basket page or the home page when adding the item to the basket//
    if (
      window.confirm(
        `Le produit ${object.name} avec le type de lentille ${choixSelect} à été ajouté à votre panier, appuyer sur OK pour consulter votre panier ou sinon appuyer sur Annuler pour revenir à la page d'acceuil`
      )
    ) {
      window.location.href = "Panier.html";
    } else {
      window.location.href = "index.html";
    }
  });
}
