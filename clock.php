<?php
$location = filter_input(INPUT_GET, 'location', FILTER_SANITIZE_STRING);
$location = urlencode($location);

// API Keys for OpenCageData and TimeZoneDB
$api_key_location = 'ad379abc06d1483c963ce7087cc554d0';
$api_key_timezone = '05UUCM7MY748';

// Location to GPS position URL
$url_loctogps = "https://api.opencagedata.com/geocode/v1/json?q=$location&key=$api_key_location&pretty=1";

// cURL request
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url_loctogps);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 15);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

// Execute request and get data
$json_gpsresponse = curl_exec($ch);

// Decode JSON and get GPS coordinates
$result_gps = json_decode($json_gpsresponse, true);

if (count($result_gps['results']) >= 1) {
    $gps_coords = $result_gps['results'][0]['geometry'];

// GPS to timestamp URL
    $url_gpstotime = "http://api.timezonedb.com/v2.1/get-time-zone?key=$api_key_timezone&format=json&by=position&lat=" . $gps_coords['lat'] . '&lng=' . $gps_coords['lng'];
    curl_setopt($ch, CURLOPT_URL, $url_gpstotime);

// Execute request and get data
    $json_timeresponse = curl_exec($ch);
    $result_time = json_decode($json_timeresponse, true);

// Get timestamp
    $local_timestamp = $result_time['formatted'];

// Echo result
    echo $local_timestamp;
} else {
    echo 'error, no city found';
}

