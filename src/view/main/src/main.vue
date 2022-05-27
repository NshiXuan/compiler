<template>
  <div class="main">
    <page-content
      :mainTableData="mainTableData"
      :img-show="imgShow"
    ></page-content>
    <page-footer>
      <template #footerBtns>
        <el-button size="large">导入源代码</el-button>
        <el-button size="large" @click="analysisHandler">词法分析</el-button>
        <el-button size="large">导出单词</el-button>
      </template>
    </page-footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageContent from '@/components/page-content'
import PageFooter from '@/components/page-footer'
import localCache from '@/utils/cache'
import { wordAnalysis, mainTableData } from '../config/maintabel-config'

let imgShow = ref(localCache.getCache('imgShow') || false)

const analysisHandler = () => {
  wordAnalysis(imgShow)
}
</script>

<style lang="less" scoped></style>
