/**
 * Table Demo app
 */

$(document).ready(function() {
  'use strict';

  var table1 = new Table("table1",{
    classes: 'table table-bordered', // Optional. Sets class on <table>
    cols: [
      {name:'Col 1',classes:'active text-center'},
      {name:'Col 2',classes:'danger'},
      {name:'Col 3'}
    ],
    rows: [
      {cells: ['Col 1 Data','Col 2 Data','Col 3 Data'], classes:'info'},
      {cells: ['Col 1 Data','Col 2 Data','Col 3 Data']},
      {name: "machine1", cells: ['Col 1 Data','Col 2 Data','Col 3 Data']},
      {name: "machine2", cells: ['Col 1 Data','Col 2 Data','Col 3 Data'], classes:'warning'},
      {name: "machine3", cells: ['Col 1 Data','Col 2 Data','Col 3 Data']},
      {cells: ['Col 1 Data','Col 2 Data','Col 3 Data'], classes:'warning'},
      {cells: ['Col 1 Data','Col 2 Data','Col 3 Data'], classes:'success'},
      {cells: ['Col 1 Data','Col 2 Data','Col 3 Data']},
    ],
    showCols: ['Col 3','Col 1','Col 2'] // set a different default order
  });

  var table2 = new Table("table2",{
    classes: 'table table-bordered', // Optional. Sets class on <table>
    cols: [
      {name:'T2 Col 1',classes:'active text-center'},
      {name:'T2 Col 2',classes:'danger'},
      {name:'T2 Col 3'}
    ],
    rows: [
      {cells: ['T2 Col 1 Data','T2 Col 2 Data','T2 Col 3 Data'], classes:'info'},
      {cells: ['T2 Col 1 Data','T2 Col 2 Data','T2 Col 3 Data']},
      {name: "machine1", cells: ['T2 Col 1 Data','T2 Col 2 Data','T2 Col 3 Data']},
      {name: "machine2", cells: ['T2 Col 1 Data','T2 Col 2 Data','T2 Col 3 Data'], classes:'warning'},
      {name: "machine3", cells: ['T2 Col 1 Data','T2 Col 2 Data','T2 Col 3 Data']},
    ],
  });

  // Render both tables.
  table1.render();
  table2.render();

  // Return a function that runs a series of callback functions with a uniform delay
  // between them, and displays a message for each callback.
  function getRunner(delay,outputElement) {
    var time=3000;
    return function(msg,test) {
      setTimeout(function() {
        outputElement.innerHTML=msg;
        test();
      },time);
      time += delay;
    };
  }


  // Start calling APIs on table1, leave table2 alone.
  var run = getRunner(3000,document.getElementById('table1_msg'));
  // Try various APIs on table1:
  run('Show cols 3,2',  function() {table1.showCols(['Col 3','Col 2']).render();});
  run('Show cols 2,1',  function() {table1.showCols(['Col 2','Col 1']).render();});
  run('Show cols 1,2,3',function() {table1.showCols(['Col 1','Col 2','Col 3']).render();});
  run('Show cols 3,2',  function() {table1.showCols(['Col 3','Col 2']).render();});
  run('Show cols 2,1',  function() {table1.showCols(['Col 2','Col 1']).render();});
  run('Show all cols',  function() {table1.showCols().render();});
  run('All cols - blank class',  function() {table1.setColClasses([0],'').render();});
  run('all rows - blank class',  function() {table1.setRowClasses([0],'').render();});
  run('Set row machine1 to danger',  function() {table1.setRowClasses('machine1','danger').render();});
  run('Set all Rows to danger',  function() {table1.setRowClasses([0],'danger').render();});
  run('Set all Rows-success',  function() {table1.setRowClasses([0,table1.getNumRows()],'success').render();});
  run('Set all Rows-empty',  function() {table1.setRowClasses([0,table1.getNumRows()],'').render();});
  run('first row - success',  function() {table1.setRowClasses([0,1],'success').render();});
  run('first 4 - danger',  function() {table1.setRowClasses([0,4],'danger').render();});
  run('last row - success',  function() {table1.setRowClasses([-1],'success').render();});
  run('last row - info',  function() {table1.setRowClasses([-1,1],'info').render();});
  run('last two - danger',  function() {table1.setRowClasses([-2],'danger').render();});
  run('last 2 - info',  function() {table1.setRowClasses([-2,2],'info').render();});
  run('next to last - danger',  function() {table1.setRowClasses([-2,1],'danger').render();});
  run('all rows - blank',  function() {table1.setRowClasses([0],'').render();});
  run('All cols - blank',  function() {table1.setColClasses([0],'').render();});
  run('Col 1 - success',  function() {table1.setColClasses('Col 1','success').render();});
  run('next to last col - success',  function() {table1.setColClasses([-2,1],'success').render();});
  run('next to last col - danger',  function() {table1.setColClasses([-2,1],'danger').render();});
  run('All cols - blank',  function() {table1.setColClasses([0],'').render();});
  run('last 2 cols - danger',  function() {table1.setColClasses([-2,2],'danger').render();});
  run('All cols - blank',  function() {table1.setColClasses([0],'').render();});
  run('last 2 cols - danger',  function() {table1.setColClasses([-2],'danger').render();});
  run('All cols - blank',  function() {table1.setColClasses([0],'').render();});
  run('first 2 cols - success',  function() {table1.setColClasses([0,2],'success').render();});
  run('All cols - blank',  function() {table1.setColClasses([0],'').render();});
  run('last col - success',  function() {table1.setColClasses([-1],'success').render();});
  run('All cols - blank',  function() {table1.setColClasses([0],'').render();});
  run('last col - success',  function() {table1.setColClasses([-1,1],'success').render();});
  run('replace all rows',  function() {
    table1.spliceRows(0,table1.getNumRows(),[
      {cells: ['Col 1 New','Col 2 New','Col 3 New'], classes:'info'},
      {cells: ['Col 1 New','Col 2 New','Col 3 New']},
      {name: "machine1", cells: ['Col 1 New','Col 2 New','Col 3 New']}
    ]).render();
  });
  run('append rows',  function() {
    table1.spliceRows(table1.getNumRows(),0,[
      {cells: ['Col 1 More','Col 2 More','Col 3 More'], classes:'info'},
      {cells: ['Col 1 More','Col 2 More','Col 3 More']},
      {cells: ['Col 1 More','Col 2 More','Col 3 More']}
    ]).render();
  });
  run('replace all rows w/sugar',  function() {
    table1.replaceAllRows([
      {cells: ['Col 1 New','Col 2 New','Col 3 New'], classes:'info'},
      {cells: ['Col 1 New','Col 2 New','Col 3 New']},
      {name: "machine1", cells: ['Col 1 New','Col 2 New','Col 3 New']}
    ]).render();
  });
  run('append rows w/sugar',  function() {
    table1.appendRows([
      {cells: ['Col 1 More','Col 2 More','Col 3 More'], classes:'info'},
      {cells: ['Col 1 More','Col 2 More','Col 3 More']},
      {cells: ['Col 1 More','Col 2 More','Col 3 More']}
    ]).render();
  });
  run('pre-pend rows',  function() {
    table1.spliceRows(0,0,[
      {cells: ['Col 1 First','Col 2 First','Col 3 First'], classes:'info'},
      {cells: ['Col 1 First','Col 2 First','Col 3 First']},
      {cells: ['Col 1 First','Col 2 First','Col 3 First']}
    ]).render();
  });
  run('replace last row',  function() {
    table1.spliceRows(-1,1,[
      {cells: ['Col 1 NewLast','Col 2 NewLast','Col 3 NewLast'], classes:'info'}
    ]).render();
  });
  run('replace first row',  function() {
    table1.spliceRows(0,1,[
      {cells: ['Col 1 NewFirst','Col 2 NewFirst','Col 3 NewFirst'], classes:'info'}
    ]).render();
  });
  run('replace machine1 row',  function() {
    table1.spliceRows(table1.getRowByName('machine1'),1,[
      {name: "machine1", cells: ['Col 1 Machine','Col 2 Machine','Col 2 Machine'], classes:'info'}
    ]).render();
  });
  run('Set row machine1-danger',  function() {
    table1.setRowClasses('machine1','danger').render();
  });
  run('replace machine1 row w/sugar',  function() {
    table1.replaceRowByName('machine1',[
      {name: "machine1", cells: ['Col 1 Machine','Col 2 Machine','Col 2 Machine'], classes:'info'}
    ]).render();
  });
  run('Set col 3-danger',  function() {table1.setColClasses('Col 3','danger').render();});
  run('Set row 0-success',  function() {table1.setRowClasses(0,'success').render();});
  run('Set rows 2,3,4-success',  function() {table1.setRowClasses([2,3],'success').render();});
  run('The End!',  function() {table1.setRowClasses([2,3],'success').render();});
});
