//Fetch Api add new product
async function NewProduct(product) {

    let url = 'http://localhost/machine-service/index.php?api=AddNewProduct';

    try {
        let res = await fetch(url, {
            method: 'POST', 
            headers: {'Content-type': 'application/json',},
            body: JSON.stringify(product)
        });
        return await res.json();
    }
    catch (error) {
        console.log("Error");
    }
}
//Fetch Api add new contact
async function NewContact(contact) {

    let url = 'http://localhost/machine-service/index.php?api=AddNewContact';

    try {
        let res = await fetch(url, {
            method: 'POST', 
            headers: {'Content-type': 'application/json',},
            body: JSON.stringify(contact)
        });
        return await res.json();
    }
    catch (error) {
        console.log("Error");
    }
}



