// server.js
// where your node app starts

// init project
const express = require( 'express' );
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require( 'cors' );
app.use( cors( {optionSuccessStatus: 200} ) );  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use( express.static( 'public' ) );

// http://expressjs.com/en/starter/basic-routing.html
app.get( '/', function( req, res )
{
  res.sendFile( __dirname + '/views/index.html' );
} );

// your first API endpoint...
app.get( '/api/hello', function( req, res )
{
  res.json( {greeting: 'hello API'} );
} );

app.route( '/api/timestamp/' ).get( ( req, res ) =>
{
  const timeStamp = new Date();
  res.json( {
    'unix': timeStamp.getTime(),
    'utc': timeStamp.toUTCString(),
  } );
} );

app.route( '/api/timestamp/:date_string' ).get( ( req, res ) =>
{
  let userInput = req.params.date_string;
  if( userInput.includes( '-' ) === false )
  {
    userInput = parseInt( userInput );
  }
  const timeStamp = new Date( userInput );
  if( timeStamp.toString() !== 'Invalid Date' )
  {
    res.json( {
      'unix': timeStamp.getTime(),
      'utc': timeStamp.toUTCString(),
    } );
  }
  // invalid
  else
  {
    res.json( {error: 'Invalid Date'} );
  }
} );

// listen for requests :)
// process.env.PORT
const listener = app.listen( 3000, function()
{
  console.log( 'Your app is listening on port ' + listener.address().port );
} );