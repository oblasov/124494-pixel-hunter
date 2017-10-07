/**
 * @param {String} html
 * @return {Element}
 */
export const getElementFromTemplate = (html) => {
  let template = document.createElement(`template`);
  template.innerHTML = html;

  if (`content` in template) {
    return template.content.cloneNode(true);
  } else {
    return template.cloneNode(true);
  }

};
