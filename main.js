const express = require('express');
var app = express();
const http = require("http")
const bodyParser = require("body-parser");
const { throws } = require('assert');

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.get("/flights", function (req, res) {
    res.sendFile(__dirname + "/flights.html")
})
app.use(express.static(__dirname + '/public'));
// 1) Add a route that answers to all request types

app.post("/flights", function (req, res) {
    try {
        let chunks = [];
        console.log(req.body.flights)
        const query = req.body.flights
        const apikey = "Your API"
        const moreinfo = "https://uk.flightaware.com/live/flight/"
        const landimgsrc = "landed.jpg"
        const inairimg = "https://c0.wallpaperflare.com/preview/283/619/775/white-plane-wing-on-sky-during-daytime.jpg"
        const url = "http://api.aviationstack.com/v1/flights?access_key=" + apikey + "&flight_icao=" + query;        //console.log(response.statusCode);
        http.get(url, function (response) {
            response.on("data", function (data) {
                const track = JSON.parse(data)
                if (track.data.length == 0) {
                    // res.send('<body style="text-align: center;margin: 0;overflow: hidden;background: url(images/error.png);background-position: center;background-size: cover;background-repeat: no-repeat;">')
                    // res.send("<h2>No flights found<h2>")
                    // res.send("<h3>Please Check the ICAO Number</h3>")
                    // res.send("<h4>Please try again</h4>")
                    // res.send("<a href='/flights'><button>Back</button></a>")
                    // res.send('</body>')
                    res.send("<h2 style='text-align: center;'>No flights found</h2>")
                    // res.send("<h3 style='text-align: center;'>Please Check the ICAO Number</h3>")
                    // res.send("<h4 style='text-align: center;'>Please try again</h4>")
                    // res.send("<a href='/flights'><button>Back</button></a>")
                    throw ("No flights found")
                }
                else {
                    const date = track.data[0].flight_date
                    const timezone = track.data[0].departure.timezone
                    const flightno = track.data[0].flight.number
                    const arivter = track.data[0].arrival.terminal
                    const delay = track.data[0].arrival.delay
                    const name = track.data[0].airline.name
                    const status = track.data[0].flight_status
                    const dept = track.data[0].departure.airport
                    const ariv = track.data[0].arrival.airport
                    const depttime = track.data[0].departure.scheduled
                    const arivtime = track.data[0].arrival.scheduled
                    const flight_icao = track.data[0].flight.icao
                    if (status == "landed") {
                        res.write("<head> <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm' crossorigin='anonymous' /> </head>")
                        res.write('<body style="text-align: center;margin: 0;overflow: hidden;background: url(images/landed.jpg);background-position: center;background-size: cover;background-repeat: no-repeat;">')
                        //style="text-align: center;margin: 0;overflow: hidden;background: url(images/landed.jpg);background-position: center;background-size: cover;background-repeat: no-repeat;"
                        res.write("<h1 style='padding-top: 20px'>Flight Status</h1>")
                        res.write("<h2>Flight Number: " + flightno + "</h2>")
                        // background: radial-gradient( circle, rgb(3, 155, 229) 20%, rgb(1, 51, 75) 120%);
                        res.write("<h4>Flight: " + name + "</h4>")
                        res.write("<p>Date of Scheduled: " + date + "</p>")
                        res.write("<p>Timezone: " + timezone + "</p>")
                        res.write("<p>Status: " + status + "</p>")
                        res.write("<p>Departure Airport: " + dept + "</p>")
                        res.write("<p>Departure: " + depttime + "</p>")
                        res.write("<p>Arrival Airport: " + ariv + "</p>")
                        res.write("<p>Arrival: " + arivtime + "</p>")
                        res.write("<p>Arrival Terminal: " + arivter + "</p>")
                        res.write("<p>Delay: " + delay + "</p>")
                        res.write("<p><strong>Flight ICAO: " + flight_icao + "</strong></p>")
                        res.write("<a href='/flights'><button class='btn btn-light mr-4'>Back</button><a>")
                        res.write("<a href='" + moreinfo + query + "' target='blank'><button class='btn btn-dark'>More Info</button><a>")
                        res.write("<br><a href='https://github.com/Manraj29' target='blank' style='text-align:center; font-size: 18px; color: white;'>By Manraj Singh Virdi </a>");
                        res.write("</body>")
                        res.send()
                        chunks.push(data);
                        req.on("end", function () {
                            let data = Buffer.concat(chunks);
                            let schema = JSON.parse(data);
                        });
                    }
                    else if (status == "scheduled") {
                        res.write("<head> <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm' crossorigin='anonymous' /> </head>")
                        res.write('<body style="text-align: center;margin: 0;overflow: hidden;background: url(images/inair.jpg);background-position: center;background-size: cover;background-repeat: no-repeat;">')
                        //style="text-align: center;margin: 0;overflow: hidden;background: url(https://c0.wallpaperflare.com/preview/283/619/775/white-plane-wing-on-sky-during-daytime.jpg);background-repeat: no-repeat;background-position: center;background-size: cover;"
                        res.write("<h1 style='padding-top: 20px'>Flight Status</h1>")
                        res.write("<h2>Flight Number: " + flightno + "</h2>")
                        // background: radial-gradient( circle, rgb(3, 155, 229) 20%, rgb(1, 51, 75) 120%);
                        res.write("<h4>Flight: " + name + "</h4>")
                        res.write("<p>Date of Scheduled: " + date + "</p>")
                        res.write("<p>Timezone: " + timezone + "</p>")
                        res.write("<p>Status: " + status + "</p>")
                        res.write("<p>Departure Airport: " + dept + "</p>")
                        res.write("<p>Departure: " + depttime + "</p>")
                        res.write("<p>Arrival Airport: " + ariv + "</p>")
                        res.write("<p>Arrival: " + arivtime + "</p>")
                        res.write("<p>Arrival Terminal: " + arivter + "</p>")
                        res.write("<p>Delay: " + delay + "</p>")
                        res.write("<p><strong>Flight ICAO: " + flight_icao + "</strong></p>")
                        res.write("<a href='/flights'><button class='btn btn-light mr-4'>Back</button><a>")
                        res.write("<a href='" + moreinfo + query + "' target='blank'><button class='btn btn-light'>More Info</button><a>")
                        res.write("<br><a href='https://github.com/Manraj29' target='blank' style='text-align:center; font-size: 18px; color: white;'>By Manraj Singh Virdi </a>");
                        res.write("</body>")
                        res.send()
                        chunks.push(data);
                        req.on("end", function () {
                            let data = Buffer.concat(chunks);
                            let schema = JSON.parse(data);
                        });
                    }
                }
            })

            if (response.statusCode == 200) {
                console.log("Server is Running Perfectly");
            } else {
                console.log("Error in Server");
                throw ("Error in Server");
            }

        })
    }
    catch (error) {
        console.log(error)
    }
})


app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000.');
});
