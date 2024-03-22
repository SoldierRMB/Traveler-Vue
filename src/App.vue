<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <RouterView />
</template>

<style lang="css">
* {
    margin: 0;
    padding: 0;
}

html,
body,
#app {
    font-size: 10px;
    height: 100%;
}

.avatar,
.lang {
    display: flex;
    justify-content: center;
    
    .childPopper{
      display: flex;
      flex-direction: column;
      text-align: center;
      width: 100%;
      gap: 1rem 0;

      div:nth-child(n):hover{
        color: var(--el-color-primary);
        cursor: pointer;
      }
    }
}
</style>
