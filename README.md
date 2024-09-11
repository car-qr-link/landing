# Стартовая страница

Предназначена для отображения информации о проекте, дате старта и новостей. Также производится сбор контактов заинтересованных пользователей.

## Используемые технологии, библиотеки

- [Bun](https://bun.sh) - Runtime
- [Express](https://expressjs.com) - Web server
- [Htmx](https://htmx.org) - Dynamic content
- [Kysely](https://kysely.dev) - Database query builder
- [Pino](https://getpino.io) - Logging
- [Zod](https://zod.dev) - Data validation

## Настройки

Для настройки сервиса используются переменные окружения:

| Наименование | Описание                          | По умолчанию                                   |
| ------------ | --------------------------------- | ---------------------------------------------- |
| PORT         | Порт сервера.                     | 3000                                           |
| DATABASE_URL | Строка подключения к базе данных. | mysql://landing:landing@localhost:3306/landing |
| NODE_ENV     | Режим работы.                     | development                                    |
