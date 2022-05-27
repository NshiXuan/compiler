<template>
  <div class="page-table">
    <el-row>
      <el-col :span="8" :offset="8">
        <el-card>
          <sx-table v-bind="tableData">
            <template #header>
              <slot name="addHandler">注：英文字母区分大小写 </slot>
            </template>
          </sx-table>
          <div class="footerBtns">
            <slot name="footerBtn"></slot>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import SxTable from '@/base-ui/table'
import { ITableData } from '@/base-ui/table'

interface IProps {
  tableData: ITableData
}

const props = defineProps<IProps>()
</script>

<style scoped lang="less">
.page-table {
  margin-top: 20px;

  .footerBtns {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
