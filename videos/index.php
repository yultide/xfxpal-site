<html>
<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.7.0/css/lightgallery.min.css" integrity="sha256-nAgWUDEvmv2xzyXX2Bp6d2IPUR3R1d1Y9yab7GjtLBE=" crossorigin="anonymous" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha256-aAr2Zpq8MZ+YA/D6JtRD3xtrwpEz2IqOS+pWD/7XKIw=" crossorigin="anonymous" />
<style>
.link { cursor: pointer; }
</style>
</head>
<body>
<div class="container page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
            <div class="col-lg-12 my-5">
<?php
$path = ".";
$dh = opendir($path);
$videos = array();
while (($file = readdir($dh)) !== false) {
    if($file != "." && $file != ".." && $file != "index.php" && $file != ".htaccess" && $file != "error_log" && $file != "cgi-bin" &&
         preg_match('/-([-\S]{11})\.mp4$/', $file, $matches)) {

        $videoid = $matches[1];
        $encoded_file = urlencode($file);
        $encoded_file = str_replace('+','%20',$encoded_file); 
        array_push($videos, array("$path/" . $encoded_file, $videoid, $file));
    }
}
shuffle($videos);
foreach ($videos as $video) {
    $url = $video[0];
    $videoid = $video[1];

    echo "<div style=\"display:none;\" id=\"$videoid\">
    <video class=\"lg-video-object lg-html5\" controls preload=\"none\">
        <source src=\"$url\" type=\"video/mp4\">
         Your browser does not support HTML5 video.
    </video>
</div>
";
}

echo "<div id=\"lightgallery\" class=\"row lightGallery\">";
foreach ($videos as $video) {
    $url = $video[0];
    $videoid = $video[1];
    $title = $video[2];
    echo "<a class=\"col-md-3 mb-3 link\" data-download-url=\"$url\" data-html=\"#$videoid\"
data-poster=\"https://img.youtube.com/vi/$videoid/maxresdefault.jpg\" data-sub-html\"$title\"
title=\"$title\"
>
<img class=\"img-fluid img-thumbnail\" src=\"https://img.youtube.com/vi/$videoid/mqdefault.jpg\" style=\"width: 320px; height: 140px\" alt=\"$title\">
</a>";
}
echo "</div>";

/*
foreach ($videos as $video) {
    $url = $video[0];
    $videoid = $video[1];

    echo "<div style=\"display:none;\" id=\"$videoid\">
    <video class=\"lg-video-object lg-html5 video-js vjs-default-skin\" controls preload=\"none\">
        <source src=\"$url\" type=\"video/mp4\">
         Your browser does not support HTML5 video.
    </video>
</div>
";
}
*/
closedir($dh);

?>
            </div>
        </div>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.4.0/umd/popper.min.js" integrity="sha256-FT/LokHAO3u6YAZv6/EKb7f2e0wXY3Ff/9Ww5NzT+Bk=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha256-OFRAJNoaD8L3Br5lglV7VyLRf0itmoBzWUoM+Sji4/8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.7.0/js/lightgallery-all.min.js"></script>
<script>            
    $(document).ready(function() {
        $('#lightgallery').lightGallery({ thumbnail: true, autoplay: false, autoplayControls: false, fullScreen: false, download: true, share: false, zoom: false });
    });                 
</script>
</body>
</html>
