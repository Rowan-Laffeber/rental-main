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
    <?php
    function render_car_section($conn, $title, $limit) {
        try {
            $stmt = $conn->prepare("SELECT * FROM car LIMIT :limit");
            $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
            $stmt->execute();
            $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);
            ?>
            <h2 class="section-title"><?= htmlspecialchars($title) ?></h2>
            <div class="cars">
                <?php foreach ($cars as $car):
                    $brand = htmlspecialchars($car['brand']);
                    $type = htmlspecialchars($car['type']);
                    $class = htmlspecialchars($car['class']);
                    $tank_capacity = htmlspecialchars($car['tank_capacity']);
                    $transmission = htmlspecialchars($car['transmission']);
                    $seats = htmlspecialchars($car['seats']);
                    $price_day = htmlspecialchars($car['price_day']);
                    $carId = (int) $car['id'];

                    $slug = strtolower($brand . '-' . $type);
                    $slug = preg_replace('/[^a-z0-9\-]/', '', str_replace(' ', '-', $slug));

                    $imageSrc = "assets/images/products/car (1).svg";
                ?>
                <div class="car-details">
                    <div class="car-brand">
                        <h3><?= $brand ?></h3>
                        <div class="car-type"><?= $class ?></div>
                    </div>
                    <img src="<?= $imageSrc ?>" alt="Car image of <?= $brand ?>">
                    <div class="car-specification">
                        <span><img src="assets/images/icons/gas-station.svg" alt="Tank"><?= $tank_capacity ?>L</span>
                        <span><img src="assets/images/icons/car.svg" alt="Transmission"><?= $transmission ?></span>
                        <span><img src="assets/images/icons/profile-2user.svg" alt="Seats"><?= $seats ?> Personen</span>
                    </div>
                    <div class="rent-details">
                        <span><span class="font-weight-bold">€<?= $price_day ?></span> / dag</span>
                        <a href="/car-detail/<?= $slug ?>-<?= $carId ?>" class="button-primary">Bekijk nu</a>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
            <?php
        } catch (PDOException $e) {
            echo "<p>Fout bij het ophalen van auto's: " . htmlspecialchars($e->getMessage()) . "</p>";
        }
    }
    ?>

    <main>
        <?php
        render_car_section($conn, "Populaire auto's", 4);
        render_car_section($conn, "Aanbevolen auto's", 8);
        ?>
        <div class="show-more">
            <a class="button-primary" href="/ons-aanbod">Toon alle</a>
        </div>
    </main>