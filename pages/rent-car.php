
<main>
     <h2>Rent car</h2>
    <form action="/register-handler" method="post" class="big-form">
        <h3>Billing info</h3>
        <p>please enter your billing info</p>
        <p>step 1 of 4</p>
        <label for="name">name</label>
        <input type="text" name="name" id="name" placeholder="john doe" required>
        <label for="number">telefoon nummer</label>
        <input type="number" name="number" id="number" placeholder="06 12345678" required>
        <label for="adress">adres</label>
        <input type="text" name="adres" id="adres" placeholder="dorpsstraat 1" required>
        <label for="town">stad</label>
        <input type="text" name="town" id="town" placeholder="ons dorp" required>
    
        <h3>Rental info</h3>
        <p>please enter your rental info</p>
        <p>step 2 of 4</p>
        <label for="adress">adres</label>
        <input type="text" name="adres" id="adres" placeholder="dorpsstraat 1" required>
        <label for="town">stad</label>
        <input type="text" name="town" id="town" placeholder="ons dorp" required>
        <label for="time">time</label>
        <input type="text" name="time" id="time" placeholder="12:00" required>
        <label for="date">date</label>
        <input type="text" name="date" id="date" placeholder="dd/mm/yyyy" required>
    
        <input type="submit" value="rent now" class="button-primary">

    
    </form>
</main>

