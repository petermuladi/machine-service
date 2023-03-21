
//GET All Product
async function AllProducts() {

    let url = 'http://localhost/machine-service/index.php?api=AllProduct';

    try {
        let res = await fetch(url, {
            method: 'GET', 
            headers: {'Content-type': 'application/json',}
        });
        return await res.json();

    } catch (error) {
        console.log("Error");
    }
}

//GET Contact by Id
async function ContactsById(id) {

    let url = `http://localhost/machine-service/index.php?api=Allcontact&id=${id}`;

    try {

        let res = await fetch(url, {
            method: 'GET', 
            headers: {'Content-type': 'application/json',}
        });
        return await res.json();

    } catch (error) {
        console.log("Error");
    }
}

//Update status by id
async function UpdateStatus(data, id) {

    let url = `http://localhost/machine-service/index.php?api=Update&id=${id}`;
    
    try {

        let res = await fetch(url, {
            method: 'PUT', 
            headers: {'Content-type': 'application/json',},
            body: JSON.stringify(data)
        });
        return await res.json();

    } catch (error) {
        console.log("Error");
    }
}

//Mail
async function Mail(data) {

    let url = `http://localhost/machine-service/index.php?api=SendEmail`;

    try {

        let res = await fetch(url, {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(data)
        });
       return await res.json();

    } catch (error) {
        console.log("Error");
    }
}

