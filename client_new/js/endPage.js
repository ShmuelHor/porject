 // פונקציה לטעינת רשימת התורים מהשרת ולהצגתם
 function loadAppointments() {
    // קבלת פרטי המשתמש מתוך localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // בדיקת קיום פרטי המשתמש
    if (!user) {
        displayMessage('User not found. Please log in.');
        return;
    }

    // ביצוע בקשת ה-fetch לקבלת רשימת התורים
    fetch(`http://localhost:3001/api/appointments/all/${user._id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load appointments: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // הצגת התורים שהתקבלו
            displayAppointments(data);
        })
        .catch(error => {
            console.error('Error fetching appointments:', error);
            displayMessage('There was a problem loading your appointments.');
        });
}

// פונקציה להצגת רשימת התורים
function displayAppointments(appointments) {
    const queueList = document.getElementById('queue-list');
    queueList.innerHTML = ''; // נקה את התוכן הקודם

    if (appointments.length === 0) {
        queueList.textContent = 'No appointments found.';
        return;
    }

    appointments.forEach(appointment => {
        const appointmentDiv = document.createElement('div');
        appointmentDiv.className = 'queue-item';

        const title = document.createElement('h3');
        title.textContent = `Appointment with ${appointment.therapistsName}`;
        appointmentDiv.appendChild(title);

        const date = document.createElement('p');
        date.textContent = `Date: ${new Date(appointment.appointment.date).toLocaleString()}`;
        appointmentDiv.appendChild(date);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel Appointment';
        cancelButton.onclick = () => cancelAppointment(appointment._id);
        appointmentDiv.appendChild(cancelButton);

        queueList.appendChild(appointmentDiv);
    });
}

// פונקציה להצגת הודעה מרכזית
function displayMessage(messageText) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `<h1>${messageText}</h1>`;
    document.body.appendChild(messageDiv);

    // הוספת אנימציה של היעלמות ההודעה
    setTimeout(() => {
        messageDiv.style.animation = 'fadeInOut 3s forwards';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }, 3000);
}

// פונקציה לביטול תור
function cancelAppointment(appointmentId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        // בקשת מחיקה מהשרת
        fetch(`http://localhost:3001/api/appointments/${appointmentId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to cancel appointment: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            displayMessage('Appointment cancelled successfully.');
            // טעינה מחדש של רשימת התורים לאחר ביטול
            loadAppointments();
        })
        .catch(error => {
            console.error('Error cancelling appointment:', error);
            displayMessage('There was a problem cancelling the appointment.');
        });
    }
}

// טען את התורים כשדף הטעון
document.addEventListener('DOMContentLoaded', loadAppointments);
