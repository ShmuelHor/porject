
const appointments = [
    {
        id: 1,
        date: '2024-06-20',
        time: '10:00',
        idUser: 'abc123'
    },
    {
        id: 2,
        date: '2024-06-22',
        time: '15:30',
        idUser: 'def456'
    },
    {
        id: 3,
        date: '2024-06-25',
        time: '09:15',
        idUser: 'ghi789'
    }
];

// זהו דוגמה למערך שמכיל שלושה תורים עם מאפיינים כמו תאריך, שעה, ומזהה משתמש

document.addEventListener('DOMContentLoaded', async function() {
    try{
    // Fetch data from server
    // const response = await fetch(`http://localhost:3001/api/appointments/${therapist._id}`) // Replace with your server endpoint
    //     const data = response.json()
        const data = appointments;
            // Process the received data (assuming data is an array of objects)
            data.forEach(queue => {
                // Create a new div element for each queue
                const queueDiv = document.createElement('div');
                queueDiv.classList.add('queue-item');

                // Construct HTML for the queue item
                queueDiv.innerHTML = `
                    <h3>${queue.date}</h3>
                    <p>${queue.time}</p>
                    <button onclick="reserveQueue('${queue.id}')">הזמן תור</button>`;

                // Append the queue item to the queue-list container
                document.getElementById('queue-list').appendChild(queueDiv);
            });
        }
            catch(error)  {
                console.error('Error fetching data:', error);
            }   
        
});

function reserveQueue(queueId) {

    // Example body - Adjust according to your server's API requirements
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user._id);
    const therapist = JSON.parse(localStorage.getItem('therapist'));
    console.log(therapist._id);
    // Fetch options
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: user._id
    };

    // Perform the fetch request
    fetch(`http://localhost:3001/api/appointments/${therapist._id}/${queueId}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to reserve queue');
            }
            return response.json();
        })
        .then(data => {
            // Handle success response from server
            // אני אוחז פה אחרי האישור של הקביעת תור
            console.log('Queue reserved successfully:', data);
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.innerHTML = `
                    <h1>התור נקבע בהצלחה</h1>`;
            document.body.appendChild(messageDiv);

                    
        })
        .catch(error => {
            // Handle error
            console.error('Error reserving queue:', error);
            // Optionally update UI to indicate reservation failure
        });
}



