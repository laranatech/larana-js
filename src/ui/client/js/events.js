/* eslint-disable */

function handleResize() {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function() {
		resizeCanvas();
		sendMessage({ event: 'resize' });
	}, 100);
}

if (typeof ResizeObserver !== 'undefined') {
	const resizeObserver = new ResizeObserver(() => {
		handleResize();
	});

	resizeObserver.observe(document.body);
}

window.addEventListener('resize', function () {
	handleResize();
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
	throttleMessage({
	// delayMessage({
	// sendMessage({
		event: 'mousemove',
		y: e.clientY,
		x: e.clientX,
	});
});

window.addEventListener('keyup', function (e) {
	// delayMessage({
	sendMessage({
		event: 'keypress',
		value: e.key,
	});
});
