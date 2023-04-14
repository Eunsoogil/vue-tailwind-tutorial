<template>
    <li>
        <!-- router-link : this gonna act just like a tag -->
        <router-link 
        :to="`/${index}`"
        class="nav-link" 
        active-class="active emphasize"
        :href="page.link.url"
        >{{ page.link.text }}</router-link >
    </li>
</template>

<script>
export default {
    // datas for using this component
    props: ['page', 'index'],
}
</script>

<style scoped>
.emphasize {
    text-decoration: underline !important;
    color: rgb(59 130 246 / var(--tw-text-opacity));
}
</style>