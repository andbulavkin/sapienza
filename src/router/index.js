import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import ForgotPassword from '../views/ForgotPassword'
import Register from '../views/Register'
import ProfileSet from '../views/ProfileSet'
import ProfileSetFlower from '../views/ProfileSetFlower'
import Dashboard from '../views/Dashboard'
import HistoricData from '../views/HistoricData'
import CustomGraph from '../views/CustomGraph'
import DashboardBatch from '../views/DashboardBatch'
import ECPHTarget from '../views/ECPHTarget'
import SubsrateECPH from '../views/SubsrateECPH'
import DataBatch from '../views/DataBatch'
import SubsrateECPHTargets from '../views/SubsrateECPHTargets'
import FeedTargets from '../views/FeedTargets'
import FacilitySettings from '../views/FacilitySettings'
import EditProfile from '../views/EditProfile'
import AboutSapienza from '../views/AboutSapienza'
import VarietyMasterlist from '../views/VarietyMasterlist'
import VueApexCharts from "vue-apexcharts";



Vue.use(VueRouter)
Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);

const routes = [{
        path: '/',
        component: Login,
    },
    {
        path: '/forgot-password',
        component: ForgotPassword,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/profileset',
        component: ProfileSet,
    },
    {
        path: '/profilesetflower',
        component: ProfileSetFlower,
        props: true
    },
    {
        path: '/dashboard',
        component: Dashboard,
    },
    {
        path: '/historic-data',
        component: HistoricData,
    },
    {
        path: '/custom-graph',
        component: CustomGraph,
    },
    {
        path: '/dashboard-batch',
        component: DashboardBatch,
    },
    {
        path: '/ecph-target',
        component: ECPHTarget,
    },
    {
        path: '/subsrate-ecph',
        component: SubsrateECPH,
    },
    {
        path: '/data-batch',
        component: DataBatch,
    },
    {
        path: '/subsrate-ec-ph-targets',
        component: SubsrateECPHTargets,
    },
    {
        path: '/feed-ec-ph-targets',
        component: FeedTargets,
    },
    {
        path: '/variety-masterlist',
        component: VarietyMasterlist,
    },
    {
        path: '/facility-settings',
        component: FacilitySettings,
    },
    {
        path: '/edit-profile',
        component: EditProfile,
    },
    {
        path: '/about-sapienza',
        component: AboutSapienza,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    // Check login or not
    const loggedIn = localStorage.getItem('sapienzaAccessToken');
    if (loggedIn) {
        if (to['fullPath'] == '/' || to['fullPath'] == '/register' || to['fullPath'] == '/forgot-password') {
            return next('/dashboard');
        }
    } else {
        if (to['fullPath'] != '/' && to['fullPath'] != '/register' && to['fullPath'] != '/forgot-password') {
            return next('/');
        }
    }
    next();
})

export default router