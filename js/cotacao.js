// função que busca a cotação das moedas por API
function consultaCotação() {
    let moeda1 = $("#moeda1 option:selected").val();
    let moeda2 = $("#moeda2 option:selected").val();
    console.log(moeda1 + moeda2);
    if (moeda1 == moeda2) {
        $('#cotacao').text('1')
    } else {

        let moeda = moeda1 + "-" + moeda2;
        let getMoeda = moeda1 + moeda2
        console.log(moeda);
        $('#cotacao').text('')
        fetch(`https://economia.awesomeapi.com.br/last/${moeda}`)
            .then(response => {
                response.json()
                    .then(data => $('#cotacao').append(data[getMoeda]['bid']))
            })
            .catch(x => alert("Par de moedas não encontrado"));

    }
};