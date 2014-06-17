/**
 * service.js
 *
 * Computer Science 50
 * Problem Set 8
 *
 * Implements a shuttle service.
 */

// default height
var HEIGHT = 0.8;

// default latitude
var LATITUDE = 42.3745615030193;

// default longitude
var LONGITUDE = -71.11803936751632;

// default heading
var HEADING = 1.757197490907891;

// default number of seats
var SEATS = 10;

// default velocity
var VELOCITY = 50;

// global reference to shuttle's marker on 2D map
var bus = null;

// global reference to 3D Earth
var earth = null;

// global reference to 2D map
var map = null;

// global reference to shuttle
var shuttle = null;

// new global reference for passengers
var NewPassengers = new Array();

// global reference for passengers picked up
var pickedup = new Array();

// global reference for points
var points = 0;

// global references for timer
var counter = 300;
var timer = null;
var start = false;

// load version 1 of the Google Earth API
google.load("earth", "1");

// load version 3 of the Google Maps API
google.load("maps", "3", {other_params: "sensor=false"});

// once the window has loaded
$(window).load(function() {
    
    // Start timer when a key is pressed
    $(document.body).keydown(function(event){
        if (start == false)
        {  
            start = true;
            timer = window.setInterval(myTimer,1000);
        }
    });
    
    // listen for keydown anywhere in body
    $(document.body).keydown(function(event) {
        return keystroke(event, true);
    });

    // listen for keyup anywhere in body
    $(document.body).keyup(function(event) {
        return keystroke(event, false);
    });

    // listen for click on Drop Off button
    $("#dropoff").click(function(event) {
        dropoff();
    });

    // listen for click on Pick Up button
    $("#pickup").click(function(event) {
        pickup();
    });

    // load application
    load();
});

// unload application
$(window).unload(function() {
    unload();
});

/**
 * Renders seating chart.
 */
function chart()
{
    var html = "<ol start='0'>";
    for (var i = 0; i < shuttle.seats.length; i++)
    {
        if (shuttle.seats[i] == null)
        {
            html += "<li>Empty Seat</li>";
        }
        else
        {
            // Display passenger picked up, color coded by house
            color = colorChart(pickedup[i].house);
            html += "<li class='" + color + "'>" + shuttle.seats[i] + "</li>";
        }
    }
    html += "</ol>";
    $("#chart").html(html);
}

/**
 * Function to chart color by house name
 */
function colorChart(house)
{
    
    if (house == "Adams House")
    {
        house = "adams";
        return house;
    }
    else if (house == "Cabot House")
    {
        house = "cabot";
        return house;
    }
    else if (house == "Currier House")
    {
        house = "currier";
        return house;
    }
    else if (house == "Dunster House")
    {
        house = "dunster";
        return house;
    }
    else if (house == "Eliot House")
    {
        house = "eliot";
        return house;
    }
    else if (house == "Kirkland House")
    {
        house = "kirkland";
        return house;
    }
    else if (house == "Leverett House")
    {
        house = "leverett";
        return house;
    }
    else if (house == "Lowell House")
    {
        house = "lowell";
        return house;
    }
    else if (house == "Mather House")
    {
        house = "mather";
        return house;
    }
    else if (house == "Pforzheimer House")
    {
        house = "pforzheimer";
        return house;
    }
    else if (house == "Quincy House")
    {
        house = "quincy";
        return house;
    }      
    else if (house == "Winthrop House")
    {
        house = "winthrop";
        return house;
    }
}

/**
 * Drops up passengers if their stop is nearby.
 */
function dropoff()
{
    var dropoff = false;
    
    // make sure there is time left on the clock
    if (counter > 0 && points < 10)
    {
        for (var i in pickedup)
        {   
            var house = pickedup[i].house;
            
            // Calculate distance from shuttle to a passengers house
            var d = shuttle.distance(HOUSES[house].lat,HOUSES[house].lng);
            
            // If close enough to passengers house, drop off
            if (d <= 30)
            {
                // add to points if dropped off
                points++;
                
                // display message when user is dropped off and total points
                $("#announcements").html(pickedup[i].name + " dropped off.<br/><strong>Your point total is: " + points + "</strong>");
                
                if (points < 10)
                {
                    setTimeout(resetMessage,4000);
                }
                
                shuttle.seats[i] = null;
                
                // Call chart function to remove users that were dropped off
                chart();
                dropoff = true;
                
                // If user reaches 10 points game is won
                if (points == 10)
                {
                    $("#announcements").html("<strong>YOU WIN!!</strong>");
                }
            }
        
        }
        
        // If not close enough to a passengers house, display message
        if (dropoff == false)
        {
            $("#announcements").html("You are not close enough to a passengers house!");
            setTimeout(resetMessage,4000);
        }
    }
    
    // If time runs out or game already won display alert message
    else
    {
        alert("Game Over! Refresh page to play again.");
    }
}

/**
 * Called if Google Earth fails to load.
 */
function failureCB(errorCode) 
{
    // report error unless plugin simply isn't installed
    if (errorCode != ERR_CREATE_PLUGIN)
    {
        alert(errorCode);
    }
}

/**
 * Handler for Earth's frameend event.
 */
function frameend() 
{
    shuttle.update();
}

/**
 * Called once Google Earth has loaded.
 */
function initCB(instance) 
{
    // retain reference to GEPlugin instance
    earth = instance;

    // specify the speed at which the camera moves
    earth.getOptions().setFlyToSpeed(100);

    // show buildings
    earth.getLayerRoot().enableLayerById(earth.LAYER_BUILDINGS, true);

    // disable terrain (so that Earth is flat)
    earth.getLayerRoot().enableLayerById(earth.LAYER_TERRAIN, false);

    // prevent mouse navigation in the plugin
    earth.getOptions().setMouseNavigationEnabled(false);

    // instantiate shuttle
    shuttle = new Shuttle({
        heading: HEADING,
        height: HEIGHT,
        latitude: LATITUDE,
        longitude: LONGITUDE,
        planet: earth,
        seats: SEATS,
        velocity: VELOCITY
    });

    // synchronize camera with Earth
    google.earth.addEventListener(earth, "frameend", frameend);

    // synchronize map with Earth
    google.earth.addEventListener(earth.getView(), "viewchange", viewchange);

    // update shuttle's camera
    shuttle.updateCamera();

    // show Earth
    earth.getWindow().setVisibility(true);

    // render seating chart
    chart();

    // populate Earth with passengers and houses
    populate();
}

/**
 * Handles keystrokes.
 */
function keystroke(event, state)
{
    // ensure we have event
    if (!event)
    {
        event = window.event;
    }
    
    // ensure there is time left on timer and game hasn't been won
    if (counter > 0 && points < 10)
    {
        // left arrow
        if (event.keyCode == 37)
        {
            shuttle.states.turningLeftward = state;
            return false;
        }

        // up arrow
        else if (event.keyCode == 38)
        {
            shuttle.states.tiltingUpward = state;
            return false;
        }

        // right arrow
        else if (event.keyCode == 39)
        {
            shuttle.states.turningRightward = state;
            return false;
        }

        // down arrow
        else if (event.keyCode == 40)
        {
            shuttle.states.tiltingDownward = state;
            return false;
        }

        // A, a
        else if (event.keyCode == 65 || event.keyCode == 97)
        {
            shuttle.states.slidingLeftward = state;
            return false;
        }

        // D, d
        else if (event.keyCode == 68 || event.keyCode == 100)
        {
            shuttle.states.slidingRightward = state;
            return false;
        }
      
        // S, s
        else if (event.keyCode == 83 || event.keyCode == 115)
        {
            shuttle.states.movingBackward = state;     
            return false;
        }

        // W, w
        else if (event.keyCode == 87 || event.keyCode == 119)
        {
            shuttle.states.movingForward = state;    
            return false;
        }
    }
    
    // if no time is left or game has been won display alert
    else
    {
        alert("Game Over! Refresh page to play again.");
        return false;
    }
    
    return true;
}

/**
 * Loads application.
 */
function load()
{
    // embed 2D map in DOM
    var latlng = new google.maps.LatLng(LATITUDE, LONGITUDE);
    map = new google.maps.Map($("#map").get(0), {
        center: latlng,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        zoom: 17,
        zoomControl: true
    });

    // prepare shuttle's icon for map
    bus = new google.maps.Marker({
        icon: "https://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/bus.png",
        map: map,
        title: "you are here"
    });

    // embed 3D Earth in DOM
    google.earth.createInstance("earth", initCB, failureCB);
}

/**
 * Implements Timer
 */
function myTimer()
{
    counter--;
    
    // Display message and total points if user runs out of time
    if (counter < 0 && points < 10)
    {
        clearInterval(myTimer);
        $("#announcements").html("You have run out of time!<br/><strong>You ended with " + points + " points</strong>");
        return;
    }
    
    // Stops timer when user reaches 10 points
    if (points == 10)
    {
        clearInterval(myTimer);
        return;
    }
    
    $("#timer").html(counter); 
}

/**
 * Picks up nearby passengers.
 */
function pickup()
{
    // Check if timer has run out
    if (counter > 0 && points < 10)
    {
        // initialize found seat to false
        var found_seat = false;
        
        // initialize shuttle full to false
        var full = false;
        
        // initialize found house to false
        var foundHouse = false;
        
        // intialize freshman to false
        var freshman = false;
        
        // Check distance of all students to shuttle
        for (var i in NewPassengers)
        {   
            // Figure distance of student to shuttle
            var d = shuttle.distance(NewPassengers[i].lat,NewPassengers[i].lng);
            
            // Check if student is in range for pickup
            if (d <= 15)
            {
                // check if student is a Freshman
                var exist = HOUSES[NewPassengers[i].house];
                
                // If house exists user is not a freshman
                if (exist != null)
                {
                    foundHouse = true;
                    var features = earth.getFeatures();
                    this.seats = [];
                    
                    // Pick up student if any  empty seats on shuttle
                    for (var j in shuttle.seats)
                    {                           
                        if (shuttle.seats[j] == null)
                        {
                            shuttle.seats[j] = NewPassengers[i].name + " to " + NewPassengers[i].house;
                            $("#announcements").html(NewPassengers[i].name + " picked up");
                            setTimeout(resetMessage,4000);
                            features.removeChild(NewPassengers[i].placemark);
                            NewPassengers[i].marker.setMap(null);
                            found_seat = true;
                            pickedup[j] = {name: NewPassengers[i].name, house: NewPassengers[i].house};
                            chart();
                            break;
                        }
                        
                    }
                    
                    // Announce if shuttle is full
                    if(found_seat == false)
                    {
                        $("#announcements").html("Sorry, shuttle is full");
                        setTimeout(resetMessage,4000);
                        full = true;
                    }
                }
                
                // Display message if person to be picked up is Freshman
                else
                {
                    $("#announcements").html("Sorry! No Freshman Allowed!");
                    setTimeout(resetMessage,4000);
                    freshman = true;
                }
            }
        }
    
        // Announce if no student is in range for pickup
        if (found_seat == false && full == false && freshman == false)
        {
            $("#announcements").html("No student is in range for pickup");
            setTimeout(resetMessage,4000);
        }
    }
    
    // If time has run out alert or game has been won display alert
    else
    {
        alert("Game Over! Refresh page to play again.");
    }
}

/**
 * Populates Earth with passengers and houses.
 */
function populate()
{
    // mark houses
    for (var house in HOUSES)
    {
        // plant house on map
        new google.maps.Marker({
            icon: "https://google-maps-icons.googlecode.com/files/home.png",
            map: map,
            position: new google.maps.LatLng(HOUSES[house].lat, HOUSES[house].lng),
            title: house
        });
    }

    // get current URL, sans any filename
    var url = window.location.href.substring(0, (window.location.href.lastIndexOf("/")) + 1);

    // scatter passengers
    for (var i = 0; i < PASSENGERS.length; i++)
    {
        // pick a random building
        var building = BUILDINGS[Math.floor(Math.random() * BUILDINGS.length)];

        // prepare placemark
        var placemark = earth.createPlacemark("");
        placemark.setName(PASSENGERS[i].name + " to " + PASSENGERS[i].house);

        // prepare icon
        var icon = earth.createIcon("");
        icon.setHref(url + "/img/" + PASSENGERS[i].username + ".jpg");

        // prepare style
        var style = earth.createStyle("");
        style.getIconStyle().setIcon(icon);
        style.getIconStyle().setScale(4.0);

        // prepare stylemap
        var styleMap = earth.createStyleMap("");
        styleMap.setNormalStyle(style);
        styleMap.setHighlightStyle(style);

        // associate stylemap with placemark
        placemark.setStyleSelector(styleMap);

        // prepare point
        var point = earth.createPoint("");
        point.setAltitudeMode(earth.ALTITUDE_RELATIVE_TO_GROUND);
        point.setLatitude(building.lat);
        point.setLongitude(building.lng);
        point.setAltitude(0.0);

        // associate placemark with point
        placemark.setGeometry(point);

        // add placemark to Earth
        earth.getFeatures().appendChild(placemark);

        // add marker to map
        var marker = new google.maps.Marker({
            icon: "https://maps.gstatic.com/intl/en_us/mapfiles/ms/micons/man.png",
            map: map,
            position: new google.maps.LatLng(building.lat, building.lng),
            title: PASSENGERS[i].name + " at " + building.name
        });

        // remember passenger's placemark and marker for pick-up's sake
        NewPassengers[i] = PASSENGERS[i];
        NewPassengers[i].lat = building.lat;
        NewPassengers[i].lng = building.lng;
        NewPassengers[i].placemark = placemark;
        NewPassengers[i].marker = marker;

    }
}

/**
 * Reset announcement message
 */
function resetMessage()
{
    $("#announcements").html("no announcements at this time");
}

/**
 * Handler for Earth's viewchange event.
 */
function viewchange() 
{
    // keep map centered on shuttle's marker
    var latlng = new google.maps.LatLng(shuttle.position.latitude, shuttle.position.longitude);
    map.setCenter(latlng);
    bus.setPosition(latlng);
}

/**
 * Unloads Earth.
 */
function unload()
{
    google.earth.removeEventListener(earth.getView(), "viewchange", viewchange);
    google.earth.removeEventListener(earth, "frameend", frameend);
}
