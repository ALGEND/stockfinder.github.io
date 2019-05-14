// from data.js
var tableData = data;

// Declare Variables
var selectFilterSymbol= d3.select("#symbol");
var selectFilterSector=d3.select("#sector");
var selectFilterPosition=d3.select("#position");
var selectFilterRating=d3.select("#rating");
var selectFilterAction=d3.select("#action");
var selectButton=d3.select("#filter-btn");
var resetButton = d3.select("reset-btn");
var tbody=d3.select("tbody");
//var columns=["Symbol", "Name", "Sector", "Price", "Price/Earnings(trades at X times the earnings)","52 Week High", "52 Week Low", "52 Week Avg", "P/AA %","52-Week P/AA % Position", "Rating","Action"]
var columns=["symbol", "name", "sector", "price", "p_e", "high", "low","a_avg", "p_aa","position", "rating","action"]
//Table Data Fill
var fill = (inputData)=> {
inputData.forEach (stock =>{
    var row =tbody.append("tr");
    columns.forEach(column=>row.append("td").text(stock[column]))
});
}
fill(tableData);

//Perform filter
selectButton.on("click",() =>{
d3.event.preventDefault();
var enterSymbol= selectFilterSymbol.property("value").toUpperCase().trim();
var enterSector =selectFilterSector.property("value").trim();
var enterPosition =selectFilterPosition.property("value").toUpperCase().trim();
var enterRating =selectFilterRating.property("value").toUpperCase().trim();
var enterAction =selectFilterAction.property("value").toUpperCase().trim();
//Collect string value from a feedback response
var filterSymbol=tableData.filter(tableData=> tableData.symbol===enterSymbol);
console.log(filterSymbol)
var filterSector=tableData.filter(tableData=> tableData.sector===enterSector);
console.log(filterSector)
var filterPosition=tableData.filter(tableData=> tableData.position===enterPosition);
console.log(filterPosition)
var filterRating=tableData.filter(tableData=> tableData.rating===enterRating);
console.log(filterRating)
var filterAction=tableData.filter(tableData=> tableData.action===enterAction);
console.log(filterAction)
var filterAll=tableData.filter(tableData=> tableData.symbol==enterSymbol && tableData.sector===enterSector && tableData.position===enterPosition && tableData.rating===enterRating && tableData.action===enterAction);
console.log(filterAll)

tbody.html("");
//Loop thru a feedback response and perform Table Filter
let feedback = {filterSymbol, filterSector, filterPosition, filterRating, filterAction, filterAll}
if (feedback.filterAll.length !==0) { 
    fill(filterAll);
}
    else if(feedback.filterAll.length===0 &&((feedback.filterSymbol.length !==0  || feedback.filterSector.length !==0 || feedback.filterPosition.length !==0 || feedback.filterRating.length !==0 || feedback.filterAction.length !==0))){
    fill(filterSymbol) || fill(filterSector) || fill(filterPosition) || fill(filterRating) || fill(filterAction);
    }
    else{
        tbody.append("tr").append("td").text("Results are not in range!");
}
})
//Add Reset Button
resetButton.on("click", () =>{
    tbodyy.html("");
    populate(tableData)
    console.log("Reset Table")
    })

