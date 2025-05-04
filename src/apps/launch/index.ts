import App from './app/index.vue';
import { createApp } from 'vue';
//
import '@common/style/common.scss';

async function bootstrap() {
  const app = createApp(App);
  app.mount('#app');
}

bootstrap().then(() => {
  //
});
