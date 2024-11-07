const { text, layout, code } = require('larana-js')
const { SlideComponent } = require('../slide.js')

class ConfigSlideComponent extends SlideComponent {
	root() {
		return layout({
			children: [
				text({ style: 'h1', value: 'Config / DI' }),
				code({
					style: { size: 9 },
					value: [
						'const router = new DefaultRouter({ routes })',
						'',
						'// ClientRenderer, VideoStreamRenderer, PDFRenderer, etc.',
						'const renderer = new ServerRenderer({',
						'    maxFPS: config.maxFPS,',
						'})',
						'// RedisStateManager, MyMicroserviceStateManager',
						'const stateManager = new MemoryStateManager({})',
						'',
						'const app = new LaranaApp({',
						'    renderer,',
						'    stateManager,',
						'    router,',
						'})',
						'',
						'app.run()',
					],
				}),
			],
		})
	}
}

module.exports = { ConfigSlideComponent }
