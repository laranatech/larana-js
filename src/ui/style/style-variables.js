const styleVariables = new Map()

const joinVarName = (name, theme = 'main') => {
	return `${theme}_${name}`
}

const useStyleVar = (name, theme = 'main') => {
	const varName = joinVarName(name, theme)
	let styleVar = styleVariables.get(varName)

	if (styleVar) {
		return styleVar
	}

	if (theme !== 'main') {
		return useStyleVar(name, 'main')
	}

	throw new Error(`Cannot find style var '${name}'`)
}

const setStyleVar = (name, value, theme = 'main') => {
	styleVariables.set(`${theme}_${name}`, value)
}

const setStyleVars = (vars, theme = 'main') => {
	Object.keys(vars).forEach((key) => {
		styleVariables.set(joinVarName(key, theme), vars[key])
	})
}

module.exports = {
	useStyleVar,
	setStyleVar,
	setStyleVars,
}
