
//функция создания элемена html
function createElement(tag, className, placeAppend, text, id) {
  const element = document.createElement(tag);
  element.classList.add(className);
  if (id) element.id = id;
  element.innerHTML = text;
  placeAppend.append(element);
  return element;
}

//Корневой элемент
const root = document.createElement('div');
root.id = 'root';
document.body.append(root);

//создание шапки проекта
const header = createElement('header', 'header', root, '', 'header');
const headerTop = createElement('div', 'header-top', header, '');
const wildberriesLogo = createElement('h4','header-top__text', headerTop, 'Wildberries');
const searchInput = createElement('input','header-top__input', headerTop, '');
searchInput.placeholder = 'Поиск...';
const basket = createElement('button','header-top__button',headerTop, 'Корзина');

//создаем main и вкладываем слайдер и хит карточек
const main = createElement('main', 'main', root, '');
const wrapper = createElement('div', 'main-wrapper', main,'');

//Слайдер
const slider = createElement('div', 'main-wrapper-slider', wrapper, '');



const textInfo = createElement('h4', 'main-wrapper__info',wrapper, 'Хиты продаж')


//Карточки
const cardsWrapper = createElement('div','main-wrapper-cards', wrapper,'');
