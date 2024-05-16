<template>
    <div class="payment">
        <el-radio-group v-model="payment" class="paymentGroup">
            <el-radio value="1" size="large">
                <el-icon size="40">
                    <SvgIcon name="alipay" />
                </el-icon>
                支付宝
            </el-radio>
            <el-radio value="2" size="large">
                <el-icon size="40">
                    <SvgIcon name="wechat" />
                </el-icon>
                微信
            </el-radio>
            <el-radio value="3" size="large">
                <el-icon size="40">
                    <SvgIcon name="paypal" />
                </el-icon>
                PayPal
            </el-radio>
            <el-radio value="4" size="large">
                <el-icon size="30" style="padding: 0.5rem">
                    <SvgIcon name="credit-card" />
                </el-icon>
                信用卡
            </el-radio>
        </el-radio-group>
        <el-image :src="paymentQrCode" v-if="payment === '1' || payment === '2'" />
        <el-button type="info" v-if="payment === '3'">跳转到PayPal</el-button>
        <div class="creditInputs" v-if="payment === '4'">
            <el-input placeholder="信用卡卡号" v-model="creditId" />
            <el-input placeholder="CVV代码" v-model="cvv" />
        </div>
        <el-button type="primary" class="paymentButton" @click="completePayment">
            已完成支付
        </el-button>
    </div>
</template>

<script setup lang="ts">
import { apiCompletePayment } from '@/api/tourist';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
const alipay = new URL(`../../assets/imgs/alipay.jpg`, import.meta.url).href;
const wechat = new URL(`../../assets/imgs/wechat.jpg`, import.meta.url).href;

const payment = ref('1');

const paymentQrCode = computed(() => {
    if (payment.value === '1') {
        return alipay;
    } else if (payment.value === '2') {
        return wechat;
    }
});

const creditId = ref();
const cvv = ref();

const username = useAuthStore().user.sub as string;

const props = defineProps({
    orderId: String
});

const completePayment = async () => {
    const orderId = props.orderId as string;
    await apiCompletePayment(orderId, username).then((res) => {
        if (res.status === 200) {
            router.push(`/success/${orderId}`);
        }
    });
};
</script>

<style lang="scss" scoped>
.payment {
    display: flex;
    flex-direction: column;

    .paymentGroup {
        display: flex;
        align-items: center;
    }

    :deep(.el-radio__label) {
        display: flex;
        align-items: center;
    }

    .creditInputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .paymentButton {
        margin-top: 1rem;
        width: 10rem;
    }

    .el-button + .el-button,
    .el-checkbox.is-bordered + .el-checkbox.is-bordered {
        margin-left: 0px;
    }
}
</style>
