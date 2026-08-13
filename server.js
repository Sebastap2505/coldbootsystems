const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
