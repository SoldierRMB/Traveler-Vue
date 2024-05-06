<template>
    <div class="qrCode">
        <QrcodeVue
            :size="250"
            :value="props.value"
            :foreground="'#64c864'"
        />
    </div>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'

const props = defineProps({
    value: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.qrCode {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>

