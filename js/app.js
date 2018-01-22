$(function(){
	var tiempo = 120;
	var minutos=0;
	var seundos=0;
	var monivimetos=0;
	lanzarCaramelos();
	encontrartMach();

	// dibuja los caramelos en las columnas 
	function lanzarCaramelos () {
		for (var i = 1; i<=7; i++ ){
			for (var j = 1; j<=7; j++ ){
				tipoImagen=Math.floor(Math.random() * 4) + 1 
				crearCaramelo(i,tipoImagen,j,);
			}
		}
	}

	// crea un caramelo aleatoreamente
	function crearCaramelo (columna, imagenN, posicion){
		$(".col-"+ columna ).append("<img src='image/"+imagenN+".png' class='elemento' imagen='"+imagenN+"' columna='"+columna+"'  posision ='"+posicion+"'> ");
		$(".col-" + columna ).click(  function (){
			
		});

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
	
	

	
});

