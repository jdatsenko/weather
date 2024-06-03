<?php
require_once 'config.php';

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    if (isset($_POST['action']) && $_POST['action'] == 'count_visit') {

        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $ip = $_SERVER['REMOTE_ADDR'];

        $ip_hash = hash('sha256', $ip);

        $sql = $conn->prepare("SELECT COUNT(DISTINCT ip) AS count FROM info WHERE time >= NOW() - INTERVAL 60 MINUTE");
        $sql->execute();
        $result = $sql->get_result();

        $row = $result->fetch_assoc();
        $count = $row['count'];

        echo $count;

        $conn->close();
    }
    elseif(isset($_POST['action']) && $_POST['action'] == 'fetch_visitor_counts') {
        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $timeIntervals = array(
            '6:00-15:00',
            '15:00-21:00',
            '21:00-24:00',
            '24:00-6:00'
        );

        $visitorCounts = array();

        foreach ($timeIntervals as $interval) {
            list($startTime, $endTime) = explode('-', $interval);

            $sql = $conn->prepare("SELECT COUNT(DISTINCT ip) AS count FROM info WHERE HOUR(time) >= ? AND HOUR(time) < ?");
            $sql->bind_param("ii", $startTime, $endTime);
            $sql->execute();
            $result = $sql->get_result();

            $row = $result->fetch_assoc();
            $visitorCounts[$interval] = $row['count'];
        }

        echo json_encode($visitorCounts);

        $conn->close();
    }
}
?>

