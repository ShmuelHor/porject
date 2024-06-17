//log out function
var button = document.getElementById("log_out");
button.onclick = myFunction;

function myFunction() {
    localStorage.removeItem('user');
    window.location.href = "indexP.html";
}





document.getElementById('search-by-region').addEventListener('click',async function() {
    const selectedRegion = document.getElementById('region').value;
    if (selectedRegion) {
        alert("מחפש רופאים באזור: " + selectedRegion);
        try {
            const res = await fetch(`http://localhost:3001/api/therapists/area/${selectedRegion}`);
            const data = await res.json();
            console.log(data);
            data.forEach(carObject => appendCar(carObject));
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
            console.log(data);
            data.forEach(carObject => appendCar(carObject));
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
        console.log(data);
        data.forEach(carObject => appendCar(carObject));
    } catch (error) {
        console.error(error);
    }
   
});


