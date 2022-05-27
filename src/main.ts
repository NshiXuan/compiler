import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'

import { keywordTableData } from './view/keyword-table/config/table-config'
import { CharacterTableData } from './view/character-table/config/table-config'
import { singleTableData } from './view/single-character/config/table-config'
import localCache from './utils/cache'

const app = createApp(App)
app.use(router)

localCache.setCache('keyword', keywordTableData)
localCache.setCache('character', CharacterTableData)
localCache.setCache('single', singleTableData)

app.mount('#app')
