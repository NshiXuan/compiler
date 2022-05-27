<template>
  <div class="page-content">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card>
          <sx-textarea v-model="formData"></sx-textarea>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="img" v-if="imgShow"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <sx-table v-bind="mainTableData"></sx-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults } from 'vue'
import SxTextarea from '@/base-ui/textarea'
import SxTable from '@/base-ui/table'

import localCache from '@/utils/cache'
import { ITableData } from '@/base-ui/table'

const porps = withDefaults(
  defineProps<{ mainTableData: ITableData; imgShow?: boolean }>(),
  {
    imgShow: false
  }
)

const formData = ref(localCache.getCache('textareaValue') || '')
</script>

<style scoped lang="less">
.page-content {
  margin-top: 20px;

  .el-card {
    height: 100%;

    .img {
      width: 100%;
      height: 610px;
      background: url('../../../../public/img/lexical-analysis.png') no-repeat;
      background-size: cover;
    }
  }
}
</style>
