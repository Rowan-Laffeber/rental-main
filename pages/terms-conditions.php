<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms and Conditions Popup</title>
</head>
<body class="modal-open">
<div id="termsModal" class="modal-overlay">
    <div class="modal">
        <h2>Terms and Conditions</h2>
        <div class="modal-content">
            <p>
                Please read and accept our terms and conditions before continuing.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                By clicking "Accept", you agree to our terms and conditions.
            </p>
        </div>
        <button id="acceptBtn">Accept</button>
    </div>
</div>
<div style="padding: 20px;">
    <h1>Welcome to Our Car Hire Website</h1>
    <p>Explore our range of cars available for rental.</p>
</div>

<script>
    document.getElementById('acceptBtn').addEventListener('click', function() {
        document.getElementById('termsModal').style.display = 'none';
        document.body.classList.remove('modal-open');
    });
</script>
</body>
</html>
