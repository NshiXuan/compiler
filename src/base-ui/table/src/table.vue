<template>
  <div class="table">
    <div class="table-header" style="margin-bottom: 20px">
      <slot name="header"></slot>
    </div>
    <el-table :data="tableArr" border :max-height="maxHeight">
      <el-table-column
        v-if="showID"
        label="ID"
        type="index"
        align="center"
        width="200"
      ></el-table-column>

      <template v-for="item in tableLabel" :key="item.label">
        <el-table-column
          :label="item.label"
          :property="item.props"
          align="center"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

import { ITableArr, ITableLabel } from '../type'

interface IProps {
  tableArr: ITableArr[]
  showID?: boolean
  tableLabel: ITableLabel[]
  maxHeight?: string
}

const props = withDefaults(defineProps<IProps>(), {
  showID: false,
  maxHeight: '550'
})
</script>

<style scoped lang="less">
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
