console.log("Welcome to my media player");

//initialize the variables
let songindex = 0;
let audioelement = new Audio("songs/1.mp3");
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songitem = Array.from(document.getElementsByClassName("songitem"));



let songs = [
    { songname: "Enemy", filepath: "songs/1.mp3", coverpath: "cover/1.jpeg" },
    { songname: "Legends Never Die", filepath: "songs/2.mp3", coverpath: "cover/2.jpeg" },
    { songname: "Phoenix", filepath: "songs/3.mp3", coverpath: "cover/3.jpeg" },
    { songname: "Rise", filepath: "songs/4.mp3", coverpath: "cover/4.jpeg" },
    { songname: "Warriors", filepath: "songs/5.mp3", coverpath: "cover/5.jpeg" },
    { songname: "Awaken", filepath: "songs/6.mp3", coverpath: "cover/6.jpeg" },
    { songname: "Burn It All Down", filepath: "songs/7.mp3", coverpath: "cover/7.jpeg" },
    { songname: "Dynasties and dystopia", filepath: "songs/8.mp3", coverpath: "cover/8.jpeg" },
    { songname: "I'll Show You", filepath: "songs/9.mp3", coverpath: "cover/9.jpeg" },
    { songname: "Playground", filepath: "songs/10.mp3", coverpath: "cover/10.jpeg" },
]
songitem.forEach((elments, i) => {
    elments.getElementsByTagName("img")[0].src = songs[i].coverpath;
    elments.getElementsByClassName("songname")[0].innerText = songs[i].songname;
})

// audioelement.play();


//handle play/pause click
masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

    }
})


//listen to events
audioelement.addEventListener('timeupdate', () => {
    // update seek bar
    progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    myprogressbar.value = progress;

});

myprogressbar.addEventListener('change', () => {
    audioelement.currentTime = (myprogressbar.value * audioelement.duration) / 100;

})

const makeallplays = () => {
    Array.from(document.getElementsByClassName('fa-songitemplay')).forEach((elements) => {
        elements.classList.remove('fa-circle-pause');
        elements.classList.add('fa-circle-play');

    })


}
Array.from(document.getElementsByClassName('fa-songitemplay')).forEach((elements) => {
    elements.addEventListener('click', (e) => {
        makeallplays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioelement.src = `songs/${songindex + 1}.mp3`;
        mastersongname.innerText = songs[songindex].songname;
        audioelement.currentTime = 0;
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;



    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songindex >= 9) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    audioelement.src = `songs/${songindex + 1}.mp3`;
    mastersongname.innerText = songs[songindex].songname;
    audioelement.currentTime = 0;
    audioelement.play();
    gif.style.opacity = 1;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = 0;
    }
    else {
        songindex -= 1;
    }
    audioelement.src = `songs/${songindex + 1}.mp3`;
    mastersongname.innerText = songs[songindex].songname;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})