document.addEventListener('DOMContentLoaded', function() {
    fetch('/homepage')
    .then(response => response.text())
    .then(data => {
      document.getElementById('content').innerHTML = data;
    })
    .catch(error => console.error('Error fetching homepage:', error));
    document.getElementById('bookgigbutton').addEventListener('click', async function(event) {
        try {
            let response = await fetch('http://127.0.0.1:8090/list');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let body = await response.text();
            document.getElementById('content').innerHTML = body;
        } catch (error) {
            console.error('Fetch error:', error);
            document.getElementById('error-message').innerText = 'Failed to fetch data from the server. Please try again later.';
            document.getElementById('error-message').style.display = 'block';
        }
    });
});