<template>
  <div class="footer">
    <slot name="footerBtns"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.footer {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
