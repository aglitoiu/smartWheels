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
else if($_GET['id']=="bvct"){
    $query="SELECT * from Route_BvCt";
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
else if($_GET['id']=="bvsb"){
    $query="SELECT * from Route_BvSb";
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
else if($_GET['req']=="updateveh"){
    $json = file_get_contents('php://input');
    $obj = json_decode($json, true);
    $lat=$obj['latitude'];
    $longit=$obj['longitude'];
    $vehid=$obj['vehId'];
    $lineType=$obj['lineType'];
    if($lineType=="bus"){

  $query="UPDATE Buses set latitude='$lat', longitude='$longit' WHERE id='$vehid'";
  if (mysqli_query($conn, $query)) {
    echo json_encode("Record updated successfully");
} else {
    echo json_encode("Error updating record: " . mysqli_error($conn));
}

mysqli_close($conn);
    }
    else if($lineType=="train"){
        $query="UPDATE Trains set latitude='$lat', longitude='$longit' WHERE id='$vehid'";
        if (mysqli_query($conn, $query)) {
          echo json_encode("Record updated successfully");
      } else {
          echo json_encode("Error updating record: " . mysqli_error($conn));
      }
      
      mysqli_close($conn);
    }
    

}
else if($_GET['req']=="getlocations"){
    $type=$_GET['type'];
    $query="SELECT * from $type";
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
else if($_GET['req']=="weather"){
    
    $datet=date("Y-m-d");
    $startDate = time();
    $nextDay=date('Y-m-d H:i:s', strtotime('+1 day', $startDate));
    $query="SELECT * from Meteo where date BETWEEN '$datet' AND '$nextDay'";
    $result=mysqli_query($conn,$query);
    $row=mysqli_fetch_assoc($result);
    $emparray[]=$row;
    echo json_encode($emparray);
    
   // echo json_encode($emparray);
}

?>