/*Add elements of Api in html in index home*/
index();
async function index() {
  //Get Api//
  const objects = await getApi();
  //create a boucle for each product//
  for (const object of objects) {
    const product = document.getElementById("Template");
    const clone = document.importNode(product.content, true);
    clone.querySelector("#Title").textContent = object.name;
    clone.querySelector("#description").textContent = object.description;
    clone.querySelector("#price").textContent = object.price / 100 + ".00 €";
    clone.querySelector("#ArticleImages").src = object.imageUrl;
    clone.querySelector("#ArticleImages").alt = object.name + " picture";
    clone.querySelector("#Link").href = "Article.html?id=" + object._id;

    document.getElementById("main").appendChild(clone);
  }
  console.log(objects);
}
