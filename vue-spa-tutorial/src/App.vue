<template>
    <navbar v-if="authenticated"></navbar>
    <router-view v-if="authenticated"></router-view>
    <login v-else="authenticated"></login>
</template>

<script>
/**
 * component map
 * 
 * App.vue
 * ├── Login.vue
 * └── Navbar.vue
 *      └── NavbarLink.vue
 * 
 * vue-router handling (router.js)
 * ├── CreatePage.vue
 * ├── PageEdit.vue
 * ├── PageHome.vue
 * ├── PageViewer.vue
 * ├── Pages.vue
 * └── PagesList.vue
 * 
 */
import Navbar from './components/Navbar.vue'
import Login from './views/Login.vue'

export default {
    // declaration of components that this vue component use
    // declaration of childs component
    components: {
        Navbar, Login
    },

    // injection which class gonna use
    inject: ['$bus'],

    // this will be the data of this vue component, called state
    data() {
        return {
            authenticated: false,
            // this is only for testing purposes no actual app will have this
            // an api call will validate user credentials
            mockAccount: {
                username: "admin",
                password: "1234"
            }
        }
    },

    // declaration methods which this component use 
    methods: {
        setAuthenticated(status) {
            this.authenticated = status
        },
        logout() {
            this.authenticated = false
        }
    },

    // vue life cycle event hook
    created() {
        this.$bus.$on('login', (userInfo) => {
            if (userInfo.username === this.mockAccount.username && userInfo.password === this.mockAccount.password) {
                this.setAuthenticated(true)
            } else {
                alert('invalid username and password')
            }
        })
        this.$bus.$on('logout', () => {
            this.logout()
        })
    }
}
</script>