/**
 *
 * table.js
 *
 * @author David Spears - daspears3000@gmail.com
 *
 * Note: Requires lodash and jQuery.
 *
 * If using Browserify we'd do:
 *    var _ = require('lodash');
 *    var $ = require('jquery');
 *    var jQuery = $;
 *    module.exports = Table;
 */
/**
 * Table is an object for rendering HTML tables, given a confiuration consisting
 * of column and row definitions.  Bootstrap styles may be applied to the table
 * either in the initial column/row configuration, or dynamically via provided
 * APIs.  An API is provided to display a subset of the columns in any order.
 * An API is also provided to update the row configuration.
 *
 * Currently this does not place any functions on the funtion's prototype, so
 * extra memory is consumed by re-defining functions for each object created.
 * The advantage of this approach is that we can have private data and
 * functions that are kept in the closure that are protected from accidental
 * modification.  However, if we had a use case where a large number of
 * table objects were needed, we could re-factor to move the functions to
 * prototype and expose all the data in the object.
 *
 * @cosntructor
 */
function Table(id,userConfig) {
  'use strict';

  // Private variables:

  // Extend defaulf configuration.
  // Note: this is the only dependency on jQuery (could eliminate if needed).
  var config = $.extend({
    'classes': 'table table-bordered'
  },userConfig);
  // Mapping of cols in config to cols bein displayed.
  var colMap;
  // Keep a reference to this object.
  var self = this;
  // DOM element container for the table.
  var container;

  /**
   * Returns the number of data rows in the table.
   * @public
   */
  self.getNumRows = function() {
    return config.rows.length;
  };

  /**
   * Return the number of columns in the table.
   * @public
   */
  self.getNumCols = function() {
    return config.cols.length;
  };

  /**
   * Get index of array element with matching name property.
   * @private
   */
  function getIndexByName(theArray, name) {
    var ix = _.findIndex(theArray, function(element) { return element.name==name; });
    if (ix < 0) {
      throw 'Unknown name: '+name;
    }
    return ix;
  }

  /**
   * Get index of a row by name.
   * @public
   */
  self.getRowByName = function(name) {
    return getIndexByName(config.rows, name);
  };

  /**
   * Get index of a col by name.
   * @public
   */
  self.getColByName = function(name) {
    return getIndexByName(config.cols, name);
  };

  /**
   * Sets the columns to be shown, and their order.
   * @public
   *
   * @param cols - array of column names.
   */
  self.showCols = function(cols) {
    if (cols===undefined || cols==='' || cols===[]) {
      // Default to showing all cols in natural order
      colMap = _.range(config.cols.length);
    } else {
      // Use the provided array of cols to decide which cols to show in which order
      colMap = _.map(cols,function(name) { return self.getColByName(name); });
    }
    return self;
  };

  /**
   * Set the class attribute in a set of array elements.  This is used
   * for *both* columns and rows in the table.
   * @private
   *
   * @param rows - can be a "name" (string), a row number, or range array [start,length]
   * @param classes - space separated class names (or an empty string to clear)
   * @param theArray - the array being operated on (rows or cols of table config)
   */
  function setClasses(indicies,classes,theArray) {
    var low, high, num;
    if (typeof indicies == "string") {
      // It's a single row, identified by name:
      low = high = getIndexByName(theArray,indicies);
    } else if (typeof indicies == "number") {
      // It's a single row, identified by numeric index:
      low = high = indicies;
    } else if (Array.isArray(indicies)) {
      // It's an array, first element is starting index, second is length
      low = indicies[0] || 0; // default first to zero
      num = indicies[1] || theArray.length; // default second to length of array
      // Allow negative numbers to offset backwards from end of rows array:
      if (low < 0) {
        low = theArray.length + low;
      }
      high = low+num-1; // minus 1 since low index counts as the first element.
    }
    // Make sure low isn't out of range:
    if (low < 0 || low >= theArray.length) {
      throw "Index out of range: "+low;
    }
    // Tolerate high being out of range and just make it the end of the array:
    if (high >= theArray.length) {
      high = theArray.length-1;
    }
    _.map(theArray,function(element,ix) {
      if (ix>=low && ix<=high) {
        element.classes = classes;
      }
      return element;
    });
    return self;
  }

  /**
   * Set class attribute for rows in the table.
   * @public
   *
   * @param rows - can be a "name" (string), a row number, or range array [start,length]
   * @param classes - space separated class names (or an empty string to clear)
   */
  self.setRowClasses = function(rows,classes) {
    return setClasses(rows,classes,config.rows);
  };

  /**
   * Set class attribute for columns in the table.
   * @public
   *
   * @param rows - can be a "name" (string), a row number, or range array [start,length]
   * @param classes - space separated class names (or an empty string to clear)
   */
  self.setColClasses = function(cols,classes) {
    return setClasses(cols,classes,config.cols);
  };

  /**
   * Modify the rows of the table, using Javascript splice() API.
   * @public
   *
   * @param start - index where new rows will start.
   * @param number - number of old rows to remove beginning at start index.
   * @param rows - new rows being added
   */
  self.spliceRows = function(start, number,rows) {
    var args = [start, number].concat(rows);
    Array.prototype.splice.apply(config.rows, args);
    return self;
  };

  /**
   * Syntactic sugar for common splice operation: replace all rows.
   * @public
   */
  self.replaceAllRows = function(rows) {
    return self.spliceRows(0,self.getNumRows(),rows);
  };

  /**
   * Syntactic sugar for common splice operation: append rows.
   * @public
   */
  self.appendRows = function(rows) {
    return self.spliceRows(self.getNumRows(),0,rows);
  };

  /**
   * Syntactic sugar for common splice operation: replace row by name.
   * @public
   */
  self.replaceRowByName = function(name,row) {
    return self.spliceRows(self.getRowByName(name),1,row);
  };

  /**
   * Render the table into the provided container in the DOM.
   * This builds a string of markup and assigns to innerHTML.  Could re-implement
   * later using document.createElement() type APIs if a performance advantage
   * can be shown.
   * @public
   */
  self.render = function() {
    var markup, i, j, ix, jx;
    markup = '<table class="'+config.classes+'">';
    markup += '<tr>';
    for (ix=0; ix<colMap.length; ix++) {
      i =  colMap[ix];
      if (config.cols[i].classes===undefined) {
        markup += '<th>'+config.cols[i].name+'</th>';
      } else {
        markup += '<th class="'+config.cols[i].classes+'">'+config.cols[i].name+'</th>';
      }
    }
    markup += '</tr>';
    for (i=0; i<config.rows.length; i++) {
      if (config.rows[i].classes===undefined) {
        markup += '<tr>';
      } else {
        markup += '<tr class="'+config.rows[i].classes+'">';
      }
      for (jx=0; jx<colMap.length; jx++) {
        j =  colMap[jx];
        if (config.cols[j].classes===undefined) {
          markup += '<td>'+config.rows[i].cells[j]+'</td>';
        } else {
          markup += '<td class="'+config.cols[j].classes+'">'+config.rows[i].cells[j]+'</td>';
        }
      }
      markup += '</tr>';
    }
    markup += "</table>";
    container.innerHTML = markup;
    return self;
  };

  /**
   * Perform initialiation.
   * Decided to not call render() from here, and instead let the client application
   * determine when to first render().
   * @private
   */
  function init() {
    container = document.getElementById(id);
    if (!container) {
     throw "Invalid container element id provided!: "+container+".  Is the DOM ready?";
    }
    self.showCols(config.showCols);
  }

  init();

}
