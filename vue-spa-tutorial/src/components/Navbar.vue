<template>
    <nav 
        class="bg-white border-gray-200 dark:bg-gray-900"
        :class="navbarClasses" 
    >
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" class="flex items-center">
                <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" class="h-8 mr-3" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <router-link 
                        to="/"
                        class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" 
                        active-class="active emphasize"
                        >Home</router-link >
                    </li>
                    <li>
                        <router-link 
                        to="/pages"
                        class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" 
                        active-class="active emphasize"
                        >Pages Management</router-link >
                    </li>
                    <template
                        v-for="(page, index) in getPages"
                    >
                        <navbar-link
                            v-if="page.published" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            :page="page"
                            :index="index"
                        >
                        </navbar-link>
                    </template>
                </ul>
            </div>
            <button 
                type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                @click.prevent="sendLogOutEvent"
            >Logout</button>
        </div>
    </nav>
</template>

<script>
import NavbarLink from './NavbarLink.vue';

export default {
    components: {
        NavbarLink
    },
    inject: ['$pages', '$bus'],
    props: ['useDarkNavBar'],
    computed: {
        navbarClasses() {
            return {
                'navbar-light bg-light': !this.useDarkNavBar, 
                'navbar-dark bg-dark': this.useDarkNavBar
            }
        },
        getPages() {
            return this.pages
        }
    },
    data() {
        return {
            pages: []
        }
    },
    methods: {
        sendLogOutEvent() {
            this.$bus.$emit('logout', true)
        }
    },
    created() {
        this.pages = this.$pages.getAllpages()
        this.$bus.$on('page-updated', () => {
            // this.pages = this.$pages.getAllpages()
            // give new array
            this.pages = [...this.$pages.getAllpages()]
        })
        this.$bus.$on('page-created', () => {
            this.pages = [...this.$pages.getAllpages()]
        })
        this.$bus.$on('page-deleted', () => {
            this.pages = [...this.$pages.getAllpages()]
        })
    }
}
</script>

<style scoped>
.emphasize {
    text-decoration: underline !important;
    color: rgb(59 130 246 / var(--tw-text-opacity)) !important;
}
</style>