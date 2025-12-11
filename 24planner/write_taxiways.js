async function writeTaxiways() {
    let input_field = document.getElementsByClassName("dep_airport")[0];
    const filtered_atis = await fetch("https://24api.drkocourek.stream/api/atis?airport="+input_field.value);
    const atis_data = await filtered_atis.json();
    const depRunways = atis_data.content.match(/DEP RWY\s+([0-9]{1,2}[LRC]?(?:\s+[0-9]{1,2}[LRC]?)*)/i)?.[1].split(/\s+/);
    console.log(depRunways);
    for(let i = 0; i < depRunways.length; i++) {
        let search_runways = String(input_field.value) + "_"+ depRunways[i];
        console.log(search_runways);
        const often_taxiways = [
            {runway: "IRFD_7R", taxiway: "Gates 1-5: A A1/A2 \nGates 6-10: J J1 A A1/A2 \nGates 11-20: K K2 J2 A1"},
            {runway: "IRFD_7L", taxiway: "Gates 1-5: A A1 B B1 \n Gates 6-10: J J1 A A1 B B1 \n Gates 11-20: K K2 J2 A1 B B1"},
            {runway: "IRFD_7C", taxiway: "Gates 1-5: A F G G1 \nGates 6-10: J J1 A F G1 \nGates 11-20: K K2 J2 F G G1"},
            {runway: "IRFD_25C", taxiway: "Gates 1-5: A F G G3 rwy07C M1 M M2 \nGates 6-10: J J1 A F G G3 rwy07C M1 M M2 \nGates 11-20: K K2 J2 F G G3 rwy07C M1 M M2"},
            {runway: "IRFD_25L", taxiway: "Gates 1-5: A A3/A4/A5 \nGates 6-10: J J1 A A4 \nGates 11-20: K A A4/A5"},
            {runway: "IRFD_25R", taxiway: "Gates 1-5: A F G G3 H \nGates 6-10: J J1 A F G G3 H \nGates 11-20: K K2 J2 F G G3 H"},
            {runway: "IPPH_33", taxiway: "Gates 10-13, 20-29 & 40-47: L1-L4 D T E \nGates 14-19 & 30-32: T E \nGates 1-4: C C3 A3 E"},
            {runway: "IPPH_29", taxiway: "Gates 10-13, 20-29 & 40-47: L1-L4 D T E A A4/A5 \nGates 14-19 & 30-32: T E A A5 \nGates 1-4: C C5"},
            {runway: "ITKO_31", taxiway: "Gates 1-15: A A7 B B1 \n Gates 18-22: A A1 B1 \nGates 16-17: A14 A A7 B B1"},
            {runway: "ITKO_13", taxiway: "Gates 1-15 & 18-22: A A13 B13 \nGates 16-17: A14 A13 B13"},
            {runway: "ITKO_20", taxiway: "Gates 1-15 & 18-22: A F C3 D D5 \nGates 16-17: A14 A F C3 D D5"},
            {runway: "ILAR_24", taxiway: "Gates 1-8: A/B C C1"},
            {runway: "ILAR_6", taxiway: "Gates 1-8: A/B C C4 D D7"},
            {runway: "IZOL_10", taxiway: "Gates 1-9: A/B D D5 E E6 \nGates 10-13: C D5 E E6"},
            {runway: "IZOL_28", taxiway: "Gates 1-9: A/B D D1 E1 \nGates 10-13: C D D1 E1"},
            {runway: "IMLR_25", taxiway: "Gates 1-4: A A1"},
            {runway: "IMLR_07", taxiway: "Gates 1-4: A A2"},
        ]
        let expected_taxiway;
        let taxiway_line;
        try{
            taxiway_line = often_taxiways.find(tax => tax.runway === search_runways);
            expected_taxiway = taxiway_line.taxiway;
        } catch(err) {
            console.log(err);
            expected_taxiway = "Sorry, no information about taxiways for the selected airport/runway combination"
        }
        console.log(expected_taxiway);
        

        let pre = document.createElement("pre");
        let display_taxiways = document.createElement("h5");
        let display_runway = document.createElement("h4");
        let holding_div = document.getElementsByClassName("display-taxiways")[0];

        let placeholder = document.getElementsByClassName("taxiway-placeholder")[0];

        placeholder.remove();

        try {
            display_runway.textContent = taxiway_line.runway;
            holding_div.appendChild(display_runway);
        } catch(err) {}
        display_taxiways.textContent = expected_taxiway;
        pre.appendChild(display_taxiways);
        holding_div.appendChild(pre);
    }

}