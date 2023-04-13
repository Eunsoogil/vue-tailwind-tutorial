<template>
    <navbar
        v-if="authenticated"
        :use-dark-nav-bar="useDarkNavBar"
    ></navbar>

    <router-view v-if="authenticated"></router-view>
    <login-view v-else="authenticated"></login-view>
</template>

<script>
import Navbar from './components/Navbar.vue'
import LoginView from './views/Login.vue'

export default {
    components: {
        Navbar, LoginView
    },
    inject: ['$bus'],
    data() {
        return {
            useDarkNavBar: true,
            authenticated: false,
            // this is only for testing purposes no actual app will have this
            // an api call will validate user credentials
            mockAccount: {
                username: "admin",
                password: "1234"
            }
        }
    },
    methods: {
        pageCreated(pageObj) {
            this.pages.push(pageObj)
        },
        setAuthenticated(status) {
            this.authenticated = status
        },
        logout() {
            this.authenticated = false
        }
    },
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