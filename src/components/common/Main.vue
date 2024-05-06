<template>
    <div class="menuBox">
        <el-menu :default-active="route.path" mode="horizontal" class="menu" router>
            <el-menu-item index="/post">旅游动态</el-menu-item>
            <el-menu-item index="/booking">景点订票</el-menu-item>
        </el-menu>
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped lang="scss">
.menuBox {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 20rem;

    .menu {
        margin-bottom: 2rem;
    }
}

:deep(.el-menu-item:hover) {
    background-color: transparent !important;
}

:deep(.el-menu-item.is-active) {
    background-color: transparent !important;
}

@media screen and (max-width: 1200px) {
    .menuBox {
        padding: 0 10rem;
    }
}

@media screen and (max-width: 768px) {
    .menuBox {
        padding: 0 5rem;
    }
}

@media screen and (max-width: 480px) {
    .menuBox {
        padding: 0;
    }
}
</style>
