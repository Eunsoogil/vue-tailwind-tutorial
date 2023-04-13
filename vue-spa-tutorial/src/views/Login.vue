<template>
    <div class="container d-flex vw-100 vh-100 justify-content-center align-items-center">
        <div id="login">
            <h1>Login</h1>
            <div class="form-inputs">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" v-model="username" placeholder="Username" />
            </div>
            <div class="form-inputs">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" v-model="password" placeholder="Password" />
            </div>
            <button type="button" v-on:click="login()">Login</button>
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
const bus = inject('$bus')

let username = ref('')
let password = ref('')

function login() {
    if(username != "" && password != "") {
        let userInfo = {
            username: username.value,
            password: password.value
        }
        bus.$emit("login", userInfo);
    } else {
        alert("A username and password must be present");
    }
}
</script>

<style>

#login .form-inputs {
    padding-bottom: 10px;
}

#login .form-inputs label {
    padding-right: 10px;
}

</style>