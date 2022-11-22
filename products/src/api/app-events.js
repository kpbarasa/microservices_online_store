module.exports = (app) => {

    app.use('/app-events', async  (req, res, next) => {

        const {payload} = req.body

        console.log("====================== Shoppimg Service Recieved Event ===============");

        return res.status(200).json(payload)
        
    })
}