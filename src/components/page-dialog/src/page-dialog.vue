<template>
  <div class="page-dialog">
    <el-dialog
      v-model="dialogVisible"
      title="修改"
      width="30%"
      @close="cancleHandler"
    >
      <sx-from :form-item="formItem" v-model="formData" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancleHandler">取消</el-button>
          <el-button type="primary" @click="confirmHandler">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineExpose, defineEmits } from 'vue'
import SxFrom from '@/base-ui/from'

const props = defineProps({
  formItem: {
    type: Array,
    required: true
  }
})

let dialogVisible = ref(false)
let obj = {}
for (const item of props.formItem) {
  obj[`${item.filed}`] = ''
}
const formData = ref(obj)

const emits = defineEmits(['confirmUpdate'])
const confirmHandler = () => {
  emits('confirmUpdate', formData, dialogVisible)
}

const cancleHandler = () => {
  dialogVisible.value = false
  formData.value = { id: '', newKeyword: '' }
}

const changeDialogVisible = () => {
  dialogVisible.value = true
}

defineExpose({
  changeDialogVisible,
  formData,
  dialogVisible
})
</script>

<style scoped></style>
