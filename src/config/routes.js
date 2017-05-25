const withdraw = r => require(['../pages/withdraw/withdraw.vue'], r)
const stores = r => require(['../pages/stores/stores.vue'], r)

export default [{
    path: '/',
    name: 'login',
    component: require('../pages/login')
}, {
    path: '/master',
    name: 'master',
    component: require('../pages'),
    children: [{
        path: 'home',
        name: 'home',
        component: require('../pages/home')
    }, {
        name: 'withdraw',
        path: 'withdraw',
        component: withdraw
    }, {
        name: 'stores',
        path: 'stores',
        component: stores
    }]
}]
