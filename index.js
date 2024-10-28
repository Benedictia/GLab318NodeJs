
 const http = require('http');
 const url = require('url');
 
 const hostname = '127.0.0.1';
 const port = 3000;
 
 const server = http.createServer((req, res) => {
     const parsedUrl = url.parse(req.url, true);
     const path = parsedUrl.pathname;
 
     res.statusCode = 200;
     res.setHeader('Content-Type', 'text/html');
 
     // setting default page
     if (path === '/') {
         res.write('<h1 style="color: red">Hello World!</h1>');
         res.write('<p>I wonder what else we can send...</p>');
         res.write('<a href="/about">About Us</a><br>');
         res.write('<a href="/contact">Contact Us</a>');
         res.end();
     } 
     // About page
     else if (path === '/about') {
         res.write('<h1>About Us</h1>');
         res.write('<p>We are a fictional company dedicated to providing the best service.</p>');
         res.write('<p>Current Time: ' + new Date().toLocaleTimeString() + '</p>');
         res.write('<p>Fun fact: The longest wedding veil was longer than 63 football fields!</p>');
         res.write('<a href="/">Back to Home</a><br>');
         res.write('<a href="/contact">Contact Us</a>');
         res.end();
     } 
     // Contact page
     else if (path === '/contact') {
         res.write('<h1>Contact Us</h1>');
         res.write(`
             <form action="/submit-contact" method="POST">
                 <label for="name">Name:</label>
                 <input type="text" id="name" name="name" required>
                 <br>
                 <label for="email">Email:</label>
                 <input type="email" id="email" name="email" required>
                 <br>
                 <button type="submit">Send</button>
             </form>
             <a href="/">Back to Home</a><br>
             <a href="/about">About Us</a>
         `);
         res.end();
     } 
     // Handle form submission
     else if (path === '/submit-contact' && req.method === 'POST') {
         let body = '';
         req.on('data', chunk => body += chunk.toString());
         req.on('end', () => {
             const { name, email } = Object.fromEntries(new URLSearchParams(body));
             res.write(`<h1>Thank You, ${name}!</h1>`);
             res.write(`<p>We will respond to you at ${email} shortly.</p>`);
             res.write('<a href="/">Back to Home</a><br>');
             res.write('<a href="/about">About Us</a>');
             res.end();
         });
     } 
     // 404 Not Found
     else {
         res.statusCode = 404; 
         res.end('<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>');
     }
 });
 
 // Start the server
 server.listen(port, hostname, () => {
     console.log(`Server running at http://${hostname}:${port}/`);
 });
 