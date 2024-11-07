const themes = ['main']

let currentTheme = 'main'

const getThemes = () => [...themes]

const getTheme = (name) => {
	const theme = themes.find(name)

	if (!theme) {
		throw new Error(`No theme found: ${name}`)
	}

	return theme
}

const getCurrentTheme = () => currentTheme

const setCurrentTheme = (name) => {
	const theme = getTheme(name)
	currentTheme = theme
}

const createTheme = (name) => {
	try {
		getTheme(name)
		throw new Error(`Theme exists: ${name}`)
	} catch(_) {}

	themes.push(name)
}

module.exports = {
	getThemes,
	getTheme,
	getCurrentTheme,
	setCurrentTheme,
	createTheme,
}
