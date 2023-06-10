const express = require('express')
const app = express()
const request = require('request')
const bodyParser = require('body-parser');

const port = process.env.PORT || 9000  // port is set by env variable or default to 9000
const Token = process.env.TOKEN

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('*', (req, res) => {

    try{
        const apiKey = req.headers.authorization?.split(' ')[1].split(':')[0]
        console.log(apiKey + " is calling history service")
        let url = 'https://api.api2d.com/custom_key/get?key=' + apiKey
        const options = {
            url,
            method: 'POST',
            json: req.body,
            headers: {
                'Authorization': `Bearer ${Token}`,
            }
        }
        request(options, function (error, response, body) {
            if (!error) {
                let resp_statuscode = body['code']
                if (resp_statuscode === 0) {
                    body['code'] = 200

                    let custom_key_json = body['data']['custom_key']
                    let custom_key_json_keys = Object.keys(custom_key_json)

                    for (let i = 0; i < custom_key_json_keys.length; i++) {
                        if (i !== 1 && i !== 2 && i !== 4){
                            delete custom_key_json[custom_key_json_keys[i]]
                        }
                    }

                    let point_usage_arrays = body['data']['point_usage_array']

                    for (let i = 0; i < point_usage_arrays.length; i++){
                        let usage_json = point_usage_arrays[i]
                        let usage_json_keys = Object.keys(usage_json)
                        for (let j = 0; j < usage_json_keys.length; j++) {
                            if (j === 1 || j === 5 || j === 6){
                                delete usage_json[usage_json_keys[j]]
                            }
                        }
                    }
                    res.status(200).send(body)
                    console.log(apiKey + " is calling history service successfully")
                }else if (resp_statuscode === 80403){
                    body['code'] = 403
                    res.send(body).status(403)
                    console.log(apiKey + " is calling history service failed")
                }
            } else {
                res.status(500).send('Internal Server Error')
                console.log(options)
            }
        })
    }catch (e) {
        console.log("APIkey is invalid or not provided")
        res.status(403).send('Forbidden')
        console.log(res.statusCode)
    }
})

// start the server listening for requests on the port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
