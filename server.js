import { createServer } from 'http';
import fs from 'fs/promises';
import { parse } from 'url';

import Router from './router/router.js';
import getProducts from './services/getProducts.js';
import getHTMLTemplate from './utils/getHTMLTemplate.js';

const router = new Router();

router.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    
    const data = await fs.readFile('./views/index.html', 'utf-8');

    const productTemplate = product => `
      <li>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
      </li>
    `;

    const productListHTML = getHTMLTemplate(products, productTemplate);

    const renderedHTML = data.toString().replace('{{productList}}', productListHTML);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(renderedHTML);
    return res.end();

  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('Internal server error');
  }
});

const server = createServer(async (req, res) => {
  const path = parse(req.url).pathname;
  const handler = router.resolve(req.method, path);

  if (handler && typeof handler === 'function') {
    handler(req, res);

  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404 Not Found');
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});