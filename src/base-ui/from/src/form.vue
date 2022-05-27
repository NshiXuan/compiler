<template>
  <div class="from">
    <el-form :model="modelValue" label-width="auto">
      <template v-for="item in formItem" :key="item.label">
        <el-form-item :label="item.label" :style="{ padding: '0 40px' }">
          <el-input
            :model-value="modelValue[`${item.filed}`]"
            @update:modelValue="handleValueChange($event, item.filed)"
          />
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formItem: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'updateBtnClick'])

const handleValueChange = (value: any, filed: string) => {
  emits('update:modelValue', { ...props.modelValue, [filed]: value })
  emits('updateBtnClick')
}
</script>

<style scoped></style>
