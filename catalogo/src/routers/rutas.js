import Catalogo from "@/components/catalogo.vue";
import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {
      path: "/",
      name: "home",
      component: Catalogo  
    }, 
    
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router