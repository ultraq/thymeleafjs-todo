
ThymeleafJS Todo
================

[![Build Status](https://travis-ci.com/ultraq/thymeleafjs-todo.svg?branch=master)](https://travis-ci.com/ultraq/thymeleafjs-todo)

Example project for showcasing [ThymeleafJS](https://github.com/ultraq/thymeleafjs).
Based on the [TodoMVC](http://todomvc.com/) example application.

![demo](demo.gif)

Also acts as a good reason to put ThymeleafJS through its paces and get a feel
for how it is to develop with it in conjunction with the original Thymeleaf.
Many things coming out of this project are informing ThymelafJS development.


Installation
------------

Requires Java 8+ and Node 8+ to be installed on your machine.

(Fork and) clone this repo to your computer.  From a terminal you can run this
project by running `./gradlew bootRun`.  That will run installation and build
scripts for both the UI and website projects, then start an embedded server to
host the app.

Once the app is running, visit http://localhost:8080/ in your browser and you
should now be seeing the Todo app, powered by Spring Boot, Thymeleaf, and
ThymeleafJS.


Isomorphic templates
--------------------

Thymeleaf is used to render the initial HTML on the server and serve that up to
your browser.  After that, a combination of ThymeleafJS and REST endpoints are
used to power the todo list.  Modifications to the list items are reflected back
to the server (so you can reload the page and get the most recent state of
things), while these same actions trigger client-side re-renders of the list
using the exact same Thymeleaf templates used for the initial HTML.  No more
full-page refreshes or having to manage the same HTML structures with different
server-side and client-side frameworks! 😁


Lessons learned / caveats
-------------------------

The following items are being tracked in https://github.com/ultraq/thymeleafjs/issues/13

### As of ThymeleafJS 0.10.0

In creating this, I did come across some things that made total template
isomorphism a bit out of reach.  Because of the difference in data structures in
Java vs JavaScript (Java collections and JavaScript arrays), the same expression
for checking a collection/array length has to be different, eg:

```html
<!-- Java -->
<div th:if="${items.size() > 0}">...</div>

<!-- JavaScript -->
<div thjs:if="${items.length}">...</div>
```

ThymeleafJS is currently undergoing thinking and development to try resolve this
difference so that the developer experience is as close to "write once" as
possible.  As of 0.10.0, the solution has been to include both expressions on
the element: ThymeleafJS will read any `thjs` attributes over `th` ones, so any
expressions that need to be JS-specific can be written this way.
