<?php

$input = json_decode(file_get_contents('php://input'), true);

$brands = $input['brand'] ?? [];
$types = $input['type'] ?? [];
$colors = $input['color'] ?? [];
$transmissions = $input['transmission'] ?? [];
$seats = $input['seats'] ?? [];
$tank_caps = $input['tank_capacity'] ?? [];
$classes = $input['class'] ?? [];
$max_price = isset($input['max_price']) ? (int)$input['max_price'] : null;
$search = $input['search'] ?? '';

$where = [];
$params = [];

if ($search) {
    $where[] = "(brand LIKE :search OR type LIKE :search)";
    $params[':search'] = "%$search%";
}

function addFilterCondition($field, $values, &$where, &$params, $paramPrefix) {
    if (count($values) > 0) {
        $placeholders = [];
        foreach ($values as $i => $value) {
            $ph = ":{$paramPrefix}_{$i}";
            $placeholders[] = $ph;
            $params[$ph] = $value;
        }
        $where[] = "$field IN (" . implode(',', $placeholders) . ")";
    }
}

addFilterCondition('brand', $brands, $where, $params, 'brand');
addFilterCondition('type', $types, $where, $params, 'type');
addFilterCondition('color', $colors, $where, $params, 'color');
addFilterCondition('transmission', $transmissions, $where, $params, 'transmission');
addFilterCondition('seats', $seats, $where, $params, 'seats');
addFilterCondition('tank_capacity', $tank_caps, $where, $params, 'tank');
addFilterCondition('class', $classes, $where, $params, 'class');

if ($max_price !== null) {
    $where[] = "price_day <= :max_price";
    $params[':max_price'] = $max_price;
}

$sql = "SELECT * FROM car";
if (count($where) > 0) {
    $sql .= " WHERE " . implode(" AND ", $where);
}
$sql .= " LIMIT 80";

try {
    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($cars as $car):
        $brand = htmlspecialchars($car['brand']);
        $type = htmlspecialchars($car['type']);
        $class = htmlspecialchars($car['class']);
        $tank_capacity = htmlspecialchars($car['tank_capacity']);
        $transmission = htmlspecialchars($car['transmission']);
        $seats = htmlspecialchars($car['seats']);
        $price_day = htmlspecialchars($car['price_day']);
        $carId = (int)$car['id'];
        $car_link = trim($car['car_link']);

        $slug = strtolower(preg_replace('/[^a-z0-9\-]/', '', str_replace(' ', '-', "$brand-$type")));
?>
        <div class="car-details">
            <div class="car-brand">
                <h3><?= $brand ?></h3>
                <div class="car-type"><?= $class ?></div>
            </div>
            <?php if ($car_link !== ''): ?>
                <img src="assets/images/products/<?= $car_link ?>" alt="Car image of <?= $brand ?>">
            <?php endif; ?>
            <div class="car-specification">
                <span><img src="/assets/images/icons/gas-station.svg" alt="Tank"><?= $tank_capacity ?>L</span>
                <span><img src="/assets/images/icons/car.svg" alt="Transmission"><?= $transmission ?></span>
                <span><img src="/assets/images/icons/profile-2user.svg" alt="Seats"><?= $seats ?> Personen</span>
            </div>
            <div class="rent-details">
                <span><span class="font-weight-bold">€<?= $price_day ?></span> / dag</span>
                <a href="/car-detail/<?= $slug ?>-<?= $carId ?>" class="button-primary">Bekijk nu</a>
            </div>
        </div>
<?php
    endforeach;
} catch (PDOException $e) {
    echo '<p>Fout bij het ophalen van auto’s: ' . htmlspecialchars($e->getMessage()) . '</p>';
}
