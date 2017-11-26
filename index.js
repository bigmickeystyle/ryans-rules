const express = require('express');
const app = express();

app.use(express.static('dist'));

app.listen(process.env.PORT || 3000, () => {
  if (process.env.PORT) {
      console.log('hi heroku');
  } else {
      console.log('Express server is up on port 3000');
  }
});

