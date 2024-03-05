const renderedHTML = (viewData, html) => {
  if (!viewData) {
    throw new Error('viewData argument is empty');
  }
  return viewData.toString().replace('{{productList}}', html);
}

export default renderedHTML;