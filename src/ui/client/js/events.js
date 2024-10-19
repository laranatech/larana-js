window.addEventListener('resize', function () {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function() {
		resizeCanvas();
	}, 100);
});

window.addEventListener('click', function (e) {
	// delayMessage({
	sendMessage({
		event: 'click',
		y: e.clientY,
		x: e.clientX,
	});
});

window.addEventListener('mousemove', function (e) {
	// delayMessage({
	// sendMessage({
	// 	event: 'mousemove',
	// 	y: e.clientY,
	// 	x: e.clientX,
	// });
});

window.addEventListener('keypress', function (e) {
	// delayMessage({
	sendMessage({
		event: 'keypress',
		value: e.key,
	});
});
