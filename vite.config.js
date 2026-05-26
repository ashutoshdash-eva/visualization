import { defineConfig } from "vite";
import { resolve } from "path";
 
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        cad: resolve(__dirname, "./cad/index1.html"),
      },
    },
  },
});
 