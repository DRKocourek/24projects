async function getATIS() {
    //delete the unneeded elements
    try {
        let delete_atis_text = document.getElementById("info-text-atis");
        delete_atis_text.remove();
    } catch(err){
        console.log("the element doesnt exist anymore");
    }

    element_array = Array.from(document.getElementsByClassName("atis"));
    element_array.forEach(element => {
        element.remove();
    });
    for (let i = 0; i <= 1; i++){
    //get the input field        
        let input_field
        if (i == 0) {
            input_field = document.getElementsByClassName("dep_airport")[0];
        } else {
            input_field = document.getElementsByClassName("arr_airport")[0];
        }
            //get the output div
        const output_text = document.getElementsByClassName("display-atis")[0];
        //receive the data
        const filtered_atis = await fetch("https://24api.drkocourek.stream/api/atis?airport="+input_field.value);
        const atis_data = await filtered_atis.json();
        //create "holding" parent pre element for newline characters to apply
        const pre = document.createElement("pre");
    
        const code = document.createElement("code");
        code.setAttribute("class", "atis");
        code.textContent = atis_data.content;
        pre.appendChild(code);
        output_text.appendChild(pre);
    }

}