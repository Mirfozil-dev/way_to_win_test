import DoctorsView from "@/views/DoctorsView.vue";
import NursesView from "@/views/NursesView.vue";

export const routes = [
    {
        path: '/doctors',
        name: 'Doctors',
        component: DoctorsView,
    },
    {
        path: '/nurses',
        name: 'Nurses',
        component: NursesView,
    },
    {
        path: '/',
        redirect: '/doctors',
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/doctors',
    },
];