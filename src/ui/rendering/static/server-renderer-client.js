function onPageLoad() {
	resizeCanvas();
}

function applyResponse(data) {
	var img = new Image();

	img.onload = function () {
		ctx.drawImage(img, data.x, data.y);
	};
	img.src = data.image;
}

