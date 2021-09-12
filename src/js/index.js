const resource = 'https://jsonplaceholder.typicode.com'
const albumsContainer = document.getElementById('albums');
const albumPhotos = document.getElementById('albumPhotos');
const titlePhoto = document.getElementById('titlePhoto')

function getAlbums() {
    return fetch(resource + '/albums')
        .then(res => res.json())
        .catch(err => console.error(err))
}

function getAlbum(id) {
    return fetch(resource + `/photos?albumId=${id}`)
        .then(res => res.json())
        .catch(err => console.error(err))
}
async function showAlbumPhotos(id, albumName) {
    await getAlbum(id)
        .then(res => {
            let photos = ''
            res.forEach(photo => {
                photos += `<div class="card"><img src="${photo.thumbnailUrl}" alt="${photo.title}"></div>`
            })
            titlePhoto.innerText = `Фото из альбома ${albumName}`
            albumPhotos.innerHTML = photos
        })
}

function drawAlbums(data) {
    let albums = ''
    data.forEach(el => {
        albums += `<li class="album" data-user-id="${el.userId}" data-id="${el.id}">${el.title}</li>`
    })
    albumsContainer.innerHTML = albums
}

getAlbums()
    .then(res => {
        drawAlbums(res)
        res[0] && showAlbumPhotos(res[0].id, res[0].title)
    })
albumsContainer.addEventListener('click', el => {
    if (el.target.nodeName === 'LI') {
        el.target.dataset.id && showAlbumPhotos(el.target.dataset.id, el.target.innerText)
    }
})