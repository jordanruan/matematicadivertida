var valores = ["8", "13", "36", "2"];

var checkOperadores = ["+", "-", "*", "/"];

let desempenho = 0;

let acerto = false

let erro = false

// declaração de uma classe com o nome de Resposta
class Resposta {
    //definição dos atributos da classe
    constructor() {
        this.id = 1;
        this.arrayResposta = [];
        //propriedade para testar qual método deve ser executado pelo botão btn1
        this.testeBtn = 0;
    }

    lerDados() {
        let resposta = {};

        resposta.inputUm = $("#inputUm").val();
        resposta.operador = $("#operador").val();
        resposta.inputDois = $("#inputDois").val();
        resposta.id = this.id;

        return resposta;
    }
    //Validação dos campos dos inputs (impedindo input vazio)
    validarCampos(resposta) {
        let msg = "";

        if (resposta.inputUm == "") {
            msg + - "-informe o primeiro valor \n";
        }
        if (resposta.operador == "") {
            msg += "- informe o operador \n"
        }
        if (resposta.inputDois == "") {
            msg += "- informe o segundo valor \n"
        }

        if (msg != "") {
            alert(msg);
            return false;
        }
        return true;
    }

    //adcição das respostas no array
    adicionar(resposta) {
        this.arrayResposta.push(resposta);
        this.id++;
    }

    //salvar a resposta digitada pelo usuário no objeto resposta
    salvar() {
        let resposta = this.lerDados();
        //chamamos o método para validar o conteúdo dos inputs (somente verificou inputs vazios)
        if (this.validarCampos(resposta)) {
            if (this.testeBtn == 0) {
                this.adicionar(resposta);
            } else {
                this.atualizar(this.testeBtn);
            }
            this.listaDados();
            this.cancelar();
        }
    }

    //método para alimentar a tabela com os valores digitados
    listaDados() {
        let tbody = document.getElementById("tbody");

        // limpar a tabela antes de ser mostrada 
        tbody.innerText = "";

        //loop para percorrer o array de Resposta
        for (let i = 0; i < this.arrayResposta.length; i++) {
            // inserir um nova linha no tbody
            let novaLinha = tbody.insertRow();

            // criar cada coluna(célula) de cada linha
            let td_id = novaLinha.insertCell();
            let td_inputUm = novaLinha.insertCell();
            let td_operador = novaLinha.insertCell();
            let td_inputDois = novaLinha.insertCell();
            let td_resultado = novaLinha.insertCell();
            let td_acoes = novaLinha.insertCell();
            
            //alimentar as células
            $(td_id).text(this.arrayResposta[i].id).addClass("center");
            $(td_inputUm).text(this.arrayResposta[i].inputUm).addClass("center");
            $(td_operador).text(this.arrayResposta[i].operador).addClass("center");
            $(td_inputDois).text(this.arrayResposta[i].inputDois).addClass("center");

            let resultado = this.arrayResposta[i].inputUm + this.arrayResposta[i].operador + this.arrayResposta[i].inputDois;

            //a função eval realiza todas as operações entre o inputUm, operador e inputDois
            $(td_resultado).text(eval(resultado)).addClass("center");
            
            // criando um elemento de imagem para ser colocado na sexta coluna da linha
            let imgEdit = document.createElement("img");
            // atribuindo a esse elemento o caminho
            imgEdit.src = "../assets/edit.png";
            
            //adicionando um filho para a quarta coluna
            td_acoes.appendChild(imgEdit);

            // criando um elemento de imagem para ser colocado na sexta coluna da linha
            let imgDelete = document.createElement("img");
            // atribuindo a esse elemento o caminho
            imgDelete.src = "../assets/delete.png";

            //adicionando um filho para a quarta coluna
            td_acoes.appendChild(imgDelete);
            
            //atribuir um método para mostrar os dados de resposta selecionado para posterior edição (evento, método)
            imgEdit.setAttribute("onclick", "resposta.mostrarDados(" + JSON.stringify(this.arrayResposta[i]) + ")");
            
            //atribuir um método para imgDelete através do setAttribute como os parâmetros: ("evento", método)
            imgDelete.setAttribute("onclick", "resposta.deletar(" +this.arrayResposta[i].id + ")");

            //criamos um elemento img que conterá o desemprenho da pessoa
            let conferir = document.createElement("img");

            $("#grid" + i).text("");
            $("#grid" + i).append(conferir);

            desempenho = desempenho;

            //conferencia para exibição da imagem de acerto ou erro
            if(eval(resultado) == valores[i] && this.arrayResposta[i].operador == checkOperadores[i]) {
                conferir.src = "/assets/right.png";
                acerto = true;
                erro = false;
            } else {
                conferir.src = "/assets/wrong.png";
                acerto = false;
                erro = true;
            }
        }

        // controle para resultado final
        if (acerto){
            desempenho++
        } else if (erro) {
            desempenho--
        }

        // Resultado final de acordo com o desempenho nas respostas
        $(".desempenho").text("");

        if(this.arrayResposta.length == valores.length) {
            $("btn1").attr("disabled", true)
            if(desempenho == valores.length){
                let badge = document.createElement("img")
                badge.src = "/assets/passou.png"
                $(".desempenho").append(badge)
                console.log("você passou!")
            } else if (desempenho > -1 && desempenho < valores.length) {
                let badge = document.createElement("img")
                badge.src = "/assets/middle.png"
                $(".desempenho").append(badge)
                console.log("você passou perto")
            } else {
                let badge = document.createElement("img")
                badge.src = "/assets/reprovar.png"
                $(".desempenho").append(badge)
                console.log("você reprovou")
            }
        }
    }

    //método para limpar os inputs
    cancelar() {
        $("#inputUm").val("")
        $("#operador").val("")
        $("#inputDois").val("")
    }

    mostrarDados(dados) {
        $("#btn1").attr("disabled", false)

        //mostrar as propriedades das respostas nos inputs
        $("#inputUm").val(dados.inputUm);
        $("#operador").val(dados.operador);
        $("#inputDois").val(dados.inputUm);

        //modificar o texto do botão "Salvar"
        $("#btn1").text("Atualizar");

        this.testeBtn = dados.id;
    }

    //metodo para voltar todos os valores para os inputs
    atualizar(id) {
        for (let i = 0; i < this.arrayResposta.length; i++) {
            if (id == this.arrayResposta[i].id) {
                this.arrayResposta[i].inputUm = $("#inputUm").val();
                this.arrayResposta[i].operador = $("#operador").val();
                this.arrayResposta[i].inputDois = $("#inputDois").val();
            }
        }

        $("#btn1").text("Responder");
        this.testeBtn = 0;
        desempenho++;
    }

    // metodo para deletar buscando pelo id escolhido
    deletar(idProcurado) {
        if(confirm("Deseja realmente deletar a resposta de id " + idProcurado)) {
            for (let i = 0; i < this.arrayResposta.length; i++){
                if(this.arrayResposta[i].id == idProcurado) {
                    this.arrayResposta.splice(i,1)
                    tbody.deleteRow(i);
                }
            }
        }
    }
}

var resposta = new Resposta();