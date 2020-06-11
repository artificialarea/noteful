**Iterations, per assignment:** 

[v1: React Router](https://courses.thinkful.com/react-v1/checkpoint/14#assignment)

[v2.1: API GET](https://courses.thinkful.com/react-v1/checkpoint/16#assignment)

[v2.2: Context](https://courses.thinkful.com/react-v1/checkpoint/16#assignment)

[v3.x: API POST, Validation, Error Boundary + PropType](https://courses.thinkful.com/react-v1/checkpoint/17#assignment)

<br />

## COMPONENTS STRUCTURE

* **Index.js** 
  * **App.js** **////////// STATEFUL**
    * _nav_
      * **NoteListNav.js** — paths: "/", "/folders/:folderId"
      * **NotePageNav.js** — path: "/notes/:noteId"
    * _main_ 
      * **NoteListMain.js** — paths: "/", "/folders/:folderId"
      * **NotePageMain.js** — path: "/notes/:noteId"
        * **Note.js**
        
* **dummy-store.js** _(test data prior to API integration)_

<br />

## Noteful API (JSON Server)
* **git clone repo**: https://github.com/tomatau/noteful-json-server
* **database**: http://localhost:9090/db
* **documentation**:
  * http://localhost:9090/
  * https://github.com/typicode/json-server


<br />

<hr />


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
