<template>
	<svg aria-hidden="true">
		<use
			:xlink:href="iconName"
			:fill="color" />
	</svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: false,
	},
});

const iconName = computed(() => {
	return `#icon-${props.name}`;
});
</script>
<style scoped lang="scss">
.svg-icon {
	fill: currentColor;
}
</style>
