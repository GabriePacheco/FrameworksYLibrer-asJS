$(function(){
	var tiempo =1203;
	var minutos=0;
	var segundos=0;
	var movimientos=0;
	var puntos=0;


	
	// dibuja los caramelos en las columnas 
	function lanzarCaramelos () {
		for (var i = 1; i<=7; i++ ){
			for (var j = 1; j<=7; j++ ){
				tipoImagen=Math.floor(Math.random() * 4) + 1 
				crearCaramelo(i,tipoImagen,j,);
			}
		}
		$('.elemento').draggable({
			revert: true
		});
	
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
	crash();	
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
	

	//Boton de INICIO - REINICIO 
	$(".btn-reinicio").click(function(event) {
		if ($(this).text() == "Iniciar" ){
			$(this).text("Reiniciar");
			timer = setInterval(temporizador, 1000);
			lanzarCaramelos();
			encontrartMach();
		}else{
			clearInterval(timer);
			borrarCaramelos();
			tiempo = 120;
			movimientos =0;
			puntos =0;		
			$(".panel-score").width("25%");
			$('.panel-tablero').show('slow', function() {
				lanzarCaramelos();
				encontrartMach();
						
			});
			$(".panel-score h3").remove();
			$(".time").show("fast");

			timer = setInterval(temporizador, 1000);

			
		}
		
	});


	/** Fin de juego ***/
	function gameOver(){
		borrarCaramelos();
		$('.panel-tablero').hide(1000, function (){
			
			$(".panel-score").prepend('<h3 class="main-titulo" style="text-align: center;">Juego Terminado</h3>')
			
		borrarCaramelos();
		});
		$(".panel-score").animate({width: "100%"}, 1000);
		$(".time").hide("slow");
		borrarCaramelos();
		clearInterval(timer);


	}

	//animacion de titulo 
	function color1(obj){
		$(obj).animate({color: "#989989"}, 200, function(){
			color2(obj);
		});
	}
	function color2(obj){
		$(obj).animate({color: "#DCFF0E"}, 200, function(){
			color1(obj);
		});


	}
	$('.main-titulo').click(function(event) {
		color1($(this));
	});
	$(".main-titulo").click();
	 // fin animacion del titulo 

	 //Des de Detectar abuma para romper los caramelos 
	 function crash(){
		$(".mach")
		.animate({opacity: 0.5},200)
		.animate({opacity: 1},200)
		.animate({opacity: 0.5},200)
		.animate({opacity: 1},200)
		.animate({opacity: 0.5},200);
		setTimeout(romper, 1000);

	}
	//ELIMINA LOS CARAMELOS QUE ESTAN EN MATCH
	function romper(){
		puntos +=  $(".mach").length * 10; 
		$("#movimientos-text").text(movimientos);
		$("#score-text").text(puntos);
		$("#score-text").text(puntos);
		$(".mach").remove();
		setTimeout(reOrdenar, 600);
	}

	//BUSCA LOS ESPACIOS VACIOS EN LAS COLUMAS 
	function reOrdenar(){
		for(var x = 1; x<=7; x++){
			faltan=7- $(".elemento[columna='"+x+"']").length;	
			if (faltan > 0){
				for (var mas = 0; mas <faltan ; mas++){
					reCrearCaramelo(x, mas);
				}
			}		
		}
		for (var x1 = 1; x1<=7;x1++){
			$(".elemento[columna='"+ x1+"']").each(function(index, el) {
				$(this).attr("posision", (index+1));
			}); 
		}
		$('.elemento').draggable({
			zIndex: 100,
			revert: true,
			 opacity: 0.80,
			drag : function (){
				seleccionado = $(this);

				 $(".elemento").each(function(index, el) {
				 	test = seleccionado.hitTest($(this).offset().left , $(this).offset().top);
				 	if (test == true ){
				 	
				 		if (seleccionado.attr("columna")==$(this).attr("columna") || Math.floor(seleccionado.attr("columna"))-1==Math.floor($(this).attr("columna"))  || Math.floor(seleccionado.attr("columna"))+1==Math.floor($(this).attr("columna"))  ){
				 			if (seleccionado.attr("posision")==$(this).attr("posision") || Math.floor(seleccionado.attr("posision"))-1==Math.floor($(this).attr("posision"))  || Math.floor(seleccionado.attr("posision"))+1==Math.floor($(this).attr("posision"))  ){			 				
					 			if (!(seleccionado.attr("posision") < $(this).attr("posision") &&  seleccionado.attr("columna") < $(this).attr("columna")) && !(seleccionado.attr("posision") > $(this).attr("posision") &&  seleccionado.attr("columna") > $(this).attr("columna"))  && !(seleccionado.attr("posision") < $(this).attr("posision") &&  seleccionado.attr("columna") > $(this).attr("columna")) && !(seleccionado.attr("posision") > $(this).attr("posision") &&  seleccionado.attr("columna") < $(this).attr("columna")))
					 			$(this).addClass('mover');
				 			}
				 			
				 		}
				 	}else{
				 		$(this).removeClass('mover');
				 	}
				 });
				 $(this).removeClass('mover');
			},
			stop: function (){
				movimientos++;
			}
		
		});	//FUNCION QUE AGREGA LA FUNCIONALIDAD DE CAMBIO DE CARAMELO	
			$(".elemento").on("mouseup", function(event) {
					$(this).removeClass("mover");

					 var auxMoverImagen = $(".mover").attr("imagen");
					 var auxMoverSrc = $(".mover").attr("src");
					 $(".mover").attr("imagen",$(this).attr("imagen"));
					 $(".mover").attr("src", $(this).attr("src"));
					 $(this).attr("src", auxMoverSrc );
					 $(this).attr("imagen", auxMoverImagen);
					 $(".elemento").removeClass('mover');
				
			});

		encontrartMach();
	}

	//CREA UN CARAMELO EN EL ESPACIO VASIO
	function reCrearCaramelo(col, y){
		nimg =Math.floor(Math.random() * 4) + 1 ;
		$(".col-" + col).prepend("<img src='image/"+nimg+".png' class='elemento nuevo' imagen='"+nimg+"' columna='"+col+"'  posision ='"+y+"'> ").show("slow");
		$(".nuevo").slideDown('fast', function() {
		$(".nuevo").removeClass('nuevo');

		});

	}


	 $.fn.hitTest = function (x, y) { 
        return (Math.floor(x) >= Math.floor(this.offset().left) && Math.floor(x)  < this.offset().left + this.width()) && (Math.floor(y)  >= Math.floor(this.offset().top) && Math.floor(y)  < Math.floor(this.offset().top) + this.height()); 
    }; 
	
});

