// implement data handle function together
// it is good for using API handling and using each components

const pagesKey = 'pages'

let pageJson = localStorage.getItem(pagesKey)
let pagesStore = {}

if (pageJson === null) {
    fetch('/mockup/pages.json')
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem(
                pagesKey, JSON.stringify(data)
            )
            pageJson = localStorage.getItem(pagesKey)
            pagesStore = JSON.parse(pageJson)
        })
} else {
    pagesStore = JSON.parse(pageJson)
}

function save() {
    localStorage.setItem(pagesKey, JSON.stringify(pagesStore))
}

export default {
    addPage(page) {
        pagesStore.push(page)
        save()
    },

    getAllpages() {
        return pagesStore
    },

    getSinglePage(index) {
        return pagesStore[index]
    },

    editPage(index, page) {
        pagesStore[index] = page
        save()
    },

    removePage(index) {
        pagesStore.splice(index, 1)
        save()
    }
}