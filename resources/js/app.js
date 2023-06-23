
import './bootstrap';
import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

// Create an instance of the Vue app
const app = createApp({});

// Use axios and the vue-axios plugin
app.use(VueAxios, axios)

// Import the Todo component
import Todo from './components/Todo.vue';

// Register the Todo component
app.component('Todo', Todo);

// Mount the Vue app to the #app element
app.mount('#app');

