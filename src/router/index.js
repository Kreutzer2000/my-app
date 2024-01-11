// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Tangle from '../components/Tangle.vue';
import UserProfile from '../components/UserProfile.vue';
import UserRegister from '../components/UserRegister.vue';

const routes = [
    {
        path: '/',
        redirect: '/login' // Redirige desde la raíz a /login
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'UserRegister',
        component: UserRegister
    },
    {
        path: '/profile',
        name: 'UserProfile',
        component: UserProfile,
        meta: { requiresAuth: true }
    },
    {
        path: '/tangle',
        name: 'Tangle',
        component: Tangle
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register']; // Rutas públicas
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('accessToken');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});

export default router;
