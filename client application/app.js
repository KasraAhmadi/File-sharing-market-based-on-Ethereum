var bodyParser = require("body-parser"),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    Web3 = require('web3');
var user_api = require('./routes/user');
var app = express();
server = require('http').Server(app);
app.use(express.json())
app.use(cors({ origin: '*' }));
app.use(express.static(__dirname, { dotfiles: 'allow' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Set Port
app.set('port', (process.env.PORT || 9090));
app.use('/user', user_api);

async function main() {

    server.listen(app.get('port'), function () {
        console.log('Server started on port ' + app.get('port'));
    });
}
main();