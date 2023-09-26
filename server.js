const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const driversRoute=require('./routes/DriverRoute');
const busRoutesRoute = require('./routes/RouteforBusRoute'); // Import your busRoutes routes
const busSchedulesRouter = require('./routes/BusSchedulesRoute'); // Import your busSchedules routes
const localPassengersRouter = require('./routes/localPassengersRoute'); // Import your localPassengers routes
const busInspectorsRouter = require('./routes/BusInspectorsRoute'); // Import your busInspectors routes
const busesRoute=require('./routes/BusRoute'); // Import busroute routes
const passengerTravelHistoryRoutes = require('./routes/PassengerTravelHistoryRoute'); // Replace with the actual path
const transportManagerRoute = require('./routes/TransportManagerRoute'); // Replace with the actual path

const app = express();
const db = require('./db')
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use('/api/driver', driversRoute); 
app.use('/api/busroutes', busRoutesRoute); 
app.use('/api/bus-schedules', busSchedulesRouter); 
app.use('/api/localpassengers', localPassengersRouter); 
app.use('/api/businspectors', busInspectorsRouter);
app.use('/api/bus', busesRoute); 
app.use('/api/travelhistory', passengerTravelHistoryRoutes);
app.use('/api/bus', busesRoute);
app.use('/api/manager',transportManagerRoute ); 

app.get("/", (req, res) => {

    res.send("Server Working!");

});



const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);