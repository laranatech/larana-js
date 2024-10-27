"%RENDERER_CLASS%"

function onPageLoad() {
	resizeCanvas();
}

var lastImage = '';

function applyResponse(data) {
	var renderer = new CanvasRenderer({})
	renderer.render(
		data.queue,
		{ w: window.innerWidth, h: window.innerHeight },
		canvas,
	);

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
