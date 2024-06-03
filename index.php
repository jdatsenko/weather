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

        $stmt = $conn->prepare("SELECT id FROM info WHERE ip = ?");
        $stmt->bind_param("s", $ip_hash);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            $stmt = $conn->prepare("INSERT INTO info (ip, time) VALUES (?, NOW())");
            $stmt->bind_param("s", $ip_hash);
            $stmt->execute();
        }

        $stmt->close();


        $sql = $conn->prepare("SELECT COUNT(DISTINCT ip) AS count FROM info WHERE time >= NOW() - INTERVAL 60 MINUTE");
        $sql->execute();
        $result = $sql->get_result();

        $row = $result->fetch_assoc();
        $count = $row['count'];

        echo $count;

        $conn->close();
    
    } elseif ($_POST['action'] === 'log_destination') {

        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $destination = ucwords(trim($_POST['destination']));
        $country = trim($_POST['country']); 

        $stmt = $conn->prepare("SELECT * FROM holiday_destinations WHERE destination = ? AND country = ?");
        $stmt->bind_param("ss", $destination, $country);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            echo "Inserting new destination";
            $stmt = $conn->prepare("INSERT INTO holiday_destinations (destination, country, search_count) VALUES (?, ?, 1)");
            $stmt->bind_param("ss", $destination, $country);
            $stmt->execute();
        } else {
            echo "Updating existing destination";
            $stmt = $conn->prepare("UPDATE holiday_destinations SET search_count = search_count + 1 WHERE destination = ? AND country = ?");
            $stmt->bind_param("ss", $destination, $country);
            $stmt->execute();
        }

        $stmt->close();
        $conn->close();
    
        } elseif ($_POST['action'] === 'fetch_destination_data') {
            $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
        
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
        
            $countryFilter = isset($_POST['countryFilter']) ? $_POST['countryFilter'] : null;
        
            $sql = "SELECT destination, country, search_count FROM holiday_destinations";
            if ($countryFilter) {
                $sql .= " WHERE country = '$countryFilter'";
            }
        
            $result = $conn->query($sql);
        
            $destinationData = array();
        
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $destinationData[] = $row;
                }
            }
        
            echo json_encode($destinationData);
        
            $conn->close();
        }
        
        elseif ($_POST['action'] === 'fetch_countries') {
            $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
        
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
        
            $sql = "SELECT DISTINCT country FROM holiday_destinations"; 
            $result = $conn->query($sql);
        
            $countries = array();
        
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $countries[] = $row['country'];
                }
            }
        
            echo json_encode($countries);
        
            $conn->close();
        }
}

?>

