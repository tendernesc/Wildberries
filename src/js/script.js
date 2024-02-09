
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
const sliderContainer = createElement('div', 'main-wrapper-slider-container',slider, '');




const textInfo = createElement('h4', 'main-wrapper__info',wrapper, 'Хиты продаж');






//Карточки
const cardsWrapper = createElement('div','main-wrapper-cards', wrapper,'');


async function getCards() {
  const response = await fetch('https://65c28052f7e6ea59682b76ff.mockapi.io/id/Wildberies');
  const result = await response.json();
  return result;
}

async function printCards(cards) {
  for (let i = 0; i < 8 ; i++) {
    const cardContainer = createElement('div', 'main-wrapper-cards-container', cardsWrapper, '');
    const card = cards[i];
    const randomParam = Math.floor(Math.random() * (1000 - 1 + 1) + 1);

    const imageCard = createElement('img', 'main-wrapper-cards-container__img', cardContainer, '');
    imageCard.src = card.picture + `?random=${randomParam}`;
    imageCard.alt = card.title;

    // const cardIncrease = createElement('button', 'main')
    // const cardВecrease
    const cardTitle = createElement('h3', 'main-wrapper-cards-container__title', cardContainer, `${card.title}`);
    const cardPrice = createElement('h4', 'main-wrapper-cards-container__price', cardContainer, `Цена: ${card.price}`);

    imageCard.addEventListener('click', () => {
      imageCard.style.transform = 'scale(1.5)'; // Увеличиваем на 10% (можете настроить по вашему вкусу)
      imageCard.style.transition = 'transform 0.3s'; // Добавляем плавность анимации
    });

    
  }
}

getCards().then(data => printCards(data));


