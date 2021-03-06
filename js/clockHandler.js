let date = null; // Déclaration de la variable pour accès global

// Timeouts and intervals references
let timeoutOne = null;
let timeoutTwo = null;
let intervalOne = null;
let intervalTwo = null;

// Gestion click recherche
function searchTime(mode, lat, long) {
    if (mode === 'popup') {
        $.get({
            url: 'clock.php?lat=' + lat + '&long=' + long,
            data: null,
            success: (result) => {
                // Successful AJAX request
                let dataArr = result.split('|');
                if (new Date(dataArr[0]).getTime() > 0) {
                    date = new Date(dataArr[0]);

                    // Reset clock data
                    resetClock();

                    // Initialize clock
                    initAnalogClock("TZ : " + dataArr[1]);
                    setUpMinuteHands();
                    moveSecondHands();
                    initDigitalClock();
                } else {
                    console.log("ERR: Date is not correctly formatted. Returning");
                }
            }
        })
    } else if (mode === 'searchbar') {
        let address = $('#SearchBar_I').val();
        $.get({
            url: 'clock.php?location=' + address,
            data: null,
            success: (result) => {
                if (new Date(result).getTime() > 0) {
                    date = new Date(result);

                    // Reset clock data
                    resetClock();

                    // Initialize clock
                    initAnalogClock(address);
                    setUpMinuteHands();
                    moveSecondHands();
                    initDigitalClock();
                } else {
                    console.log("ERR: Date is not correctly formatted. Returning");
                }
            }
        })
    }
}

/*
 * Initialisation horloge analogique
 */
function initAnalogClock(cityName) {
    // Affichage horloge
    $('.clock-container').removeAttr('hidden');

    // Mise à jour header ville
    $('#cityHeader').html(cityName);

    // Récup valeurs date
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Création tableau aiguilles
    let hands = [
        {
            hand: 'hours',
            angle: (hours * 30) + (minutes / 2)
        },
        {
            hand: 'minutes',
            angle: (minutes * 6)
        },
        {
            hand: 'seconds',
            angle: (seconds * 6)
        }
    ];

    // Loop pour chaque aiguille
    for (let j = 0; j < hands.length; j++) {
        let elements = document.querySelectorAll('.' + hands[j].hand);
        for (let k = 0; k < elements.length; k++) {
            elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
            elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
            // Si aiguille = minute => sauvegarde position
            if (hands[j].hand === 'minutes') {
                elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
            }
        }
    }
}

/*
 * Timeout et démarrage rotation aiguille
 */
function setUpMinuteHands() {
    // Récupération position aiguille
    let containers = document.querySelectorAll('.minutes-container');
    let secondAngle = containers[0].getAttribute("data-second-angle");
    if (secondAngle > 0) {
        // Timeout 1s pour déplacement
        let delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
        timeoutOne = setTimeout(function() {
            moveMinuteHands(containers);
        }, delay);
    }
}

/*
 * Gestion déplacement aiguille minutes
 */
function moveMinuteHands(containers) {
    for (let i = 0; i < containers.length; i++) {
        containers[i].style.webkitTransform = 'rotateZ(6deg)';
        containers[i].style.transform = 'rotateZ(6deg)';
    }
    // Then continue with a 60 second interval
    intervalOne = setInterval(function() {
        for (let i = 0; i < containers.length; i++) {
            if (containers[i].angle === undefined) {
                containers[i].angle = 12;
            } else {
                containers[i].angle += 6;
            }
            containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
            containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
        }
    }, 60000);
}

/*
 * Gestion déplacement aiguille secondes
 */
function moveSecondHands() {
    let containers = document.querySelectorAll('.seconds-container');
    intervalTwo = setInterval(function() {
        for (let i = 0; i < containers.length; i++) {
            if (containers[i].angle === undefined) {
                containers[i].angle = 6;
            } else {
                containers[i].angle += 6;
            }
            containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
            containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
        }
    }, 1000);
}

/*
 * Initialisation horloge digitale
 */
function initDigitalClock(){
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59
        
    let tempH = (h < 10) ? "0" + h : h;
    let tempM = (m < 10) ? "0" + m : m;
    let tempS = (s < 10) ? "0" + s : s;

    let time = tempH + ":" + tempM + ":" + tempS;
    document.getElementById("clock-digital").innerText = time;
    document.getElementById("clock-digital").textContent = time;

    RefreshDigital(h, m, s - 1); // Correction incrément premier call
}

function RefreshDigital(h, m, s) {
    s += 1;
    
    if (s > 59) {
        s = 0;
        m += 1;
        
        if (m > 59) {
            m = 0;
            h += 1;
            
            if (h > 23) {
                h = 0;
            }
        }
    }
            
    let tempH = (h < 10) ? "0" + h : h;
    let tempM = (m < 10) ? "0" + m : m;
    let tempS = (s < 10) ? "0" + s : s;

    let time = tempH + ":" + tempM + ":" + tempS;
    document.getElementById("clock-digital").innerText = time;
    document.getElementById("clock-digital").textContent = time;
    
    timeoutTwo = setTimeout(() => {RefreshDigital(h, m, s)}, 1000);
}

function resetClock() {
    clearInterval(intervalOne);
    clearInterval(intervalTwo);
    clearTimeout(timeoutOne);
    clearTimeout(timeoutTwo);
}