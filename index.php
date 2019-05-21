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
        <img src="img/Logo.png" alt="" id="logo"/>
    </header>
    <div id="Containers_Form">
        <div>
            <div id="Containers_Search">
                <input id="SearchBar_I" type="search">
                <i class="fa fa-search" id="searchBtn" onclick="searchTime('searchbar', null, null)"></i>
            </div>
            <img id="location_GPS" class="btnGps" src="img/location.png" alt="Localisation GPS"/>
        </div>

        <div class="clock-container" hidden>
            <h3 id="cityHeader">Nom Ville</h3>
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
            <div id="clock-digital" class="clock-digital"></div>
        </div>
    </div>
</body>
<script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="js/geoMap.js"></script>
<script src="js/clockHandler.js"></script>
</html>