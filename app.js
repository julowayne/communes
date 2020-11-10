let query = document.querySelector('#city');

document.querySelector("#search").addEventListener('click', function(e){
    if (query.value == ""){
        document.querySelector('#empty-error').style.display = "block";
        document.querySelector('#informations').innerHTML = "";
    }else {
        document.querySelector('#empty-error').style.display = "none";
        axios
        .get(`https://geo.api.gouv.fr/communes?nom=${query.value}&boost=population&fields=region,population,codesPostaux,departement`)
        .then(function (response) {
            if (response.data.length > 0){
                document.querySelector('#informations').innerHTML = "";
                document.querySelector('#error').style.display = "none";
                let results = document.createElement('h1');
                results.innerHTML = `<h1>${response.data.length} résultat(s)</h1>`;
                document.querySelector('#informations').append(results);
                results.className = "text-center";
                for (const key in response.data) {
                    let div = document.createElement("div");
                    div.innerHTML = `<div><strong>${response.data[key].nom}</strong> : ${response.data[key].population.toLocaleString()} habitants</div>
                                    <ul>
                                        <li><strong>Region</strong>: ${response.data[key].departement.nom}</li>
                                        <li><strong>Departement</strong>: ${response.data[key].departement.nom}</li>
                                        <li><strong>Codes postaux</strong>: ${response.data[key].codesPostaux.join(", ")}</li>
                                        <li><strong>Code commune</strong>: ${response.data[key].code}</li>
                                    </ul>`;
                    document.querySelector('#informations').append(div);
                }
            }
            else {
                document.querySelector('#error').style.display = "block";
                document.querySelector('#informations').innerHTML = "";
            }
        });
    }
});