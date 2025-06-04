
<main>
    <form action="/add-car-handler" class="big-form" method="post">
        <h2>Add car</h2>
             <?php
             if (isset($_SESSION['success_car'])): ?>
            <div class="succes-message">
                <?= $_SESSION['success_car'] ?>
            </div>
            <?php
            session_destroy();
             endif; ?>
        <label for="brand">Brand car</label>
        <input type="text" name="brand" id="brand" placeholder="Volkswagen" required>
        <label for="type">Type</label>
        <input type="text" name="type" id="type" placeholder="Polo" required>
        <label for="color">Color</label>
        <input type="text" name="color" id="color" placeholder="Red" required>
        <label for="transmission">Transmission</label>
        <input type="text" name="transmission" id="transmission" placeholder="Manual" required>
        <label for="seats">Seats</label>
        <input type="text" name="seats" id="seats" placeholder="5" required>
        <label for="tank-capacity">Tank capacity (liters)</label>
        <input type="text" name="tank-capacity" id="tank-capacity" placeholder="90" required>
        <label for="class">Class</label>
        <input type="text" name="class" id="class" placeholder="Hatchback" required>
        <label for="price-day">Price per day</label>
        <input type="text" name="price-day" id="price-day" placeholder="50" required>
        <label for="picture">Picture</label>
        <input type="file" name="picture" id="picture" placeholder="VW-Polo-Red.png" required>
        <input type="submit" value="add car" class="button-secondary">
    </form>
</main>
