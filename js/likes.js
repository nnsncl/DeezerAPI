$(document).ready(() => {
    $( "#search-form" ).submit((e) => {
        e.preventDefault()

        const userInput = $('#user-input').val()
        let filters = $('#filter-input').find('option:selected')
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
        }).done((tracks) => {

            // Check if userInput is filled and if it returns datas
            if(userInput.length != 0 && tracks.data.length != 0) {

                // Refresh on new Load
                $("#cards-stack").empty()

                // Prepare Cards for stack
                for (let i = 1; i < tracks.data.length; i++) {
                    let trackCover = tracks.data[i].album.cover
                        trackTitle = tracks.data[i].title
                        trackArtist = tracks.data[i].artist.name
                        trackAlbum =  tracks.data[i].album.title
                        trackPlayer = tracks.data[i].preview
                    
                        // Cards builder
                        $("#cards-stack").append("<div id=card" + [i] + " class=card></div>");
                        $("#card"+[i]).append("<div id=card-header" + [i] + " class=card-header>"
                        + "<img src=" + trackCover + " class=cover>"
                        + "<a id=like><ion-icon name=heart></ion-icon></a></div>")

                        $("#card"+[i]).append("<div id=desc-content" + [i] + "class=card-body>"
                        + "<p><strong>" + trackTitle + " </strong></p>"
                        + "<p>" + trackArtist + "</p>"
                        + "<p>" + trackAlbum + "</p></div>")
                        
                        $("#card"+[i]).append("<audio controls id=audio-player" + [i] + " class=audio-player src=" + trackPlayer + "></audio></div>")
                }
               
            } 
            // Render this if the field is empty
            else {
                $("#cards-stack").html("Aucun resultat")
            }
        
        })
    })
})