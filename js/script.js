//Listener para esperar a que hagamos algo
document.addEventListener('keydown', function(evento){

if (evento.keyCode == 32 ) {

	console.log("salta");
	if (nivel.muerto == false) {
		saltar();
	}else{
		nivel.velocidad = 9;
		nube.velocidad = 1;
		cactus.x = ancho + 100;
		nube.x = ancho + 100;
		nivel.muerto = false;
	}
}

});
//Funcion para cargar imagenes
var imgRex, imgNube, imgCactus, imgSuelo;
function cargaImagenes(){

	imgRex = new Image();
	imgNube = new Image();
	imgCactus = new Image();
	imgSuelo = new Image();

	imgRex.src = 'images/Rex.png';
	imgNube.src = 'images/Nube.png';
	imgCactus.src = 'images/Cactus.png';
	imgSuelo.src = 'images/Suelo.png';

}



//Funcion para borrar el canvas y lograr que no se vea fotograma a fotograma
var ancho = 700;
var alto = 300;
var canvas, ctx;

function inicializa(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	cargaImagenes();
}

function borrarCanvas(){

	canvas.width = ancho;
	canvas.height = alto;
}
//Creamos un objeto trex con sus atributos
//y es la altura, vy es velocidad
var suelo = 200;
var trex = {y:suelo, vy:0, gravedad:2, salto:28, vymax:9, saltando: false};
var nivel = {velocidad: 9, puntuacion: 0, muerto: false};
var cactus = {x: ancho + 100, y:suelo-25};
var nube = {x: 400, y: 100, velocidad: 1};
var suelog = {x:0, y:suelo+30};
function dibujaRex(){
	//Llamamos el ctx o contexto le pasamos la variable de la imagen
	//136 son sus dimenciones y 100x trex la posicion dnd de dibujara y 50x50 el tamano que la queremos
ctx.drawImage(imgRex,0,0,136,136,100,trex.y,50,50);

}
//--------------------------------------------
function dibujaCactus(){
	ctx.drawImage(imgCactus, 0,0,78,158,cactus.x, cactus.y,38,75);
}
function logicaCactus(){

	if (cactus.x < -100) {
		cactus.x = ancho + 100;
	}else{
		cactus.x -= nivel.velocidad;
	}

}
//-------------------------------------------

function dibujaNube(){
	ctx.drawImage(imgNube, 0,0,150,43,nube.x, nube.y,82,31);
}

function logicaNube(){
	if (nube.x < -100) {
		nube.x = ancho + 100;
	}else{
		nube.x -= nube.velocidad;
	}
}
//-------------------------------------------
function dibujaSuelo(){
	ctx.drawImage(imgSuelo, suelog.x,0,700,30,0, suelog.y,700,30);
}

function logicaSuelo(){
	if (suelog.x > 700) {
		suelog.x = 0;
	}else{
		suelog.x += nivel.velocidad;
	}
}



function saltar(){
	trex.saltando = true;
	trex.vy = trex.salto;

}

function gravedad(){

if (trex.saltando == true ) {

		if (trex.y -trex.vy - trex.gravedad > suelo) {
			trex.saltando = false;
			trex.vy = 0;
			trex.y = suelo;
		}else{
			trex.vy -= trex.gravedad;
			trex.y -= trex.vy;
		}

}

}

function colision(){

	//cactus.x
	//trex.y
	if (cactus.x >= 100 && cactus.x <= 150){

		if (trex.y >= suelo-25){
			nivel.muerto = true;
			nivel.velocidad = 0;
			nube.velocidad = 0;
		}


	}

}



//-----------------------------------------------------------------
//Bucle principal
//La funcnion se va a ejecutar 10 veces por segundo siempre
var FPS = 50;
setInterval(function(){
	principal();
},1000/FPS);
//Esta funcion llama a todo el juego coloca todo en sus posiciones
function principal(){
	borrarCanvas();
	gravedad();
	colision();
	logicaNube();
	dibujaNube();
	dibujaSuelo();
	logicaSuelo();
	logicaCactus();
	dibujaCactus();
	dibujaRex();



}
