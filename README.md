
Thymeleaf JS Todo
=================

Example project for showcasing [Thymeleaf JS](https://github.com/ultraq/thymeleaf-js).
Based on [TodoMVC](http://todomvc.com/) example applications uses the
[TodoMVC app template](https://github.com/tastejs/todomvc-app-template).


Installation
------------

TODO (heheh)


Isomorphic templates
--------------------

Like the TodoMVC examples, this example app can be run just by opening the
`index.html` file in a browser.  When used in conjunction with the built-in Node
server, [Express](http://expressjs.com/) (type: `npm start` from the console and
then navigate to `http://localhost:3000/`), then the app uses the server to
store and retrieve data (just like you would with a real Thymeleaf app).  If you
try reloading the page after saving some TODO items, then what you'll get is a
bit of "isomorphic templating" (for lack of a better term) in that the same HTML
templates are used by both the client AND server!  This feature doesn't require
a Node server and can be easily replaced with any Java application using the
original Thymeleaf.  I only picked Express to keep the number of languages in
this example to a very nice and manageable 1.
