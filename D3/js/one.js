const readline = require('readline');
const fs = require('fs');
var header =[];
var jsonArray=[];
var tempData={};
var isHeader=true;
var chkPush = false;


const rl = readline.createInterface({
	input: fs.createReadStream('../CSV/Production-Department_of_Agriculture_and_Cooperation_1.csv')
});


//var records=[];
function toJsonOilseeds() {

	rl.on('line', function(line) {

		var lineRecords= line.split(',');
		var dataflag =false;

		for(var i=0;i<lineRecords.length;i++)
		{
			if(isHeader)
			{ 
				header[i]=lineRecords[i].trim();		
			}

			else if((header[i]=="Particulars")|| (header[i]=="3-2013"))
			{

				if(lineRecords[0].includes("Oilseeds"))
				{
					if(lineRecords[0].includes("Major")||lineRecords[0].includes("Area")||
						lineRecords[0].includes("Nine")||lineRecords[0].includes("Yield"))
					{
						break;
					}
					else
					{
						if(i==0)
						{
							tempData[header[i]]=lineRecords[i];
						}
						else
						{
							tempData[header[i]]=parseFloat(lineRecords[i+1].replace("NA",0));
							dataflag=true;
						}		
					}/*end else*/
				}/*end if line records*/			
			}/*end else if header[i][*/        
		}/*end for loop*/

		if(dataflag)
		{
			jsonArray.push(tempData);
		}
		isHeader=false;
		fs.writeFileSync("../JSON1/oilseed1.json",JSON.stringify(jsonArray,null,"\t"),encoding="utf8");
		tempData={};

	});/*end rl.on*/

	return "Json created"
}//end of function


var result=toJsonOilseeds();
console.log(result);
/*-------------------------------------------------------------------------------------------------------------*/

jsonArray1=[];
tempData={};
header =[];
isHeader=true;

const rl2 = readline.createInterface({
	input: fs.createReadStream('../CSV/Production-Department_of_Agriculture_and_Cooperation_1.csv')
});

function toJsonFoodgrains() {

	rl2.on('line', function(line) {

		var lineRecords= line.split(',');
		var dataflag =false;

		for(var i=0;i<lineRecords.length;i++)
		{
			if(isHeader)
			{ 
				header[i]=lineRecords[i].trim();
			}

			else if((header[i]=="Particulars")|| (header[i]=="3-2013"))
			{
				if(lineRecords[0].includes("Foodgrains"))
				{
					if(lineRecords[0].includes("Major")||lineRecords[0].includes("Area")||
						lineRecords[0].includes("Foodgrains Production Foodgrains")||
						lineRecords[0].includes("Yield")||lineRecords[0].includes("Volume")||
						lineRecords[0].includes("Production Foodgrains Production"))
					{
						break;
					}
					else
					{
						if(i==0)
						{
							tempData[header[i]]=lineRecords[i];
						}


						else
						{
							tempData[header[i]]=parseFloat(lineRecords[i+1].replace("NA",0));}/*end i=0*/		
							dataflag=true;
						}/*end else*/
					}/*end if line records*/			
				}/*end else if header[i][*/        
			}/*end for loop*/
			
			if(dataflag)
			{
				jsonArray1.push(tempData);
			}
			isHeader=false;
			fs.writeFileSync("../JSON1/foodgrains1.json",JSON.stringify(jsonArray1,null,"\t"),encoding="utf8");
			tempData={};
		});/*end rl.on*/

}

toJsonFoodgrains();

/*-------------------------------------------------------------------------------------------------------------*/

var jsonArray2=[];
tempData={};
header =[];
isHeader=true;


const rl3 = readline.createInterface({
	input: fs.createReadStream('../CSV/Production-Department_of_Agriculture_and_Cooperation_1.csv')
});

function toJsonSouthern() {


rl3.on('line', function(line) {
	
	var lineRecords= line.split(',');
	var dataflag =false;
	
	for(var i=0;i<lineRecords.length;i++)
	{
		if(isHeader)
		{ 
			header[i]=lineRecords[i].trim();
		}
		
		else if((header[i]=="Particulars")|| (/3-/i.test(header[i])))
		{
			
			if(lineRecords[0].includes("Rice Yield Karnataka") || 
				lineRecords[0].includes("Rice Yield Andhra Pradesh") || 
				lineRecords[0].includes("Rice Yield Kerala") || 
				lineRecords[0].includes("Rice Yield Tamil Nadu") )
			{
				if(i==0)
				{
					tempData[header[i]]=lineRecords[i];
				}
				
				 for(i=3;i<25;i++)
				 {
				 	tempData[header[i]]=parseFloat(lineRecords[i+1].replace("NA",0));
				 }	
				dataflag=true;
			}/*end if line records*/
		}/*end else if header[i][*/          
	}/*end for loop*/

		

	if(dataflag)
	{
		jsonArray2.push(tempData);
	}
	isHeader=false;	
	fs.writeFileSync("../JSON1/southern1.json",JSON.stringify(jsonArray2,null,"\t"),encoding="utf8");
	tempData={};

});/*end rl.on*/



}//end of function

toJsonSouthern();