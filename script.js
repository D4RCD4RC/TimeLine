'use strict';
const urlJson = './zelda-timeline.json';

async function getData() {
  const response = await fetch(urlJson);
  const data = await response.json();
  return data.sort((a, b) => {
    return a.date - b.date;
  });
}

//crear un Header y un h1 en el body
const header = document.createElement('header');
const h1 = document.createElement('h1');
h1.textContent = 'Zelda TimeLine';
header.append(h1);
document.body.append(header);

const main = document.createElement('main');
document.body.append(main);

// crear un footer y dos p en el body
const footer = document.createElement('footer');
const p1 = document.createElement('p');
p1.textContent = 'Daniel Rivas - 2022';
const p2 = document.createElement('p');
p2.textContent = 'danieriv@gmail.com';
footer.append(p1, p2);
document.body.append(footer);

//Generar secciones para cada objeto del arreglo
function generarSecciones({ date, title, image, text }) {
  const section = document.createElement('section');
  const h2 = document.createElement('h2');
  h2.textContent = date;
  const h3 = document.createElement('h3');
  h3.textContent = title;
  const img = document.createElement('img');
  img.setAttribute('src', image);
  const p = document.createElement('p');
  p.textContent = text;

  section.append(h2, h3, img, p);
  return section;
}

//Añadir cada seccion al main
async function appendSecciones() {
  const chars = await getData();
  const fragment = document.createDocumentFragment();
  for (const char of chars) {
    fragment.append(generarSecciones(char));
  }
  main.append(fragment);
}
appendSecciones();
