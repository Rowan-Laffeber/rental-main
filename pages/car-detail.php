<?php
    
$brand = $type = $class = $seats = $transmission = $tank_capacity = $price_day = $car_link = '';
$carId = 0;

try {
    if (isset($_GET['slug'], $_GET['id']) && is_numeric($_GET['id'])) {
        $carId = (int)$_GET['id'];
        $slugFromUrl = $_GET['slug'];

        $get_car = $conn->prepare("SELECT * FROM car WHERE id = :id LIMIT 1");
        $get_car->bindParam(':id', $carId, PDO::PARAM_INT);
        $get_car->execute();
        $car = $get_car->fetch(PDO::FETCH_ASSOC);

        if ($car) {
            $brand = htmlspecialchars($car['brand']);
            $type = htmlspecialchars($car['type']);
            $class = htmlspecialchars($car['class']);
            $seats = htmlspecialchars($car['seats']);
            $transmission = htmlspecialchars($car['transmission']);
            $tank_capacity = htmlspecialchars($car['tank_capacity']);
            $price_day = htmlspecialchars($car['price_day']);
            $car_link = htmlspecialchars($car['car_link']);

            $expectedSlug = strtolower($brand . '-' . $type);
            $expectedSlug = preg_replace('/[^a-z0-9\-]/', '', str_replace(' ', '-', $expectedSlug));

            if ($slugFromUrl !== $expectedSlug) {
                header("Location: /car-detail/{$expectedSlug}-{$carId}");
                exit;
            }
        } else {
            echo "<p>Auto niet gevonden.</p>";
            exit;
        }
    } else {
        echo "<p>Ongeldige ID-parameter.</p>";
        exit;
    }
} catch (PDOException $e) {
    echo "<p>Fout bij het ophalen van de auto: " . htmlspecialchars($e->getMessage()) . "</p>";
    exit;
}
?>

<main class="car-detail">
    <div class="grid">
        <div class="row">
            <div class="advertorial">
                <h2><?= $class ?> auto met het beste design en snelheid</h2>
                <p>Veiligheid en comfort terwijl je rijd in een futuristische en elegante auto</p>

                <?php if ($car_link !== ''): ?>
                    <img src="/assets/images/products/<?= $car_link ?>" alt="Afbeelding van <?= $brand ?> <?= $type ?>">
                <?php else: ?>
                    <img src="/assets/images/car-rent-header-image-1.png" alt="Standaard auto afbeelding">
                <?php endif; ?>

                <img src="/assets/images/header-circle-background.svg" alt="" class="background-header-element">
            </div>
        </div>

        <div class="row white-background">
            <h2><?= $brand ?> <?= $type ?></h2>
            <div class="rating">
                <span class="stars stars-4"></span>
                <span>440+ reviewers</span>
            </div>
            <p><?= $brand ?> <?= $type ?> is het toonbeeld geworden van <?= $brand ?>'s uitzonderlijke prestaties, geïnspireerd door het meest meedogenloze testterrein: het circuit.</p>
            
            <div class="car-type">
                <div class="grid">
                    <div class="row"><span class="accent-color">Type Car</span><span><?= $class ?></span></div>
                    <div class="row"><span class="accent-color">Seats</span><span><?= $seats ?></span></div>
                </div>
                <div class="grid">
                    <div class="row"><span class="accent-color">Transmission</span><span><?= $transmission ?></span></div>
                    <div class="row"><span class="accent-color">Fuel / Capacity</span><span><?= $tank_capacity ?></span></div>
                </div>
                <div class="call-to-action">
                    <div class="row"><span class="font-weight-bold">€<?= $price_day ?></span> / dag</div>
                    <div class="row"><a href="/rent-car?id=<?= $carId ?>" class="button-primary">Huur nu</a></div>
                </div>
            </div>
        </div>
    </div>
</main>
