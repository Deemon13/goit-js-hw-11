Фронтенд часть приложения поиска и просмотра изображений по ключевому слову.

API.

Использован публичный API сервиса Pixabay, возвращающий массив изображений удовлетворивших критериям
параметров запроса.

Используемые свойства: webformatURL - ссылка на маленькое изображение для списка карточек.
largeImageURL - ссылка на большое изображение. tags - строка с описанием изображения. Подойдет для
атрибута alt. likes - количество лайков. views - количество просмотров. comments - количество
комментариев. downloads - количество загрузок.

БИБЛИОТЕКИ.

Для отображения большой версии изображения использована библиотека SimpleLightbox.

Для уведомлений использована библиотека notiflix.

ИНТЕРФЕЙС.

Форма, в которой пользователь будет вводить строку для поиска в текстовое поле, а при сабмите формы
необходимо выполнять HTTP-запрос.

После первого запроса при каждом новом поиске выводится уведомление в котором написано сколько всего
нашли изображений.

Если ничего подходящего найдено небыло, выводится уведомление о нулевом результате.

Pixabay API поддерживает пагинацию и предоставляет параметры page и per_page. В каждом ответе
приходит 40 объектов.

Есть кнопка (Load more), при клике по которой выполняется запрос за следующей группой изображений и
добавлется в разметку к уже существующим элементам галереи.

Если пользователь дошел до конца коллекции, кнопка скрывается и выводится уведомление о достижении
окончании галереи.

Сделана плавная прокрутка страницы после запроса и отрисовки каждой следующей группы изображений.