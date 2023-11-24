const fs = require('fs');


let dataLoading = () => {
    try {
        let file = fs.readFileSync('./Data/data.json');
        let dataParse = JSON.parse(file);

        // console.log(dataParse);
        return dataParse;

    } catch (e) {
        console.log(e);
    }
}


module.exports = dataLoading;