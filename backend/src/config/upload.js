const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);

            // cb -> callback, funcao que deve ser chamada assim que o nome do arquivo estiver pronto
            cb(null, `${name}-${Date.now()}${ext}`);            
        },
    }),
};