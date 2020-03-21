var tableData = data;

function tableDisplay(ufoSightings) {
  var tbody = d3.select("tbody");
  ufoSightings.forEach(ufoRecord => {
    var row = tbody.append("tr");
    Object.entries(ufoRecord).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.html(value);
    });
  });
}

function deleteTbody() {
  d3.select("tbody")
    .selectAll("tr")
    .remove()
    .selectAll("td")
    .remove();
}

console.log(tableData);
tableDisplay(tableData);

// 'Filter Table' button
var button = d3.select("#filter-btn");

button.on("click", function(event) {
  d3.event.preventDefault();
  deleteTbody();

  var filteredData = tableData;
  var inputId = document.getElementsByClassName("form-control");

  for (var i = 0; i < inputId.length; i++) {
    var idName = inputId[i].id;
    var field = d3.select("#" + idName).property("value");

    // treat empty or space-only fields as a search for ALL for that field
    if (field.trim() !== "") {
      var filteredData = filteredData.filter(
        ufoSighting =>
          ufoSighting[idName].toUpperCase().trim() ===
          field.toUpperCase().trim()
      );
    }
  }

  if (filteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
      .attr("colspan", 7)
      .html("<h4>No Records Found</h4>");
  }

  console.log(filteredData);
  tableDisplay(filteredData);
});
