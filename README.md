# Проект Mesto фронтенд + бэкенд.
## Проектная работа №15

### Версия 0.0 от 22 мая 2021 г.
### Романенко Е.К.

Фронтэнд и бэкенд для проекта **Место**. 

Сайт типа социальная сеть с элементами фотохостинга, с настроенными интерактивными элементами (включая всплывающие окна и формы для заполнения), но без анимации.

Используемые технологии фронтэнда: **HTML**, **CSS** (включая grid и flex), **JavaScript** на базе **React.js**. Используется адаптивная верстка для корректного отображения на экранах различной ширины в диапазоне от 320px до 1280px. Используются технологии **JavaScript** для создания всплывающих окон, взаимодействующих с пользователем, классов карточек, валидации форм.
Используемые технологии бэкенда: **Node.js, Express.js, MongoDB**.

## Фронтэнд проекта:
https://fmkrom.students.nomoredomains.club/

## Бэкенд проекта:
https://api.fmkrom.students.nomoredomains.icu/

## Адрес сервера:
https://178.154.200.193/

### Функции фронтэнда, реализованные в проекте:

1. Функция выведения во всплывающее окно полномасштабного изображения из карточки
2. Функция показа модальных окон
3. Настроена сборка проекта при помощи Webpack
4. Функция создания новой карточки через модальное окно с отправкой запроса на сервер
5. Функция редактирования профиля пользователя через модальное окно с отправкой запроса на сервер
6. Функция редактирования аватара пользователя через модальное окно с отправкой запроса на сервер
7. Функция лайка карточки с отправкой запроса на сервер
8. Функция удаления карточки с отправкой запроса на сервер

### Функции бэкенда, реализованные в проекте:

1. Функция получения списка карточек методом GET
2. Функция создания новых карточек методом POST
3. Функция удаления карточки методом DELETE
4. Функция постановки и снятия лайков карточки методами PUT и DELETE

5. Функция получения списка пользователей методом GET
6. Функция получения данных пользователя по ID методом GET
7. Функция создания пользователя методом POST
8. Функция обновления данных пользователя и обновления аватара пользователя методом PATCH

9. Функции регистрации и авторизации пользователя
10. Функции централизованной обработки ошибок
11. Функции валидации приходящих данных