<template>
    <div class="headerBox">
        <div class="left">
            <div class="logo"></div>
        </div>
        <div class="right">
            <div class="avatar"></div>
            <div class="toggleDark">
                <el-switch v-model="isDark" class="switch">
                    <template #active-action>
                        <el-icon color="#000"><Moon /></el-icon>
                    </template>
                    <template #inactive-action>
                        <el-icon color="#000"><Sunny /></el-icon>
                    </template>
                </el-switch>
            </div>
            <!-- <div class="langSwitcher">
                <el-popover placement="bottom" :width="100" trigger="hover">
                    <template #reference>
                        <div class="langSvg">
                            <el-icon>
                                <SvgIcon name="language" color="#333"></SvgIcon>
                            </el-icon>
                        </div>
                    </template>
                </el-popover>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'

const isDark = useDark()
</script>

<style scoped lang="scss">
.headerBox {
    display: flex;
    font-size: 2rem;

    .right {
        display: flex;

        .toggleDark {
            .switch {
                --el-switch-on-color: #2f2f2f;
                --el-switch-off-color: #f1f1f1;
            }

            &:hover {
                --el-switch-border-color: rgb(100, 200, 100);
            }
        }

        .langSwitcher {
            display: flex;
            align-items: center;
        }
    }
}

:deep(.el-switch__action) {
    box-shadow: 2px 2px 6px 0 #0000001a;
}
</style>
