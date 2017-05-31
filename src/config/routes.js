const home = r => require(['../pages/home.vue'], r)
const withdraw = r => require(['../pages/withdraw/withdraw.vue'], r)
const stores = r => require(['../pages/stores/stores.vue'], r)

export default [{
    path: '/',
    name: 'login',
    component: require('../pages/login')
}, {
    path: '',
    name: '',
    component: require('../pages'),
    children: [{
        path: 'home',
        name: 'home',
        component: home
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
