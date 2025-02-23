const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

// Настройки бота
const TELEGRAM_TOKEN = '7317091729:AAGv89OWMPmxpKeYW8q7-Q6NpvHRfMTIM0I';
const CHAT_ID = '8195408385';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

// Добавляем middleware для парсинга JSON и form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Добавляем логирование для отладки
app.post('/api/submit-form', async (req, res) => {
    console.log('Получены данные формы:', req.body); // Добавляем логирование

    try {
        const { name, phone, email, description } = req.body;
        
        // Проверяем наличие всех необходимых данных
        if (!name || !phone || !email || !description) {
            throw new Error('Не все поля заполнены');
        }

        const message = `
Новая заявка!
Имя: ${name}
Телефон: ${phone}
Email: ${email}
Описание проекта: ${description}
        `;

        console.log('Отправка сообщения в Telegram...'); // Добавляем логирование
        await bot.sendMessage(CHAT_ID, message);
        console.log('Сообщение успешно отправлено'); // Добавляем логирование

        res.status(200).json({ message: 'Заявка успешно отправлена!' });
    } catch (error) {
        console.error('Ошибка при обработке заявки:', error);
        res.status(500).json({ message: 'Ошибка при отправке заявки: ' + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 