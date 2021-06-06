/*Requete Api for the home page */

async function getApi() {
  method = "GET";

  try {
    const responseApiIndex = await fetch("http://localhost:3000/api/cameras/");
    if (responseApiIndex.ok) {
      const elementsIndex = await responseApiIndex.json();
      console.log(responseApiIndex);
      return elementsIndex;
    }
  } catch (errIndex) {
    alert("Une erreur est survenu : désolé pour ce contre-temps ");
  }
}

// Requesr Api ID for the product page  //
async function getApiId() {
  method = "GET";

  const urlId = new URLSearchParams(window.location.search);
  const getId = urlId.get("id");

  try {
    const responseApiArtcle = await fetch(
      `http://localhost:3000/api/cameras/${getId}`
    );
    if (responseApiArtcle.ok) {
      const elementsArticle = await responseApiArtcle.json();
      return elementsArticle;
    }
  } catch (errArticle) {
    alert("Une erreur est survenu : désolé pour ce contre-temps ");
  }
}

// Ramdom products show//
openSite();
async function openSite() {
  let products = await getApi();

  let randomIndex = Math.floor(Math.random() * products.length);
  // construct the link to be opened//
  let product = products[randomIndex]._id;

  let linkShow = `Article.html?id=${product}`;
  document.getElementById("ramdomArticle").href = linkShow;

  return linkShow;
}
