# Geographic Research Coding and UI Challenge!
 
 Author: David Spears - daspears3000@gmail.com
 
## Task 1:

- HTML is in: ui_challenge.html
- CSS is in: css/ui_challenge.css
- Screenshot is in img/screenshot.png

Screenshot taken in Firefox on Windows.

## Task 2:

- Demo HTML file:  index.html 
- No need to run 'npm install' unless you want to run lint (npm run lint)
- Table object contstructor is in src/table.js

### Design:

A single object constructor, Table, is implemented.  It accepts two parameters: the id of an element
to server as the container, and an object that configures the columns and initial set of rows.

I chose to not put any of the object functions on the prototype so that I could maintain private
data members and functions in the object.  This means for each Table object created, the functions
are re-declared, consuming memory.  If there were a use case in the future where many Table objects
were being created, it could be worthwhile to refactor this and move the functions to the prototype.

The columns are passed as an array of objects.  Each column object must have a name property that is
used as the column heading, and can be used in API calls to control the ordering and display of
columns.  As a future enhancement I'd look at supporting an optional 'heading' property that could
override the name as the displayed column heading.  Another future enhancement idea would be to
support column "groups", where a group could be used for setting classes, or controlling which
columns are displayed, especially when there are a large number of columns.

The rows are also passed as an array of objects.  Rows can also have name properties, but they are
optional.  When a name is provided, it can be used later to update the class property of the row, or
in a row replacement API to replace the named row.

Row updating is modeled after Javascript's splice() API.

### Examples:  

 See the demo.js file, which creates two Table objects and 
 exercises the API on one of them.

 The demo will call a new API every 3 seconds to transform table1.

## Testing environment:

  Did the setup for Jasmine, Sinon, but only had time to write one test.
  Decided to spend time on the visual demo instead.

### Test setup from scratch:

- Created an initial package.json file.
- npm install --save-dev jshint
- npm install --save-dev jasmine-core sinon
- npm install --save-dev karma karma-jasmine karma-jshint-preprocessor
- npm install --save-dev phantomjs-prebuilt karma-phantomjs-launcher

### Also Installed jQuery, lodash, and bootstrap via npm:

- npm install --save lodash@4 jquery bootstrap

