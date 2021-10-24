const salvarDados = [];
/* função para checar os campos do e-mail conforme aprendido na aula */
function enviardados() {
    if (document.cadastro.nome.value.length < 3) {
        alert("Preencha o nome corretamente");
        document.cadastro.nome.focus()
        return false;
    }
    if (document.cadastro.email.value.length < 3) {
        alert("Preencha o email corretamente");
        document.cadastro.email.focus()
        return false;
    }
    if (document.cadastro.tel.value.length < 3) {
        alert("Preencha o telefone corretamente");
        document.cadastro.tel.focus()
        return false;
    }
    if (document.cadastro.date.value.length < 3) {
        alert("Preencha a data de nascimento corretamente");
        document.cadastro.date.focus()
        return false;
    }
    if (document.cadastro.numero.value.length < 1) {
        alert("Preencha o número da sua residencia corretamente");
        document.cadastro.numero.focus()
        return false;
    }
    if (document.cadastro.password.value.length < 6) {
        alert("Escolha uma senha com no minimo 6 digitos");
        document.cadastro.numero.focus()
        return false;
    }
    if (document.cadastro.password.value != document.cadastro.passwordCheck.value) {
        alert("Sua senha não confere");
        document.cadastro.numero.focus()
        return false;
    }

    /* tentativas de salvar os dados, precisa de melhoramento, tinha usado tambem Local Storage.
    Algumas das coisas comentadas funcionam, mas como não vamos apresentar essa parte do projeto, vai ficar parada ate terminarmos a parte de banco de dados, onde podera ser implementada mais eficazmente.*/
    let formDados = {};
    formDados = ("nome : " + cadastro.nome.value + ',' + "email : " + cadastro.email.value + ',' + "telefone : " + cadastro.tel.value + ',' + "data : " + cadastro.date.value + ',' + "cep : " + cadastro.cep.value + ',' + "rua : " + cadastro.logradouro.value + ',' + "numero : " + cadastro.numero.value + ',' + "bairro : " + cadastro.bairro.value + ',' + "cidade : " + cadastro.localidade.value + ',' + "estado: " + cadastro.uf.value + ',' + "senha : " + cadastro.password.value);
    salvarDados.push(formDados);
    console.log(formDados);
    console.log(salvarDados);
    alert("Dados Enviados")
}
/* Função para buscar o CEP e colocar de volta nos campos bloqueados do formulario
função aprendida na sala de aula*/
const apresentaDados = (resultado) => {
    for (let campo in resultado) {
        if (document.querySelector("#" + campo)) {
            document.querySelector('#' + campo).value = resultado[campo];
        }
    }
}

function consultaCep() {
    let cepDigitado = document.getElementById("cep");

    if (cepDigitado.value == "") {
        cepDigitado.style.border = "1px solid red";
    } else {
        let cepProcurado = cepDigitado.value.replace("-", "");
        fetch(`http://viacep.com.br/ws/${cepProcurado}/json/`)
            .then(response => {
                response.json()
                    .then(data => console.log(apresentaDados(data)))
            })
            .catch(x => console.log("CEP não encontrado"));
    }
};

function VerificaCPF() {
    if (vercpf(document.cadastro.cpf.value)) { document.cadastro } else {
        errors = "1"; if (errors) {$('#cabecalhoAviso').text('CPF NÃO VÁLIDO'), 
        $('#confirmaCpf').css({display: "block"})};
        document.retorno = (errors == '');
    }
}
function vercpf(cpf) {
    let cpfSemTraco = cpf.replace("-", "");
    cpf = cpfSemTraco.replaceAll(".", "");
    if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
        return false;
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false; 
        $('#cabecalhoAviso').text('O CPF INFORMADO É VÁLIDO.'), 
        $('#confirmaCpf').css({display: "block"});   
      return true;
}
function fecharJanela(){
    $('#confirmaCpf').css({display: "none"});
}
