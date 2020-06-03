<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zadatak 1</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
</head>
<body>
    <section class="container d-flex flex-column  align-items-center mb-4">
        <h1>CFC 3</h1>
        <h2>Choose your cat</h2>
    </section>
    <div class="container d-flex flex-column  align-items-center">
        <div id="clock" class="clock display-4"></div>
        <div id="message" class="message"></div>
    </div>
    <div class="row">
        <div id="firstSide" class="container d-flex flex-column  align-items-center side first-side col-5">
            <div class="row d-flex justify-content-end">
                <div class="col-auto">
                    <ul class="cat-info list-group">
                        <li class="list-group-item name">Cat Name</li>
                        <li class="list-group-item age">Cat age</li>
                        <li class="list-group-item skills">Cat Info</li>
                        <li class="list-group-item record">Wins:<span class="wins"></span> Loss: <span class="loss"></span></li>
                    </ul>
                </div>
                <div class="col-auto featured-cat-fighter">
                    <img class="featured-cat-fighter-image img-rounded" src="https://via.placeholder.com/300" alt="Featured cat fighter">
                </div>
                <div class="col-auto w-100" style="margin-top: 24px">
                    <div class="row fighter-list">
                    <?php
                        include_once "./DbHandler.php";
                        use db\DbHandler as handler;
                        error_reporting(E_ERROR | E_PARSE);
                        //php skripta za kreiranje html elementa koji sadrže informacije o određenoj mački
                        //prolazi koz cijelu tablicu i za sve malke radi objekte 
                        //kreira se data-info u koji se sprema JSON objekt
                        $db = new handler();
                        $sql = "SELECT * FROM mma";
                        $result = $db->select($sql);
                        if($result->num_rows > 0){
                            while($row = $result->fetch_assoc()){ 
                                $cat = new stdClass();
                                $cat->id = $row["id"];
                                $cat->name = $row["name"];
                                $cat->age = $row["age"];
                                $cat->catInfo = $row["catinfo"];
                                $cat->record->wins = $row['wins'];
                                $cat->record->loss = $row['loss']; 
                                echo '<div class="col-md-4 mb-1">';
                                    echo '<div class="fighter-box" data-info = \''.(json_encode($cat)) .'\' >';   
                                        echo '<img src="./uploads/'.$row['image'].'" alt="Figter Box 1" width="150" height="150">';
                                    echo "</div>";
                                    echo "<button id='edit' class='btn btn-primary mb-4 btn-lg'>Edit</button>";
                                echo "</div>";
                            }
                        }
                            
                    ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-2 d-flex flex-column align-items-center">
            <p class="display-4">VS</p>
            <button id="generateFight" class="btn btn-primary mb-4 btn-lg">Fight</button>
            <button id="randomFight" class="btn btn-secondary">Select Random fighters</button>
            <input type="button" id ="createFighter" class="btn btn-secondary" style ="margin-top:20px" onclick="location.href='./createFighter.html'" value="Create finghter" />
        </div>
        <div id="secondSide" class="container d-flex flex-column align-items-center side second-side col-5">
            <div class="row">
                <div class="col-auto featured-cat-fighter">
                    <img class="featured-cat-fighter-image img-rounded" src="https://via.placeholder.com/300" alt="Featured cat fighter">
                </div>
                <div class="col-auto">
                    <ul class="cat-info list-group">
                        <li class="list-group-item name">Cat Name</li>
                        <li class="list-group-item age">Cat age</li>
                        <li class="list-group-item skills">Cat Info</li>
                        <li class="list-group-item record">Wins: <span class="wins"></span>Loss: <span class="loss"></span></li>
                    </ul>
                </div>
                <div class="col-auto w-100" style="margin-top: 24px">
                    <div class="row fighter-list">
                    <?php
                        
                        use db\DbHandler;

                        $db = new DbHandler();
                        $sql = "SELECT * FROM mma";
                        $result = $db->select($sql);
                        if($result->num_rows > 0){
                            while($row = $result->fetch_assoc()){ 
                                $cat = new \stdClass();
                                $cat->id = $row["id"];
                                $cat->name = $row["name"];
                                $cat->age = $row["age"];
                                $cat->catInfo = $row["catinfo"];
                                $cat->record->wins = $row["wins"];
                                $cat->record->loss = $row["loss"];
                                echo '<div class="col-md-4 mb-1">';
                                    echo '<div class="fighter-box" data-info = \''.(json_encode($cat)) .'\' >';   
                                        echo '<img src="./uploads/'.$row['image'].'" alt="Figter Box 1" width="150" height="150">';
                                    echo "</div>";
                                    echo "<button id='edit' class='btn btn-primary mb-4 btn-lg'>Edit</button>";
                                echo "</div>";
                            }
                        }
                            
                    ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="./src/app.js"></script>
</body>
</html>
