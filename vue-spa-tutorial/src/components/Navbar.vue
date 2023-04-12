<template>
    <nav 
        class="navbar navbar-expand-lg d-flex"
        :class="navbarClasses" 
    >
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto">
                <template
                    v-for="(page, index) in getPages"
                >
                    <navbar-link
                        v-if="page.published" class="nav-item"
                        :page="page"
                        :index="index"
                    >
                    </navbar-link>
                </template>
                <li>
                    <router-link 
                    to="/pages"
                    class="nav-link" 
                    active-class="active"
                    >Pages</router-link >
                </li>
            </ul>
            <form class="d-flex">
                <button 
                    class="btn btn-primary" 
                    @click.prevent="useDarkNavBar = !useDarkNavBar"
                >Toggle Nav Bar</button>
            </form>
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