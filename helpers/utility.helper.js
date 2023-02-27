const bcrypt = require('bcrypt');

function encrypt (word){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(word, salt);
}

module.exports = {
    encrypt
}