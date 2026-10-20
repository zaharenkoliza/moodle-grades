# Таблица оценок Moodle

Исходники страницы `/grades` для просмотра оценок на `node-server.ru/m`. Пользователь вводит логин и пароль Moodle; браузер напрямую запрашивает токен сервиса `moodle_mobile_app`, курсы и оценки владельца. Пароль и токен не отправляются серверу этого проекта и не сохраняются.

Функции Web Services: `core_webservice_get_site_info`, `core_enrol_get_users_courses`, `gradereport_user_get_grade_items`. В Moodle должен быть доступен сервис с этими функциями.

## Адреса

- `/` — переход на таблицу;
- `/grades` — таблица оценок;
- `/healthz` — состояние сервиса.

Для локальной проверки: `npm test`, `npm run build`, `npm run validate`.

Это выделенные исходники таблицы из общего проекта; действующая страница: https://liza-web-lti-grades-2026.tenderberry32.chatgpt.site/grades
