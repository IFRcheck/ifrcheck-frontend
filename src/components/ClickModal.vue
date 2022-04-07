<template>
	<div class="modal" :class="isActive ? 'is-active' : ''">
		<div class="modal-background" @click="$emit('handle', '')"></div>
		<div class="modal-content">
			<div class="box">
				<slot></slot>
			</div>
		</div>
		<button aria-label="close-Button" class="modal-close is-large" @click="$emit('handle', '')"></button>
	</div>
</template>

<script>
	export default {
		props: {
			isActive: {
				default: false,
				type: Boolean,
			},
		},
	};
</script>
