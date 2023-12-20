const express = require('express')

const app = express();

const users = [{
    name: 'John',
    kidneys: [{
        healthy: false
    }]
}];


app.get("/", function(req, res) {

    const johnKidneys = users[0].kidneys;
    const numKidneys = johnKidneys.length;

    let healthyKidneys = 0;
    for(let i=0; i<numKidneys; i++)
    {
        if(johnKidneys[i].healthy) healthyKidneys = healthyKidneys + 1;
    }

    const unhealthyKidneys = numKidneys - healthyKidneys;

    res.json({
        numKidneys, 
        healthyKidneys, 
        unhealthyKidneys
    })


})

app.use(express.json());

app.post("/", function(req, res) {
    const isHealthy = req.body.isHealthy;

    users[0].kidneys.push({healthy: isHealthy});

    res.json({
        msg: "Done!"
    })

})

app.put("/", function(req, res) {

    for(let i=0; i<users[0].kidneys.length; i++)
    {
        users[0].kidneys[i].healthy = true;
    }

    res.json({})
})

app.delete("/", function(req, res) {
    let arr = [];

    for(let i=0; i<users[0].kidneys.length; i++)
    {
        if(users[0].kidneys[i].healthy) arr.push({healthy: true});

    }

    users[0].kidneys = arr;
    res.json({msg: "Done!"});
})


app.listen(3000);