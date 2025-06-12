<main class="filterAndCars">
  <div class="sidebar">
    <h3>Category</h3>

    <?php
    try {
        $brands = $conn->query("SELECT brand, COUNT(*) AS count FROM car GROUP BY brand ORDER BY brand")->fetchAll(PDO::FETCH_ASSOC);
        $types = $conn->query("SELECT type, COUNT(*) AS count FROM car GROUP BY type ORDER BY type")->fetchAll(PDO::FETCH_ASSOC);
        $colors = $conn->query("SELECT color, COUNT(*) AS count FROM car GROUP BY color ORDER BY color")->fetchAll(PDO::FETCH_ASSOC);
        $transmissions = $conn->query("SELECT transmission, COUNT(*) AS count FROM car GROUP BY transmission ORDER BY transmission")->fetchAll(PDO::FETCH_ASSOC);
        $seatsList = $conn->query("SELECT seats, COUNT(*) AS count FROM car GROUP BY seats ORDER BY seats")->fetchAll(PDO::FETCH_ASSOC);
        $tankCaps = $conn->query("SELECT tank_capacity, COUNT(*) AS count FROM car GROUP BY tank_capacity ORDER BY tank_capacity")->fetchAll(PDO::FETCH_ASSOC);
        $classes = $conn->query("SELECT class, COUNT(*) AS count FROM car GROUP BY class ORDER BY class")->fetchAll(PDO::FETCH_ASSOC);

        $minPrice = (int)$conn->query("SELECT MIN(price_day) FROM car")->fetchColumn();
        $maxPrice = (int)$conn->query("SELECT MAX(price_day) FROM car")->fetchColumn();
    } catch (PDOException $e) {
        echo "<p>Fout bij het ophalen van filters: " . htmlspecialchars($e->getMessage()) . "</p>";
    }

    function renderFilter($label, $data, $name) {
        echo "<div class='filter-section'>
                <div class='filter-header'>$label <span class='arrow'></span></div>
                <div class='filter-content'>";
        foreach ($data as $item) {
            $val = htmlspecialchars($item[$name]);
            $count = $item['count'];
            echo "<label><input type='checkbox' name='{$name}[]' value='$val' /> $val ($count)</label>";
        }
        echo "</div></div>";
    }

    renderFilter('Brand', $brands, 'brand');
    renderFilter('Type', $types, 'type');
    renderFilter('Color', $colors, 'color');
    renderFilter('Transmission', $transmissions, 'transmission');
    renderFilter('Seats', $seatsList, 'seats');
    renderFilter('Tank Capacity (L)', $tankCaps, 'tank_capacity');
    renderFilter('Class', $classes, 'class');
    ?>

    <div class="filter-section">
      <label class="filter-header" for="priceRange">Max Price</label>
      <input type="range" id="priceRange" min="<?= $minPrice ?>" max="<?= $maxPrice ?>" value="<?= $maxPrice ?>" />
      <span id="priceValue">€<?= $maxPrice ?></span>
    </div>
  </div>

  <!-- <h2>Ons aanbod</h2> -->
  <div class="cars" id="carResults">
    <?php
    $search = $_GET['search'] ?? '';

    try {
        $stmt = $search
            ? $conn->prepare("SELECT * FROM car WHERE brand LIKE :search OR type LIKE :search LIMIT 80")
            : $conn->prepare("SELECT * FROM car LIMIT 80");

        if ($search) {
            $stmt->execute(['search' => "%$search%"]);
        } else {
            $stmt->execute();
        }

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
            $slug = strtolower(preg_replace('/[^a-z0-9\-]/', '', str_replace(' ', '-', "$brand-$type")));
            $imageSrc = "assets/images/products/car (1).svg";
    ?>
        <div class="car-details">
          <div class="car-brand">
            <h3><?= $brand ?></h3>
            <div class="car-type"><?= $class ?></div>
          </div>
          <img src="<?= $imageSrc ?>" alt="Car image of <?= $brand ?>">
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
    <?php endforeach;
    } catch (PDOException $e) {
        echo "<p>Fout bij het ophalen van auto's: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
    ?>
  </div>

  <script>
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    priceRange.addEventListener('input', () => {
      priceValue.textContent = '€' + priceRange.value;
      fetchFilteredCars();
    });

    document.querySelectorAll('.filter-header').forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('active');
      });
    });

    document.querySelectorAll('.filter-content input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', fetchFilteredCars);
    });

    function getCheckedValues(name) {
      return Array.from(document.querySelectorAll(`input[name="${name}[]"]:checked`)).map(el => el.value);
    }

    function getSearchTermFromURL() {
      const params = new URLSearchParams(window.location.search);
      return params.get('search') || '';
    }

    function fetchFilteredCars() {
      const filters = {
        brand: getCheckedValues('brand'),
        type: getCheckedValues('type'),
        color: getCheckedValues('color'),
        transmission: getCheckedValues('transmission'),
        seats: getCheckedValues('seats'),
        tank_capacity: getCheckedValues('tank_capacity'),
        class: getCheckedValues('class'),
        max_price: priceRange.value,
        search: getSearchTermFromURL()
      };

      fetch('/filter-cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      })
      .then(res => res.text())
      .then(html => {
        document.getElementById('carResults').innerHTML = html;
      })
      .catch(err => console.error('Error fetching filtered cars:', err));
    }
  </script>
</main>
