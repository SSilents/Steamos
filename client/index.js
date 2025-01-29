document.addEventListener('DOMContentLoaded', function() {
    fetch('/homepage')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('content').innerHTML = data;
        document.getElementById('error-message').style.display = 'none'; // Hide error message on success
    })
    .catch(error => {
        console.error('Error fetching homepage:', error);
        document.getElementById('error-message').innerText = 'Failed to fetch data from the server. Please try again later.';
        document.getElementById('error-message').style.display = 'block';
    });

    document.addEventListener('click', async function(event) {
        if (event.target && event.target.closest('#enquiregigpage')) {
            console.log('Enquire about a gig button clicked');
            try {
                let response = await fetch('/requestform');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.text();
                document.getElementById('content').innerHTML = data;
                document.getElementById('error-message').style.display = 'none'; // Hide error message on success

                // Add form submit event listener after form is added to the DOM
                const form = document.getElementById('enquireform');
                if (form) {
                    form.addEventListener('submit', async function(event) {
                        event.preventDefault(); // Prevent the default form submission
                        console.log('Submit form button clicked');
                        try {
                            const formData = new FormData(form);
                            const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
                            console.log(formData)
                            const response = await fetch('/api/submitform', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: formJSON
                            });
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }   
                            let result = await response.text();
                            console.log(result.message)

                            const successMessage = document.getElementById('successmessage');
                            successMessage.style.display = 'block';
                            successMessage.innerText = 'Enquiry has been sent';
                            form.reset();


                            document.getElementById('error-message').style.display = 'none'; // Hide error message on success
                        } catch (error) {
                            console.error('Fetch error:', error);
                            document.getElementById('error-message').innerText = 'Failed to submit the form. Please try again later.';
                            document.getElementById('error-message').style.display = 'block';
                        }
                    });
                } else {
                    console.error('Form not found in the DOM');
                }
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
                document.getElementById('error-message').style.display = 'none'; // Hide error message on success
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
                document.getElementById('error-message').style.display = 'none';
            } catch (error) {
                console.error('Fetch error:', error);
                document.getElementById('error-message').innerText = 'Failed to fetch data from the server. Please try again later.';
                document.getElementById('error-message').style.display = 'block';
            }
        }
        if (event.target && event.target.closest('.nav-link.enquiries')) {
            event.preventDefault();
            console.log('Enquiries button clicked'); // Debugging log
            try {
                let response = await fetch('/requestform');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.text();
                document.getElementById('content').innerHTML = data;
                document.getElementById('error-message').style.display = 'none';
            } catch (error) {
                console.error('Fetch error:', error);
                document.getElementById('error-message').innerText = 'Failed to fetch data from the server. Please try again later.';
                document.getElementById('error-message').style.display = 'block';
            }
        }
        if (event.target && event.target.closest('.nav-link.admin')) {
            event.preventDefault();
            console.log('Admin button clicked'); // Debugging log
            try {
                let response = await fetch('/admin');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.text();
                document.getElementById('content').innerHTML = data;
                document.getElementById('error-message').style.display = 'none';

                // Add form submit event listener after form is added to the DOM
                const form = document.getElementById('filterform');
                if(form){
                    form.addEventListener('submit', async function(event) {
                        event.preventDefault(); // Prevent the default form submission
                        console.log('Submit form button clicked');
                        try {
                            const formData = new FormData(form);
                            const month = formData.get('month');
                            const year = formData.get('year');
                            console.log(formData)
                            const response = await fetch(`/api/enquiries/monthyear?month=${month}&year=${year}`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            });
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }   
                            let result = await response.json();
                            console.log(result)

                            const enquiryContent = document.getElementById('enquirycontent');
                            enquiryContent.innerHTML = ''; // Clear previous content
                            if (result.length === 0) {
                                enquiryContent.innerText = 'No enquiries found for the selected month and year.';
                            } else {
                                result.forEach(enquiry => {
                                    const enquiryDiv = document.createElement('div');
                                    enquiryDiv.style.color = 'white';
                                    enquiryDiv.innerHTML = `
                                        <p><strong>Name:</strong> ${enquiry.name}</p>
                                        <p><strong>Email:</strong> ${enquiry.email}</p>
                                        <p><strong>Date:</strong> ${enquiry.date}</p>
                                        <p><strong>Start Time:</strong> ${enquiry.startTime}</p>
                                        <p><strong>End Time:</strong> ${enquiry.endTime}</p>
                                        <p><strong>Address:</strong> ${enquiry.address}</p>
                                        <p><strong>Extra Info:</strong> ${enquiry.extraInfo}</p>
                                        <hr>
                                    `;
                                    enquiryContent.appendChild(enquiryDiv);
                                });
                            }
                            


                            document.getElementById('error-message').style.display = 'none'; // Hide error message on success
                        } catch (error) {
                            console.error('Fetch error:', error);
                            document.getElementById('error-message').innerText = 'Failed to submit the form. Please try again later.';
                            document.getElementById('error-message').style.display = 'block';
                        }
                    });
                } else {
                    console.error('Form not found in the DOM');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                document.getElementById('error-message').innerText = 'Failed to fetch data from the server. Please try again later.';
                document.getElementById('error-message').style.display = 'block';
            }
        }
    });
});