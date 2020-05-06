$(document).ready(() => {

    let storedLikes = localStorage.getItem("like")
    let liked = storedLikes ? JSON.parse(storedLikes) : storedLikes

    if(liked && liked.length > 0) {

        // Generate random number based on the number of tracks liked
        const randomLikeDOM = Math.floor(Math.random() * liked.length)
        liked = liked[randomLikeDOM]


        // Cards builder
        $(".card-stack").append("<div id=card" + randomLikeDOM + " class=card-centered></div>")
        $("#card" + randomLikeDOM).append("<div id=card-header" + randomLikeDOM + " class=card-header>"
        + "<img src=" + liked.trackCover + " class=cover>")

        $("#card" + randomLikeDOM).append("<div id=desc-content" + randomLikeDOM + "class=card-body>"
        + "<p><strong>" + liked.trackTitle + " </strong></p>"
        + "<p>" + liked.trackArtist + "</p>"
        + "<p class=mb-30>" + liked.trackAlbum  + "</p>"
        + "<a id=reload class=button-primary><ion-icon name='refresh'></ion-icon></a></div>")
         
        // Render new random like
        $("#reload").on('click',()=> {
            location.reload()
        })

    } else {
        $(".card-stack").html("<div><a href='search.html' class='button-primary'>Creer une playlist</a></div>")
    }
})