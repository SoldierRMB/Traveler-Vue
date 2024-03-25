import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/scss/index.scss" as *; @use "@/assets/scss/dark.scss";`
            }
        }
    },
    plugins: [
        vue(),
        vueJsx(),
        VueDevTools(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'icon-[dir]-[name]',
            inject: 'body-last',
            customDomId: '__svg__icons__dom__'
        }),
        AutoImport({
            imports: ['vue'],
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    prefix: 'Icon'
                })
            ],
            dts: path.resolve(pathSrc, 'auto-imports.d.ts')
        }),
        Components({
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                    directives: true,
                    version: '2.1.5'
                }),
                IconsResolver({
                    enabledCollections: ['ep']
                })
            ],
            dts: path.resolve(pathSrc, 'components.d.ts')
        }),
        Icons({
            autoInstall: true
        })
    ],
    resolve: {
        alias: {
            '@': `${path.resolve(__dirname, 'src')}/`
        }
    }
})
