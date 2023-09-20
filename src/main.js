import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false //关闭生产提提示

//导出pdf
import htmlToPdf from '@/utils/pdf/htmlToPdf'
Vue.use(htmlToPdf)
import { getIEVersion } from '@/utils/pdf/util'
let IEWebTip = function () {
  if (getStore({ name: 'IEWebTip' }) !== 2) {
    if (getIEVersion() !== -1) {
      setStore({ name: 'IEWebTip', content: 1, type: 'session' })
    } else {
      setStore({ name: 'IEWebTip', content: 2, type: 'session' })
      return
    }
  } else {
    return
  }

  if (getStore({ name: 'IEWebTip' }) === 1) {
    const h = this.$createElement;
    const msg = this.$message.warning({
      message: h('span', [
        h('span', { style: { color: '#E6A23C' } }, '为了更好的操作体验, 本系统建议您使用非IE内核的浏览器！'),
        h('a', {
          style: { cursor: 'pointer', 'margin-left': '0.5em' },
          on: {
            click: () => {
              setStore({ name: 'IEWebTip', content: 2, type: 'session' })
              msg.close()
            }
          }
        }, '不再提示'),
        h('a', {
          style: { cursor: 'pointer', 'margin-left': '0.5em' },
          on: { click: () => msg.close() }
        }, '关闭'),
      ]),
      dangerouslyUseHTMLString: true,
      customClass: 'custom-message',
      duration: 0,
      offset: 2
    });
  }
}

new Vue({
  store, 
  router,
  render: h => h(App),
}).$mount('#app')
