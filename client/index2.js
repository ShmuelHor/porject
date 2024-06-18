

//function to disply the data fronm the server
function displayTherapists(therapists) {
    // קבלת האלמנט של רשימת המטפלים מה-HTML
    const therapistList = document.getElementById('therapistList');
    document.getElementById("list1").textContent="רשימת מטפלים"
    // ניקוי התוכן הקיים ברשימה (למקרה שקוראים לפונקציה שוב)
    therapistList.innerHTML = '';

    // לולאה על המערך של המטפלים כדי להוסיף כל מטפל לרשימה
    therapists.forEach(therapist => {
        // יצירת אלמנט LI חדש עבור כל מטפל
        const therapistItem = document.createElement('li');
        therapistItem.className = 'therapist-item';

        // הוספת שם המטפל
        const therapistName = document.createElement('div');
        therapistName.className = 'therapist-name';
        therapistName.textContent = therapist.therapistsName;
        therapistItem.appendChild(therapistName);

        // הוספת תחומי התמחות
        const therapistSpecialization = document.createElement('div');
        therapistSpecialization.className = 'therapist-info';
        therapistSpecialization.textContent = 'תחומי התמחות: ' + therapist.specialization.join(', ');
        therapistItem.appendChild(therapistSpecialization);

        // הוספת אזור הטיפול
        const therapistLocation = document.createElement('div');
        therapistLocation.className = 'therapist-info';
        therapistLocation.textContent = 'אזור: ' + therapist.location;
        therapistItem.appendChild(therapistLocation);

        // הוספת פריט המטפל לרשימה
        therapistList.appendChild(therapistItem);
    });
}


//log out function
var button = document.getElementById("log_out");
button.onclick = myFunction;

function myFunction() {
    localStorage.removeItem('user');
    window.location.href = "index1.html";
}





document.getElementById('search-by-region').addEventListener('click',async function() {
    const selectedRegion = document.getElementById('region').value;
    if (selectedRegion) {
        alert("מחפש רופאים באזור: " + selectedRegion);
        try {
            const res = await fetch(`http://localhost:3001/api/therapists/area/${selectedRegion}`);
            const data = await res.json();
            displayTherapists(data)
        }
         catch (error) {
            console.error(error);
        }
    } 
    else {alert("אנא בחר אזור."); }
    
});

document.getElementById('search-by-specialty').addEventListener('click',async function() {
    const selectedSpecialty = document.getElementById('specialty').value;
    if (selectedSpecialty) {
        alert("מחפש רופאים בתחום: " + selectedSpecialty);
        try {
            const res = await fetch(`http://localhost:3001/api/therapists/specialty/${selectedSpecialty}`);
            const data = await res.json();
            displayTherapists(data)
        }
         catch (error) {
            console.error(error);
        }
    } else {
        alert("אנא בחר תחום טיפול.");
    }
});

document.getElementById('all').addEventListener('click',async function() {
    try {
        const res = await fetch("http://localhost:3001/api/therapists");
        const data = await res.json();
        displayTherapists(data)
    } catch (error) {
        console.error(error);
    }
   
});


