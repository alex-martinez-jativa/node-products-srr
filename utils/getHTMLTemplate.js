const getHTMLTemplate = (list, htmlTemplate) => {
  if (!Array.isArray(list)) {
    throw new Error('First argument must be an array');
  }
  return list.map(item => htmlTemplate(item)).join('');
}

export default getHTMLTemplate;