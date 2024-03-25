<script setup lang="ts">
import { RouterView } from 'vue-router';
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
    width: 100vw;
    overflow: hidden;
}

:root {
    overflow-y: auto;
    overflow-x: hidden;
}

:root body {
    position: absolute;
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-thumb {
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.25);
    background: #bbb;
}

.avatar,
.lang {
    display: flex;
    justify-content: center;

    .childPopper {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 100%;
        gap: 1rem 0;
        user-select: none;

        div:nth-child(n):hover {
            color: var(--el-color-primary);
            cursor: pointer;
        }
    }
}
</style>
