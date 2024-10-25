# Используем образ Node.js на базе Alpine
FROM node:alpine

# Установим рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json (если он есть) в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --verbose

# Копируем все остальные файлы в рабочую директорию
COPY . .

# Компилируем TypeScript в JavaScript (предполагается, что у вас есть tsconfig.json)
# RUN npm run build


# COPY .env ./dist
COPY .env .
# Открываем порт, который будет использован приложением
EXPOSE 7777

# Команда для запуска приложения
CMD ["node", "index.js"]