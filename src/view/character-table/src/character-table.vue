<template>
  <div class="character-table">
    <page-table :tableData="CharacterTableData">
      <template #footerBtn>
        <el-button>查询</el-button>
        <el-button @click="updateBtnHandler">修改</el-button>
      </template>
    </page-table>
    <page-dialog
      ref="pageDialogRef"
      :formItem="formItem"
      @confirmUpdate="confirmUpdateHandler"
    ></page-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import pageTable from '@/components/page-table'
import PageDialog from '@/components/page-dialog'
import { formItem } from '../config/form-config'
import updateContent from '@/view/hooks/updateContent'
import localCache from '@/utils/cache'

let CharacterTableData = ref(localCache.getCache('character'))

const pageDialogRef = ref<InstanceType<typeof PageDialog>>()
const updateBtnHandler = () => {
  pageDialogRef.value?.changeDialogVisible()
}

const confirmUpdateHandler = (formData: any, dialogVisible: any) => {
  updateContent(formData, CharacterTableData, dialogVisible, 'character')
}
</script>

<style scoped lang="less"></style>
