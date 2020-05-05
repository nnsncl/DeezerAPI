$(document).ready(() => {

    let liked = JSON.parse(localStorage.getItem("like")) || []

    if(liked.length != 0) {
        
        for (let i = 0; i < liked.length; i++) {
        
            // Cards builder
            $("#playlist-stack").append("<div id=card" + [i] + " class=card></div>")
            $("#card" + [i]).append("<div id=card-header" + [i] + " class=card-header>"
            + "<img src=" + liked[i].trackCover + " class=cover>"
            + "<a id=like" + [i]
            + " class=likes-active ><ion-icon name=heart></ion-icon></a></div>")
    
            $("#card" + [i]).append("<div id=desc-content" + [i] + "class=card-body>"
            + "<p><strong>" + liked[i].trackTitle + " </strong></p>"
            + "<p>" + liked[i].trackArtist + "</p>"
            + "<p>" + liked[i].trackAlbum + "</p></div>")
             
            $("#card"+[i]).append("<audio controls id=audio-player" + [i]
            + " class=audio-player src="
            + liked[i].trackPlayer + "></audio></div>")
            
        }
    
    } else {
        $(".cards-stack").html(
              "<div><p>Vous n'avez pas enregistrer de musique dans votre playlist.</p>"
            + "<a href='search.html' class='button-primary'>Creer une playlist</a></div>"
            )
    }

    
})