
let date = null;

$('#searchBtn').click(() => {
    let address = $('#SearchBar_I').val();
    $.get({
        url: 'clock.php?location=' + address,
        data: null,
        success: (result) => {
            if (new Date(result).getTime() > 0) {
                date = new Date(result);
                initAnalogClock(address);
                setUpMinuteHands();
                moveSecondHands();
            } else {
                // error output
            }
        }
    })
});

function initAnalogClock(cityName) {
    // Show clock container
    $('.clock-container').removeAttr('hidden');

    // Change city name
    $('#cityHeader').html(cityName);

    // Get values
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Create an object with each hand and it's angle in degrees
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
    // Loop through each of these hands to set their angle
    for (let j = 0; j < hands.length; j++) {
        let elements = document.querySelectorAll('.' + hands[j].hand);
        for (let k = 0; k < elements.length; k++) {
            elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
            elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
            // If this is a minute hand, note the seconds position (to calculate minute position later)
            if (hands[j].hand === 'minutes') {
                elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
            }
        }
    }
}

/*
 * Set a timeout for the first minute hand movement (less than 1 minute), then rotate it every minute after that
 */
function setUpMinuteHands() {
    // Find out how far into the minute we are
    let containers = document.querySelectorAll('.minutes-container');
    let secondAngle = containers[0].getAttribute("data-second-angle");
    if (secondAngle > 0) {
        // Set a timeout until the end of the current minute, to move the hand
        let delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
        setTimeout(function() {
            moveMinuteHands(containers);
        }, delay);
    }
}

/*
 * Do the first minute's rotation
 */
function moveMinuteHands(containers) {
    for (let i = 0; i < containers.length; i++) {
        containers[i].style.webkitTransform = 'rotateZ(6deg)';
        containers[i].style.transform = 'rotateZ(6deg)';
    }
    // Then continue with a 60 second interval
    setInterval(function() {
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
 * Move the second containers
 */
function moveSecondHands() {
    let containers = document.querySelectorAll('.seconds-container');
    setInterval(function() {
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

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    
    var tempH = "";
    var tempM = "";
    var tempS = "";
        
    tempH = (h < 10) ? "0" + h : h;
    tempM = (m < 10) ? "0" + m : m;
    tempS = (s < 10) ? "0" + s : s;
    
    var time = tempH + ":" + tempM + ":" + tempS;
    document.getElementById("clock-digital").innerText = time;
    document.getElementById("clock-digital").textContent = time;
    
    RefreshTime(h, m, s);
}

function RefreshTime(h, m, s) {
    console.log("Appel Refresh");
    
    var tempH = "";
    var tempM = "";
    var tempS = "";
    
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
            
    tempH = (h < 10) ? "0" + h : h;
    tempM = (m < 10) ? "0" + m : m;
    tempS = (s < 10) ? "0" + s : s;
    
    var time = tempH + ":" + tempM + ":" + tempS;
    document.getElementById("clock-digital").innerText = time;
    document.getElementById("clock-digital").textContent = time;
    
    setTimeout(() => {RefreshTime(h, m, s)}, 1000);
}