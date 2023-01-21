function openNav() {
    var x = document.getElementById("mySidebar").style.width;
    if (x === 0)
    {
    document.getElementById("mySidebar").style.width = "240px";
    document.getElementById("main").style.marginLeft = "240px";
    document.getElementById("main").style.gridTemplateColumns = "repeat(5, 1fr)";
    document.getElementById("main").style.gridTemplateRows = "repeat(5, 1fr)";
    document.getElementById("main").style.gridColumnGap = "3px";
    document.getElementById("main").style.gridRowGap = "30px";
    document.getElementById("main").style.paddingLeft = "100px";
    document.getElementById("main").style.paddingRight = "400px";
    document.getElementById("top_row").style.paddingLeft = "340px";
    document.getElementById("top_row").style.paddingRight = "120px";
    }
    else if (x === "0px")
    {
    document.getElementById("mySidebar").style.width = "240px";
    document.getElementById("main").style.marginLeft = "240px";
    document.getElementById("main").style.gridTemplateColumns = "repeat(5, 1fr)";
    document.getElementById("main").style.gridTemplateRows = "repeat(5, 1fr)";
    document.getElementById("main").style.gridColumnGap = "3px";
    document.getElementById("main").style.gridRowGap = "30px";
    document.getElementById("main").style.paddingLeft = "100px";
    document.getElementById("main").style.paddingRight = "400px";
    document.getElementById("top_row").style.paddingLeft = "340px";
    document.getElementById("top_row").style.paddingRight = "120px";

    }
    else if (x === "240px") 
    {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("main").style.gridTemplateColumns = "repeat(6, 1fr)";
    document.getElementById("main").style.gridTemplateRows = "repeat(6, 1fr)";
    document.getElementById("main").style.paddingLeft = "150px";
    document.getElementById("main").style.paddingRight = "160px";
    document.getElementById("top_row").style.paddingLeft = "150px";
    document.getElementById("top_row").style.paddingRight = "100px";
    }
    else 
    {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("main").style.gridTemplateColumns = "repeat(6, 1fr)";
    document.getElementById("main").style.gridTemplateRows = "repeat(6, 1fr)";
    document.getElementById("main").style.paddingLeft = "150px";
    document.getElementById("main").style.paddingRight = "160px";
    document.getElementById("top_row").style.paddingLeft = "150px";
    document.getElementById("top_row").style.paddingRight = "100px";
    }
  }

  var icon = document.getElementById("theme_icon");

  theme_icon.onclick = function theme_toggle() {
      document.body.classList.toggle("dark_theme");
      if (document.body.classList.contains("dark_theme")) {
          theme_icon.src = "https://i.postimg.cc/rFK6sGj8/sun.png";
          doFilter1();
        }
      else {
          theme_icon.src = "https://i.ibb.co/8D0240B/moon.png";
          doFilter2();
        }

      function doFilter1() {
          for(var i=1; i<=34; i++){
          var el = document.getElementById("icon_color" + i);
          el.style.webkitFilter = "invert(100%) sepia(100%) saturate(0%) hue-rotate(214deg) brightness(102%) contrast(104%)";
          }
        }

      function doFilter2() {
          for(var i=1; i<=34; i++){
          var el = document.getElementById("icon_color" + i);
          el.style.webkitFilter = "invert(0%) sepia(100%) saturate(15%) hue-rotate(246deg) brightness(105%) contrast(105%)";
        }
        }
  }