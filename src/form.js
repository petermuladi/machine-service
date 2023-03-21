
//Render form
function RenderHtmlForm() {

    let formHtml = "";

    formHtml += `
    <div class="w-50 m-auto">
        <h1 class="display-4 text-center p-5">Szervíz Leadási Lap</h1>
        <div id="result"></div>
        <form id="update-employee" action="">
            <div class="form-group d-inline-block">
            </div>
            <div class="form-group">
                <label for="szeriaszam">Szériaszám</label>
                <input name="szeriaszam" type="text" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="gyarto">Gyártó</label>
                <input name="gyarto" type="text" class="form-control"required >
            </div>
            <div class="form-group">
                <label for="tipus">Típus</label>
                <input name="tipus" type="text" class="form-control" required >
            </div>
            <div class="form-group">
                <label for="nev">Név</label>
                <input name="nev" type="text" class="form-control" required >
            </div>
            <div class="form-group">
                <label for="telefon">Telefon</label>
                <input name="telefon" type="text" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="email">E-mail</label>
                <input name="email" type="text" class="form-control" required>
            </div>
            <button class="mt-3 btn btn-primary" id="submit-button" type="click" class="btn btn-primary">Küldés</button>
        </form>
    </div>`;

    document.getElementById("root").innerHTML = formHtml;
    addNeww();
}

//Add new product + contact
function addNeww() {
    document.getElementById("update-employee").onsubmit = async (e) => {
        e.preventDefault();

        //input values
        let szeriaszam = e.target.elements.szeriaszam.value;
        let gyarto = e.target.elements.gyarto.value;
        let tipus = e.target.elements.tipus.value;
        let nev = e.target.elements.nev.value;
        let telefon = e.target.elements.telefon.value;
        let email = e.target.elements.email.value;

        const productBody =
        {
            szeriaszam: szeriaszam,
            gyarto: gyarto,
            tipus: tipus
        }

        const contactBody =
        {
            nev: nev,
            telefon: telefon,
            email: email,
        }

        //feedback on the result
        if (await NewProduct(productBody) && await NewContact(contactBody)) {

            RenderHtmlForm();

            document.getElementById("result").innerHTML = `
          <div class="alert alert-success d-flex justify-content-between" role="alert">
            <h4 class="alert-heading">Sikeres felvitel!</h4>
            <p type="button" class="close text-danger" data-dismiss="alert" aria-label="Close">
               <span aria-hidden="true">&times;</span>
            </p>
         </div>`;
        }
        else {
            document.getElementById("result").innerHTML = `
            <div class="alert alert-danger d-flex justify-content-between" role="alert">
              <h4 class="alert-heading">Szerver Hiba Próbáld később!</h4>
              <p type="button" class="close text-danger" data-dismiss="alert" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
              </p>
            </div>`;
        }
    }
}
window.onload = RenderHtmlForm();