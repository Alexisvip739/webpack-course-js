const fs = require('fs') //file siystem

fs.writeFileSync('./.env', `API=${process.env.API}\n`);
