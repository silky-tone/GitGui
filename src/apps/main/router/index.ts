import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import type { App } from 'vue';

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {

  next();
});

export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
  return app;
}
