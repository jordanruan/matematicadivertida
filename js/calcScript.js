// Função para inserir um numero na tela, recebe obrigatoriamente um "item" que vem por parametro do HTML, de acordo com o numero ou operador matematico digitado.
function inserirNumero(item) {
	// valor atual é igual a qualquer valor que já esteja digitado na "tela"
	let valorAtual = $('.tela').val();
	// o valor digitado é adicionado ao valor que já estava na tela
	let digitado = valorAtual.length;
	// primeiro controle inicia como falso, se o valor recebe um operador matematico ele se torna true
	let controle = false;
	if(item == '+' || item == '-' || item == '*' || item == '/')
	controle = true;
	// previne que a primeira coisa digitada seja um operador matematico
	if(digitado == 0)
	{
		if(controle)
		return;
	}
	// segundo controle confere a ultima posição se ela for um operador matematico e tentar adicionar um segundo operador, ele subescreve o mesmo, se for um numero ele é adicionado
	let controleNovo = false;
	let ultimoDigitado = valorAtual[digitado-1];
	if(ultimoDigitado == '+' || ultimoDigitado == '-' || ultimoDigitado == '*' || ultimoDigitado == '/')
	controleNovo = true;
	if(controle && controleNovo)
	$('.tela').val(valorAtual.substring(0,digitado-1) + item);
	else
	$('.tela').val($('.tela').val() + item);
}
// Função para apagar o ultimo numero digitado. 
function apagarUltimo() {
	let valorAtual = $('.tela').val();
	$('.tela').val(valorAtual.substring(0, valorAtual.length - 1));
}
//limpa  a tela
function limpar() {
	$('.tela').val('');
}
// faz a conta acontecer
function resultado() {
	let valorAtual = $('.tela').val();
	let digitado = valorAtual.length;
	let controle = false;
	let item = valorAtual[digitado-1];
	// checa se o ultimo digitado foi um operador, caso positivo retorna ERRO FATAL
	if(item == '+' || item == '-' || item == '*' || item == '/')
	controle = true;
	if(controle)
		$('.tela').val("ERRO FATAL");
	else
	// eval avalia o valorAtual e faz a conta acontecer (gostei muito de conhecer isso!)
		$('.tela').val(eval($('.tela').val()));
}
function raizQuadrada() {
	let valorAtual = $('.tela').val();
	let digitado = valorAtual.length;
	let controle = false;
	let item = valorAtual[digitado-1];
	// checa se o ultimo digitado foi um operador, caso positivo retorna ERRO FATAL
	if(item == '+' || item == '-' || item == '*' || item == '/')
	controle = true;
	if(controle)
		$('.tela').val("ERRO FATAL");
	else
	// eval avalia o valorAtual e faz a conta acontecer (gostei muito de conhecer isso!)
		$('.tela').val(Math.sqrt($('.tela').val()));
}
function elevado2() {
	let valorAtual = $('.tela').val();
	let digitado = valorAtual.length;
	let controle = false;
	let item = valorAtual[digitado-1];
	// checa se o ultimo digitado foi um operador, caso positivo retorna ERRO FATAL
	if(item == '+' || item == '-' || item == '*' || item == '/')
	controle = true;
	if(controle)
		$('.tela').val("ERRO FATAL");
	else
	// eval avalia o valorAtual e faz a conta acontecer (gostei muito de conhecer isso!)
		$('.tela').val(Math.pow($('.tela').val(), 2));
}function elevado3() {
	let valorAtual = $('.tela').val();
	let digitado = valorAtual.length;
	let controle = false;
	let item = valorAtual[digitado-1];
	// checa se o ultimo digitado foi um operador, caso positivo retorna ERRO FATAL
	if(item == '+' || item == '-' || item == '*' || item == '/')
	controle = true;
	if(controle)
		$('.tela').val("ERRO FATAL");
	else
	// eval avalia o valorAtual e faz a conta acontecer (gostei muito de conhecer isso!)
	$('.tela').val(Math.pow($('.tela').val(), 3));
}
$('#switch-shadow').click(function(){
	if($("#switch-shadow").is(":checked")){
		$("#switchText").text("Científica")
		$('#elevado3').attr("disabled", false)
		$('#elevado3').click(function(){
			elevado3();
		})
		$('#elevado2').attr("disabled", false)
		$('#elevado2').click(function(){
			elevado2();
		})
		$('#raizQuadrada').attr("disabled", false)
		$('#raizQuadrada').click(function(){
			raizQuadrada();
		})
	}else{
		$("#switchText").text("Normal")
		$('#elevado3').attr("disabled", true)
		$('#elevado3').unbind("onclick")		
		$('#elevado2').attr("disabled", true)
		$('#elevado2').unbind("onclick")
		$('#raizQuadrada').attr("disabled", true)
		$('#raizQuadrada').unbind("onclick")
		limpar();
	}
	
})