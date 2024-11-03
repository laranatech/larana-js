const { Page, layout, text, list, radio, button } = require('larana-js')

const { header } = require('../components')

class QuizPage extends Page {
	title = 'Quiz'

	init() {
		this.initState({
			questions: [
				{
					caption: 'What is Larana?',
					options: [
						{ value: 'library', label: 'Library' },
						{ value: 'framework', label: 'Framework' },
						{ value: 'protocol', label: 'Protocol' },
						{ value: 'philosophy', label: 'Philosophy' },
					],
					correctAnswer: 'philosophy',
					score: 2,
				},
				{
					caption: 'What is LaranaJS?',
					options: [
						{ value: 'library', label: 'Library' },
						{ value: 'framework', label: 'Framework' },
						{ value: 'protocol', label: 'Protocol' },
						{ value: 'philosophy', label: 'Philosophy' },
					],
					correctAnswer: 'framework',
					score: 2,
				},
				{
					caption: 'What was the first implementation of Larana?',
					options: [
						{ value: 'rssr', label: 'RSSR' },
						{ value: 'py', label: 'LaranaPy' },
						{ value: 'go', label: 'Gorana' },
						{ value: 'js', label: 'LaranaJS' },
					],
					correctAnswer: 'rssr',
					score: 1,
				},
				{
					caption: 'Who is the author of Larana?',
					options: [
						{ value: 'koryanov', label: 'Vasiliy Koryanov' },
						{ value: 'kucheriavyi', label: 'Evgenii Kucheriavyi' },
						{ value: 'korshikov', label: 'Pasha Korshikov' },
						{ value: 'gulyaikin', label: 'Andrew Gulyaikin' },
					],
					correctAnswer: 'kucheriavyi',
					score: 1,
				},
			],
			selectedAnswer: '',
			answers: [],
		})
	}

	questionBody({ w, h }) {
		const { answers, questions } = this.state
		const current = answers.length

		const question = questions[current]

		return layout({
			style: 'column',
			children: [
				text({ value: question.caption, style: 'h1Text' }),
				list({
					value: question.options,
					template: (item, i) => {
						return layout({
							style: { gap: 'var:u2', height: 'var:componentHeight' },
							children: [
								layout({ style: { size: 2 } }),
								radio({ model: 'selectedAnswer', name: item.value }),
								text({ value: item.label }),
								layout({ style: { size: 2 } }),
							]
						})
					}
				}),
				button({
					text: 'Next',
					disabled: this.state.selectedAnswer === '',
					onClick: () => {	
						this.nextQuestion()
					},
				})
			],
		})
	}

	nextQuestion() {
		if (!this.state.selectedAnswer) {
			return
		}
		this.setState({
			answers: [...this.state.answers, this.state.selectedAnswer],
			selectedAnswer: '',
		})
	}

	resultBody({ w, h }) {
		let totalScore = 0
		let score = 0

		this.state.questions.forEach((q, i) => {
			const answer = this.state.answers[i]
			const correct = answer === q.correctAnswer
			totalScore += q.score

			if (correct) {
				score += q.score
			}
		})

		return layout({
			style: 'column',
			children: [
				text({ value: `Your score: ${score}/${totalScore}`, style: 'h1Text' }),
				list({
					style: { size: 3 },
					value: this.state.questions,
					template: (item, i) => {
						const answer = this.state.answers[i]
						const correct = answer === item.correctAnswer
						const selectedOption = item.options.find((o) => o.value === answer)

						return layout({
							children: [
								layout({ style: { size: 2 } }),
								text({ value: item.caption }),
								text({
									value: `${selectedOption.label} ${correct ? '(+' + item.score + ')' : ''}`,
									style: {
										fg: correct ? 'var:accent' : '#f00',
									},
								}),
								layout({ style: { size: 2 } }),
							],
						})
					},
				})
			],
		})
	}

	prepareRoot({ w, h }) {
		const allAnswered = this.state.answers.length === this.state.questions.length

		return layout({
			outlineColor: '#00f',
			id: 'body',
			style: [
				'body',
				'column',
			],
			children: [
				header({}),
				text({ value: 'Larana Quiz', style: 'h1Text' }),
				layout({
					id: 'layout1',
					style: {
						size: 9,
						padding: 'var:u2',
						gap: 'var:u2',
					},
					outlineColor: '#0f0',
					children: [
						allAnswered ? this.resultBody({ w, h }) : this.questionBody({ w, h }),
					],
				}),
			],
		})
	}
}

module.exports = { QuizPage }
