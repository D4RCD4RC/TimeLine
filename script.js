'use strict';

const URL_JSON = './zelda-timeline.json';

/**
 * Obtiene los datos del archivo JSON y los devuelve ordenados por fecha.
 * @returns {Promise<Array>} Lista de objetos ordenados por fecha.
 */
const getData = async () => {
  const response = await fetch(URL_JSON);
  const data = await response.json();

  // Ordena por el campo 'date' de menor a mayor
  return data.sort((a, b) => a.date - b.date);
};

/**
 * Crea un elemento HTML con contenido opcional y atributos.
 * @param {string} tag - Tipo de elemento HTML a crear.
 * @param {Object} options - Opciones de configuración del elemento.
 * @returns {HTMLElement}
 */
const createElement = (tag, { text = '', attrs = {} } = {}) => {
  const element = document.createElement(tag);
  if (text) element.textContent = text;

  // Asignar atributos si existen
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
};

/**
 * Renderiza el header principal de la página.
 */
const renderHeader = () => {
  const header = createElement('header');
  const title = createElement('h1', { text: 'Zelda Timeline' });

  header.append(title);
  document.body.append(header);
};

/**
 * Renderiza el footer con la información del autor.
 */
const renderFooter = () => {
  const footer = createElement('footer');
  const author = createElement('p', { text: 'Daniel Rivas - 2022' });
  const email = createElement('p', { text: 'danieriv@gmail.com' });

  footer.append(author, email);
  document.body.append(footer);
};

/**
 * Genera la sección correspondiente a un elemento de la timeline.
 * @param {Object} item - Datos del evento.
 * @returns {HTMLElement} sección HTML.
 */
const createTimelineSection = ({ date, title, image, text }) => {
  const section = createElement('section');

  const h2 = createElement('h2', { text: date });
  const h3 = createElement('h3', { text: title });
  const img = createElement('img', { attrs: { src: image, alt: title } });
  const p = createElement('p', { text });

  section.append(h2, h3, img, p);
  return section;
};

/**
 * Obtiene los datos y añade cada sección al DOM dentro del elemento <main>.
 */
const renderTimeline = async () => {
  const data = await getData();

  const main = createElement('main');
  const fragment = document.createDocumentFragment();

  data.forEach(item => fragment.append(createTimelineSection(item)));

  main.append(fragment);
  document.body.append(main);
};

/**
 * Inicializa la interfaz generando header, timeline y footer.
 */
const init = async () => {
  renderHeader();
  await renderTimeline();
  renderFooter();
};

// Inicialización de la aplicación
init();
