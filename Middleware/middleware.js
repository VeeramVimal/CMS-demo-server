const jwt =require("jsonwebtoken");

const multer = require("multer");
const express =require('express');
const app = express();
const AdminRoute = express.Router();

function image(){

    const imageStorage = multer.diskStorage({
        destination: 'img', 
        //  (request,file,cb) => {
        //     cb(null, 'uploads')
        // },
    
        filename:(request,file, cb) =>{
            console.log('file', file);
            cb(null, Date.now()+ '-'+file.originalname);
        }
       
    });
    //  console.log('store', storage)
    
    const imageUpload = multer({
        storage: imageStorage,
        // limits: {
        //   fileSize: 1000000 // 1000000 Bytes = 1 MB
        // },
        fileFilter (request,file,cb) {
        if(file.mimetype == 'img/jpeg' || file.mimetype == 'img/png'){
            cb(null, true);
            
        }else{
            cb(null, false);
        }
        }
    })
    
    // const profile =multer({storage: storage,fileFilter: fileFilter})
    AdminRoute.route('/image').post(function(req,res){
    
     
    
    // router.post('/items', itemController.get_items);
    
        console.log( 'image', req.file)
        console.log( 'img',req.files)
    
        res.send(req.file)
    }, (error, req, res, next) => {
        res.status(400).send(" error message")
    })
    
}
// module.exports = auth;
module.exports = image