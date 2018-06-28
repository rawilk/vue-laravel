<template>
	<b-affix class="header-affix" fix-to="body" :enabled="fixed" :minimum-offset="1">
		<header class="topbar">
			<nav class="navbar top-navbar navbar-expand-md navbar-light">
				<!-- logo -->
				<div class="navbar-header">
					<a :href="homeEndpoint" class="navbar-brand">
						<!-- logo icon -->
						<b><slot name="logoIcon"></slot></b>
						<!-- logo text -->
						<span><slot name="logoText"></slot></span>
					</a>
				</div>

				<div class="navbar-collapse">
					<ul class="navbar-nav mr-auto mt-md-0">
						<!--<li class="nav-item">-->
							<!--<a class="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark">-->
								<!--t-->
							<!--</a>-->
						<!--</li>-->
						<li class="nav-item">
							<a class="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark"
							   @click.prevent="toggleMiniSidebar"
							>
								<i class="mdi mdi-menu"></i>
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	</b-affix>
</template>

<script>
	import { addClass, removeClass } from '../../../../utils/dom';
	import { getItem, setItem } from '../../../../utils/localStorage';

	const FIXED_CSS_CLASS = 'fixed-header';
	const MINI_SIDEBAR_CLASS = 'mini-sidebar';

	export default {
		name: 'backend-header',

		props: {
			allowMiniSidebar: {
			    type: Boolean,
				default: true
			},
			/**
			 * This is a unique key to use
			 * for local storage for each app.
			 * -- Can be anything you want it to be,
			 * -- This just provides a way to reduce conflicts
			 * -- with other apps that may be using this framework
			 */
			appKey: {
			    type: String,
				default: ''
			},
			fixed: {
				type: Boolean,
				default: true
			},
		    homeEndpoint: {
		    	type: String,
				default: '#'
			},
		},

		data () {
		    return {
		        sidebarKey: `${this.appKey}_lara_vue_mini_sidebar_state`
		    };
		},

		created () {
		    if (this.fixed) {
		    	addClass(document.body, FIXED_CSS_CLASS);
		    }

		    if (this.allowMiniSidebar) {
			    // Initialize the mini sidebar
			    this.initMiniSidebar();
		    }
		},

		methods: {
			/**
			 * Make sidebar mini if true in local storage.
			 */
			initMiniSidebar () {
				const isMini = getItem(this.sidebarKey, false);
				if (isMini) {
					addClass(document.body, MINI_SIDEBAR_CLASS);
				}
			},

			/**
			 * Determines if the mini sidebar should be toggled.
			 *
			 * @returns {boolean}
			 */
			shouldMiniSidebarToggle () {
				if (! this.allowMiniSidebar) {
					return false;
				}

			    const width = window.innerWidth;

			    return width > 1170;
			},

			/**
			 * Toggle the state of sidebar.
			 */
		    toggleMiniSidebar () {
		    	// Do nothing if it doesn't make sense to toggle
				if (! this.shouldMiniSidebarToggle()) {
					return false;
				}

		    	// Get current state of mini sidebar
		        const isMini = getItem(this.sidebarKey, false);

				const body = document.body;
				isMini ? removeClass(body, MINI_SIDEBAR_CLASS) : addClass(body, MINI_SIDEBAR_CLASS);

		        // Set new state of mini sidebar
				setItem(this.sidebarKey, ! isMini);
		    },
		},

		watch: {
		    fixed (fixed, oldValue) {
		        if (fixed !== oldValue) {
		        	fixed ? addClass(document.body, FIXED_CSS_CLASS) : removeClass(document.body, FIXED_CSS_CLASS);
		        }
		    },
		},
	};
</script>