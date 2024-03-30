<template>
    <div class="headerBox">
        <div class="left">
            <div class="logo">Traveler</div>
            <div class="searchBox">
                <el-input v-model="search" placeholder="✨搜索点旅游相关的吧" class="search">
                    <template #prepend>
                        <el-cascader
                            ref="optionsRef"
                            :props="props"
                            @change="handleChange()"
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
                <el-dropdown @command="$router.push">
                    <el-avatar>
                        <template #default>
                            <i-ep-user-filled />
                        </template>
                    </el-avatar>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <div class="show" v-show="isAuthenticated">
                                <el-dropdown-item command="/home"> 个人中心 </el-dropdown-item>
                                <el-dropdown-item @click="logout"> 退出登录 </el-dropdown-item>
                            </div>
                            <div class="hidden" v-show="!isAuthenticated">
                                <el-dropdown-item command="/login"> 登录 </el-dropdown-item>
                            </div>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
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
                <el-dropdown @command="changeLanguage">
                    <div class="langSvg">
                        <el-icon size="20">
                            <SvgIcon name="language" color="#ababab" />
                        </el-icon>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="zh-cn"> 简体中文 </el-dropdown-item>
                            <el-dropdown-item command="en"> English (US) </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="searchButton">
                <el-button type="primary" circle>
                    <template #icon>
                        <el-icon size="2rem" color="#fff"><i-ep-search /> </el-icon>
                    </template>
                </el-button>
            </div>
            <div class="github">
                <el-icon @click="redirectToGithub">
                    <SvgIcon name="github" size="20" />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18nStore } from '@/stores/i18n';
import { useDark, useToggle } from '@vueuse/core';
import { apiGetProvinces, apiGetCitiesByProvinceCode } from '@/api/guest';
import { useAuthStore } from '@/stores/auth';
import type { ProvinceVO, CityVO } from '@/types/interfaces';
import type { CascaderProps } from 'element-plus';

const authStore = useAuthStore();
const isAuthenticated = authStore.isAuthenticated;
const logout = () => {
    authStore.$reset();
    location.reload();
};

const i18nStore = useI18nStore();
const changeLanguage = (language: string) => {
    i18nStore.language = language;
};

const search = ref('');

const isDark = useDark();
const toggleDark = useToggle(isDark);

const optionsRef = ref();

const props: CascaderProps = {
    lazy: true,
    lazyLoad: async (node, resolve) => {
        if (node.level === 0) {
            // 加载省份数据
            const provinces = await apiGetProvinces();
            const data = provinces.data.map((province: ProvinceVO) => ({
                value: province.code,
                label: province.name,
                leaf: false, // 设置为 false 表示此级别的选项不是叶子节点
                children: [] // 存储城市数据的数组，初始为空
            }));
            resolve(data);
        } else if (node.level === 1) {
            // 加载城市数据
            const cities = await apiGetCitiesByProvinceCode(node.value as number);
            const data = cities.data.map((city: CityVO) => ({
                value: city.code,
                label: city.name,
                leaf: true // 设置为 true 表示此级别的选项是叶子节点
            }));
            // 将加载的城市数据添加到相应的省份选项的 children 属性中
            const province = optionsRef.value.getCheckedNodes();
            province.children = data;
            resolve(data);
        }
    }
};

const handleChange = async () => {
    const node = optionsRef.value.getCheckedNodes()[0].value;
    console.log(node);
};

const redirectToGithub = () => {
    window.open('https://github.com/SoldierRMB/Traveler', '_blank');
};
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
            font:
                italic 3rem 'Fira Sans',
                serif;
            letter-spacing: 2px;
            color: var(--el-color-primary);
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
            user-select: none;
        }

        .searchBox {
            display: flex;
            flex: auto;
            align-items: center;
            padding-left: 2rem;

            .search {
                width: 40rem;
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

        .searchButton {
            display: none;
            padding-left: 2rem;
        }

        .github {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            padding-left: 2rem;
        }
    }
}

:deep(.el-switch__action) {
    box-shadow: 2px 2px 6px 0 #0000001a;
}

:deep(.el-dropdown-menu__item) {
    justify-content: center;
    align-items: center;
    padding: 0.5rem 2rem;
}

:deep(.el-tooltip__trigger:focus-visible) {
    outline: unset;
}

@media screen and (max-width: 768px) {
    .left {
        .search {
            display: none;
        }
    }

    .right {
        .langSwitcher {
            display: none !important;
        }

        .searchButton {
            display: block !important;
        }
    }
}
</style>
