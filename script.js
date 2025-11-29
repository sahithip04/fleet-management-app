let fleetData = []

function addFleet(event){
    if(event) event.preventDefault();
    const reg = document.getElementById("reg").value.trim();
    const cat = document.getElementById("category").value;
    const driver = document.getElementById("driver").value.trim();
    const avail = document.getElementById("isAvailable").value;


if(!reg || !driver){
    alert("Fill the details");
    return;
}

let obj={
    regNo : reg,
    category : cat,
    driver : driver,
    available : avail
}

fleetData.push(obj);
document.getElementById("reg").value="";
document.getElementById("driver").value="";
document.getElementById("category").selectedIndex= 0;
document.getElementById("isAvailable").selectedIndex=0;
render(fleetData);
}

function render(data) {
    const container = document.getElementById("fleetContainer");
    container.innerHTML="";
    data.forEach((ele, i)=>{
        let card = document.createElement("div");
        card.className="card";
        card.innerHTML= `
        <img src="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png" width="100%"
        <p><b>Reg No : </b>${ele.regNo} </p>
        <p><b>Category : </b>${ele.category} </p>
        <p><b> Driver : </b> ${ele.driver} </p>
        <p><b> Status : </b> ${ele.available} </p>
        
        <button onclick="updateDriver(${i})">Update Driver</button>
        <button onclick="changeAvailability(${i})">Change Availability</button>
        <button onclick="deleteVehicle(${i})">Delete Vehicle</button>`;
        container.appendChild(card);
    });

}
function updateDriver(i){
    let newDriver = prompt("Enter new driver name");
    if(!newDriver || newDriver.trim() === ""){
        alert("Driver name cannot be empty.")
        return;
    }
    fleetData[i].driver=newDriver.trim();
    render(fleetData);
}

function changeAvailability(i){
    fleetData[i].available= fleetData[i].available === "Available" ? "Unavailable" : "Available";

    render(fleetData);
}

function deleteVehicle(i){
    let confirmDelete = confirm("Are you sure you want to delete this vehicle?");
    if(confirmDelete){
        fleetData.splice(i, 1);
        render(fleetData);
    }
}

function applyFilters(){
    let cat = document.getElementById("catFilter").value;
    let avail = document.getElementById("availFilter").value;

    let filtered = fleetData.filter(v => {
        let catMatch = cat === "All" || v.category === cat;
        let availMatch = avail === "All" || v.available === avail;
        return catMatch && availMatch ;
    })
    render(filtered);
}

function clearFilter(){
    document.getElementById("catFilter").value="All";
    document.getElementById("availFilter").value="All";
    render(fleetData);

}