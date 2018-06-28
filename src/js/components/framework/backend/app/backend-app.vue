<template>
	<div id="main-wrapper">
		<slot name="header"></slot>

		<div class="content-wrapper">
			<slot name="sidebar"></slot>

			<!-- content -->
			<div class="main-content-wrapper">
				<div class="page-wrapper">
					<b-container fluid>
						<slot name="pageHeader"></slot>
						<slot></slot>
					</b-container>
				</div>

				<slot name="footer"></slot>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'backend-app'
	};
</script>