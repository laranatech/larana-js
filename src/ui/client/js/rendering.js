var INITIAL_W = Number('%INITIAL_W%');
var INITIAL_H = Number('%INITIAL_H%');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function resizeCanvas() {
	canvas.setAttribute('width', window.innerWidth);
	canvas.setAttribute('height', window.innerHeight);
}
