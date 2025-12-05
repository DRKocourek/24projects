const airports = [
    { icao: "IRFD", fullName: "Greater Rockford" },
    { icao: "IPPH", fullName: "Perth" },
    { icao: "IZOL", fullName: "Izolirani" },
    { icao: "ITKO", fullName: "Tokyo" },
    { icao: "ILAR", fullName: "Larnaca" },
    { icao: "IIAB", fullName: "McConnell AFB" },
    { icao: "IPAP", fullName: "Paphos" },
    { icao: "IGRV", fullName: "Grindavik" },
    { icao: "IDCS", fullName: "Saba" },
    { icao: "ILKL", fullName: "Lukla" },
    { icao: "IGAR", fullName: "Airbase Garry" },
    { icao: "IBLT", fullName: "Boltic" },
    { icao: "IMLR", fullName: "Mellor" },
    { icao: "ITRC", fullName: "Training Centre" },
    { icao: "IBTH", fullName: "Saint Barthélemy" },
    { icao: "IHEN", fullName: "Henstridge" },
    { icao: "IBAR", fullName: "Barra" },
    { icao: "ISCM", fullName: "RAF Scampton" },
    { icao: "ISAU", fullName: "Sauthemptona" },
    { icao: "ISKP", fullName: "Skopelos" },
    { icao: "IJAF", fullName: "Al Najaf" },
    { icao: "IUFO", fullName: "UFO Base" }
];


function createFlightplan(){
    //find the needed elements
    const dep_airport = document.getElementsByClassName("dep_airport")[0];
    const arr_airport = document.getElementsByClassName("arr_airport")[0];
    const ac_icao = document.getElementsByClassName("aircraft")[0];
    const ingame_callsign = document.getElementsByClassName("ingame-callsign")[0];
    let callsign = document.getElementsByClassName("callsign")[0];
    const flightlevel = document.getElementsByClassName("flight-level")[0];
    const ifr = document.getElementsByClassName("ifr")[0];
    const flightroute = document.getElementsByClassName("route")[0];

    let flightrules = "";
    if (!ifr.id) {
        flightrules = "IFR";
        console.log("IFR")
    } else flightrules = "VFR"; console.log("VFR");
    // 
    const depValue = dep_airport.value.trim();
    if (!airports.find(a => a.icao === depValue) && !airports.find(a => a.fullName.toLocaleLowerCase() === depValue.toLocaleLowerCase())) {
        console.log("Invalid departure airport!");
        return;
    }

    const arrValue = dep_airport.value.trim();
    if (!airports.find(a => a.icao === arrValue) && !airports.find(a => a.fullName.toLocaleLowerCase() === arrValue.toLocaleLowerCase())) {
        console.log("Invalid arrival airport!");
        return;
    }

    let arrival_fullname
    let departure_fullname
   
    if (airports.find(a => a.fullName == dep_airport.value.trim())) {departure_fullname = dep_airport.value.trim()}
    else {
        departure_fullname = getFullName(dep_airport.value.trim());
        console.log(departure_fullname);
    }
    
    if (airports.find(a => a.fullName == arr_airport.value.trim())) {arrival_fullname = arr_airport.value.trim()}
    else {
        arrival_fullname = getFullName(arr_airport.value.trim());
        console.log(arrival_fullname);
    }

    if (callsign.value.trim() == "") callsign.value = ingame_callsign.value;
    if (flightroute.value == "") flightroute.value = "GPS Direct";
    if (ac_icao.value.trim() == "" || ingame_callsign.value.trim() == "" || flightlevel.value.trim() == "") {console.log("Please fill out all the mandatory fields!"); return;}
    console.log("/createflightplan ingamecallsign:" + ingame_callsign.value + " callsign:" + callsign.value + " aircraft:" + ac_icao.value + " flightrules:" + flightrules + " departing:" + departure_fullname + " arriving:" + arrival_fullname + " flightlevel:" + flightlevel.value + " route:" + flightroute.value);
}

// find full airport name from ICAO
function getFullName(icaoCode) {
    const airport = airports.find(a => a.icao === icaoCode);
    return airport ? airport.fullName : null;
}
