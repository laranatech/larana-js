const { text, layout, image, code } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class VueranaSlideComponent extends SlideComponent {
	static steps = 2

	root() {
		const vueranaCode = code({
			style: { size: 9 },
			value: [
				// `<script setup>`,
				// `import { useStyleVar } from "larana-js"`,
				// `import AppHeader from "../components/app-header.vue"`,
				// `</script>`,
				`<template>`,
				`    <layout `,
				`        :style="{`,
				`            bg: 'var:bg',`,
				`            gap: 8,`,
				`            direction: 'column'`,
				`        }"`,
				`    >`,
				`        <AppHeader :style="{ size: 1 }" />`,
				`        <layout :style="{ size: 9 }">`,
				`            <text value="Home" />`,
				`        </layout>`,
				`    </layout>`,
				`</template>`,
			],
		})

		return layout({
			children: [
				layout({
					style: { size: 2, direction: 'column', alignment: 'start' },
					children: [
						text({ value: [
							'Vue + React = Vueact',
							'Vue + Larana = Vuerana',
						][this.step-1], style: 'h1' }),
						[
							image({
								style: { size: 9 },
								src: 'https://kucheriavyi.ru/images/slides/vueact.png',
							}),
							vueranaCode,
						][this.step-1]
					],
				}),
			],
		})
	}
}

module.exports = { VueranaSlideComponent }
