import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

let teaData = []
let nextId = 1

// Add a new element(tea)
app.post('/teas', (req, res) => {
    console.log("POST")
    const {name, price} = req.body
    // Creating an object to store in database
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// get all the elements(tea)
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

// To get id

app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})

//  update tea
app.put('/teas/:id', (req, res) => {
    const tea =  teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
})

// Deleting the item(tea)
app.delete('/tea/:id', (req, res) => {
    console.log("delete")
    console.log("req.params.id")
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('Tea not found')
    }
    teaData.splice(index, 1)
    return res.status(404).send('Deleted')
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`)
})