
/---Home Page---/
const videoCardContainer = document.querySelector('.home_page_content');
let api_key = "AIzaSyCrN8FgTfy9vumGBYQj5R3pV-8HcUof_kE";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
let a = 0;

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet,statistics, contentDetails',
    chart: "mostPopular",
    maxResults: 30,
}))

.then(res => res.json())
.then(data => {
    console.log(data);
    let token = data.nextPageToken;
    data.items.forEach(item => {
        getChannelIcon(item);
    })

    window.addEventListener('scroll',  () => {
        let scrollable = document.documentElement.scrollHeight - window.innerHeight;
        let scrolled = window.scrollY;
        console.log("scrollable = ", scrollable);
        console.log("Scrolled = ", Math.ceil(scrolled));

        if (Math.ceil(scrolled) === (scrollable)) {
                fetch(video_http + new URLSearchParams({
                    key: api_key,
                    part: 'snippet,statistics, contentDetails',
                    chart: "mostPopular",
                    maxResults: 10,
                    pageToken: token,
                }))
        
                .then(res => res.json())
                .then(data => {
                console.log(data);
                token = data.nextPageToken;
                console.log(token);
                data.items.forEach(item => {
                getChannelIcon(item);
                    })
                })
        }
    });
})

.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet, contentDetails',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        console.log.apply(video_data)
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.high.url;
        makeVideoCard(video_data);
    })
}

top_slide_fun = () => {
    let slide_scrollable = document.getElementById("top_slide").scrollWidth;
    let slide_scrolled_left = document.getElementById("top_slide").scrollLeft;
    
    if (slide_scrolled_left > 10) {

    }
    else if (slide_scrolled_left < 10){
        
    }
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="home_grid_items" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <div class="home_grid_item_inner">
                <div class="home_thumbnail_div">
                    <img src="${data.snippet.thumbnails.high.url}"/>
                    <iframe class="hover_video" width = "310px"
                    height = "290px" src="" allow="autoplay" 
                    onmouseover="this.src='https://www.youtube.com/embed/${data.id}?autoplay=1&mute=1&controls=0'" 
                    onmouseout="this.src=''">
                    </iframe>
                    <span class="timestamp">
                    ${(() => {
                        let time_text = data.contentDetails.duration;
                        let hours_pattern = RegExp(/\d+H/);
                        let hours = time_text.match(hours_pattern);
                        let hour = JSON.stringify(hours);
                        hour = hour.match(/\d+/);
                        let minutes_pattern = RegExp(/\d+M/);
                        let minutes = time_text.match(minutes_pattern);
                        let minute = JSON.stringify(minutes);
                        minute = minute.match(/\d+/);
                        let seconds_pattern = RegExp(/\d+S/);
                        let seconds = time_text.match(seconds_pattern);
                        let second = JSON.stringify(seconds);
                        second = second.match(/\d+/);
                        if (hours === null){
                            if (minutes === null){
                                if (seconds === null){
                                    return '';
                                }else if (second > 10){
                                    return '0:'+second;
                                } else {
                                    return '0:0' + second;
                                }
                            }
                            else if (seconds === null){
                                return minute + ':00';
                            }
                            else {
                                if (second > 10){
                                    return minute +':'+ second;
                                }
                                else {
                                    return minute + ':0' + second;
                                }
                            }
                        }
                        else{
                            if (minutes === null){
                                return hour+':00:'+second;
                            }
                            else if (seconds === null){
                                return hour+':'+minute + ':00';
                            }
                            else {
                                return hour+':'+minute +':'+ second;
                            }
                        }
                    })()}
                    </span>
                    <span class="keep_hovering_text">Keep hovering to play</span>
                </div>
                <div class="home_video_detail_div">
                    <div class="video_detail_profile" title="${data.snippet.channelTitle}">
                        <img src="${data.channelThumbnail}">
                    </div>
                    <div class="home_video_detail">
                        <p class="v_title" title="${data.snippet.title}">${data.snippet.title}</p>
                        <p class="c_name">${data.snippet.channelTitle} 
                            <span class="tooltiptext">&nbsp&nbsp&nbsp${data.snippet.channelTitle}&nbsp&nbsp&nbsp</span>
                            <img src="https://i.ibb.co/d5TbbGD/yt-verified.png" alt="yt-verified" border="0">
                        </p>
                        <span>${(() =>{
                            let num = data.statistics.viewCount;
                            function numFormatter(num) {
                                if(num > 999 && num < 10000){
                                    return (num/1000).toFixed(1) + 'K';
                                }
                                else if(num < 1000000){
                                    return (num/1000).toFixed(0) + 'K'; // convert to K for number from > 1000 < 1 million 
                                }else if(num < 1000000000){
                                    return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
                                }else if(num > 1000000000){
                                    return (num/1000000000).toFixed(1) + 'B'; // convert to M for number from > 1 million 
                                }
                                else if(num < 900){
                                    return num; // if value < 1000, nothing to do
                                }
                            }

                            let views = numFormatter(num);
                            return views;
                        })()} Views • 
                        ${(() => {
                            let vid_time = data.snippet.publishedAt;
                            let ago = moment(vid_time, "YYYY-MM-DDTHH-mm-ssZ").fromNow();
                            return ago;
                        })()}
                        </span>
                        <div class="red_text">
                            <p>
                                ${(() => {
                                    let vid_a = data.snippet.liveBroadcastContent;
                                    if(vid_a === 'live') {
                                        return 'Live';
                                    }
                                    else if(vid_a === 'premiere') {
                                        return 'Premiere';
                                    }
                                    else {return ''}
                                })()}
                            </p>
                        </div>
                    </div>
                    <div class="invisible_menu" type="button">⋮</div>
                </div>
                <div class="hover_grid_items">
                    <div><img class="hover_img1" src="https://i.ibb.co/thxq7KT/watch-later.png" alt="watch-later" border="0">WATCH LATER</div>
                    <div><img class="hover_img2" src="https://i.ibb.co/8Bw6T0v/add-library.png" alt="add-library" border="0">ADD TO QUEUE</div>
                </div>
            </div>
        </div>
    </div>
    `
}

/---Home Page---/

function openNav() {
    var x = document.getElementById("mySidebar").style.width;
    if (x === 0)
    {
    document.getElementById("mySidebar").style.width = "240px";
    document.getElementById("main").style.ColumnGap = "3px";
    document.getElementById("main").style.RowGap = "30px";
    document.getElementById("main").classList.remove("new_main");
    }
    else if (x === "0px")
    {
    document.getElementById("mySidebar").style.width = "240px";
    document.getElementById("main").style.ColumnGap = "3px";
    document.getElementById("main").style.RowGap = "30px";
    document.getElementById("main").classList.remove("new_main");
    }
    else if (x === "240px") 
    {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").classList.add("new_main");
    }
    else 
    {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").classList.add("new_main");
    }
  }

  function openNav2() {
    var h_w = document.getElementById("mySidebar").style.width;
    if (h_w === 0) {
        document.getElementById("mySidebar").style.width = "240px";
        document.getElementById("top_slide").style.marginLeft = "240px";
        document.getElementById("top_slide").style.width = "cal(100vw-240px)";
        document.getElementById("home_main").style.marginLeft = "240px";
    }

    else if (h_w === "0px"){
        document.getElementById("mySidebar").style.width = "240px";
        document.getElementById("top_slide").style.marginLeft = "240px";
        document.getElementById("top_slide").style.width = "cal(100vw-240px)";
        document.getElementById("home_main").style.marginLeft = "240px";
    }

    else if (h_w === "240px") {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("top_slide").style.marginLeft = "70px";
        document.getElementById("top_slide").style.width = "100vw";
        document.getElementById("home_main").style.marginLeft = "105px";
        document.getElementsByClassName("home_grid_items").style.width = "345px";
    }
    else {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("top_slide").style.marginLeft = "70px";
        document.getElementById("top_slide").style.width = "100vw";
        document.getElementById("home_main").style.marginLeft = "105px";
        document.getElementsByClassName("home_grid_items").style.width = "345px";
    }
}

  let darkMode = localStorage.getItem("darkMode");

  if (darkMode == "enabled") {
      document.body.classList.toggle("dark_theme");
      theme_icon.src = "https://i.postimg.cc/rFK6sGj8/sun.png";
      for(var i=1; i<=36; i++){
          var el = document.getElementById("icon_color" + i);
          el.style.webkitFilter = "invert(100%) sepia(100%) saturate(0%) hue-rotate(214deg) brightness(102%) contrast(104%)";
          }
  }

  var icon = document.getElementById("theme_icon");

  function theme_toggle() {
      document.body.classList.toggle("dark_theme");
      if (document.body.classList.contains("dark_theme")) {
          theme_icon.src = "https://i.postimg.cc/rFK6sGj8/sun.png";
          localStorage.setItem("darkMode", "enabled");
          doFilter1();
      }
      else {
          theme_icon.src = "https://i.ibb.co/8D0240B/moon.png";
          localStorage.setItem("darkMode", "disabled");
          doFilter2();
      }

      function doFilter1() {
          for(var i=1; i<=36; i++){
          var el = document.getElementById("icon_color" + i);
          el.style.webkitFilter = "invert(100%) sepia(100%) saturate(0%) hue-rotate(214deg) brightness(102%) contrast(104%)";
          }
      }

      function doFilter2() {
          for(var i=1; i<=36; i++){
          var el = document.getElementById("icon_color" + i);
          el.style.webkitFilter = "invert(0%) sepia(100%) saturate(15%) hue-rotate(246deg) brightness(105%) contrast(105%)";
          }
      }
  }