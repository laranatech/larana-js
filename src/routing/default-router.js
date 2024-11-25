const { BaseRouter } = require('./base-router.js')


class DefaultRouter extends BaseRouter {
	resolve(url) {
		const p = url.split('?')[0]

		let route = this.routes.find((r) => r.path === p)

		const segments = p
			.split('/')
			.filter((item) => item)

		let params = {}
		this.routes.some((r) => {
			const hasParams = r.path.includes(':')

			if (!hasParams) {
				return false
			}

			const rSegments = r.path
				.split('/')
				.filter((item) => item)

			if (rSegments.length !== segments.length) {
				return false
			}

			const p = {}

			const f = rSegments.every((rs, i) => {
				if (rs === segments[i]) {
					return true
				}

				if (!rs.startsWith(':')) {
					return false
				}

				p[rs.replace(':', '')] = segments[i]

				return true
			})

			if (f) {
				route = r
				params = { ...p }
				return true
			}

		})

		const queryParams = this.extractQueryParams(url)

		if (!route) {
			const notFoundRoute = this.routes.find((p) => p.name === 'not-found')
			return {
				url,
				name: 'not-found',
				page: notFoundRoute ? notFoundRoute.page : undefined,
				params,
				queryParams,
			}
		}

		return { ...route, url, params, queryParams }
	}

	extractQueryParams(url) {
		if (url.split('?').length !== 2) {
			return {}
		}

		const queryParams = url
			.split('?')[1]
			.split('&')
			.filter((item) => item)

		const result = {}

		queryParams.forEach((item) => {
			const [key, value] = item.split('=')

			result[key] = value
		})

		return result
	}

	get clientCode() {
		return ''
	}
}

module.exports = {
	DefaultRouter,
}
