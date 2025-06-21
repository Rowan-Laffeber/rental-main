<main>
    <div class="big-form">
        <?php

        if (!isset($_SESSION['id'])) {
            header('Location: /login-form');
            exit();
        }
        $stmt = $conn->prepare("SELECT * FROM account WHERE id = :id");
        $stmt->bindParam(':id', $_SESSION['id'], PDO::PARAM_INT);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $email = htmlspecialchars($user['email']);

        if (!$user) {
            session_destroy();
            header('Location: /login-form');
            exit();
        }
        ?>

        <div class="profile">
            <h2>Accountgegevens</h2>
            <h3>Email</h3>
            <p><?= $email ?></p>
        </div>
    </div>
</main>