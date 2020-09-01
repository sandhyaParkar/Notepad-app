//Declare the installed modules express and body-parser.
const express = require('express');
const bodyParser = require('body-parser');
var addUserNote = require('../notes/functions/addNotes');
let note = [];

//call the express and Body-parser
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

//serving static files
app.use(express.static('public'));
//we installed the ejs and created a file inside the views
app.set('view engine', 'ejs');

//We set up the route for the App. We first use the app.get option.
app.get('/', function (req, res) {
  res.render('notepad', {
    note: note
  });
});

//then, we use app.post option.
app.post("/addNotes", function (req, res) {
  //assigning Note id to the notes using math.random
  
  const userNote = {};
  userNote.id = Math.random() * 100;
  userNote.body = req.body.newNote;
  value = {
    "id" :userNote.id,
    "data": userNote.body
  }
  addUserNote.addNotes(userNote.id,value)
  .then(function(result){
    callback("", result);
}).catch(function(err){
    callback("", err);
})

  note.push(userNote);
  //then we redirect it to the root route
  res.redirect('/');
});

//Handling the delete request

app.post('/deleteNote/:id', function (req, res) {
  console.log(req.params.id);
  const deleteNotes = note.filter(item => item.id != req.params.id);
  note = deleteNotes;
  return res.redirect('/');
});

//then we set our server port. This should always be at bottom.
app.listen(5000, function () {
  console.log("NoteApp server is running at port 5000...")
});

