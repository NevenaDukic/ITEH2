<?php


require "../dbBroker.php";
require "../model/prijava.php";

$status = Prijava::getLast($conn);

if($status){
    echo $status->fetch_column();
}else{
    echo $status;
    echo "Failed";
}

?>