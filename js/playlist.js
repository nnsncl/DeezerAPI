$(document).ready(() => {

    let liked = JSON.parse(localStorage.getItem("like")) || []
    const storedLikes = localStorage.getItem("like")

    const generatePlaylistDOM = () => {

        // Create a new index to render each likes from Local Storage
        for (let i = 0; i < liked.length; i++) {

            // Cards builder using template string
            $(".cards-stack").append(
                `<div id="card${i}" class="card">
                    <div id="card-header${i}" class="card-header">
                    <img src="${liked[i].trackCover}" class="cover">
                    <a id="like${i}" class="likes-active">
                        <ion-icon name="heart" role="img" class="md hydrated" aria-label="heart"></ion-icon>
                    </a>
                    </div>
                    <div id="desc-content${i} class=card-body">
                        <p class="text-lg">${liked[i].trackTitle}</p>
                        <p>${liked[i].trackArtist}</p>
                        <p class="text-xs">${liked[i].trackAlbum}</p>
                    </div>
                    <audio controls="" id="audio-player${i}" class="audio-player" src="${liked[i].trackPlayer}"></audio>
                </div>`)

            // Target the click event on click event
            $(`#like${i}`).on("click", liked[i].trackID, function (e) {

                // Check if the ID of the clicked element match with a track ID from tracks in local Storage and remove it
                liked = liked.filter(likedID => likedID.trackID !== e.data)
                // Remove the card relative the the ID removes in Local Storage
                localStorage.setItem("like", JSON.stringify(liked))

                // Check if there is likes stored, if not, reload the page to display createPlaylistCTA(), if the first condition isn't true, then remove the card 
                liked && liked.length == 0 ? location.reload() : $(this).closest(".card").remove()
            })
        }
    }

    const createPlaylistCTA = () => {
        $(".centered-container").append(`
            <div class="flashbag-alert">
                <ion-icon class="is-bouncing text-lg" name="alert-outline"></ion-icon>
                <h3>Vous n'avez pas enregistré de favoris dans votre playlist.</h3>
                <p class="mb-30 text-xs">Pour enregistrer des favoris dans votre playlist, cliquez sur le bouton ci-dessous.</p>
                <a href='search.html' class='button-line'>Ajouter des favoris</a>
            </div>
        `)
    }

    liked.length != 0 ? generatePlaylistDOM() : createPlaylistCTA()

})