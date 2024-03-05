import { createServer } from 'http';
import fs from 'fs/promises';
import { parse } from 'url';

import getProducts from './services/getProducts.js';

const server = createServer( async (req, res) => {
  const path = parse(req.url).pathname;

  if (path === '/') {
    try {
      const products = await getProducts();
      
      const data = await fs.readFile('./views/index.html', 'utf-8');

      const productListHTML = products.map(product => `
        <li>
            <h3>${product.title}</h3>
            <p>${product.description}</p>
        </li>
      `).join('');

      const renderedHTML = data.toString().replace('{{productList}}', productListHTML);

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(renderedHTML);
      return res.end();

    } catch (error) {
      console.error(error);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('Internal server error');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end("404 Not Found");
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});