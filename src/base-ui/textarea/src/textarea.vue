<template>
  <div class="textarea">
    <el-input
      type="textarea"
      :autosize="{ minRows: 28 }"
      :model-value="modelValue"
      @update:modelValue="handleValueChange"
      @blur="handleBlurChange"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import localCache from '@/utils/cache'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue'])

const handleValueChange = (value: any) => {
  emits('update:modelValue', value)
}

const handleBlurChange = () => {
  console.log(props.modelValue)

  localCache.setCache('textareaValue', props.modelValue)
}
</script>

<style scoped lang="less">
.el-input {
  width: 100%;
}
</style>
