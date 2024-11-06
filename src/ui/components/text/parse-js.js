const parseJS = (code) => {
	const lines = code.split('\n');
	const parsedLines = [];
	const keywords = new Set(['class', 'const', 'let', 'return']);
	
	lines.forEach(line => {
		const tokens = [];
		let buffer = '';
		let type = '';
		let inString = false;
		let indentCount = 0;
		let index = 0;

		if (line.trim().startsWith('//')) {
			tokens.push({ value: line.trim(), type: 'comment' });
			parsedLines.push(tokens);
			return;
		}

		// Count leading spaces as a single indentation token
		while (index < line.length && line[index] === ' ') {
			indentCount++;
			index++;
		}
		if (indentCount > 0) {
			tokens.push({ value: ' '.repeat(indentCount), type: 'indentation' });
		}

		for (let i = index; i < line.length; i++) {
			const char = line[i];

			// Handle strings enclosed in double quotes
			if (char === '"' && !inString) {
				if (buffer) {
					tokens.push({ value: buffer, type });
					buffer = '';
					type = '';
				}
				inString = true;
				type = 'string';
				buffer += char;
				continue;
			} else if (char === '"' && inString) {
				buffer += char;
				tokens.push({ value: buffer, type });
				buffer = '';
				type = '';
				inString = false;
				continue;
			}

			// Accumulate characters within a string
			if (inString) {
				buffer += char;
				continue;
			}

			// Handle specific symbols and operators
			if (['(', ')', '{', '}', ',', '=', '.'].includes(char)) {
				if (buffer) {
					// Check if buffer is a method if followed by a '('
					if (type === 'name' && char === '(') {
						type = 'method';
					}
					tokens.push({ value: buffer, type });
					buffer = '';
					type = '';
				}

				// Assign types based on character
				if (char === '(' || char === ')') {
					tokens.push({ value: char, type: 'parenthesis' });
				} else if (char === '{' || char === '}') {
					tokens.push({ value: char, type: 'bracket' });
				} else if (char === ',') {
					tokens.push({ value: char, type: 'comma' });
				} else if (char === '=') {
					tokens.push({ value: char, type: 'operator' });
				} else if (char === '.') {
					tokens.push({ value: char, type: 'operator' });
				}
				continue;
			}

			// Handle spaces between tokens
			if (char === ' ') {
				if (buffer) {
					tokens.push({ value: buffer, type });
					buffer = '';
					type = '';
				}
				tokens.push({ value: ' ', type: 'space' });
				continue;
			}

			// Detect keywords, possible method names, and identifiers
			if (buffer === '' && keywords.has(line.slice(i, i + 6))) {
				type = 'keyword';
			} else if (buffer === '' && /^[A-Z]/.test(char)) {
				type = 'className';
			} else if (buffer === '' && /^[a-zA-Z_]/.test(char)) {
				type = 'name';
			}

			buffer += char;
		}

		// Push remaining buffer as a token if any
		if (buffer) tokens.push({ value: buffer, type });

		parsedLines.push(tokens);
	});

	return parsedLines;
}

module.exports = { parseJS }
