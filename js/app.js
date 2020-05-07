$(document).ready(() => {

    // Start this function when the form is submited.
    $("#search-form").submit((e) => {
        e.preventDefault()

        // Get the value of the input field
        const userInput = $('#user-input').val().toLowerCase()
        // Check the option selected in the select element in ordrer to filter searched tracks by type.
        const filters = $('#filter-input').find('option:selected')
        // Get the value of the option selected.
        let filteredOption = filters.val()

        // Api Call, it includes the value of the user input (search?q=) and the value of the option selected (&order=jsonp) before the submit.
        $.ajax({
            url: "https://api.deezer.com/search?q=" + userInput + "&order=" + filteredOption + "&output=jsonp",
            dataType: 'jsonp'
        }).done((tracks) => {

            const renderSearchDOM = () => {
                // Refresh cards-stack on new search
                $("#cards-stack").empty()
                // Prepare an index for each datas we fetch, like so, we're able to manipulate (filter, find,...) each elements easily.
                for (let i = 1; i < tracks.data.length; i++) {

                    // Cards Rendered Datas from API (album, title, artist.name, album.title, preview).
                    const trackCover = tracks.data[i].album.cover
                    trackTitle = tracks.data[i].title
                    trackArtist = tracks.data[i].artist.name
                    trackAlbum = tracks.data[i].album.title
                    trackPlayer = tracks.data[i].preview

                    // Object for localStorage, an ID is added in order to interact with this object.
                    const likedTrack = {
                        trackID: tracks.data[i].id,
                        trackCover: tracks.data[i].album.cover,
                        trackTitle: tracks.data[i].title,
                        trackArtist: tracks.data[i].artist.name,
                        trackAlbum: tracks.data[i].album.title,
                        trackPlayer: tracks.data[i].preview
                    }

                    const generateStack = () => {
                        // Cards builder using template string
                        $(".cards-stack").append(
                            // when ${i} is added, we add the index of the track right after the initial Class name
                            `<div id="card${i}" class="card">
                                <div id="card-header${i}" class="card-header">
                                <img src="${trackCover}" class="cover">
                                <a id="like${i}" class="likes">
                                    <ion-icon name="heart" role="img" class="md hydrated" aria-label="heart"></ion-icon>
                                </a>
                            </div>
                            <div id="desc-content${i} class=card-body">
                                <p class="text-emphasis">${trackTitle}</p>
                                <p>${trackArtist}</p>
                                <p>${trackAlbum}</p>
                            </div>
                            <audio controls="" id="audio-player${i}" class="audio-player" src="${trackPlayer}"></audio>
                            </div>`)
                    }

                    generateStack()

                    const likeService = () => {
                        // User Interaction + localStorage (Must refactor)
                        $(`#card${i}`).find(`#like${i}`).click(function () {

                            // Prevent reload on click
                            event.preventDefault()

                            const addLike = () => {

                                // https://stackoverflow.com/questions/26273043/cannot-read-property-push-of-null
                                let liked = JSON.parse(localStorage.getItem("like")) || []
                                liked.push(likedTrack)
                                localStorage.setItem("like", JSON.stringify(liked))
                                // Push the new Object generated on click to the Local Storage array

                                console.log(`${tracks.data[i].title} has been Liked`)
                                console.log(likedTrack)

                                // Add Class and .likes-active remove .Likes to prevent CSS pothetical anomaly
                                $(this).toggleClass("likes-active")
                                $(this).removeClass("likes")
                            }

                            const removeLike = () => {
                                
                                let storedLikes = localStorage.getItem("like")
                                storedLikes = JSON.parse(storedLikes)

                                 // Filter every trackID's Objects properties
                                storedLikes = storedLikes.filter(storedLikes =>
                                    storedLikes.trackID != likedTrack.trackID
                                )
                               
                                // Remove the filtered Object from Local Storage
                                localStorage.setItem("like", JSON.stringify(storedLikes))

                                console.log(`${tracks.data[i].title} has been Disliked`)
                                console.log(likedTrack)

                                $(this).removeClass("likes-active")
                                $(this).toggleClass("likes")
                            }

                            // If it's liked, on click, remove the .likes class & vice versa
                            $(this).hasClass("likes") ? addLike() : removeLike()

                        })
                    }
                    
                    likeService()

                }
            }

            const noTracksFound = () => {
                $(".cards-stack").html("<h6>Aucun resultat correspondant à votre recherche</h6>")
            }

            // If the user Input isn't empty and the API returns data, execture enderSearchDOM(), else, display the error message
            userInput.length != 0 && tracks.data.length != 0 ? renderSearchDOM() : noTracksFound()

        })
    })
})