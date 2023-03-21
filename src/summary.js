//Render
async function RenderAll() {

    let products = await AllProducts();
    //console.log(products);

    //work with template string
    let html = "";

    html += `
        <h1 class="display-4 text-center p-5">Szervíz Összesítő</h1>
        <div id="result"></div>  
        <table class="table table-dark text-center">
            <thead>
                <tr>
                    <th scope="col">Leadás Dátuma</th>
                    <th scope="col">Szériaszám</th>
                    <th scope="col">Gyártó</th>
                    <th scope="col">Típus</th>
                    <th scope="col">Státusz</th>
                    <th scope="col">Státusz Változás Dátuma</th>
                    <th scope="col">Státusz</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => `
                <tr>
                <td>
                    <button id="info" data-id="${product.id}" type="button" 
                        class="product-id btn btn-sm btn-danger" 
                        data-bs-toggle="popover">
                        Info
                    </button>
                    ${product.leadas_datuma}
                </td>
                 <td>${product.szeriaszam}</td>
                 <td>${product.gyarto}</td>
                 <td>${product.tipus}</td>
                 <td class="${product.statusz == "Beérkezett" ? "text-primary" : "" ||
                     product.statusz == "Hibaelhárítás" ? "text-danger" : "" ||
                     product.statusz == "Alkatrész beszerzés alatt" ? "text-warning" : "" ||
                     product.statusz == "Kész" ? "text-success" : ""}">
                     ${product.statusz}
                 </td>
                    <td>${product.statusz_valtozas_datuma}</td>
                        <td>
                        <div class="input-group mb-3 d-inline-block">
                        <select id="statusz" class="status-data" data-id=${product.id} class="custom-select" id="inputGroupSelect01">
                            <option selected>Státusz változtatás</option>
                            <option value="Beérkezett">Beérkezett</option>
                            <option value="Hibaelhárítás">Hibaelhárítás</option>
                            <option value="Alkatrész beszerzés alatt">Alkatrész beszerzés alatt</option>
                            <option value="Javítás">Javítás</option>
                            <option value="Kész">Kész</option>
                        </select>
                        </div>
                        </td>
                    </td>
                </tr>
                `).join("")}
            </tbody>
    </table>`;

    document.getElementById("root").innerHTML = html;
    ProductInfo();
    Status();
}

window.onload = RenderAll();

//Info popup -> with double click
function ProductInfo() {

    let rows = document.querySelectorAll('[data-bs-toggle="popover"]');

    for (let row of rows) {
        row.onclick = async () => {
            let id = row.dataset.id;
            let contacts = await ContactsById(id);

            for (let contact of contacts) {
                //console.log(id,contact.termek_id);
                if (id == contact.termek_id) {
                    row.setAttribute('data-bs-title', `${contact.nev}: 📞${contact.telefon}`);
                    row.setAttribute('data-bs-Content', `${contact.email}`);
                    const popoverList = new bootstrap.Popover(row)
                    row.onclick = () => { const popoverList = ""; }
                }
            }
        }
    }
}

//Change status -> show popup from result -> error or all ok..
function Status() {

    let status = document.querySelectorAll(".status-data")
    for (let stat of status) {

        stat.onchange = async () => {

            const input = stat.value;
            const id = Number(stat.dataset.id);
            const contact = await ContactsById(id);
            const adress = contact[0].email;
            const nev = contact[0].nev;
            const subject = `Státuszváltozás történt ${nev} részére`;
            const body = `<p>🚀Tisztelt ${nev}! Szervizelendő eszközének státusza az alábbira változott: ⏰"${input}"</p>`;
            const status = { statusz: input };

            //mail
            const dataObj = {
                address: adress,
                subject: subject,
                body: body
            }

            if (await UpdateStatus(status, id)) 
            {

                if (await Mail(dataObj)) 
                {
                    await RenderAll();
                    document.getElementById("result").innerHTML = `
                        <div class=" p-3 alert alert-success alert-dismissible fade show d-flex justify-content-between align-items-center" role="alert">
                            <strong>Sikeres Státusz Módosítás!</strong>📩Email Elküldve: ${nev} részére!
                            <p type="button" class="close text-danger" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span></p>
                        </div>`;
                } 
                else 
                {
                    await RenderAll();
                    document.getElementById("result").innerHTML = `
                    <div class="alert alert-danger d-flex justify-content-between" role="alert">
                        <h4 class="alert-heading">✅Státusz változtatás Sikeres ⛔Email nincs elküldve Email Szerver Hiba!</h4>
                        <p type="button" class="close text-danger" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span></p>
                    </div>`;
                }
            } 
            else 
            {
                document.getElementById("result").innerHTML = `
                <div class="alert alert-danger d-flex justify-content-between" role="alert">
                    <h4 class="alert-heading">Szerver Hiba! Sikertelen Státusz változtatás!</h4>
                    <p type="button" class="close text-danger" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span></p>
                </div>`;
            }
        }
    }
}