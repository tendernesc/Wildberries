//функция создания элемента html
function createElement(tag, className, placeAppend, text, id) {
  const element = document.createElement(tag);
  element.classList.add(className);
  if (id) element.id = id;
  element.innerHTML = text;
  placeAppend.append(element);
  return element;
}

let activeImage = null;
let cardsInBasket = [];

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

//Создаем корзину
const basket = createElement('div','header-top__basket',headerTop, 'Корзина');
const basketContainer = createElement('div', 'header-top__basket-container', headerTop, '');
const basketDeleteAll = createElement('button', 'header-top__basket-container__delete', basketContainer,'Очистить корзину');
const cardsUl = createElement('ul', 'header-top__basket-container__ol', basketContainer,'' );
const totalPrice = createElement('h3','header-top__basket-container__total', basketContainer, 'Итого: ')

// Вызываем функцию для восстановления данных из localStorage
getName();

// Обработчик события для кнопки 'Корзина'
basket.addEventListener('click', function (event) {
  // Предотвращаем всплытие события, чтобы не срабатывало на document
  event.stopPropagation();

  if (cardsInBasket.length > 0) {
    // Если корзина открыта, то закрываем
    if (basketContainer.style.display === 'block') {
      basketContainer.style.display = 'none';
      document.removeEventListener('click', closeBasketHandler);
    } else {
      // Показываем корзину
      basketContainer.style.display = 'block';

      // Добавляем обработчик для закрытия корзины при нажатии на любое место на странице
      document.addEventListener('click', function(){
        basketContainer.style.display = 'none';
      });
    }
  } else {
    alert('Корзина пуста');
  }
});

basketDeleteAll.addEventListener('click', function(){
  basketContainer.style.display = 'none';
  cardsInBasket = [];
  setName();
})

//создаем main и вкладываем слайдер и хит карточек
const main = createElement('main', 'main', root, '');
const wrapper = createElement('div', 'main-wrapper', main,'');

//Слайдер
const slider = createElement('div', 'main-wrapper-slider', wrapper, '');
const sliderContainer = createElement('div', 'main-wrapper-slider-container',slider, '');

//Карточки
const textInfo = createElement('h4', 'main-wrapper__info',wrapper, 'Хиты продаж');
const cardsWrapper = createElement('div','main-wrapper-cards', wrapper,'');

//Функция для получения данных 
async function getCards() {
  const response = await fetch('https://65c28052f7e6ea59682b76ff.mockapi.io/id/Wildberies');
  const result = await response.json();
  return result;
}

//Функция для создания карточек 
async function printCards(cards) {
  for (let i = 0; i < 8 ; i++) {
    const cardContainer = createElement('div', 'main-wrapper-cards-container', cardsWrapper, '');
    const card = cards[i];
    const randomParam = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
    const imageCard = createElement('img', 'main-wrapper-cards-container__img', cardContainer, '');
    imageCard.src = card.picture + `?random=${randomParam}`;
    imageCard.alt = card.title;
    const addToBasket = createElement('button', 'main-wrapper-cards-container__button_add',cardContainer, 'Добавить в корзину')
    const cardTitle = createElement('h3', 'main-wrapper-cards-container__title', cardContainer, `${card.title}`);
    const cardPrice = createElement('h4', 'main-wrapper-cards-container__price', cardContainer, `Цена: ${card.price.slice(0, -3)} р.`);

    //Обработчик событий для добавлении карточи в корзину
    addToBasket.addEventListener('click', function () {
      
      //Создаем объект с данными о товаре
      let cardToAdd = {
        title: card.title,
        price: card.price.slice(0, -3) + ' р.',
        id: card.id
      };
    
      // Пушим карточку-товар в массив
      cardsInBasket.push(cardToAdd);
      console.log(cardsInBasket);
    
      // Очищаем и обновляем список корзины
      cardsUl.innerHTML = '';
      cardsInBasket.forEach((item) => {
        const listItem = createElement('li', 'header-top__basket-container__list-item', cardsUl, `${item.title} - ${item.price}`);
      });
    
      // Вычисляем итоговую сумму
      const totalSum = cardsInBasket.reduce((sum, item) => sum + parseInt(item.price), 0);
      totalPrice.textContent = `Итого: ${totalSum} р.`;
      setName();
      alert("Товар добавлен в корзину");
    });


    //обработчик события click для каждой картинки
    imageCard.addEventListener('click', (event) => {
      event.stopPropagation();

      // Если есть активная картинка, уменьшает ее размер
      if (activeImage) {
        activeImage.style.transform = 'scale(1)';
      }

      // Установим текущую активную картинку в новую картинку
      activeImage = imageCard;

      // Увеличим размер новой картинки
      imageCard.style.transform = 'scale(1.5)';
      imageCard.style.transition = 'transform 0.3s';
      imageCard.style.zIndex = '1';
    });

    //обработчик событий для клика в любое место
    document.addEventListener('click', () => {

      // Если клик был сделан вне текущей активной картинки, уменьшакм ее размер
      if (activeImage) {
        activeImage.style.transform = 'scale(1)';
        activeImage = null;
      }
    });

    //обработчик событий для кнопки Esc
    document.addEventListener('keydown', (event) => {
      
      // Если нажата клавиша Esc, уменьшите размер текущей активной картинки
      if (event.key === 'Escape' && activeImage) {
        activeImage.style.transform = 'scale(1)';
        activeImage = null;
      }
    });

  }
  return cards;
}

//вызываем функцию для создания карточек из полученных данных
getCards().then(data => printCards(data)).then(data => createSlider(data));

//Функция для записи данных в localStorage
function setName(){
  localStorage.setItem("cardsInBasket", JSON.stringify(cardsInBasket))
}

//Функция для воссоздания ситуации на странице исходя из данных в localStorage
function getName() {
  if (localStorage.getItem("cardsInBasket")) {
    cardsInBasket = JSON.parse(localStorage.getItem("cardsInBasket"));

    // Обновляем отображение корзины
    cardsUl.innerHTML = '';
    cardsInBasket.forEach((item) => {
      const listItem = createElement('li', 'header-top__basket-container__list-item', cardsUl, `${item.title} - ${item.price}`);
    });

    // Вычисляем итоговую сумму
    const totalSum = cardsInBasket.reduce((sum, item) => sum + parseInt(item.price), 0);
    totalPrice.textContent = `Итого: ${totalSum} р.`;
  }
}



function createSlider(data) {
  const slider = createElement('div', 'slider', wrapper, '');
  const sliderWrapper = createElement('div', 'slider-wrapper', slider, '');

  let currentX = 0;
  const slideWidth = 300; 

  for (let i = 0; i < data.length; i++) {
    const card = data[i];
    const randomParam = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
    const parag = createElement('div', 'parag', sliderWrapper, '');
    const img = createElement('img', 'picture', parag, '');
    img.src = card.picture + `?random=${randomParam}`;
    img.alt = card.title;
  }

  const totalSlides = data.length;
  const visibleSlides = 4; 
  const maxVisibleSlides = totalSlides - visibleSlides;

  const prev = createElement('button', 'prev', slider, '<');
  prev.addEventListener('click', () => {
    if (currentX < 0) {
      currentX += slideWidth;
      sliderWrapper.style.transform = `translateX(${currentX}px)`;
    }
  });

  const next = createElement('button', 'next', slider, '>');
  next.addEventListener('click', () => {
    if (currentX > -slideWidth * maxVisibleSlides) {
      currentX -= slideWidth;
      sliderWrapper.style.transform = `translateX(${currentX}px)`;
    }
  });

  return data;
}
