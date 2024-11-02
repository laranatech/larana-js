const styleVariablesStorage = new Map()

const joinVarName = (name, theme = 'main') => {
	return `${theme}_${name}`
}

const useStyleVar = (name) => {
	const inner = (theme = 'main') => {
		const varName = joinVarName(name, theme)
		let styleVar = styleVariablesStorage.get(varName)

		if (styleVar) {
			return styleVar
		}

		if (theme !== 'main') {
			return inner('main')
		}

		throw new Error(`Cannot find style var '${name}'`)
	}

	return inner
}

const setStyleVar = (name, value, theme = 'main') => {
	styleVariablesStorage.set(`${theme}_${name}`, value)
}

const setStyleVars = (vars, theme = 'main') => {
	Object.keys(vars).forEach((key) => {
		styleVariablesStorage.set(joinVarName(key, theme), vars[key])
	})
}

const defaultVars = {
	fg: '#000',
	disabledFg: '#111',
	bg: '#eee',
	disabledBg: '#ddd',
	accent: '#3caa3c',
	disabledAccent: '#3caa3caa',
	componentBg: '#fff',
	disabledComponentBg: '#efefef',
	componentBorderColor: '#333',
	fontWeight: 'medium',
	fontFamily: 'monospace',
	h1FontSize: 32,
	h2FontSize: 28,
	h3FontSize: 24,
	fontSize: 16,
	radius: 4,
	u1: 4,
	u2: 8,
	u3: 16,
	u4: 24,
	u5: 32,
	componentHeight: 42,
}

const defaultDarkVars = {
	fg: '#fff',
	disabledFg: '#eee',
	bg: '#444',
	disabledBg: '#3f3f3f',
	componentBg: '#333',
	disabledComponentBg: '#4f4f4f',
	componentBorderColor: '#777',
}

const initDefaultStyleVars = () => {
	setStyleVars(defaultVars, 'main')
	setStyleVars(defaultDarkVars, 'dark')
}

module.exports = {
	useStyleVar,
	setStyleVar,
	setStyleVars,
	initDefaultStyleVars,
}
