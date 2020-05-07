$(document).ready(() => {

    let liked = JSON.parse(localStorage.getItem("like")) || []

    if (liked.length != 0) {

        for (let i = 0; i < liked.length; i++) {

            // Cards builder (Need reviews : Add delete from playlist)
            $(".cards-stack").append(
                `<div id="card${i}" class="card">
                    <div id="card-header${i}" class="card-header">
                    <img src="${liked[i].trackCover}" class="cover">
                    <a id="like${i}" class="likes-active">
                        <ion-icon name="heart" role="img" class="md hydrated" aria-label="heart"></ion-icon>
                    </a>
                    </div>
                    <div id="desc-content${i} class=card-body">
                        <p class="text-emphasis">${liked[i].trackTitle}</p>
                        <p>${liked[i].trackArtist}</p>
                        <p>${liked[i].trackAlbum}</p>
                    </div>
                    <audio controls="" id="audio-player${i}" class="audio-player" src="${liked[i].trackPlayer}"></audio>
                </div>`)

            $(`#like${i}`).on("click", liked[i].trackID, function(e) {
                liked = liked.filter(likedID => likedID.trackID !== e.data)
                localStorage.setItem("like", JSON.stringify(liked))
                $(this).closest(".card").remove()
            })
        }

    } else {
        $(".cards-stack").html(
            "<div><p class=mb-30>Vous n'avez pas enregistrer de musique dans votre playlist.</p>"
            + "<a href='search.html' class='button-primary'>Creer une playlist</a></div>"
        )
    }
})