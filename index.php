<!DOCTYPE html>

<?php

if (isset($_POST['tache'])) {
    $data = $_POST['tache'];
    $t = json_decode($data);
    $str = implode("\n", $t);
    file_put_contents("todo.txt", $str);
} else {
    $t = file("todo.txt", FILE_IGNORE_NEW_LINES);
    
}

?>

<html lang="fr">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8" />
    <title id="titre">My TODO</title>
    <link rel="stylesheet" href="TP2.css">
    <link rel="icon" href="Images/favicon.png">
</head>

<body>
    <main id="principale">
        <span class="hidden" id="spanr">0</span>
        <span class="hidden" id="spanv">0</span>
        <h1>TODOLIST</h1>
        <p id="jsp">saisissez quelque chose à faire et cliquez sur ajouter.</p>
        <form id="firstform" method="POST">
            <input type="text" placeholder="Quelque chose a faire" id="saisie">
            <input type="submit" value="Ajouter" id="add">
        </form>

        <ul id="task">
            <?php
            foreach ($t as $value) {
                echo "<li class= liste >$value<button class=up></button>
                    <button class=down></button>
                    <button class=supp></button>
                    <button class=modif></button>
                    <button class=valider></button>
                    </li>";
            }
            ?>
        </ul>
        <form id="secondform" method="POST">
            <input type="submit" value="Clear" id="suppall">
            <input type="submit" name="sauv" value="Save" id="sauv">
            <input type="hidden" name="tache" id="jlist">
        </form>
    </main>
    <script type="text/javascript" src="TP2.js"></script>
</body>

</html>