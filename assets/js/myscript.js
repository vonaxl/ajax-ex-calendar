function generateDays() {
  // salviamo in una variabile i tot giorni di un mese che abbiamo indicato nel moment seguendo la regola imposta 'DD/MM/YYYY'
  var numeriGG = moment("01/01/2018", "DD/MM/YYYY").daysInMonth();
  console.log(numeriGG);
  //Eseguo un ciclo per creare ciascun giorno del mese nel mio html
  for (let i = 1; i <= numeriGG; i++) {
    var currentDate = moment([2018, m, i]).format("YYYY-MM-DD");
    // console.log("TCL: generateDays -> currentDate", currentDate)

    var currentDay = moment(currentDate).format("DD dddd");
    $(".calendario ul").append(
      '<li data-date="' + currentDate + '">' + currentDay + "</li>"
    );
  }
}
function dateSetter() {
  var mese = moment(1+m, "MM").format("MMMM");
  console.log(mese);
  $("#mese").html(mese);
  link =
    "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + m;
  $(".calendario ul").html("");

  generateDays();
  askFestivita();
}

function askFestivita() {
  $.ajax({
    url: link,
    method: "GET",
    success: function(dati) {
      console.log(dati);
      // per ogni elemento dentro l'array cerca nel html l'attributo che corrisponde alla z.data e poi cambia il suo colore e aggiungi la festivita
      dati.response.forEach(z => {
        console.log(z.name, z.date);
        $('.calendario ul [data-date="' + z.date + '"]')
          .css("color", "red")
          .append(" - " + z.name);
      });
    },
    error: function() {
      console.log("ahahha sfigato");
    }
  }); //$.ajax ends
} //function askFestivita ends

$(document).ready(function() {
  m = 0;
  dateSetter();

  $("#next").click(function() {
    // if (m<13 && m>0) {
    if (m >= 0 && m < 11) {
      m++;
    } else {
      m = 0;
    }
    console.log(m);
    dateSetter(dateSetter);
    // }
  });
  $("#prev").click(function() {
    if (m > 0 && m <= 11) {
      m--;
    } else {
      m = 11;
    }

    console.log(m);
    dateSetter(dateSetter);
  });


});
