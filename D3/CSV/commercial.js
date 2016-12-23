const readline = require('readline');
const fs = require('fs');
var chkPush = false;
var tempData = {};
var header = [];
var jsonArray = [];
var isHeader = true;

var agV = { " 3-2005": 0, " 3-2006": 0, " 3-2007": 0, " 3-2008": 0, " 3-2009": 0, " 3-2010": 0, 
			" 3-2011": 0, " 3-2012": 0, " 3-2013": 0, " 3-2014": 0 }


const rl = readline.createInterface({
    input: fs.createReadStream('../CSV/Production-Department_of_Agriculture_and_Cooperation_1.csv')
});


rl.on('line', function(line) {
    var lineRecords = line.trim().split(',');


    if (isHeader) {

        header = line.trim().split(',');
        
    } 
    else 
    {
        for (var i = 0; i < lineRecords.length; i++) 
        {
            if (header[i]=="Particulars") 
            {
                if (lineRecords[0].includes("Commercial Crops")) 
                {
                    chkPush = true;

                    if (i == 0)
                    {
                        tempData[header[i]] = lineRecords[i];
                    } 
                    
                    console.log(tempData);
                }
            }

            if (chkPush == true && ( header[i] == " 3-2005" || header[i] == " 3-2006" || header[i] == " 3-2007" || 
            	header[i] == " 3-2008" || header[i] == " 3-2009" || header[i] == " 3-2010" || 
            	header[i] == " 3-2011" || header[i] == " 3-2012" || header[i] == " 3-2013" || 
            	header[i] == " 3-2014")) 
            {
                if (lineRecords[i + 1] == "NA") 
                {
                    agV[header[i]] = parseFloat(agV[header[i]]) + 0;
                } 
                else 
                {
                    agV[header[i]] = parseFloat(agV[header[i]]) + parseFloat(lineRecords[i + 1]);
                }

            }/*end if line records*/
        }/*end for loop*/
        jsonArray.push(tempData);
    }/*end else*/
    isHeader = false;
    chkPush = false;
    tempData = {};



}); /*end rl.on*/


rl.on('close', function(line) {
    var writeStream = fs.createWriteStream('../JSON1/commercial1.json');
    writeStream.write("[");

    for (var q in agV) 
    {

        if (q == " 3-2014")
            writeStream.write("{\"year\":\"" + q + "\",\"value\":" + agV[q] + "}");
        else
            writeStream.write("\n{\"year\":\"" + q + "\",\"value\":" + agV[q] + "},");
    }

    writeStream.write("]");

    
});