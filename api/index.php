<?php
require_once("dbconfig.php");
if($_GET['req']=="fetchroutes"&&$_GET['id']==6){
    $query="SELECT * from Route_6";
    $result=mysqli_query($conn,$query);
    while($row=mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }
    echo json_encode($emparray);
}

?>