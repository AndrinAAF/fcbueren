const fs = require('fs');
fetch('https://www.fcbueren.ch/kalender')
  .then(res => res.text())
  .then(text => {
    fs.writeFileSync('kalender.html', text);
    console.log("Saved to kalender.html");
  });
