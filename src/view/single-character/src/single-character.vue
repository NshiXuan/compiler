<template>
  <div class="keyword-table">
    <page-table :table-data="singleTableData">
      <template #addHandler>
        <div class="add-content">
          <el-input v-model="inputValue" />
          <el-button @click="addHandler">添加</el-button>
        </div>
      </template>
      <template #footerBtn>
        <el-button>查询</el-button>
        <el-button @click="updateBtnHandler">修改</el-button>
      </template>
    </page-table>
    <page-dialog
      ref="pageDialogRef"
      :form-item="formItem"
      @confirmUpdate="confirmUpdateHandler"
    ></page-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageTable from '@/components/page-table'
import PageDialog from '@/components/page-dialog'
import localCache from '@/utils/cache'
import addContent from '@/view/hooks/addContent'
import { formItem } from '../config/form-config'
import updateContent from '@/view/hooks/updateContent'

const singleTableData = ref(localCache.getCache('single'))
const inputValue = ref('')
const pageDialogRef = ref<InstanceType<typeof PageDialog>>()

const addHandler = () => {
  addContent(inputValue, singleTableData, 'single')
}

const updateBtnHandler = () => {
  pageDialogRef.value?.changeDialogVisible()
}

const confirmUpdateHandler = (formData: any, dialogVisible: any) => {
  updateContent(formData, singleTableData, dialogVisible, 'single')
}
</script>

<style scoped lang="less">
.add-content {
  display: flex;

  .el-form {
    height: 32px;
  }

  .el-button {
    margin-left: 20px;
  }
}
</style>
