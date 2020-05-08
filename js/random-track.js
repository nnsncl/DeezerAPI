$(document).ready(() => {

    const storedLikes = localStorage.getItem("like")

    let liked = storedLikes ? JSON.parse(storedLikes) : storedLikes

    const generateRandomDOM = () => {
        // Generate random number based on the number of tracks liked
        const randomLikeDOM = Math.floor(Math.random() * liked.length)
        liked = liked[randomLikeDOM]

        // Cards builder
        $(".cards-stack").append(`
            <div id="card${randomLikeDOM}" class="card">
                <div id="card-header${randomLikeDOM}" class="card-header">
                <img src="${liked.trackCover}" class="cover">
                <div>
                    <a id=reload ><ion-icon name='refresh'></ion-icon></a>
                    <a href="playlist.html"><ion-icon class="is-bouncing ml-30" name="heart"></ion-icon></a>
                </div>
            </div>
            <div id="desc-content${randomLikeDOM} class=card-body">
                <p class="text-emphasis">${liked.trackTitle}</p>
                <p>${liked.trackArtist}</p>
                <p class="mb-30">${liked.trackAlbum}</p>
            </div>
            </div>
            `)
    }

    liked && liked.length > 0 ? generateRandomDOM() : $(".cards-stack").html("<a href='search.html' class='button-line'>Créer une playlist</a>")

    // Render new random like
    $("#reload").on('click', () => { location.reload() })

})