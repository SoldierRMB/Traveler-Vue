<template>
    <div class="headerBox">
        <div class="left">
            <div class="logo">Traveler</div>
            <div class="searchBox">
                <el-input v-model="input" placeholder="✨搜索点旅游相关的吧" class="search">
                    <template #prepend>
                        <el-cascader
                            v-model="cityCode"
                            :options="cities"
                            placeholder="城市"
                        />
                    </template>
                    <template #append>
                        <el-button>
                            <template #icon>
                                <el-icon size="2rem" color="#fff"><i-ep-search /> </el-icon>
                            </template>
                        </el-button>
                    </template>
                </el-input>
            </div>
        </div>
        <div class="right">
            <div class="avatarBox">
                <el-popover trigger="hover" placement="bottom" popper-class="avatar">
                    <template #reference>
                        <el-avatar>
                            <template #default>
                                <i-ep-user-filled />
                            </template>
                        </el-avatar>
                    </template>
                    <div class="childPopper">
                        <div>退出登录</div>
                    </div>
                </el-popover>
            </div>
            <div class="toggleDark">
                <el-switch v-model="isDark" @update="toggleDark" class="switch">
                    <template #active-action>
                        <el-icon color="#000"><i-ep-moon /></el-icon>
                    </template>
                    <template #inactive-action>
                        <el-icon color="#000"><i-ep-sunny /></el-icon>
                    </template>
                </el-switch>
            </div>
            <div class="langSwitcher">
                <el-popover placement="bottom" trigger="hover" popper-class="lang">
                    <template #reference>
                        <div class="langSvg">
                            <el-icon>
                                <SvgIcon name="language" color="#ababab" />
                            </el-icon>
                        </div>
                    </template>
                    <div class="childPopper">
                        <div>简体中文</div>
                        <div>English (US)</div>
                    </div>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const input = ref('')

const cityCode = ref()

interface City {
    value: number
    label: string
}
interface Province {
    value: number
    label: string
    children: City[]
}

const city1: City = {
    value: 1101,
    label: '北京市'
}

const province1: Province = {
    value: 11,
    label: '北京',
    children: [city1]
}

const city2: City = {
    value: 1301,
    label: '石家庄市'
}

const city3: City = {
    value: 1302,
    label: '保定市'
}

const province2: Province = {
    value: 13,
    label: '河北',
    children: [city2, city3]
}

const cities = ref([province1, province2])
</script>

<style scoped lang="scss">
.headerBox {
    display: flex;
    align-items: center;
    font-size: 2rem;

    .left {
        display: flex;
        flex-direction: row;

        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            font: italic 3rem "Fira Sans", serif;
            letter-spacing: 2px;
            color: var(--el-color-primary);
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .searchBox {
            display: flex;
            align-items: center;
            padding-left: 2rem;

            .search {
                width: 50rem;
            }

            &:deep(.el-cascader .el-input__wrapper) {
                padding: 0;
                width: 12rem;
                box-shadow: none;
                background-color: transparent;
            }

            &:deep(.el-cascader .el-input) {
                --el-input-focus-border-color: none;
            }

            &:deep(.el-input-group__prepend) {
                border-radius: 100px 0 0 100px;
                padding-right: 1rem;

                .el-select__suffix > i {
                    display: none;
                }
            }

            &:deep(.el-input-group__append) {
                border-radius: 0 100px 100px 0;
                box-shadow: none;
                background-color: var(--el-color-primary);
            }
        }
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
        }
    }
}

:deep(.el-switch__action) {
    box-shadow: 2px 2px 6px 0 #0000001a;
}
</style>
