import fs from 'fs/promises';

import getProducts from '../services/getProducts.js';
import getHTMLTemplate from '../utils/getHTMLTemplate.js';

const getProductsController = async (req, res) => {
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
}

export default getProductsController;