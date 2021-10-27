// constr Salvardados para armazenar as informações digitas.
const salvarDados = [];
// função para controle da data, mantando a data entre os valores selecionados
$('#date').change(function () {
    var dataDigitada = document.getElementById('date').value;
    var dataMax = '2021-03-16';
    var dataMin = '1981-03-16';
    if (dataDigitada >= dataMax) {
        $('#cabecalhoAviso').text("Você é muito novo para estar aqui");
        $('#confirmaCpf').css({ display: "block" });
        $('#date').val('');
        return false;
    } else if (dataDigitada <= dataMin) {
        $('#cabecalhoAviso').text("Você é um vampiro?");
        $('#confirmaCpf').css({ display: "block" });
        $('#date').val('');
        return false;
    }
    return true;
})
/* função para checar os campos do formulario conforme aprendido na aula */
// cada campo do formulario é tratado individualmente. Os campos referentes ao endereço não são tratados já que estão bloqueado e recebem as informações do via CEP
function enviardados() {
    if (document.cadastro.nome.value.length < 3) {
        alert("Preencha o nome corretamente");
        document.cadastro.nome.focus()
        return false;
    }
    if (document.cadastro.cpf.value.length < 11) {
        alert("Preencha o CPF corretamente");
        document.cadastro.cpf.focus()
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
    if (document.cadastro.genero.value == "") {
        alert("Preencha corretamente seu Gênero");
        document.cadastro.genero.focus()
        return false;
    }

    if (document.cadastro.cep.value < 8) {
        alert("Preencha corretamente seu CEP");
        document.cadastro.cep.focus()
        return false;
    }
    if (document.cadastro.numero.value.length < 1) {
        alert("Preencha o número da sua residencia corretamente");
        document.cadastro.numero.focus()
        return false;
    }
    if (document.cadastro.password.value.length < 6) {
        alert("Escolha uma senha com no minimo 6 digitos");
        document.cadastro.password.focus()
        return false;
    }
    // checagem se a senha confere.
    if (document.cadastro.password.value != document.cadastro.passwordCheck.value) {
        alert("Sua senha não confere");
        document.cadastro.passwordCheck.focus()
        return false;
    }
    if (document.cadastro.comentario.value.length < 10) {
        alert("Digite seu Comentário");
        document.cadastro.comentario.focus()
        return false;
    }
// povoando a lista com todos os dados capturados pelo formulario.
    let formDados = {};
    formDados = ("nome : " + cadastro.nome.value + ',' + "email : " + cadastro.email.value + ',' + "telefone : " + cadastro.tel.value + ',' + "data : " + cadastro.date.value + ',' + "genero:" + cadastro.genero.value + "cep : " + cadastro.cep.value + ',' + "rua : " + cadastro.logradouro.value + ',' + "numero : " + cadastro.numero.value + ',' + "bairro : " + cadastro.bairro.value + ',' + "cidade : " + cadastro.localidade.value + ',' + "estado: " + cadastro.uf.value + ',' + "senha : " + cadastro.password.value + "comentario:" + cadastro.comentario.value);
    salvarDados.push(formDados);
    console.log(formDados);
    console.log(salvarDados);
    alert("Dados Enviados")
    $('#cabecalhoAviso').text('Olá ' + cadastro.nome.value + " o seu login é: " + cadastro.email.value + " e você pode usar " + cadastro.cpf.value + " como senha "),
        $('#confirmaCpf').css({ display: "block" });
    $('#botaoFechar').css({ marginTop: "60px" });
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
        fetch(`https://viacep.com.br/ws/${cepProcurado}/json/`)
            .then(response => {
                response.json()
                    .then(data => console.log(apresentaDados(data)))
            })
            .catch(x => console.log("CEP não encontrado"));
    }
};
// função para verificar o CPF. Função foi alterada para remover pontos e hifen caso digitados pelo usuario
function VerificaCPF() {
    if (vercpf(document.cadastro.cpf.value)) { document.cadastro } else {
        errors = "1"; if (errors) {
            $('#cabecalhoAviso').text('CPF NÃO VÁLIDO'),
            $('#confirmaCpf').css({ display: "block" })
        };
        $('#botaoFechar').css({ marginTop: "120px" });
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
        $('#confirmaCpf').css({ display: "block" });
    $('#botaoFechar').css({ marginTop: "120px" });
    return true;
}
// função para fechar a janela que mostra os dados
function fecharJanela() {
    $('#confirmaCpf').css({ display: "none" });
}
