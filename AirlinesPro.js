const flights = [
    { id: 00, to: "New York", from: "Barcelona", cost: 700, layover: false },
    { id: 01, to: "Los Angeles", from: "Madrid", cost: 1100, layover: true },
    { id: 02, to: "Paris", from: "Barcelona", cost: 210, layover: false },
    { id: 03, to: "Roma", from: "Barcelona", cost: 150, layover: false },
    { id: 04, to: "London", from: "Madrid", cost: 200, layover: false },
    { id: 05, to: "Madrid", from: "Barcelona", cost: 90, layover: false },
    { id: 06, to: "Tokyo", from: "Madrid", cost: 1500, layover: true },
    { id: 07, to: "Shangai", from: "Barcelona", cost: 800, layover: true },
    { id: 08, to: "Sydney", from: "Barcelona", cost: 150, layover: true },
    { id: 09, to: "Tel-Aviv", from: "Madrid", cost: 150, layover: false },
  ];

const askUserName = () => {
    const name = prompt('Bienvenido, escriba su nombre, por favor.');
    if (!name || name === ""){
        alert('Introduzca un nombre valido');
        askUserName();
    }else {
        alert(`Hola ${name}, Gracias por elegirnos. `);
        
    }
}  
const showOnScreen = () => {
let showFlightsOnScreen = confirm('¿Desea ver en pantalla los vuelos programados?')
if(showFlightsOnScreen === true){
    showFlights();
    layover();
    showAverageCost();
    showLastFlights();
}else{
    console.table(flights)
}
}
const showFlights = () => {
    flights.forEach((flight) => {
        if(flight.layover === true) { 
            alert(`El vuelo con origen: ${flight.from} y con destino: ${flight.to}. Tiene un precio de: ${flight.cost}€ y efectúa escalas.`);
             
             
        }else{
            alert(`El vuelo con origen: ${flight.from} y con destino ${flight.to}. Tiene un precio de ${flight.cost}€ y no realiza escalas.`);
           }
    }
)}

const layover = () => {
    let layoverNumber = 0
    for (i = 0; i < flights.length; i++){
        if(flights[i].layover === true){
            layoverNumber++;
        }
    }
    alert(`Hay ${layoverNumber} vuelos que efectuan escala.`)
    console.table(flights)
}

const showAverageCost = () => {
    let cost = 0;
  for(let i = 0; i< flights.length; i++){
  cost = cost + flights[i].cost;
    }
    let result = cost/flights.length;
    
    alert(`El coste medio de los vuelos es de ${result}€.`);
}

const showLastFlights = () => {
    alert('Los últimos 5 destinos del día son:')
    flights.forEach((flight) => {
        if(flight.id >= flights.length-5 && flight.id < flights.length){
            let lastFive = flight.to
            alert(lastFive)
        }
    }
    )}
    const askRole = () => {
        const role = prompt(`Por favor, dime si eres ADMIN ó USER. `)
        if(!role || role === ''){
            askRole();
        }
        else if(role.toUpperCase() === 'USER'){
            searchByPrice();
        }
        else if(role.toUpperCase() === 'ADMIN'){
            addFlights();
        }
        else{
            askRole();
        }
    }
const addFlights = () => {
    let addNewFlight = confirm('¿Desea añadir un nuevo vuelo?')
    if(addNewFlight === true){
        if(flights.length >= 15){
            console.table(flights)
            alert('Para introducir un nuevo vuelo, primero tienes que eliminar alguno ya almacenado')
            deleteFlights()
        }
        let addFLightPosition = flights[flights.length - 1].id +1;
        let addFlight = {id: addFLightPosition };
        flights[flights.length] = addFlight;

        addFlight.to = prompt('Introduzca el destino del vuelo');
        if(addFlight.to === null || addFlight.to === ''){
            addFlight.to = prompt('Introduzca el destino del vuelo');
        }
        addFlight.from = prompt('Introduzca el origen del vuelo');
        if(addFlight.from === null || addFlight.from === ''){
            addFlight.from = prompt('Introduzca el origen del vuelo');
        }
        addFlight.cost = +prompt('Introduzca el coste del vuelo');
        if(Number.isNaN(addFlight.cost)){
            addFlight.cost = +prompt('Introduzca el coste del vuelo');
        }
        if(addFlight.cost === null || addFlight.cost === '' || addFlight.cost === 0){
            addFlight.cost = +prompt('Introduzca el coste del vuelo');
        }
        addFlight.layover = confirm('¿El vuelo realiza alguna escala?(Aceptar para confirmar)')
        if( addFlight.layover === true){
            addFlight.layover = true
        }else{
            addFlight.layover = false
        }addFlights()

    }else{
        console.table(flights)
        deleteFlights()
    }
}
const deleteFlights = () => {
    let deleteFlight = confirm('¿Desea eliminar algún vuelo?')
    if (deleteFlight === true){
        let deleteFLightById = +prompt('Por favor introduzca el id del vuelo que va eliminar');
        for(let i = 0; i < flights.length; i++){
            if(flights[i].id === deleteFLightById){
                flights.splice(i,1);
            }
        }
        console.table(flights)
        addFlights()
    }else{
        console.table(flights)
        continueFliying();
    }
}
const searchByPrice = () => {
    let getPrice = + prompt('Por favor, introduzca el importe que desea gastar.')
    if(Number.isNaN(getPrice)){
        alert('Por favor introduzca solamente números.');
        searchByPrice();
    }else{
        let potentialFlights = flights.filter(flight => flight.cost <= getPrice);
        if(potentialFlights.length === 0){
            alert('Ninguno de nuestros vuelos se ajusta a sus necesidades.')
        }else{
            alert('Los vuelos que podrían interesarle son los mostrados en la tabla inferior:⬇️')
            console.table(potentialFlights)
        }
    }continueFliying();
}
const continueFliying = () => {
    let flightAgain = confirm('¿Desea hacer algo más?');
    if(flightAgain === true){
        askRole();
    }
    if(flightAgain === false){
        alert('🛫Gracias por confiar en nuestra aerolínea.🛬')};
}
const proAirlinesApp = () => {
    askUserName();
    showOnScreen();
    askRole();
};
proAirlinesApp();