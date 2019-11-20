

function generateDays (){
    // salviamo in una variabile i tot giorni di un mese che abbiamo indicato nel moment seguendo la regola imposta 'DD/MM/YYYY'
    var numeriGG = moment('01/01/2018','DD/MM/YYYY').daysInMonth()
    console.log(numeriGG);
    for (let i = 1; i <= numeriGG; i++) {
        var currentDate = '2018-01-0'+i;
        var currentDay = moment(currentDate).format('DD dddd MMMM YYYY');
        $('.calendario').append('<div class=giorno data-date="'+currentDate+'">'+currentDay+'</div>')
    }
}

function askFestivita(){
    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
        method: "GET",
        success: function(dati) {
            console.log(dati);
            // per ogni array cerca nel html l'attributo che corrisponde alla z.data e poi cambia il suo colore e aggiungi la festivita
            dati.response.forEach(z => {
                console.log(z.name, z.date);
                $('.giorno[data-date="'+z.date+'"]').css('color','red').append(' '+z.name)
            });
            
        },
        error: function() {
            console.log("ahahha sfigato");
        }
    }); //$.ajax ends
}//function askFestivita ends

$(document).ready(function() {
    generateDays ();
    askFestivita();
});