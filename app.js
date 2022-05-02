// Requiring module
const express = require('express');
const path = require('path');
const hbs = require('hbs');

// Creating express object
const app = express();

// Port Number
const PORT = 3000;

// App settings
app.set('views', 'views');
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.use(express.static(path.join(__dirname, 'views')));

// GET
app.get('/', (req, res) => {
	return res.send('OK');
});

app.get('/index', (req, res)=>{
	res.render('index', {
		subject: 'hbs template engine',
		name: "template",
		link: "https://google.com"
	});
});

// LISTENER
app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running, and App is listening on port "+ PORT)
	else
		console.log("Error occured, server can't start", error);
	}
);