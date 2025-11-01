// // vite.config.js
// import { defineConfig } from 'vite';

// export default defineConfig({
//   plugins: [
//     {
//       name: 'rewrite-root-to-public-index',
//       configureServer(server) {
//         server.middlewares.use((req, _res, next) => {
//           if (req.url === '/' || req.url === '') req.url = '/index.html';
//           next();
//         });
//       }
//     }
//   ]
// });
