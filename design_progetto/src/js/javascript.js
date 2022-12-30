//CHARTJS

//CANVAS
Chart.defaults.global.defaultFontFamily = 'Poppins';
Chart.defaults.global.defaultFontSize = 12;
Chart.defaults.global.defaultFontColor = 'black';
var date, measureinfo, geoplacename, indicatorname, value;
var xmlhttp = new XMLHttpRequest();
var chart;
var myObj;
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        date = myObj.map(function (e) {
            return String(e.start_date).substring(0, 10);
        });
        measureinfo = myObj.map(function (e) {
            return e.measure_info;
        });
        geoplacename = myObj.map(function (e) {
            return String(e.geo_place_name);
        });
        indicatorname = myObj.map(function (e) {
            return String(e.name);
        });
        value = myObj.map(function (e) {
            return e.data_value;
        });
        var ctx = document.getElementById('canvas').getContext('2d');
        var config = {
            type: 'bar',
            data: {
                labels: places,
                datasets: [{
                    label: 'NOx',
                    data: valueNOx,
                    backgroundColor: '#f2e5e5',
                },
                {
                    label: 'Concentrazione media di Benzene nell\'aria',
                    data: valueAirTox,
                    backgroundColor: '#2b3a55',
                },
                {
                    label: 'SO2',
                    data: valueSO2,
                    backgroundColor: '#ce7777',
                }
                ]
            },
            options: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        fontColor: 'black',
                        pointStyle: 'circle',
                        usePointStyle: true,
                    }
                },
                layout: {
                    padding: {
                        left: 50,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                tooltips: {
                    enabled: true
                }
            }
        };
        chart = new Chart(ctx, config);
        assigndatacanvas();
        //PIECHART
        var barColors = ["#f2e5e5", "#2b3a55", "#ce7777"];
        var labels1 = ["NOx", "Benzene", "SO2"];
        var data1 = calcolavaloriny();
        new Chart("piechart", {
            type: "pie",
            data: {
                labels: labels1,
                datasets: [{
                    backgroundColor: barColors,
                    data: data1
                }]
            },
            options: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        fontColor: 'black',
                        pointStyle: 'circle',
                        usePointStyle: true,
                    }
                }
            }
        });
    }
};
xmlhttp.open("GET", "https://data.cityofnewyork.us/resource/c3uy-2p5r.json", true);
xmlhttp.send();
var places = ["New York City", "Bronx", "Manhattan", "Queens", "Staten Island", "Brooklyn"];
var valueNOx = [];
var valueAirTox = [];
var valueSO2 = [];
function assigndatacanvas() {
    if (document.getElementById("tuttibutton").disabled == false) {
        document.getElementById("tuttibutton").classList.add("buttoncanvasselected");
        document.getElementById("tuttibutton").classList.remove("buttoncanvas");
        document.getElementById("tuttibutton").disabled = true;
        document.getElementById("nordbutton").classList.add("buttoncanvas");
        document.getElementById("nordbutton").classList.remove("buttoncanvasselected");
        document.getElementById("nordbutton").disabled = false;
    }
    for (var i = 0; i < date.length; i++) {
        if (indicatorname[i] == "Boiler Emissions- Total NOx Emissions") {
            for (var j = 0; j < places.length; j++) {
                if (places[j] == geoplacename[i]) {
                    var k = valueNOx.length;
                    valueNOx[k] = value[i];
                }
            }
        }
        if (indicatorname[i] == "Air Toxics Concentrations- Average Benzene Concentrations") {
            for (var j = 0; j < places.length; j++) {
                if (places[j] == geoplacename[i]) {
                    var k = valueAirTox.length;
                    valueAirTox[k] = value[i];
                }
            }
        }
        if (indicatorname[i] == "Boiler Emissions- Total SO2 Emissions") {
            for (var j = 0; j < places.length; j++) {
                if (places[j] == geoplacename[i]) {
                    var k = valueSO2.length;
                    valueSO2[k] = value[i];
                }
            }
        }

    }
    chart.data.labels = places;
    chart.data.datasets[0].data = valueNOx;
    chart.data.datasets[1].data = valueAirTox;
    chart.data.datasets[2].data = valueSO2;
    chart.update();
}
function mostranordcanvas() {
    if (document.getElementById("nordbutton").disabled == false) {
        document.getElementById("nordbutton").classList.add("buttoncanvasselected");
        document.getElementById("nordbutton").classList.remove("buttoncanvas");
        document.getElementById("nordbutton").disabled = true;
        document.getElementById("tuttibutton").classList.add("buttoncanvas");
        document.getElementById("tuttibutton").classList.remove("buttoncanvasselected");
        document.getElementById("tuttibutton").disabled = false;
    }
    var nplaces = ["Bronx", "Manhattan", "Queens"];
    var nvalueNOx = [];
    var nvalueAirTox = [];
    var nvalueSO2 = [];
    for (var i = 0; i < places.length; i++) {
        for (var j = 0; j < nplaces.length; j++) {
            if (places[i] == nplaces[j]) {
                nvalueNOx[j] = valueNOx[i];
                nvalueAirTox[j] = valueAirTox[i];
                nvalueSO2[j] = valueSO2[i];
            }
        }
    }
    chart.data.labels = nplaces;
    chart.data.datasets[0].data = nvalueNOx;
    chart.data.datasets[1].data = nvalueAirTox;
    chart.data.datasets[2].data = nvalueSO2;
    chart.update();
}
function calcolavaloriny() {
    var datany = [valueNOx[0], valueAirTox[0], valueSO2[0]];
    return datany;
}
//2.0
var request2 = new XMLHttpRequest();
var chartrifiuti;
var myObj2;
var waste_date, waste_eu, waste_germany, waste_france, waste_italy, waste_uk, waste_netherlands;
request2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myObj2 = JSON.parse(this.responseText);
        waste_date = myObj2.map(function (e) {
            return e.date;
        });
        waste_eu = myObj2.map(function (e) {
            return e.European_Union;
        });
        waste_germany = myObj2.map(function (e) {
            return e.Germany;
        });
        waste_france = myObj2.map(function (e) {
            return e.France;
        });
        waste_italy = myObj2.map(function (e) {
            return e.Italy;
        });
        waste_uk = myObj2.map(function (e) {
            return e.United_Kingdom;
        });
        waste_netherlands = myObj2.map(function (e) {
            return e.Netherlands;
        });
        var ctxrifiuti = document.getElementById('rifiuti').getContext('2d');
        var configrifiuti = {
            type: 'line',
            data: {
                labels: waste_date,
                datasets: [{
                    label: 'EU media',
                    data: waste_eu,
                    borderColor: '#2b3a55',
                    backgroundColor: '#2b3a5529'
                },
                {
                    //italy
                    borderColor: "#92BA92",
                    backgroundColor: 'transparent'
                },
                {
                    //germany
                    borderColor: "#FED049",
                    backgroundColor: 'transparent'
                },
                {
                    //france
                    borderColor: "#CE7777",
                    backgroundColor: 'transparent'
                },
                {
                    //uk
                    borderColor: "#434242",
                    backgroundColor: 'transparent'
                },
                {
                    //netherlands
                    borderColor: "#FEBE8C",
                    backgroundColor: '#febd8c1a'
                }
                ]
            },
            options: {
                legend: {
                    display: false,
                    position: 'top',
                    labels: {
                        fontColor: 'black',
                        pointStyle: 'circle',
                        usePointStyle: true,
                    }
                },
                layout: {
                    padding: {
                        left: 50,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                tooltips: {
                    enabled: true
                }
            }
        };
        chartrifiuti = new Chart(ctxrifiuti, configrifiuti);
    }
};
request2.open("GET", "https://samuelepeirone.github.io/data_eurostat/eu_waste.json", true);
request2.send();
function mediaeuropea(){
    if (document.getElementById("eu_button").disabled == false) {
        document.getElementById("eu_button").classList.add("buttoncanvasselected");
        document.getElementById("eu_button").classList.remove("buttoncanvas");
        document.getElementById("eu_button").disabled = true;
        document.getElementById("paesi_button").classList.add("buttoncanvas");
        document.getElementById("paesi_button").classList.remove("buttoncanvasselected");
        document.getElementById("paesi_button").disabled = false;
    }
    chartrifiuti.data.datasets[0].backgroundColor = '#2b3a5529';
    chartrifiuti.data.datasets[0].data = waste_eu;
    chartrifiuti.data.datasets[1].data = null;
    chartrifiuti.data.datasets[2].data = null;
    chartrifiuti.data.datasets[3].data = null;
    chartrifiuti.data.datasets[4].data = null;
    chartrifiuti.data.datasets[5].data = null;
    chartrifiuti.options.legend.display = false;
    chartrifiuti.update();
}
function paesieuropei(){
    if (document.getElementById("paesi_button").disabled == false) {
        document.getElementById("paesi_button").classList.add("buttoncanvasselected");
        document.getElementById("paesi_button").classList.remove("buttoncanvas");
        document.getElementById("paesi_button").disabled = true;
        document.getElementById("eu_button").classList.add("buttoncanvas");
        document.getElementById("eu_button").classList.remove("buttoncanvasselected");
        document.getElementById("eu_button").disabled = false;
    }
    chartrifiuti.data.datasets[0].backgroundColor = 'transparent';
    chartrifiuti.data.datasets[1].label = "Italia";
    chartrifiuti.data.datasets[1].data = waste_italy;
    chartrifiuti.data.datasets[2].label = "Germania";
    chartrifiuti.data.datasets[2].data = waste_germany;
    chartrifiuti.data.datasets[3].label = "France";
    chartrifiuti.data.datasets[3].data = waste_france;
    chartrifiuti.data.datasets[4].label = "UK";
    chartrifiuti.data.datasets[4].data = waste_uk;
    chartrifiuti.data.datasets[5].label = "Paesi Bassi";
    chartrifiuti.data.datasets[5].data = waste_netherlands;
    chartrifiuti.options.legend.display = true;
    chartrifiuti.update();
}
//RIFIUTIPIE
var request3 = new XMLHttpRequest();
var chartrifiutipie;
var myObj3;
var paesi_waste, waste_latest_date, waste_latest_value;
var top5_paesi_waste=[];
var top5_value_waste=[];
request3.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myObj3 = JSON.parse(this.responseText);
        paesi_waste = myObj3.map(function (e) {
                return String(e.place);
        });
        waste_latest_date = myObj3.map(function (e) {
                return e.date;
        });
        paesi_latest_value = myObj3.map(function (e) {
                return e.value;
        });
        var ctxrifiutipie = document.getElementById('rifiutipie').getContext('2d');
        var configrifiutipie = {
            type: 'pie',
            data: {
                labels: top5_paesi_waste,
                datasets: [{
                    data: top5_value_waste,
                    backgroundColor: ["#92BA92", "#2b3a55", "#ce7777", "#FEBE8C", "#FFDBA4", "#f2e5e5"] 
                   }
                ]
            },
            options: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        fontColor: 'black',
                        pointStyle: 'circle',
                        usePointStyle: true,
                    }
                },
                layout: {
                    padding: {
                        left: 50,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                tooltips: {
                    enabled: true
                }
            }
        };
        chartrifiutipie = new Chart(ctxrifiutipie, configrifiutipie);
        calcolatop5();
    }
};
request3.open("GET", "https://samuelepeirone.github.io/data_eurostat/eu_waste_data.json", true);
request3.send();
function calcolatop5(){
    for(var i=0; i<5; i++){
        top5_value_waste[i]=paesi_latest_value[i];
        top5_paesi_waste[i]=paesi_waste[i];
    }
    var sommarestanti=0;
    for(var i=5; i<paesi_waste.length; i++){
        if(paesi_latest_value[i]!=":"){
            sommarestanti+=paesi_latest_value[i];
        }
    }
    top5_value_waste[5]=sommarestanti;
    top5_paesi_waste[5]="Altri";
    chartrifiutipie.data.labels = top5_paesi_waste;
    chartrifiutipie.data.datasets[0].data = top5_value_waste;
    chartrifiutipie.update();
}
//-----------------------------------------------------INDEX-----------------------------------
function cambiastilelista(){
    document.getElementsByClassName("mydata")[0].classList.add("primarigasoldi");
}
//----------------------------------------------ABOUTUS------------------------------
function linkselezionato(nome){
    if(nome==""){
        document.getElementById("linkparagrafo").innerHTML="--";
    }
    else{
        document.getElementById("linkparagrafo").innerHTML=nome;
    }
}