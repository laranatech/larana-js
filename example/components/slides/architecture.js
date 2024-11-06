const {
	text,
	layout,
	figure,
	arrow,
	point,
	rect,
	t,
	useStyleVar,
} = require('larana-js')
const { SlideComponent } = require('../slide.js')

class ArchitectureSlideComponent extends SlideComponent {
	static steps = 10

	root() {
		const { theme } = this.useTheme()

		const createCard = ({ x, y, w, h, options, text }) => {
			return [
				rect({
					x, y, w, h,
					...options,
					fg: options.bg,
				}),
				t({
					x: x + w * 0.5,
					y: y + h * 0.5,
					text,
					...options,
				}),
			]
		}

		return layout({
			children: [
				text({
					style: 'h1',
					value: 'Архитектура',
				}),
				figure({
					style: {
						size: 9,
						padding: 'var:u5',
					},
					template: (fig, queue) => {
						const d = fig.computeDimensions()
						const style = fig.computeStyle()

						const x = d.x + style.padding
						const y = d.y + style.padding
						const w = d.w - style.padding * 2
						const h = d.h - style.padding * 2

						const border = {
							borderColor: useStyleVar('componentBorderColor')(theme),
							borderCap: 'round',
							borderWidth: 3,
						}

						const clientArrow = {
							...border,
							borderColor: '#5a54ff',
							bg: '#5a54ff',
						}

						const clientCard = {
							bg: '#5a54ff',
							fg: useStyleVar('fg')(theme),
							radius: useStyleVar('radius')(theme),
						}

						const paleClientCard = { ...clientCard, bg: null, borderColor: '#b7d9fe' }

						const serverCard = { ...clientCard, bg: '#ff0000' }

						const paleServerCard = {
							...serverCard,
							bg: null,
							borderColor: '#ffbabc',
						}

						const serverArrow = {
							...border,
							borderColor: '#ff0000',
							bg: '#ff0000',
						}

						const clientD = {
							x: x + w * 0.51 + style.padding,
							y: y + h * 0.11 + style.padding,
							w: w * 0.48 - style.padding * 2,
							h: h * 0.875 - style.padding * 2,
						}

						const serverD = {
							x: x + style.padding,
							y: y + h * 0.11 + style.padding,
							w: w * 0.48 - style.padding * 2,
							h: h * 0.875 - style.padding * 2,
						}

						const inititalCards = [
							...createCard({ x, y, w: 200, h: h * 0.1, options: serverCard, text: 'Сервер' }),
							...createCard({ x: x, y: y + h * 0.11, w: w * 0.485, h: h * 0.88, options: paleServerCard, text: '' }),
							...createCard({ x: x + w * 0.51, y, w: 200, h: h * 0.1, options: clientCard, text: 'Клиент' }),
							...createCard({ x: x + w * 0.51, y: y + h * 0.11, w: w * 0.485, h: h * 0.88, options: paleClientCard, text: '' }),
						]

						inititalCards.forEach((s) => {
							s.to(queue)
						})

						const arrowOffset = 4
						const cardHeight = 50
						const cardOffset = 50

						const cardD = { w: clientD.w, h: cardHeight }

						const shapes = [
							createCard({
								text: 'Пользователь открыл страницу',
								x: clientD.x, y: clientD.y,
								...cardD,
								options: clientCard,
							}),
							[
								...createCard({
									text: 'Сервер создал подключение',
									x: serverD.x, y: serverD.y,
									...cardD,
									options: serverCard,
								}),
								arrow({
									points: [
										point({ x: clientD.x - arrowOffset, y: clientD.y + cardHeight / 2 }),
										point({ x: serverD.x + serverD.w + arrowOffset, y: clientD.y + cardHeight / 2 }),
									],
									...style,
									...clientArrow,
								}),
							],
							[
								...createCard({
									text: 'Сервер отрендерил избражение',
									x: serverD.x, y: serverD.y + cardHeight + cardOffset,
									...cardD,
									options: serverCard,
								}),
								arrow({
									points: [
										point({ x: serverD.x + serverD.w * 0.5, y: serverD.y + 54 }),
										point({ x: serverD.x + serverD.w * 0.5, y: serverD.y + 96 }),
									],
									...style,
									...serverArrow,
								}),
							],
							[
								...createCard({
									text: 'Изображение отправлено на клиент',
									x: serverD.x, y: serverD.y + cardHeight * 2 + cardOffset * 2,
									...cardD,
									options: serverCard,
								}),
								arrow({
									points: [
										point({ x: serverD.x + serverD.w * 0.5, y: serverD.y + cardOffset + cardHeight * 2 }),
										point({ x: serverD.x + serverD.w * 0.5, y: serverD.y + cardOffset * 2 + cardHeight * 2 - arrowOffset }),
									],
									...style,
									...serverArrow,
								}),
							],
							[
								...createCard({
									text: 'Клиент отрисовал интерфейс на канвасе',
									x: clientD.x, y: clientD.y + cardOffset * 2 + cardHeight * 2,
									...cardD,
									options: clientCard,
								}),
								arrow({
									points: [
										point({ x: serverD.x + serverD.w + arrowOffset, y: serverD.y + 196 + 25 }),
										point({ x: clientD.x - arrowOffset, y: clientD.y + 196 + 25 }),
									],
									...style,
									...serverArrow,
								}),
							],
							[
								...createCard({
									text: 'Пользователь совершил действие',
									x: clientD.x, y: clientD.y + cardOffset * 3 + cardHeight * 3,
									...cardD,
									options: clientCard,
								}),
								arrow({
									points: [
										point({ x: clientD.x + clientD.w * 0.5, y: clientD.y + cardOffset * 3 + cardHeight * 2 + arrowOffset }),
										point({ x: clientD.x + clientD.w * 0.5, y: clientD.y + cardOffset * 3 + cardHeight * 3 - arrowOffset }),
									],
									...style,
									...clientArrow,
								}),
							],
							[
								...createCard({
									text: 'Действие отправилось на сервер',
									x: clientD.x, y: clientD.y + cardOffset * 4 + cardHeight * 4,
									...cardD,
									options: clientCard,
								}),
								arrow({
									points: [
										point({ x: clientD.x + clientD.w * 0.5, y: clientD.y + cardOffset * 3 + cardHeight * 4 + arrowOffset }),
										point({ x: clientD.x + clientD.w * 0.5, y: clientD.y + cardOffset * 4 + cardHeight * 4 - arrowOffset }),
									],
									...style,
									...clientArrow,
								}),
							],
							[
								...createCard({
									text: 'Сервер получил запрос',
									x: serverD.x, y: serverD.y + cardOffset * 5 + cardHeight * 5,
									...cardD,
									options: serverCard,
								}),
								arrow({
									points: [
										point({ x: clientD.x + clientD.w * 0.5, y: clientD.y + cardHeight * 5 + cardOffset * 4 + arrowOffset }),
										point({ x: clientD.x + clientD.w * 0.5, y: clientD.y + cardHeight * 5.5 + cardOffset * 5 }),
										point({ x: serverD.x + serverD.w + arrowOffset, y: serverD.y + cardHeight * 5.5 + cardOffset * 5 }),
									],
									...style,
									...clientArrow,
								}),
							],
							[
								...createCard({
									text: 'Сервер обработал событие',
									x: serverD.x, y: serverD.y + cardOffset * 4 + cardHeight * 4,
									...cardD,
									options: serverCard,
								}),
								arrow({
									points: [
										point({
											x: serverD.x + serverD.w * 0.5,
											y: serverD.y + cardOffset * 5 + cardHeight * 5 - arrowOffset,
										}),
										point({
											x: serverD.x + serverD.w * 0.5,
											y: serverD.y + cardOffset * 4 + cardHeight * 5 + arrowOffset,
										}),
									],
									...style,
									...serverArrow,
								}),
							],
							arrow({
								points: [
									point({
										x: serverD.x + serverD.w * 0.5,
										y: serverD.y + cardOffset * 4 + cardHeight * 4 - arrowOffset,
									}),
									point({
										x: serverD.x + serverD.w * 0.5,
										y: serverD.y + cardOffset * 2 + cardHeight * 3 + arrowOffset,
									}),
								],
								...style,
								...serverArrow,
							}),
						]

						shapes.forEach((s, i) => {
							if (i > this.step - 1) {
								return
							}

							if (Array.isArray(s)) {
								s.forEach((c) => {
									c.to(queue)
								})
								return
							}

							s.to(queue)
						})
					},
				}),
			],
		})
	}
}

module.exports = { ArchitectureSlideComponent }
