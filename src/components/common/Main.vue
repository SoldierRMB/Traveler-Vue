<template>
    <div class="menu">
        <el-menu :default-active="$route.path" mode="horizontal" router>
            <el-menu-item index="/post">旅游动态</el-menu-item>
            <el-menu-item index="/booking">景点订票</el-menu-item>
        </el-menu>
        <RouterView />
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 20rem;
}

@media screen and (max-width: 1200px) {
    .menu {
        padding: 0 10rem;
    }
}

@media screen and (max-width: 768px) {
    .menu {
        padding: 0 5rem;
    }
}

@media screen and (max-width: 480px) {
    .menu {
        padding: 0;
    }
}
</style>
