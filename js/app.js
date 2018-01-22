$(function(){
	var tiempo = 120;
	var minutos=0;
	var seundos=0;
	var monivimetos=0;
	lanzarCaramelos();
	encontrartMach();
	encontrartMachH();
	function lanzarCaramelos () {
		for (var i = 1; i<=7; i++ ){
			for (var j = 1; j<=7; j++ ){
				tipoImagen=Math.floor(Math.random() * 4) + 1 
				crearCaramelo(i,tipoImagen,j,);
			}
		}
	}


	function crearCaramelo (columna, imagenN, posicion){
		$(".col-"+ columna ).append("<img src='image/"+imagenN+".png' class='elemento' imagen='"+imagenN+"' columna='"+columna+"'  posision ='"+posicion+"'> ");
		$(".col-" + columna ).click(  function (){
			
		});

	}


	function encontrartMach (){
		for (var x = 1; x<=7; x++ ){
			machColumna=0;
				$('.elemento[columna="'+x+'"]').each(function(index, el) {			
					if ($(this).attr('imagen') == $(this).next().attr('imagen')){
						machColumna++;
						if (machColumna>=2){
						//$('.elemento[columna="'+x+'"][posision="'+index+'"]').css("background", "#999");
							for (y=0; y<=machColumna; y++){
								pos=index+y;
								$('.elemento[columna="'+x+'"][posision="'+pos+'"]').addClass( "mach" );
							}
							
						}
						
						
					}else{
						machColumna=0;
					}
				});
			
		}

		
	}/*** Fin de Rcontar mach***/
	
	function encontrartMachH(){
		for (var y = 1; y<=7; y++ ){
			machFila=0;
				$('.elemento[posision="'+y+'"]').each(function(indexX, el) {
					next = parseInt($(this).attr('columna'))+1;	
					console.log($(this).attr('imagen'));
					console.log($('.elemento[posision="'+y+'"][columna="'+next+'"]').attr('imagen'));
		
					if ( $(this).attr('imagen') == $('.elemento[posision="'+y+'"][columna="'+next+'"]').attr('imagen') ){
						machFila++;
						//console.log( y ,"si ", indexX, "img ",$(this).attr("imagen"), "img2" , $(this).next().attr('imagen') );
						if(machFila >= 2){
							for (var x = 0; x<= machFila; x++ ){
								columna= indexX+x;
								$('.elemento[posision="'+y+'"][columna="'+columna+'"]').addClass("mach");

							}
							

						}
						


					}else{
						machFila=0;
					}
			
				});
			
		}
	}

	
});

