
Thymeleaf JS Todo
=================

Example project for showcasing [Thymeleaf JS](https://github.com/ultraq/thymeleaf-js).
Based on the [TodoMVC](http://todomvc.com/) example application, uses the
[TodoMVC app template](https://github.com/tastejs/todomvc-app-template).


Installation
------------

Requires Java 8 and Gradle to be installed on your machine.

(Fork and) clone this repo to your computer.  From a terminal you can run this
project by entering the following commands:

`gradle npmInstall` - installs packages required by the UI project

`gradle build` - build UI and website projects

`gradle bootRun` - start the Todo app

Once the app is running, visit http://localhost:8080/ in your browser and you
should now be seeing the Todo app, powered by Spring Boot, Thymeleaf, and
Thymeleaf JS.


Isomorphic templates
--------------------

Thymeleaf is used to render the initial HTML on the server and serve that up to
your browser.  After that though, it's all JavaScript code and Thymeleaf JS to
render new todo items as they get added, using the exact same template that
Thymeleaf on the server side used to render those items.  No more having to
manage the same template code in 2 templates using different templating
languages!  Booyah! 😁


Lessons learned / caveats
-------------------------

(The following items I've raised as https://github.com/ultraq/thymeleaf-js/issues/13)

### As at Thymeleaf JS 0.8.0

In creating this, I did come across some things that made the goal of isomorphic
templates a lot harder than I thought.  Firstly, because of the difference in
languages, I could only get a single template shared by both Thymeleaf on the
server and Thymeleaf JS on the browser: the `todo-list-item.html` template.
This is because it's a very "dumb" template that only outputs values from a very
simple model.  The moment things got slightly more complex, like in the
`todo-list.html` template, I could no longer share templates.

The main problem was that the expression language used in the templates was
originally for Java/Groovy.  eg: look at this attribute processor:

```html
<section ... th:if="${todos.size() > 0}">
  ...
</section>
```

It's a simple "render this element if the list of todos has at least 1 item in
it", but that's code for Java.  Even though that expression isn't supported by
Thymeleaf JS yet, JavaScript arrays/lists don't have a `size()` function, they
have a `length` property instead.  So, if this were to be used by both libraries,
2 attribute processors would need to be present:

```html
<section ... th:if="${todos.size() > 0}" thjs:if="${todos.length}">
  ...
</section>
```

😕
