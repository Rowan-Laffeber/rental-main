<main>

    <div class="sidebar">
        <h3>Category</h3>
        <div class="filter-section">
            <h4>Type</h4>
               <div></div> <label><input type="checkbox" name="type" value="sport" /> Sport (10)</label>
                <label><input type="checkbox" name="type" value="suv" /> SUV (12)</label>
                <label><input type="checkbox" name="type" value="mpv" /> MPV (16)</label>
                <label><input type="checkbox" name="type" value="sedan" /> Sedan (20)</label>
                <label><input type="checkbox" name="type" value="coupe" /> Coupe (14)</label>
                <label><input type="checkbox" name="type" value="hatchback" /> Hatchback (12)</label>
        </div>

        <div class="filter-section">
            <h3>Capacity</h3>
            <label><input type="checkbox" name="capacity" value="2" /> 2 Person (7)</label>
            <label><input type="checkbox" name="capacity" value="4" /> 4 Person (14)</label>
            <label><input type="checkbox" name="capacity" value="6" /> 6 Person (8)</label>
            <label><input type="checkbox" name="capacity" value="8" /> 8 or More (16)</label>
        </div>

        <div class="filter-section">
            <h3>Max Price</h3>
            <input type="range" id="priceRange" min="0" max="100" value="100" />
            <span id="priceValue">$100.00</span>
        </div>
    </div>
        <h2>Ons aanbod</h2>
        <div class="cars">
            <?php
            try {
                // Prepare and execute query to fetch 80 cars
                $stmt = $conn->prepare("SELECT * FROM car LIMIT 80");
                $stmt->execute();
                $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);

                foreach ($cars as $car):
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
            <?php
                endforeach;
            } catch (PDOException $e) {
                echo "<p>Fout bij het ophalen van auto's: " . htmlspecialchars($e->getMessage()) . "</p>";
            }
            ?>
        </div>
</main>