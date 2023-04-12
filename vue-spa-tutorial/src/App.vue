<template>
    <navbar
        :use-dark-nav-bar="useDarkNavBar"
    ></navbar>

    <router-view></router-view>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
    components: {
        Navbar
    },
    data() {
        return {
            useDarkNavBar: true,
        }
    },
    methods: {
        pageCreated(pageObj) {
            this.pages.push(pageObj)
        }
    }
}
</script>