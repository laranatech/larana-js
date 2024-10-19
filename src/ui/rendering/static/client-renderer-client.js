"%RENDERER_CLASS%"

function onPageLoad() {
	resizeCanvas();
}

function applyResponse(data) {
	var renderer = new CanvasRenderer({})
	renderer.render(
		data.queue,
		{ w: window.innerWidth, h: window.innerHeight },
		canvas,
	);
}

