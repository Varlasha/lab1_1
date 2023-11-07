let lastShownPhotoNumber = 1;
let interval;

function countPhotos() {
    const imgFolder = 'img/';
    const imgExtension = '.png';
    let counter = 0;
    for (let i = 1;; i++) {
        const imgPath = imgFolder + 'pic' + i + imgExtension;
        const http = new XMLHttpRequest();
        http.open('HEAD', imgPath, false);
        http.send();
        if (http.status === 404) {
            break;
        }
        counter++;
    }
    return counter;
}

function showPhoto() {
    const photo = document.getElementById('photo');
    photo.innerHTML = '<img src="img/pic1.png" alt="photo)" style="height: 300px; width: 300px;">';
    lastShownPhotoNumber = 1;
}

function showRandPhoto() {
    const photo = document.getElementById('photo');
    const imgFolder = 'img/';
    const imgExtension = '.png';
    let photoNumber;
    do {
        photoNumber = Math.floor(Math.random() * countPhotos()) + 1;
    } while (photoNumber === lastShownPhotoNumber);
    const photoPath = imgFolder + 'pic' + photoNumber + imgExtension;
    photo.innerHTML = `<img src="${photoPath}" alt="photo)" style="height: 300px; width: 300px;">`;
    lastShownPhotoNumber = photoNumber;
}

function addPhoto() {
    const photo = document.getElementById('photo');
    const imgFolder = 'img/';
    const imgExtension = '.png';
    const numOfPhotos = countPhotos();
    for (let i = 0; i < numOfPhotos; i++) {
        if (photo.innerHTML.indexOf('pic' + (i + 1) + '.png') === -1) {
            const photoPath = imgFolder + 'pic' + (i + 1) + imgExtension;
            photo.innerHTML += '<img src="' + photoPath + '" alt="photo" style="height: 300px; width: 300px;">';
            return;
        }
    }
}

function startTimer() {
    const intervalField = document.getElementById('interval');
    const intervalTime = intervalField.value * 1000;
    interval = setInterval(showRandPhoto, intervalTime);
}

function stopTimer() {
    clearInterval(interval);
}

function validateInterval() {
    const intervalInput = document.getElementById('interval');
    if (intervalInput.value < 1) {
        intervalInput.value = 1;
    }
}