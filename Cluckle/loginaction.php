 <?php 
session_start();

 require "database/conn.php";
 
 $stmt = $conn->prepare("SELECT * FROM account WHERE email =:Email");
 $stmt->bindParam(":Email", $_POST['Email']);
 $stmt->execute();
 $account = $stmt->fetch();


 if(password_verify($_POST['password'], $account['password'])){
    $_SESSION['userId'] = $account['id'];
    $_SESSION['email'] = $account['email'];
    $_SESSION['loggedIn'] = true; 

   // echo $_SESSION['loggedIn'];
   // echo $_SESSION['userId'];
   // echo $_SESSION['email'];
    header("location: index.php");
 }else{
    echo "klopt niet";
 }


