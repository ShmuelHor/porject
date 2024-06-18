const username = document.getElementById("username");
const password = document.getElementById("password");
const submitBut = document.getElementById("submit");

submitBut.addEventListener("click", () => adduser(username.value, password.value));

// async function getTeslas() {
//       try {
//         const res = await fetch("http://localhost:8080/api/teslas");
//         const data = await res.json();
//         console.log(data);

//         data.forEach(carObject => appendCar(carObject));
//     } catch (error) {
    //         console.error(error);
    //     }
    // }
    
async function adduser(username, password) {
    if (username === "" || password === "") {
        alert('אנא מלא את כל השדות');
        return;
    }
    try {
        const res = await fetch(`http://localhost:3001/api/users/${username}/${password}`);
        const data = await res.json();
        console.log(data);
        localStorage.setItem('user',JSON.stringify(data))

       window.location.href = "index2.html";
        
    } catch (error) {
        console.log('sory, please sign in')
    }
    username = ""
    password = ""
}

// async function updateTesla(id, name) {
//     try {
//         const res = await fetch(`http://localhost:8080/api/teslas/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ name })
//         });
//         const data = await res.json();
//         console.log('Updated car:', data);
//         const teslaCard = document.getElementById(`tesla-card-${id}`);

//         if (teslaCard) {
//             const h6 = teslaCard.getElementsByTagName("h6");
//             h6[0].textContent = name;
//         }

//         // location.reload(); // Reload the page after update
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function deleteTesla(id) {
//     try {
//         const res = await fetch(`http://localhost:8080/api/teslas/${id}`, {
//             method: 'DELETE'
//         });
//         const data = await res.json();
//         console.log('Deleted car:', data);
//         location.reload(); // Reload the page after delete
//     } catch (error) {
//         console.error(error);
//     }
// }

// function appendCar(carObject) {
//     console.log(carObject);
//     const div = document.createElement("div");
//     const h6 = document.createElement("h6");
//     const image = document.createElement("img");
//     const updateButton = document.createElement("button");
//     const deleteButton = document.createElement("button");

//     div.style.width = "200px";
//     div.style.height = "280px";
//     div.style.marginBottom = "20px";
//     div.id = `tesla-card-${carObject.id}`

//     h6.textContent = carObject.name;
//     h6.style.textAlign = "center";

//     image.src = carObject.imgSrc;
//     image.style.width = "200px";
//     image.style.height = "200px";

//     updateButton.textContent = "Update";
//     updateButton.onclick = () => {
//         const newName = prompt("Enter new name:", carObject.name);
//         if (newName) {
//             updateTesla(carObject.id, newName);
//         }
//     };

//     deleteButton.textContent = "Delete";
//     deleteButton.onclick = () => {
//         const confirmDelete = confirm(`Are you sure you want to delete ${carObject.name}?`);
//         if (confirmDelete) {
//             deleteTesla(carObject._id);
//         }
//     };

//     const teslaContainer = document.querySelector(".teslas-container");

//     div.appendChild(image);
//     div.appendChild(h6);
//     div.appendChild(updateButton);
//     div.appendChild(deleteButton);
//     teslaContainer.appendChild(div);
// }

// getTeslas();




