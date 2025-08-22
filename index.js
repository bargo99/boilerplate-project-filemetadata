
require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });



const port = process.env.PORT || 3000;


app.use(cors());


app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const filename = req.file.originalname; // The original name of the file on the user's computer.
  const filetype = req.file.mimetype;     // The MIME type of the file (e.g., 'image/jpeg', 'text/plain').
  const filesize = req.file.size;         // The size of the file in bytes.

  res.json({
    name: filename,
    type: filetype,
    size: filesize
  });
});


app.listen(port, function() {
  console.log(`🚀 File Metadata Microservice is running on port ${port}!`);
});
