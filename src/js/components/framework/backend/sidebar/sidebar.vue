<template>
	<aside class="left-sidebar">
		<div class="scroll-sidebar">
			<nav class="sidebar-nav">
				<div slot="header"></div>

				<ul class="sidebarnav">
					<template v-for="(item, index) in navItems">
						<!-- title -->
						<template v-if="item.title">
							<sidebar-nav-title :key="index" :name="item.name" :class="item.classes" :wrapper="item.wrapper"></sidebar-nav-title>
						</template>

						<!-- divider -->
						<template v-else-if="item.divider">
							<sidebar-nav-divider :key="index" :classes="item.classes"></sidebar-nav-divider>
						</template>

						<!-- nav item -->
						<template v-else>
							<sidebar-nav-item :class="item.classes">
								<sidebar-nav-link :name="item.name" :url="item.url" :icon="item.icon" :attributes="item.attributes"></sidebar-nav-link>
							</sidebar-nav-item>
						</template>

					</template>
				</ul>
				<slot></slot>
			</nav>
		</div>
	</aside>
</template>

<script>
	import SidebarNavDivider from './sidebar-nav-divider';
	import SidebarNavItem from './sidebar-nav-item';
	import SidebarNavLink from './sidebar-nav-link';
	import SidebarNavTitle from './sidebar-nav-title.js';

	export default {
		name: 'backend-sidebar',

		components: {
			SidebarNavDivider,
			SidebarNavItem,
			SidebarNavLink,
		    SidebarNavTitle
		},

		props: {
		    navItems: {
		    	type: Array,
				default: () => ([])
			}
		},
	};
</script>