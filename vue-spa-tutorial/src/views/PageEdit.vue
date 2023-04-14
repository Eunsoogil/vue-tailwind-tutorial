<template>

    <form action="" class="w-screen p-10">
        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-3xl mb-3 font-semibold leading-7 text-gray-900">Edit {{ pages.pageTitle }} Page</h2>
            <p class="mt-1 text-xl leading-6 text-gray-600">You can edit your {{ pages.pageTitle }} page!</p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div class="sm:col-span-3">
                    <label for="" class="block text-sm font-medium leading-6 text-gray-900">Page Title</label>
                    <div class="mt-2">
                        <input v-model="page.pageTitle" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="" class="block text-sm font-medium leading-6 text-gray-900">Link Text</label>
                    <div class="mt-2">
                        <input v-model="page.link.text" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="col-span-full">
                    <label for="" class="block text-sm font-medium leading-6 text-gray-900">Content</label>
                    <div class="mt-2">
                        <textarea v-model="page.content" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="offers" class="block text-sm font-medium leading-6 text-gray-900">Published</label>
                    <div class="mt-2">
                        <input v-model="page.published" id="offers" name="offers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    </div>
                </div>

            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm font-semibold leading-6 text-gray-900"
                @click.prevent="goToPageList"
            >Cancel</button>
            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click.prevent="submit"
            >Edit Page</button>
            <button type="submit" class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click.prevent="deletePage"
            >Delete Page</button>
        </div>
    </form>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const router = useRouter()
const pages = inject('$pages')
const bus = inject('$bus')

const {index} = defineProps(['index'])

let page = pages.getSinglePage(index)

function submit() {
    pages.editPage(index, page)
    bus.$emit('page-updated', {
        index,
        page
    })
    goToPageList()
}

function deletePage() {
    pages.removePage(index)
    bus.$emit('page-deleted', {index})
    goToPageList()
}

function goToPageList() {
    router.push({path: '/pages'})
}

</script>