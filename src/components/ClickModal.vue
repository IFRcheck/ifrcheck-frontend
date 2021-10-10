<template>
	<div class="modal" :class="isActive ? 'is-active' : ''">
		<div class="modal-background"></div>
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
			type: Boolean
		},
	},
}
</script>
