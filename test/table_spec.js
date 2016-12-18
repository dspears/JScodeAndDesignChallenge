
describe('Table', function() {
  it('can be constructed and used as an object', function() {
    var dummyElement = document.createElement('div');
    document.getElementById = function() { return dummyElement; };
    var table = new Table("table1",{
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
      showCols: ['Col 3','Col 1','Col 2']
    });
    table.aProperty = 1;
    expect(table.aProperty).toBe(1);
  });
});
