let controllers_data
async function getControllers() {
  //fetch the controllers data from the "cache" server
  const controllers = await fetch("https://24test.drkocourek.stream/api/controllers");
  controllers_data = await controllers.json();
  
  console.log(controllers_data);
  //prepare all the vars before use
  let output_text = document.getElementsByClassName("display-controllers");
  let text_element = document.createElement("h1");
  let img_element = document.createElement("img");
  //remove the previously displayed data before diplaying new one
  let element_array = Array.from(document.getElementsByClassName("ATC"));
  element_array.forEach(element => {
    element.remove();
  });

  element_array = Array.from(document.getElementsByClassName("ATC_text"));
  element_array.forEach(element => {
    element.remove();
  });
  element_array = Array.from(document.getElementsByClassName("break"));
  element_array.forEach(element => {
    element.remove();
  });


  controllers_data.forEach(element => {

    if (!element.claimable){
        //debug logs for the airport name
        console.log(element.airport);
        //create the img element
        if (element.position == "CTR"){
          console.log("CTR position")
          img_element = document.createElement("img");
          img_element.className = "ATC"
          img_element.setAttribute("src", "radar-icon.svg");
          img_element.setAttribute("width", "25px");
        }
        else if(element.position == "TWR") {
          img_element = document.createElement("img");
          img_element.className = "ATC"
          img_element.setAttribute("src", "tower-icon.svg");
          img_element.setAttribute("height", "25px");
        } else{
          img_element = document.createElement("img");
          img_element.className = "ATC"
          img_element.setAttribute("src", "ground-icon.svg");
          img_element.setAttribute("width", "25px");
          img_element.setAttribute("padding", "0px")

        }
        //append the created element
        output_text[0].appendChild(img_element);
        //create the text element
        text_element = document.createElement("h1");
        text_element.setAttribute("class", "ATC_text");
        //set the correct name with the correct position
        text_element.textContent = element.airport + "_" + element.position + " - " + element.holder;
        //append the created element
        output_text[0].appendChild(text_element);
        //add an line end
        let line_break = document.createElement("br");
        line_break.setAttribute("class", "break");
        output_text[0].appendChild(line_break);
        
        text_element = null

    }   
  });
}

getControllers();

function checkFreq(){
  const frequencies = [
    { airport: "IRCC", frequency: "124.850"},
    { airport: "IRFD_TWR", frequency: "118.100"},
    { airport: "IRFD_GND", frequency: "120.400"},
    { airport: "IMLR_TWR", frequency: "133.850" },
    { airport: "IGAR_TWR", frequency: "125.600" },
    { airport: "IBLT_TWR", frequency: "120.250" },
    { airport: "ITRC_TWR", frequency: "119.150" },
    { airport: "ICCC", frequency: "126.300" },
    { airport: "ILAR_TWR", frequency: "121.200" },
    { airport: "ILAR_GND", frequency: "119.400" },
    { airport: "IPAP_TWR", frequency: "119.900" },
    { airport: "IIAB_TWR", frequency: "127.250" },
    { airport: "IHEN_TWR", frequency: "130.250" },
    { airport: "IBAR_TWR", frequency: "118.750" },
    { airport: "IZCC", frequency: "125.650" },
    { airport: "IZOL_TWR", frequency: "118.700" },
    { airport: "IZOL_GND", frequency: "121.900" },
    { airport: "IJAF_TWR", frequency: "119.100" },
    { airport: "ISCM_TWR", frequency: "121.300" },
    { airport: "IOCC", frequency: "132.300" },
    { airport: "ITKO_TWR", frequency: "118.800" },
    { airport: "ITKO_TWR", frequency: "118.225" },
    { airport: "IDCS_TWR", frequency: "118.250" },
    { airport: "IPCC", frequency: "135.250" },
    { airport: "IPPH_TWR", frequency: "127.400" },
    { airport: "IPPH_GND", frequency: "121.700" },
    { airport: "ILKL_TWR", frequency: "120.150" },
    { airport: "IBCC", frequency: "128.600" },
    { airport: "IBTH_TWR", frequency: "118.700" },
    { airport: "ISKP_TWR", frequency: "123.250" },
    { airport: "IGCC", frequency: "126.750" },
    { airport: "IGRV_TWR", frequency: "118.300" },
    { airport: "ISCC", frequency: "127.825" },
    { airport: "ISAU_TWR", frequency: "118.200" },
  ];
  controllers_data
}