/**
 * Throws an error when trying to set a readonly property.
 * @param {string} name property name
 * @param {*} value any value
 * @example class MyClass { set x(value) { readonlyProperty('x', value) }}
 * 
 * const a = new MyClass()
 * a.x = 5 // Will throw an error
 */
const readonlyProperty = (name, value) => {
	throw new Error(`${name} is readyonly, trying to set value: ${value}`)
}

module.exports = { readonlyProperty }
