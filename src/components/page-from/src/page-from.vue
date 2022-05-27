<template>
  <div class="page-from">
    <el-row>
      <el-col :span="8" :offset="8">
        <el-card>
          <sx-form
            v-model="formData"
            :form-item="formItem"
            @updateBtnClick="changeHandler"
          ></sx-form>
          <div class="footerBtns">
            <slot name="footerBtns"></slot>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineExpose, defineEmits } from 'vue'
import localCache from '@/utils/cache'
import SxForm from '@/base-ui/from'

const props = defineProps({
  formItem: {
    type: Array,
    required: true
  }
})

let formData = ref(
  localCache.getCache('fromData') || {
    identifier: 'ID',
    reservedWord: '标识符子集，内部表示',
    unsignedInt: 'INTC',
    singleCharacter: '单字符界限符',
    doubleCharacter: ':=',
    firstNote: '{',
    lastNote: '}',
    startOrEnd: "'",
    arrayCharacter: '..'
  }
)

const emits = defineEmits(['changeDisabled'])
const changeHandler = () => {
  emits('changeDisabled')
}

defineExpose({
  formData
})
</script>

<style scoped lang="less">
.page-from {
  .footerBtns {
    display: flex;
    justify-content: center;
  }
}
</style>
