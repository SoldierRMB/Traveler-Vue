<template>
    <div class="containerBox">
        <el-container>
            <el-header class="header">
                <Header></Header>
            </el-header>
            <el-main class="main">
                <Main></Main>
            </el-main>
            <el-footer class="footer">
                <Footer></Footer>
            </el-footer>
        </el-container>
    </div>
    <el-backtop :bottom="150" />
</template>

<script setup lang="ts">
import Header from '@/components/common/Header.vue';
import Main from '@/components/common/Main.vue';
import Footer from '@/components/common/Footer.vue';
</script>

<style scoped lang="scss">
.containerBox {
    display: flex;
    min-height: 100vh;
}

.header {
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-bottom: 1px solid #d6d6d6;
}

.main {
    display: flex;
    justify-content: center;
    width: 100%;
    // background-color: #f3f5f5;
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 10rem;
    width: 100%;
    border-top: 1px solid #d6d6d6;
}
</style>
