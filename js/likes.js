$(document).ready(function(){
    $("#search-form").submit(function(e){
        e.preventDefault()

        // Define user input and filters
        let userInput = $('#title-input').val()
        let filters = $('#filter-input').find('option:selected')
        let selectedFilter = filters.val()

        // Select filters and link it to Deezer API
        switch (selectedFilter) {
            case 'song' : selectedFilter = 'TRACK_ASC'
                break;
            case 'artist' : selectedFilter = 'ARTIST_ASC'
                break;
            case 'album' : selectedFilter = 'ALBUM_ASC'
                break;
            case 'rank' : selectedFilter = 'RANKING'
                break;
        }

        $.ajax({
            url : "https://api.deezer.com/search?q=" + userInput + "&order=" + selectedFilter +"&output=jsonp",
            dataType : 'jsonp'
        }).done(function(tracks) { 
            console.log(tracks)

           
        })
    })
})

