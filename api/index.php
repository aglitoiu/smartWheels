<?php
require_once("dbconfig.php");
if($_GET['req']=="routes"){
    if($_GET['id']==6){
    $query="SELECT * from Route_6";
    $result=mysqli_query($conn,$query);
    while($row=mysqli_fetch_assoc($result)){
        $tempLat=floatval($row['latitude']);
        $tempLong=floatval($row['longitude']);
        $row['latitude']=$tempLat;
        $row['longitude']=$tempLong;
        $emparray[] = $row;
    }
    echo json_encode($emparray);
}
else if($_GET['id']==5){
    $query="SELECT * from Route_5";
    $result=mysqli_query($conn,$query);
    while($row=mysqli_fetch_assoc($result)){
        $tempLat=floatval($row['latitude']);
        $tempLong=floatval($row['longitude']);
        $row['latitude']=$tempLat;
        $row['longitude']=$tempLong;
        $emparray[] = $row;

      
    }
    echo json_encode($emparray);
}

}
else if($_GET['req']=="updatebus"){
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $lat=$obj['latitude'];
    $longit=$obj['longitude'];
    $busid=$obj['busid'];

  $query="UPDATE Buses set latitude='$lat', longitude='$longit' WHERE id='$busid'";
  if (mysqli_query($conn, $query)) {
    echo json_encode("Record updated successfully");
} else {
    echo json_encode("Error updating record: " . mysqli_error($conn));
}

mysqli_close($conn);
    

}
else if($_GET['req']=="getlocations"){
    $query="SELECT * from Buses";
    $result=mysqli_query($conn,$query);
    while($row=mysqli_fetch_assoc($result)){
        $tempLat=floatval($row['latitude']);
        $tempLong=floatval($row['longitude']);
        $row['latitude']=$tempLat;
        $row['longitude']=$tempLong;
        $emparray[] = $row;
    }
    echo json_encode($emparray);
}

?>