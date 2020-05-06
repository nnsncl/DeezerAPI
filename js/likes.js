$(document).ready( () => {

    $( "#search-form" ).submit((e) => {
        e.preventDefault()

        const userInput = $('#user-input').val().toLowerCase()
        const filters = $('#filter-input').find('option:selected')
        let filteredOption = filters.val()

        // Define how to filter datas
        switch (filteredOption) {
            case 'song':
                filteredOption = 'TRACK_ASC'
                break;
            case 'artist':
                filteredOption = 'ARTIST_ASC'
                break;
            case 'album':
                filteredOption = 'ALBUM_ASC'
                break;
            case 'rating':
                    filteredOption = 'RATING_ASC'
                    break;
            case 'rank':
                filteredOption = 'RANKING'
                break;
            default:
                filteredOption = 'TRACK_ASC'
        }

        $.ajax({
            url : "https://api.deezer.com/search?q=" + userInput + "&order=" + filteredOption +"&output=jsonp",
            dataType : 'jsonp'
        }).done(function(tracks) {

            
            // Check if userInput is filled and if it returns datas
            if(userInput.length != 0 && tracks.data.length != 0) {

                // Refresh on new search
                $("#cards-stack").empty()

                for (let i = 1; i < tracks.data.length; i++) {

                    // Set Cards datas for stc
                    let trackCover = tracks.data[i].album.cover
                        trackTitle = tracks.data[i].title
                        trackArtist = tracks.data[i].artist.name
                        trackAlbum = tracks.data[i].album.title
                        trackPlayer = tracks.data[i].preview

                    // Set Object for localStorage
                    let likedTrack = {
                        trackID : tracks.data[i].id,
                        trackCover : tracks.data[i].album.cover,
                        trackTitle : tracks.data[i].title,
                        trackArtist : tracks.data[i].artist.name,
                        trackAlbum : tracks.data[i].album.title,
                        trackPlayer : tracks.data[i].preview
                    }
                    
                        // Cards builder
                        $("#cards-stack").append("<div id=card" + [i] + " class=card></div>");
                        $("#card" + [i]).append("<div id=card-header" + [i] + " class=card-header>"
                        + "<img src=" + trackCover + " class=cover>"
                        + "<a id=like" + [i]
                        + " class=likes ><ion-icon name=heart></ion-icon></a></div>")

                        $("#card" + [i]).append("<div id=desc-content" + [i] + "class=card-body>"
                        + "<p><strong>" + trackTitle + " </strong></p>"
                        + "<p>" + trackArtist + "</p>"
                        + "<p>" + trackAlbum + "</p></div>")
                        
                        $("#card"+[i]).append("<audio controls id=audio-player" + [i]
                        + " class=audio-player src="
                        + trackPlayer + "></audio></div>")
                        
                        // User Interaction + localStorage (Need reviews)
                        $("#card" + [i]).find("#like" + [i]).click( function(e) {
                            e.preventDefault()

                            if($(this).hasClass("likes")) {
                                $(this).addClass("likes-active")
                                $(this).removeClass("likes")

                                // https://stackoverflow.com/questions/26273043/cannot-read-property-push-of-null
                                let liked = JSON.parse(localStorage.getItem("like")) || []
                                    liked.push(likedTrack)
                                    localStorage.setItem("like", JSON.stringify(liked))

                                console.log(`${tracks.data[i].title} has been Liked`)
                                console.log(likedTrack)

                            } else {
                                $(this).removeClass("likes-active")
                                $(this).addClass("likes")

                                localStorage.removeItem("like")
                                console.log(`${tracks.data[i].title} has been Disliked`)
                                console.log(likedTrack)
                            }

                        })

                } 
            } 

            // Render this if the field is empty or if no datas match
            else {
                $(".cards-stack").html("<h6>Aucun resultat correspondant à votre recherche</h6>")
            }
        
        })
    })
})

