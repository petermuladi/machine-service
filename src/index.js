//Fetch All Product 
async function AllProduct() {

  let url = "http://localhost/machine-service/index.php?api=AllProduct";

  try {
    let res = await fetch(url,
      {
        method: "GET",
        headers: { "Content-type": "application/json" }
      }
    )
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
//Count
async function Count() {
  const products = await AllProduct();
  document.getElementById("count").innerHTML = products.length;

}
window.onload = Count();


