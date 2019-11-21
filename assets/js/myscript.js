function generateDays() {
  // salviamo in una variabile i tot giorni di un mese che abbiamo indicato nel moment seguendo la regola imposta 'DD/MM/YYYY'
  var numeriGG = moment("01/01/2018", "DD/MM/YYYY")
    .add(m, "months")
    .daysInMonth();

  var meseOutput = moment("01/01/2018", "DD/MM/YYYY")
    .add(m, "months")
    .format("MMMM").toUpperCase();
  console.log(meseOutput);
  $("#mese").html(meseOutput);
  console.log(numeriGG);
  //Eseguo un ciclo per creare ciascun giorno del mese nel mio html
  for (let i = 1; i <= numeriGG; i++) {
    var currentDate = moment([y, m, i]).format("YYYY-MM-DD");
    // console.log("TCL: generateDays -> currentDate", currentDate)
    var currentDay = moment(currentDate).format("DD dddd");
    $(".calendario ul").append(
      '<li data-date="' + currentDate + '">' + currentDay + "</li>"
    );
  }
//   after generating the calendar check if the starting date is sunday if not then function starts (28)
  sundayCheck();
}


// check if this 8th child is sunday if not then add a blank li
function sundayCheck(){
    var sunday = $('ul li:nth-child(8)').html().indexOf('domenica') > -1;
    console.log(sunday);
    if (sunday===false) {
        $(".calendario ul").prepend('<li></li>')
        sundayCheck();
    }
    
}
// link month changes if button is clicked, it resets the ul setup fisrt then generate a new calendar with festives
function dateSetter() {
  link ="https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + m;
  $(".calendario ul").html("");
  generateDays();
  askFestivita();
}

function askFestivita() {
  $.ajax({
    url: link,
    method: "GET",
    success: function(dati) {
    //   console.log(dati);
      // per ogni elemento dentro l'array cerca nel html l'attributo che corrisponde alla z.data e poi cambia il suo colore e aggiungi la festivita
      dati.response.forEach(z => {
        console.log(z.name, z.date);
        $('.calendario ul [data-date="' + z.date + '"]')
          .addClass("festa")
          .append(" - " + z.name);
      });
    },
    error: function() {
      console.log("ahahha sfigato");
    }
  }); //$.ajax ends
} //function askFestivita ends

$(document).ready(function() {

// basic rules to be change whenever you want, the very backbown of generateDays functions
  m = 0;
  y = 2018;
  dateSetter();

// if next btn is clicked then m++ if it goes higher than max value then goes to 0
  $("#next").click(function() {
    // if (m<13 && m>0) {
    if (m >= 0 && m < 11) {
      m++;
    } else {
      m = 0;
    }
    console.log(m);
    dateSetter();
  });
  
  // if prev btn is clicked then m-- if it goes lower than max value then goes to 11
  $("#prev").click(function() {
    if (m > 0 && m <= 11) {
      m--;
    } else {
      m = 11;
    }
    console.log(m);
    dateSetter();
  });

//   some bonus experiments to give user more choices, each options on select tag has value then 'm' takes its value
  $("select").on("change", function() {
    // salva l'elemento cambiato
    var xData = $("option:selected", this);
    var month = xData.val();
    // save its value then change it
    m = month;
    dateSetter();
  });

 
});
