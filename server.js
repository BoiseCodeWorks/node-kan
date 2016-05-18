var express = require('express');
var app = express();
var path = require('path');

var db = require('./db');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);
console.log("listening on http://localhost:8080/");


// db.addList('Test').then(
//     function (list) {
//         console.log('List: ', list);

//         db.addCard(list.id, 'Get this Done', 'This really needs to be done.').then(
//             function (card) {
//                 console.log('Card: ', card);

//                 db.getLists().then(
//                     function (lists) {
//                         console.log('Lists: ', lists);
//                     }
//                 );                
//             }
//         );
//     }
// );

db.getLists().then(
    function (lists) {
        console.log('Lists: ', lists);
    }
); 