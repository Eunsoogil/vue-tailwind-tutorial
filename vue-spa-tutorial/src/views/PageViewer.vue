<template>
    <div v-if="page" class="ml-3 mb-5 mt-5">
        <div class="text-4xl mb-3">
            <span>{{page.pageTitle}}</span>
        </div>
        <p>{{page.content}}</p>
    </div>
</template>

<script>

export default {
    props: ['index'],
    inject: ['$pages'],
    created() {
        this.page = this.$pages.getSinglePage(this.index)
    },
    data() {
        return {
            page: null
        }
    },
    watch: {
        index(newIndex, oldIndex) {
            this.page = this.$pages.getSinglePage(newIndex)
        }
    }
}
</script>