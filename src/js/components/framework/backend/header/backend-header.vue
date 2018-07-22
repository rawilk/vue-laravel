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
                    <!-- toggle and nav items -->
					<ul class="navbar-nav mr-auto mt-md-0">
                        <slot name="menu-left-before"></slot>
						<!--<li class="nav-item">-->
							<!--<a class="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark">-->
								<!--t-->
							<!--</a>-->
						<!--</li>-->
						<li class="nav-item" v-if="allowMiniSidebar">
							<a class="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark"
							   @click.prevent="toggleMiniSidebar"
							>
								<i :class="sidebarToggleIcon"></i>
							</a>
						</li>

                        <!-- mega menu -->
                        <backend-header-dropdown dropdown-class="mega-dropdown" animation="scale-up-left"
                                                 v-if="hasMegaMenu"
                        >
                            <template slot="button-content">
                                <slot name="mega-menu-icon">
                                    <i class="mdi mdi-view-grid"></i>
                                </slot>
                            </template>
                            <slot name="mega-menu"></slot>
                        </backend-header-dropdown>
                        <slot name="menu-left"></slot>
					</ul>

                    <!-- right side menus -->
                    <ul class="navbar-nav my-lg-0">
                        <slot name="menu-right"></slot>
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
			/**
             * Allow users to collapse and expand the sidebar navigation.
             *
             * @type {boolean}
             */
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

        computed: {
		    /**
             * Determine if a mega menu is present.
             *
             * @returns {boolean}
             */
		    hasMegaMenu () {
		        return !! this.$slots['mega-menu'];
		    },

		    /**
             * Determine the icon that toggles the mini sidebar.
             *
             * @returns {string}
             */
            sidebarToggleIcon () {
                return this.isMini ? 'mdi mdi-arrow-right' : 'mdi mdi-menu';
            },
        },

		data () {
		    return {
		        isMini: false,
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
				this.isMini = getItem(this.sidebarKey, false);

				if (this.isMini) {
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

				// Update new state
                this.isMini = ! this.isMini;
		    },
		},

		watch: {
		    isMini (isMini) {
		        // Update the DOM
                const body = document.body;
                isMini ? addClass(body, MINI_SIDEBAR_CLASS) : removeClass(body, MINI_SIDEBAR_CLASS);

                // Persist new state of mini sidebar to local storage
                setItem(this.sidebarKey, isMini);
		    },

		    fixed (fixed, oldValue) {
		        if (fixed !== oldValue) {
		        	fixed ? addClass(document.body, FIXED_CSS_CLASS) : removeClass(document.body, FIXED_CSS_CLASS);
		        }
		    },
		},
	};
</script>