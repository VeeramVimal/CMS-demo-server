const fs = require('fs')
const httpStatus = require('http-status')
const ApiError = require('./ApiError')

const removeFile = async (file) => {
    if(file !== null){
        // const response = await fs.unlink(file, ((res) => res))
        var response = fs.unlink(file, (err => {
            if (err) throw err
            else {
                console.log("Deleted Image successfully");
            }
        }))
        return response
    }
    return null
}
module.exports =  removeFile