/* eslint-disable */

function onPageLoad() {
	resizeCanvas();
}

var lastImage = '';

function applyResponse(data) {
	var img = new Image();

	img.onload = function () {
		ctx.drawImage(img, data.x, data.y);
	};
	img.src = data.image;

	lastImage = canvas.toDataURL();
}

function onResize() {
	var img = new Image();

	img.onload = function () {
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	};

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	img.src = lastImage;
}

