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

module.exports = {
	useStyleVar,
	setStyleVar,
	setStyleVars,
}
