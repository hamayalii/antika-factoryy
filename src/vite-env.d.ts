/// <reference types="vite/client" />

declare module 'vite-plugin-imagemin' {
  import { Plugin } from 'vite';

  interface ViteImageminOptions {
    gifsicle?: any;
    optipng?: any;
    mozjpeg?: any;
    pngquant?: any;
    webp?: any;
    svgo?: any;
  }

  export default function viteImagemin(options?: ViteImageminOptions): Plugin;
}
