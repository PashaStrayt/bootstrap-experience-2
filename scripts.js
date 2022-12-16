// Функция, фильтрующая работы в портфолио.
// Принимаем аргументом filter. Его мы передавали в верстке в аттрибуте кнопок "onClick" строкой.
function applyFilter(filter) {
  // Функция, которую мы будем использовать только тут, чтобы не писать одно и то же несколько раз.
  function toggleClass(elements, method, className) {
    // Получаем массив DOM элементов и итерируемся по нему.
    // В зависимости от переданного метода добавляем, либо удаляем переданный в функцию CSS класс.
    for (let element of elements) {
      switch (method) {
        case 'add':
          element.classList.add(className);
          break;

        case 'remove':
          element.classList.remove(className);
          break;

        default:
          break;
      }
    }
  }

  // document.querySelector - это метод для получения DOM элементов в JS, чтобы управлять ими.
  // Конкретно в этом случае получаем секцию с портфолио по id'шнику, который мы задали в верстке.
  const portfolioSection = document.querySelector('#portfolio');

  // Тут то же самое, только выцепляем по классам все элементы. В переменную запишется массив.
  const firstCategoryElements = document.querySelectorAll('.first-category');
  const secondCategoryElements = document.querySelectorAll('.second-category');

  // Вот такая штука '...something' это деструктуризация в JS, то есть выкладываем все элементы из массива.
  // В нашем случае делаем это для того, чтобы создать массив, в который будут входить элементы обоих категорий.
  const allElements = [...firstCategoryElements, ...secondCategoryElements];

  // setAttribute позволяет задать DOM элементу любой аттрибут
  // В нашем случае мы задаем ему максимально возмодную высоту на время выполнения функции, чтобы у нас
  // на миллисекунду не проскакивала следующая секция, из за того, что элементы до нее мы убираем из верстки.
  // Можешь стереть следующую строку и посмотреть, что будет без нее. Я это вот тут и описал ^.
  portfolioSection.setAttribute('style', 'height: 2175px');

  // 'd-flex' и 'd-none' это сокращенные удобные классы от Bootstrap,
  // у которых всего по одному свойству:
  // 'display: flex' и 'display: none' соотвественно.
  // Таких классов в верстке полным полно и в основном все сделано на них,
  // в scss файле стилей не так много
  toggleClass(allElements, 'add', 'd-none');

  // Про switch case можешь прочитать здесь https://learn.javascript.ru/switch
  switch (filter) {
    case 'all-categories':
      // По поводу setTimeout, это функция, которая принимает аргументами функцию и время в мс, после которого эта функция выполнится.
      // Как видишь, мы тут передаем только функцию.
      // Резонный вопрос, а нахрена тогда вообще так делать?
      // Ответ такой: 
      // Движок JS в браузере (V8) выполняет сначала по порядку весь синхронный код (все, кроме setTimeout и setInterval),
      // а потом только все setTimout по порядку.
      // Можешь убрать все setTimout'ы и посмотреть что будет.
      // Анимации не будут работать, потому что наш код будет выполняться не в том порядке, в каком мы его задумали.
      setTimeout(function () {
        // Вызываем объявленную выше функцию
        toggleClass(allElements, 'remove', 'd-none');
      });
      break;

    case 'first-category':
      setTimeout(function () {
        toggleClass(firstCategoryElements, 'remove', 'd-none');
        toggleClass(secondCategoryElements, 'add', 'd-none');
      });
      break;

    case 'second-category':
      setTimeout(function () {
        toggleClass(firstCategoryElements, 'add', 'd-none');
        toggleClass(secondCategoryElements, 'remove', 'd-none');
      });
      break;

    default:
      break;
  }

  // После всех манипуляций с DOM, делаем секции высоту автоматической, какой она и была, до нашего вмешательства
  setTimeout(function () {
    portfolioSection.setAttribute('style', 'height: auto');
  });
}

// функция, которую требует сам Bootstrap, чтобы выводились сообщения у инпутов при отправке формы,
// мол, вы заполнили правильно или неправильно.
function validateForm(event) {
  // функция записана в верстке как аттрибут 'onSubmit' на форме,
  // то есть она вызывается, когда форма отправляется - когда ты нажимаешь на кнопку 'Отправить'.

  // У каждого события, а 'onSubmit' это событие, в функцию автоматом передаются сведения о нем.
  // Если интересно, можешь попробовать 'event' вывести в консоль, и посмотреть, что там есть).
  // типа такого:
  // console.log(event);

  // Нас интересует поле 'target', там находится сам dom элемент, на котором событие было вызвано.
  const form = event.target;

  // checkValidity() это метод у формы от Bootstrap, проверяет, соответствует ли она
  // регулярным выражениям и заполнена ли вообще
  if (!form.checkValidity()) {
    // Все, что дальше, исполняется только если форма не прошла валидацию.

    // preventDefault() это метод события, чтобы предовтратить поведение браузера по умолчанию,
    // в нашем случае, чтобы он не обновил страницу при отправке формы.
    event.preventDefault();


    // Класс 'was-validated' на форме позволяет Bootstrap понять, что надо показать сообщения, о том,
    // какие инпуты заполнены правильно, а какие нет
    form.classList.add('was-validated');
  }
}