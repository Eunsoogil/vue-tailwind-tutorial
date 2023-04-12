<template>
    <li>
        <router-link 
        :to="`/${index}`"
        class="nav-link" 
        active-class="active emphasize"
        :href="page.link.url"
        :title="`This link goes to the ${page.link.text} page`"
        >{{ page.link.text }}</router-link >
    </li>
</template>

<script>
export default {
    props: ['page', 'index'],
}
</script>

<!-- scoped : 다른 component로 전파되지 않음 -->
<style scoped>
.emphasize {
    text-decoration: underline !important;
}
</style>