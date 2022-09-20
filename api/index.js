const express = require("express")
const app = express()
const port = process.env.PORT || 5050;




// app.post('/api/mercadopago', async (request, response) => {

    
//     const httpSettings =  
//     { 
//         method: 'GET', 
//         headers: 
//         { 
//             "Accept": "*/*",
//             "Content-Type": "application/json",
//             "Authorization": "Bearer APP_USR-7921586162084086-080216-29c361336d9e656a28ae4409b38a61ca-1171928995"
//         }
//     }

//     const httpResponse = await https.get(`https://api.mercadopago.com/v1/payments/${request.query["data.id"]}`, httpSettings)
//     const result = await httpResponse;

//     async function check 


 
//     console.log('Query:', request.query)
//     console.log('Result:', result)

//     response.sendStatus(200)

// })


app.get('/api/mercadopago', async function(request, response) { 

    const paymentIndex = request.query["data.id"]
    const paymentType = request.query["type"]


    async function getPaymentStatus() 
    { 

        function Payment(
            external_reference,
            status,
        )
        { 
            this.orderNumber = external_reference
            this.statusPayment = status
        }

        const settings = 
        { 
            method: "GET", 
            headers: 
            { 
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer APP_USR-7921586162084086-080216-29c361336d9e656a28ae4409b38a61ca-1171928995"
            }
        }

        const response = await fetch(`https://api.mercadopago.com/v1/payments/${request.query["data.id"]}`, settings);
        const result = await response.json()


        return ( 
            new Payment( 
                result.status, 
                result.status_detail, 
                result.external_reference
            )
        )


    }

    async function updatePaymentStatus(bodyContent) 
    { 
        const settings = 
        { 
            method: "POST", 
            headers: 
            { 
                "Accept": "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyContent)
        }

        const response = await fetch('', settings); 
        const result = await response.json()

        return result 

    }

    if(paymentIndex !== undefined)
    { 
        if(paymentType !== "payment")
        { 
            response.sendStatus(404)
        }
        else
        { 
            const paymentStatus = await getPaymentStatus()
            const updatePaymentStatus = await updatePaymentStatus(paymentStatus);

            return updatePaymentStatus;

        }
    }else{ 

        response.sendStatus(404)

    }

})


app.listen(port, () => console.log(`Server running in port ${port}`))
module.exports = app;
