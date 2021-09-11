const resource = 'https://jsonplaceholder.typicode.com'
const albumsContainer = document.getElementById('albums');
const albumPhotos = document.getElementById('albumPhotos');
const titlePhoto = document.getElementById('titlePhoto')

async function getAlbums() {
    return await fetch(resource + '/albums')
        .then(res => res.json())
        .catch(err => console.error(err))
}

async function getAlbum(id) {
    return await fetch(resource + `/photos?albumId=${id}`)
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
            titlePhoto.innerHTML = `Фото из альбома ${albumName}`
            albumPhotos.innerHTML = photos
        })
}

function drawAlbums(data) {
    let albums = ''
    data.forEach(el => {
        albums += `<p class="album" data-user-id="${el.userId}" data-id="${el.id}">${el.title}</p>`
    })
    albumsContainer.innerHTML = albums
}

getAlbums()
    .then(res => {
        drawAlbums(res)
        return res
    })
    .then(res => {
        res[0] && showAlbumPhotos(res[0].id, res[0].title)
    })
    .then(() => {
        albumsContainer.addEventListener('click', el => {
            el.target.dataset.id && showAlbumPhotos(el.target.dataset.id, el.target.innerText)
        })
    })