//Show Id and total price after the send to the backend//
function confirm() {
  let order = JSON.parse(sessionStorage.getItem("order"));
  document.querySelector("#totalPrice").textContent =
    order.totalPrice / 100 + ".00€";
  document.querySelector("#id").textContent = " " + order.productId;
  //remove items in session storage and redirection to home//
  setTimeout(function remove() {
    sessionStorage.removeItem("order");
    window.location.href = "index.html";
  }, 20000);
}
confirm();
