const express = require('express');
const router = express.Router();
const loadData = require('../Module/loadData');
const getTheIndexRandomLy = require('../Module/getTheRandomIndex');

router.post('/sendPost', async (req, res) => {
    try {

        let { tot, easy, medium, hard } = req.body;
        //checking for all the fields are present
        if (!tot || !easy || !medium || !hard) {
            res.status(400).send({
                result: false,
                message: "All fields are not filled",
            });
            return;
        }
        //if the total of the precentages of the diffculty is not matching 100 then return with fail res.
        if (easy + medium + hard != 100) {
            res.status(400).send({
                result: false,
                message: "Unable to set difficulty level to 100 percent. Please ensure that the provided percentage is correct.",
            });
            return;
        }
        //Loading the data from the file which /Data/data.json by using the module /Module/loadData.js
        let dataBase = loadData();
        //shuffeling the specific part of the database for each request
        let startIndexForDataBase = 0;
        let endIndexForDataBase = getTheIndexRandomLy(0, dataBase.length - 1);
        let currentTotalMarks = 0;

        for (let i = endIndexForDataBase; i > startIndexForDataBase; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dataBase[i], dataBase[j]] = [dataBase[j], dataBase[i]];
        }

        let quationPaper = [];

        if (dataBase) {


            let diffcultyMap = {
                'Easy': Math.floor((easy / 100) * tot),
                'Medium': Math.floor((medium / 100) * tot),
                'Hard': Math.floor((hard / 100) * tot)
            }


            //logic to filter the quotations from the dataset and creating the array of quotations
            for (let quations in dataBase) {

                if (diffcultyMap[dataBase[quations].difficulty] > 0) {
                    quationPaper.push(dataBase[quations]);
                    diffcultyMap[dataBase[quations].difficulty] = diffcultyMap[dataBase[quations].difficulty] - dataBase[quations].marks;
                    currentTotalMarks += dataBase[quations].marks;
                }
                //adjuting the last question to make the paper eactly the total marks
                if (currentTotalMarks >= tot) {
                    console.log(currentTotalMarks - tot);
                    let lastQuesion = quationPaper.pop();
                    console.log(lastQuesion);
                    lastQuesion.marks -= (currentTotalMarks - tot);
                    quationPaper.push(lastQuesion);
                    break;
                }

            }


        }

        
        if (!quationPaper) {
            res.status().send({
                result: false,
                message: "Unable to generate question paper.",
            })
            return;
        }

        let startIndexForQuationPaper = 0;
        let endIndexForQuationPaper = quationPaper.length - 1;
        // console.log(dataBase);
        //suffeling the generated question paper
        for (let i = endIndexForQuationPaper; i > startIndexForQuationPaper; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [quationPaper[i], quationPaper[j]] = [quationPaper[j], quationPaper[i]];
        }
        res.status(200).send({
            result: true,
            quationPaper: quationPaper
        })



    } catch (e) {
        console.log(e);
        res.status(500).send({
            result: false,
            message: "server side error",
        });
    }
})


module.exports = router;