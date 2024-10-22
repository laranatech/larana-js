const mixStyles = (styles) => {
	let style = {}

	styles.forEach((s) => {
		style = {
			...style,
			...s,
		}
	})

	return style
}


module.exports = {
	mixStyles,
}
