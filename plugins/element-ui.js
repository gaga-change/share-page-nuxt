import Vue from 'vue'
import { Button } from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
Vue.prototype.$ELEMENT = { size: 'small', locale };

// Vue.use(Element, { locale })
Vue.use(Button)