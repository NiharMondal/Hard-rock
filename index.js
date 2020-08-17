

let searchInput = document.getElementById('search-input')
let searchBtn = document.getElementById('search-btn')
let suggestionList = document.getElementById("suggestion-list")
let lyricsList = document.getElementById("lyrics-list")

// lyrics suggestion
searchInput.addEventListener("keypress", event => {

    let url = `https://api.lyrics.ovh/suggest/${event.target.value + event.key}`


    fetch(url)
        .then(res => res.json())
        .then(data => {

            for (let i = 1; i <= 5; i++) {
                document.getElementById("title" + i).innerText = data.data[i].title;
                document.getElementById("artist" + i).innerText = data.data[i].artist.name;


                let title = data.data[i].title
                let artist = data.data[i].artist.name
                document.getElementById("lyricsBtn" + i).addEventListener("click", (event) => {
                    
                    let secondUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`
                    fetch(secondUrl, event)
                        .then(res => res.json(event))
                        .then(data => {
                            
                            let str = data.lyrics.split("_");
                            let [a, b, c] = str;
                            if (str.length > 10) {
                                document.getElementById("lyrics-boxTitle").innerText = `${a} ${b} ${c}`
                            }
                            document.getElementById("textContent").innerText = data.lyrics;
                        });
                    document.getElementById("lyrics-box").style.display = "block"
                })
            }
            suggestionList.style.display = "block"
        })
})

// all matched lyrics

searchBtn.addEventListener('click', event => {
    if (searchInput.value.length < 1) {

        let searchInput = document.getElementById("searchInput")
        searchInput.value = "type a lyrics name"
        searchInput.style.color = "red"
        document.getElementById("lyrics-list").style.display = "none"

    } else {
        searchInput.style.color = "black"
        let url = `https://api.lyrics.ovh/suggest/${searchInput.value}`
        document.getElementById("lyrics-box").style.display = "none"
        for (let i = 1; i <= 10; i++) {
            document.getElementById("textContent" + i).style.display = "none"
        }
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.data.length == 0) {
                    document.getElementById("alertUnavailable").innerHTML = `<h4 style="color:red; text-align:center">We are so sorry that <br>
            this lyrics is not available, now</h4>`
                } else {
                    for (let i = 1; i < data.data.length; i++) {

                        document.getElementById("lyricsTitle" + i).innerHTML = data.data[i].title;
                        document.getElementById("lyricsArtist" + i).innerHTML = data.data[i].artist.name;

                        lyricsList.style.display = "block"
                        let count = 1;
                        document.getElementById("getLyricsBtn" + i).addEventListener("click", event => {

                            let textContent = document.getElementById("textContent" + i)

                            let title = data.data[i].title
                            let artist = data.data[i].artist.name
                            let secondUrl = `https://api.lyrics.ovh/v1/${artist}/${title}`
                            fetch(secondUrl)
                                .then(res => res.json())
                                .then(data => {
                                    // console.log(data.lyrics)
                                    if (data.lyrics == undefined) {
                                        textContent.innerHTML = `<p style="color:red; text-align:center;">At this time, this lyrics is not available , Please try again later</p>`
                                        textContent.style.display = "block"

                                    } else {
                                        if (count % 2 !== 0) {
                                            textContent.innerHTML = data.lyrics
                                            textContent.style.display = "block"

                                            count++
                                        } else {
                                            textContent.style.display = "none"
                                            count++
                                        }

                                    }

                                })

                        })

                    }
                }
            })

        suggestionList.style.display = "none"

    }

})
