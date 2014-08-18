var TableData;

$(function() {
  // Handler for .ready() called.

    
    //TableData = storeTblValues();
    //TableData = $.toJSON(TableData);
    
    //console.log(JSON.stringify(TableData));
    
    getTblValues();
    
//    var newTableObject = document.getElementById('#Registry'); // or similar), then do this:
//    sorttable.makeSortable(newTableObject);
    
});

function storeTblValues()
{
    //var TableData = new Array();
    
    var myRows = [];
    var $headers = $("th");
    var $rows = $("tbody tr").each(function(index) {
      $cells = $(this).find("td");
      myRows[index] = {};
      $cells.each(function(cellIndex) {
        myRows[index][$($headers[cellIndex]).html()] = $(this).html();
      });    
    });
//    var TableData = {};
//    TableData.myrows = myRows;
    
    //TableData.shift();
    
    //console.log(JSON.stringify(TableData));
    return myRows;
}

function saveNewRow(){
    if ($('#Name').val()
        || $('#Address').val()
        || $('#Phone').val()
        || $('#Email').val()){
        console.log("true");
    var row = "<tr>";
    row += "<td contenteditable>"+$('#Name').val()+"</td>";
    row += "<td contenteditable>"+$('#Address').val()+"</td>";
    row += "<td contenteditable>"+$('#Phone').val()+"</td>";
    row += "<td contenteditable>"+$('#Email').val()+"</td>";
    row += "</tr>";
    
    $('#Name').val("");
    $('#Address').val("");
    $('#Phone').val("");
    $('#Email').val("");
    
    $('#Registry > tbody:last').append(row);
    }
}

$( "#Target" ).submit(function( event ) {
  //alert( "Handler for .submit() called." );
    saveTblValues();
  event.preventDefault();
});

function saveTblValues(){
    
    saveNewRow();
    TableData = storeTblValues();
    console.log(JSON.stringify(TableData));
    $.ajax({
        type: "POST",
        url: "php/saveTblData.php",
        data: "pTableData=" + JSON.stringify(TableData),
        success: function(msg){
            
        }
    });
    
}

function getTblValues() {
    var url = "../php/Json/registry.json"
    $.getJSON(url , function(data) {
    var tbl_body = "";
    $.each(data, function() {
        var tbl_row = "";
        $.each(this, function(k , v) {
            tbl_row += "<td contenteditable>"+v+"</td>";
        })
        tbl_body += "<tr>"+tbl_row+"</tr>";                 
    })
    $("#Registry tbody").html(tbl_body);
});
}

