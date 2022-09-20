const express = require("express")
const app = express()
const port = process.env.PORT || 5050;


app.get('/api/mercadopago', (request, response) => { 
    response.send('Works!')
})

app.post('/api/mercadopago', (request, response) => { 
    response.send(request.body)
})

app.listen(port, () => console.log(`Server running in port ${port}`))
module.exports = app;
