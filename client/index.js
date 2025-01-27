document.addEventListener('DOMContentLoaded', function() {
    fetch('/homepage')
    .then(response => response.text())
    .then(data => {
      document.getElementById('content').innerHTML = data;
    })
    .catch(error => console.error('Error fetching homepage:', error));
    document.addEventListener('click', async function(event) {
        if (event.target && event.target.closest('#bookgigpage')) {
            console.log('Book gig button clicked');
            try {
                let response = await fetch('/requestform');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.text();
                document.getElementById('content').innerHTML = data;
            } catch (error) {
                console.error('Fetch error:', error);
                document.getElementById('error-message').innerText = 'Failed to fetch data from the server. Please try again later.';
                document.getElementById('error-message').style.display = 'block';
            }
        }

        if (event.target && event.target.closest('.nav-link.home')) {
            event.preventDefault();
            console.log('Home button clicked'); // Debugging log
            try {
                let response = await fetch('/homepage');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.text();
                document.getElementById('content').innerHTML = data;
            } catch (error) {
                console.error('Fetch error:', error);
                document.getElementById('error-message').innerText = 'Failed to fetch data from the server. Please try again later.';
                document.getElementById('error-message').style.display = 'block';
            }
        }
        if (event.target && event.target.closest('.nav-link.music')) {
            event.preventDefault();
            console.log('Music button clicked'); // Debugging log
            try {
                let response = await fetch('/music');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.text();
                document.getElementById('content').innerHTML = data;
            } catch (error) {
                console.error('Fetch error:', error);
                document.getElementById('error-message').innerText = 'Failed to fetch data from the server. Please try again later.';
                document.getElementById('error-message').style.display = 'block';
            }
        }
    });
});