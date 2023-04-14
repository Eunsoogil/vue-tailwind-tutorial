<template>

    <form action="" class="w-screen p-10">
        <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-3xl mb-3 font-semibold leading-7 text-gray-900">Create Page</h2>
            <p class="mt-1 text-xl leading-6 text-gray-600">You can create your page!</p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div class="sm:col-span-3">
                    <label for="" class="block text-sm font-medium leading-6 text-gray-900">Page Title</label>
                    <div class="mt-2">
                        <input v-model="pageTitle" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="" class="block text-sm font-medium leading-6 text-gray-900">Link Text</label>
                    <div class="mt-2">
                        <input v-model="linkText" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div class="col-span-full">
                    <label for="" class="block text-sm font-medium leading-6 text-gray-900">Content</label>
                    <div class="mt-2">
                        <textarea v-model="content" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="offers" class="block text-sm font-medium leading-6 text-gray-900">Published</label>
                    <div class="mt-2">
                        <input v-model="published" id="offers" name="offers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                    </div>
                </div>

            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm font-semibold leading-6 text-gray-900"
                @click.prevent="goToPageList"
            >Cancel</button>
            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                :disabled="isFormInvalid"
                @click.prevent="submitForm"
            >Save</button>
        </div>
    </form>

</template>

<script setup>
import {inject, ref, computed, watch} from 'vue'
import {useRouter} from 'vue-router'

const bus = inject('$bus')
const pages = inject('$pages')
const router = useRouter()

let pageTitle = ref('')
let content = ref('')
let linkText = ref('')
let published = ref(true)

function submitForm() {
    if (!pageTitle || !content || !linkText) {
        alert('No data')
        return
    }

    let newPage = {
        pageTitle: pageTitle.value,
        content: content.value,
        link: {
            text: linkText.value,
        },
        published: published.value
    }

    pages.addPage(newPage)

    // $ -> public property
    bus.$emit('page-created', newPage)

    router.push({path: '/pages'})
}

function goToPageList() {
    router.push({path: '/pages'})
}

const isFormInvalid = computed(() => !pageTitle || !content || !linkText)

// watch : if data change, then function will start
watch(pageTitle, (newTitle, oldTitle) => {
    if (linkText.value === oldTitle) {
        linkText.value = newTitle
    }
})

</script>