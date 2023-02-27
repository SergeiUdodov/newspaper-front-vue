import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from './components/HomeComponent.vue'
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'
import ArticleComponent from './components/ArticleComponent.vue'
import UpdateArticle from './components/UpdateArticle.vue'

const routes = [
    {path: '/', component: HomeComponent},
    {path: '/login', component: LoginComponent},
    {path: '/register', component: RegisterComponent},
    {path: '/article', component: ArticleComponent},
    {path: '/updateArticle', component: UpdateArticle}

];

const router = createRouter({
    history: createWebHistory(),
    routes
  });

export default router;