import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Layout',
		redirect: '/home',
		component: () => import('../views/layout.vue'),
		children: [{
				path: '/home',
				name: 'Home',
				component: () => import('../views/home.vue')
			},
			{
				path: '/index',
				name: 'Index',
				component: () => import('../views/index.vue')
			},
			{
				path: '/detail',
				name: 'Detail',
				component: () => import('../views/detail.vue')
			},
			{
				path: '/echarts',
				name: 'Echarts',
				component: () => import('../views/echarts.vue')
			},
		]
	}

]

const router = new VueRouter({
	mode: 'hash',
	routes
})

export default router
