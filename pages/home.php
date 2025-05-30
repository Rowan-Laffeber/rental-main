<?php require "includes/header.php" ?>
    <header>
        <div class="advertorials">
            <div class="advertorial">
                <h2>Hét platform om een auto te huren</h2>
                <p>Snel en eenvoudig een auto huren. Natuurlijk voor een lage prijs.</p>
                <a href="#" class="button-primary">Huur nu een auto</a>
                <img src="assets/images/car-rent-header-image-1.png" alt="">
                <img src="assets/images/header-circle-background.svg" alt="" class="background-header-element">
            </div>
            <div class="advertorial">
                <h2>Wij verhuren ook bedrijfswagens</h2>
                <p>Voor een vaste lage prijs met prettig voordelen.</p>
                <a href="#" class="button-primary">Huur een bedrijfswagen</a>
                <img src="assets/images/car-rent-header-image-2.png" alt="">
                <img src="assets/images/header-block-background.svg" alt="" class="background-header-element">

            </div>
        </div>
    </header>

    <main>
    <h2 class="section-title">Populaire auto's</h2>
    <div class="cars">
    <?php
    try {
        // Fetch a maximum of 4 cars
        $get_all_cars = $conn->prepare("SELECT * FROM car LIMIT 4");
        $get_all_cars->execute();
        $cars = $get_all_cars->fetchAll(PDO::FETCH_ASSOC);

        foreach ($cars as $car):
            // Sanitize values
            $brand = htmlspecialchars($car['brand']);
            $class = htmlspecialchars($car['class']);
            $tank_capacity = htmlspecialchars($car['tank_capacity']);
            $transmission = htmlspecialchars($car['transmission']);
            $seats = htmlspecialchars($car['seats']);
            $price_day = htmlspecialchars($car['price_day']);
            $carId = (int) $car['id'];

            // Static or dynamic image
            $imageSrc = "assets/images/products/car (1).svg"; // Replace with dynamic image if available
    ?>
            <div class="car-details">
                <div class="car-brand">
                    <h3><?= $brand ?></h3>
                    <div class="car-type">
                        <?= $class ?>
                    </div>
                </div>
                <img src="<?= $imageSrc ?>" alt="Car image of <?= $brand ?>">
                <div class="car-specification">
                    <span><img src="assets/images/icons/gas-station.svg" alt="Tank"><?= $tank_capacity ?>L</span>
                    <span><img src="assets/images/icons/car.svg" alt="Transmission"><?= $transmission ?></span>
                    <span><img src="assets/images/icons/profile-2user.svg" alt="Seats"><?= $seats ?> Personen</span>
                </div>
                <div class="rent-details">
                    <span><span class="font-weight-bold">€<?= $price_day ?></span> / dag</span>
                    <a href="/car-detail?id=<?= $carId ?>" class="button-primary">Bekijk nu</a>
                </div>
            </div>
    <?php
        endforeach;
    } catch (PDOException $e) {
        echo "<p>Fout bij het ophalen van auto's: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
    ?>
</div>
    <h2 class="section-title">Aanbevolen auto's</h2>
    <div class="cars">
    <?php
    try {
        // Fetch a maximum of 8 cars
        $get_all_cars = $conn->prepare("SELECT * FROM car LIMIT 8");
        $get_all_cars->execute();
        $cars = $get_all_cars->fetchAll(PDO::FETCH_ASSOC);

        foreach ($cars as $car):
            // Sanitize values
            $brand = htmlspecialchars($car['brand']);
            $class = htmlspecialchars($car['class']);
            $tank_capacity = htmlspecialchars($car['tank_capacity']);
            $transmission = htmlspecialchars($car['transmission']);
            $seats = htmlspecialchars($car['seats']);
            $price_day = htmlspecialchars($car['price_day']);
            $carId = (int) $car['id'];

            // Static or dynamic image
            $imageSrc = "assets/images/products/car (1).svg"; // Replace with dynamic image if available
    ?>
            <div class="car-details">
                <div class="car-brand">
                    <h3><?= $brand ?></h3>
                    <div class="car-type">
                        <?= $class ?>
                    </div>
                </div>
                <img src="<?= $imageSrc ?>" alt="Car image of <?= $brand ?>">
                <div class="car-specification">
                    <span><img src="assets/images/icons/gas-station.svg" alt="Tank"><?= $tank_capacity ?>L</span>
                    <span><img src="assets/images/icons/car.svg" alt="Transmission"><?= $transmission ?></span>
                    <span><img src="assets/images/icons/profile-2user.svg" alt="Seats"><?= $seats ?> Personen</span>
                </div>
                <div class="rent-details">
                    <span><span class="font-weight-bold">€<?= $price_day ?></span> / dag</span>
                    <a href="/car-detail?id=<?= $carId ?>" class="button-primary">Bekijk nu</a>
                </div>
            </div>
    <?php
        endforeach;
    } catch (PDOException $e) {
        echo "<p>Fout bij het ophalen van auto's: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
    ?>
</div>
    <div class="show-more">
        <a class="button-primary" href="#">Toon alle</a>
    </div>
    </main>

<?php require "includes/footer.php" ?>
