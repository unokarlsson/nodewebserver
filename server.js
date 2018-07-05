const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((request,response,next) => {
    const now = new Date().toString();
    const log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(error) => {
        if(error) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use((request,response,next) => {
//     response.render('maintanence.hbs');
// });

// This must be below the app.use calls
// Otherwise the static pages will be served.
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});

app.get('/',(request,response) => {
    // response.send('<h1>Hello Express!</h1>');

    // response.send({
    //     name: 'Uno',
    //     likes: [
    //         'Programming',
    //         'Investing'
    //     ]
    // });

    response.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website!'
    });
});

// app.get('/about',(request,response) => {
//     response.send('About Page');
// });
app.get('/about',(request,response) => {
    response.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad',(request,response) => {
    response.send({
        errorMessage: 'Something bad happend!'
    });
});

app.get('/projects',(request,response) => {
    response.render('projects.hbs',{
        pageTitle: 'Projects'
    });
});

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});