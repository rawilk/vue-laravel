<template>
	<aside class="left-sidebar">
		<component :is="fixed ? 'scrolly' : 'div'" class="scroll-sidebar" parent-scroll>
            <component :is="fixed ? 'scrolly-viewport' : 'div'">
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
                                <!-- nav with children -->
                                <template v-if="item.children && item.children.length">
                                    <sidebar-nav-dropdown :key="index"
                                                          :name="item.name"
                                                          :url="item.url"
                                                          :icon="item.icon"
                                                          top-level
                                    >
                                        <template v-for="(child, childIndex) in item.children">
                                            <!-- second level children -->
                                            <template v-if="child.children && child.children.length">
                                                <sidebar-nav-dropdown
                                                    :key="childIndex"
                                                    :name="child.name"
                                                    :url="child.url"
                                                    :icon="child.icon"
                                                    :accordion-id="`lara-nav-${index}`"
                                                >
                                                    <sidebar-nav-item
                                                        v-for="(innerChild, innerChildIndex) in child.children"
                                                        :key="innerChildIndex"
                                                        :class="child.classes"
                                                    >
                                                        <sidebar-nav-link
                                                            :name="innerChild.name"
                                                            :url="innerChild.url"
                                                            :icon="innerChild.icon"
                                                            :attributes="innerChild.attributes"
                                                            is-child
                                                        >
                                                        </sidebar-nav-link>
                                                    </sidebar-nav-item>
                                                </sidebar-nav-dropdown>
                                            </template>

                                            <!-- main level children -->
                                            <template v-else>
                                                <sidebar-nav-item :key="childIndex" :class="item.classes">
                                                    <sidebar-nav-link
                                                        :name="child.name"
                                                        :url="child.url"
                                                        :icon="child.icon"
                                                        :attributes="child.attributes"
                                                        is-child
                                                    >
                                                    </sidebar-nav-link>
                                                </sidebar-nav-item>
                                            </template>

                                        </template>
                                    </sidebar-nav-dropdown>
                                </template>

                                <!-- top level only -->
                                <template v-else>
                                    <sidebar-nav-item :class="item.classes">
                                        <sidebar-nav-link :name="item.name"
                                                          :url="item.url"
                                                          :icon="item.icon"
                                                          :attributes="item.attributes"
                                        >
                                        </sidebar-nav-link>
                                    </sidebar-nav-item>
                                </template>
                            </template>

                        </template>
                    </ul>
                    <slot></slot>
                </nav>
            </component>
			<scrolly-bar axis="y" v-if="fixed"></scrolly-bar>
		</component>
	</aside>
</template>

<script>
	import SidebarNavDivider from './sidebar-nav-divider';
	import SidebarNavItem from './sidebar-nav-item';
	import SidebarNavLink from './sidebar-nav-link';
	import SidebarNavTitle from './sidebar-nav-title';
	import SidebarNavDropdown from './sidebar-nav-dropdown';
	import { addClass, removeClass } from '../../../../utils/dom';
    import { Scrolly, ScrollyViewport, ScrollyBar } from 'vue-scrolly';

	const FIXED_CSS_CLASS = 'fixed-sidebar';

    export default {
		name: 'backend-sidebar',

		components: {
			SidebarNavDivider,
			SidebarNavItem,
			SidebarNavLink,
		    SidebarNavTitle,
            SidebarNavDropdown,
            Scrolly,
            ScrollyViewport,
            ScrollyBar
		},

		props: {
		    fixed: {
		        type: Boolean,
                default: true
		    },
		    navItems: {
		    	type: Array,
				default: () => ([])
			}
		},

        created () {
            if (this.fixed) {
                addClass(document.body, FIXED_CSS_CLASS);
            }
        },

        beforeDestroy () {
            if (this.fixed) {
                removeClass(document.body, FIXED_CSS_CLASS);
            }
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