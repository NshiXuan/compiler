<template>
  <div class="word-category">
    <page-from
      :form-item="formItem"
      ref="pageFromRef"
      @changeDisabled="disabledChangeHandler"
    >
      <template #footerBtns>
        <el-button @click="updateHandler" :disabled="isDisabled"
          >修改</el-button
        >
        <el-button :disabled="true">取消</el-button>
      </template>
    </page-from>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageFrom from '@/components/page-from'
import { formItem } from '../config/pagefrom-config'
import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'

const pageFromRef = ref<InstanceType<typeof PageFrom>>()
let isDisabled = ref(true)

const updateHandler = () => {
  localCache.setCache('fromData', pageFromRef.value?.formData)
  isDisabled.value = true
  ElMessage({
    message: '修改成功',
    type: 'success'
  })
}

const disabledChangeHandler = () => {
  isDisabled.value = false
}
</script>

<style scoped lang="less">
.word-category {
  margin-top: 20px;
}
</style>
