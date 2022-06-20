const multer=require('multer')

//guardar imagenes en mi carpeta local .........IMAGENES TIENEN QUE SER .PNG
const storage=multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './images/imgs')
    },
    filename: function(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
})

const upload= multer({storage})

module.exports=upload