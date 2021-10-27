// função para aumentar e diminuir alguns items precisaram ser tratados separados.
$('#visionPlus').click(function(){
	$('*').css('font-size', '105%');
	$('#cotacao').css('font-size', '300%');
	$('.titulo-home').css('font-size', '4rem');
	$('.titulo-model').css('font-size', '2rem');
	$('.devcontent h1').css('font-size', '3rem');
	$('.details h1').css('font-size', '3rem');

})
$('#visionMinus').click(function(){
	$('*').css('font-size', '100%');
	$('#cotacao').css('font-size', '300%');
	$('.titulo-home').css('font-size', '4rem');
	$('.titulo-model').css('font-size', '2rem');
	$('.devcontent h1').css('font-size', '3rem');
	$('.details h1').css('font-size', '3rem');
}) 