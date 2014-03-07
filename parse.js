var env, $;
function parsePage(html, cb){
    env = require('jsdom').env;
    env(html, function(err, window) {
        $ = require('jquery')(window);
        table = $(html).find('#table1');
        parseTable(table, function(res){
            cb(res);
        });
    });
}

function parseTable(table, cb){
    // Find dimensions of matrix
    var n_rows = table.find('tr').length;
    var n_cols = 0;

    table.find('tr').each(function(){
        var n_tds = $(this).find('td').length;
        if (n_cols < n_tds) {
            n_cols = n_tds;
        } 
    });

    // Construct matrix
    var matrix = [];
    for (var i=0; i < n_rows; i++){
        var row = [];
        for (var j=0; j < n_cols; j++){
            row[j] = null;
        }
        matrix[i] = row;
    }

    // Fill in matrix with table values
    table.find('tr').each(function(row_index){
        var col_index = 0;
        $(this).find('td').each(function(){
            // Advance col_index to skip previously filled in matrix columns
            for (; matrix[row_index][col_index] !== null; col_index++){}

            // Fill in the matrix with the td's value

            for (var row=row_index; row < (row_index + this._childNodes.length); row++){
                for (var col=col_index; col < (col_index + this._childNodes.length); col++){
                    matrix[row][col] = $(this).text().replace('\n', '');
                }
            }
        });
    });

    var csv = '';
    for (var row, i=0; row=matrix[i]; i++){
        csv += row.join(',') + '\n';
    }
    cb(csv);
}
module.exports = parsePage;
