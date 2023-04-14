<template>
    <div class="flex-auto justify-center content-center w-screen h-auto">
        <h2 class="text-3xl m-5 font-semibold leading-7 text-gray-900">Pages Management</h2>
        <p class="m-5 text-xl leading-6 text-gray-600">You can create or edit your pages!</p>
        <div class="text-end m-3">
            <router-link
                to="/pages/create"
                type="button"
                class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >New Page</router-link>
        </div>
        <div class="relative overflow-x-auto m-3">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" class="py-3">
                            Link Text
                        </th>
                        <th scope="col" class="py-3">
                            Is Published
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        class="bg-white border-b"
                        v-for="(page, index) in $pages.getAllpages()"
                        :key="index"
                        @click="goToPage(index)"
                    >
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{page.pageTitle}}</th>
                        <td>{{page.link.text}}</td>
                        <td>{{page.published ? 'yes' : 'no'}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


</template>

<script setup>
// ref : literal variable
// reactive : object
import {ref, reactive, inject} from 'vue'
import { useRouter } from 'vue-router';

const $pages = inject('$pages')
const router = useRouter()

function goToPage(index) {
    router.push({path: `pages/${index}/edit`})
}

</script>

<style scoped>
.table.table-hover tr:hover {
    cursor: pointer;
}
</style>