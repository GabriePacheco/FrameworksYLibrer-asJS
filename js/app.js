$(function(){
	var tiempo = 10;
	var minutos=0;
	var segundos=0;
	var movimientos=0;
	var puntos=0;
	lanzarCaramelos();

	

	// dibuja los caramelos en las columnas 
	function lanzarCaramelos () {
		for (var i = 1; i<=7; i++ ){
			for (var j = 1; j<=7; j++ ){
				tipoImagen=Math.floor(Math.random() * 4) + 1 
				crearCaramelo(i,tipoImagen,j,);
			}
		}
	}
	//borra todos los caramelos 
	function borrarCaramelos () {
		for (var i = 1; i<=7; i++ ){
			$(".col-"+ i ).html("");	
		}
	}


	// crea un caramelo aleatoreamente
	function crearCaramelo (columna, imagenN, posicion){
		if (!imagenN){
			imagenN= Math.floor(Math.random() * 4) + 1 ;
		}	
		$(".col-"+ columna ).append("<img src='image/"+imagenN+".png' class='elemento' imagen='"+imagenN+"' columna='"+columna+"'  posision ='"+posicion+"'> ");
	}

	// FUNCION QUE ENCUENTRA COINCIDENCIAS DE  3 O MAS (***MACH***) -> ASIGNA UNA CLASE A CADA ELEMENTO 
	function encontrartMach (){

		// ENCIANTRA MACH  VERTICAL
		for (var x = 1; x<=7; x++ ){
			machColumna=0;
			$('.elemento[columna="'+x+'"]').each(function(index, el) {			
				if ($(this).attr('imagen') == $(this).next().attr('imagen')){
					auxMachV=$(this).attr('imagen');
					machColumna++;
					if (machColumna>=2){
							for (y=0; y<=machColumna; y++){
							pos=index+y;
							if ($('.elemento[columna="'+x+'"][posision="'+pos+'"]').attr("imagen") == auxMachV )
							$('.elemento[columna="'+x+'"][posision="'+pos+'"]').addClass( "mach" ); 
						}
						
					}
					
					
				}else{
					machColumna=0;
				}
			});		
		}

		// ENCUENTRA MACH HORIZONTAL
		for (var y = 1; y<=7; y++ ){
			machFila=0;
			$('.elemento[posision="'+y+'"]').each(function(indexX, el) {
				next = parseInt($(this).attr('columna'))+1;			
				if ( $(this).attr('imagen') == $('.elemento[posision="'+y+'"][columna="'+next+'"]').attr('imagen') ){
					auxMachH= $(this).attr('imagen');
					machFila++;
					if(machFila >= 2){
						for (var x = 0; x<= machFila; x++ ){
							columna= indexX+x;
							if ($('.elemento[posision="'+y+'"][columna="'+columna+'"]').attr("imagen") == auxMachH)
							$('.elemento[posision="'+y+'"][columna="'+columna+'"]').addClass("mach");
						}			

					}
					
				}else{
					machFila=0;
				}
		
			});
		}
	}/*** Fin de encontar mach***/
	
	function temporizador (time){
		tiempo=tiempo-1; 
		minutos = Math.floor(tiempo/60);
		segundos = Math.floor(tiempo % 60);
		if (segundos < 10){
			segundos="0" + segundos;
		}
		$("#timer").text(minutos + ":" + segundos);
		if (tiempo <= 0){
			gameOver();
		}


	}
	
	$(".btn-reinicio").click(function(event) {
		if ($(this).text() == "Iniciar" ){
			$(this).text("Reiniciar");
			timer = setInterval(temporizador, 1000);
		}else{
			clearInterval(timer);
			borrarCaramelos();
			tiempo = 120;
			movimientos =0;
			puntos =0;

			
			$(".panel-score").width("25%");
			$('.panel-tablero').show('fast', function() {
				lanzarCaramelos();
						
			});
			$(".time").show("fast");
			timer = setInterval(temporizador, 1000);
		}
			encontrartMach();
	});


	/** Fin de juego ***/
	function gameOver(){
		$('.panel-tablero').hide('slow', function (){
			$(".panel-score").width("100%");
			borrarCaramelos();

		});
		$(".time").hide("slow");
		clearInterval(timer);


	}
	

	
});

