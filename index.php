<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="css/style.css" type="text/css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <title>WorldTime</title>
</head>
<body>
	        <header>
            <h1> WORLD CLOCK </h1>
        </header>



        <div id="Containers_Form">
            
            <form action="#" method="POST">
                <div id="Containers_Search">
                    <input id="SearchBar_I" type="search">
                    <i class="fa fa-search"></i>
                </div>
                <img id="location_GPS" class="btnGps" src="img/Location.png" alt="location GPS"/>
            </form>

            
            
            
            <div class="clock-container">
                <h3>Nom Ville</h3>
                <article class="clock">
                    <div class="hours-container">
                        <div class="hours"></div>
                    </div>
                    <div class="minutes-container">
                        <div class="minutes"></div>
                    </div>
                    <div class="seconds-container">
                        <div class="seconds"></div>
                    </div>
                </article>                
                <div id="clock-digital" class="clock-digital" onload="showTime()"></div>
            </div>
            
        </div>

        <!--
        
        function showTime(){
        var date = new Date();
        var h = date.getHours(); // 0 - 23
        var m = date.getMinutes(); // 0 - 59
        var s = date.getSeconds(); // 0 - 59
        var session = "AM";

        if(h == 0){
            h = 12;
        }

        if(h > 12){
            h = h - 12;
            session = "PM";
        }

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        var time = h + ":" + m + ":" + s + " " + session;
        document.getElementById("clock-display").innerText = time;
        document.getElementById("clock-display").textContent = time;

        setTimeout(showTime, 1000);

    }

    showTime();
        
-->
</body>
<script src="js/geoMap.js"></script>
</html>