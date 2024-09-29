const accessKey = '9g2T6mQON_wPHwNtCu2di_oo_-e9J3FXvo5TMrR5DHU';
const photoContainer = document.getElementById('photo-container');
const searchInput = document.getElementById('search-input');
const clearSearch = document.getElementById('clear-search');
const searchIcon = document.getElementById('search-icon');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.getElementById('close-modal');

async function fetchPhotos(query = '') {
    let url = `https://api.unsplash.com/photos?client_id=${accessKey}&per_page=12`;

    if (query) {
        url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${query}&per_page=12`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const photos = query ? data.results : data;

    displayPhotos(photos);
}

function displayPhotos(photos) {
    photoContainer.innerHTML = '';

    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.urls.small;
        img.alt = photo.alt_description || 'Unsplash Photo';
        photoContainer.appendChild(img);
    });
}

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchPhotos(searchInput.value);
    }
});

searchIcon.addEventListener('click', () => {
    fetchPhotos(searchInput.value);
});

clearSearch.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.placeholder = 'Search for photos...';
    fetchPhotos();
});

window.onload = () => {
    fetchPhotos();
    searchInput.focus();
    searchInput.autocomplete = 'off';
};

photoContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        modal.style.display = 'flex';
        modalImg.src = event.target.src;
    }
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});