<template>
    <div class="headerBox">
        <div class="left">
            <div class="logo">logo</div>
        </div>
        <div class="right">
            <div class="avatar">
                <el-avatar>
                    <template #default>
                        <i-ep-UserFilled />
                    </template>
                </el-avatar>
            </div>
            <div class="toggleDark">
                <el-switch v-model="isDark" class="switch">
                    <template #active-action>
                        <el-icon color="#000"><i-ep-moon /></el-icon>
                    </template>
                    <template #inactive-action>
                        <el-icon color="#000"><i-ep-sunny /></el-icon>
                    </template>
                </el-switch>
            </div>
            <div class="langSwitcher">
                <el-popover placement="bottom" trigger="hover">
                    <template #reference>
                        <div class="langSvg">
                            <el-icon>
                                <SvgIcon name="language" color="#333"></SvgIcon>
                            </el-icon>
                        </div>
                    </template>
                    <div class="langBox">
                        <div>简体中文</div>
                        <div>English (US)</div>
                    </div>
                </el-popover>
            </div>
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
    align-items: center;
    font-size: 2rem;

    .left {
        display: flex;
        background-color: var(--el-color-primary);
    }

    .right {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: auto;

        .toggleDark {
            padding-left: 2rem;
            .switch {
                --el-switch-on-color: #2f2f2f;
                --el-switch-off-color: #f1f1f1;
            }

            &:hover {
                --el-switch-border-color: var(--el-color-primary);
            }
        }

        .langSwitcher {
            display: flex;

            .langSvg {
                display: flex;
                padding-left: 2rem;
            }

            .langBox {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 20rem 0;
            }
        }
    }
}

:deep(.el-switch__action) {
    box-shadow: 2px 2px 6px 0 #0000001a;
}
</style>
