document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('roulette-canvas');
    const ctx = canvas.getContext('2d');
    const form = document.getElementById('range-form');
    const resultMessage = document.getElementById('result-message');
    const minValueInput = document.getElementById('min-value');
    const maxValueInput = document.getElementById('max-value');
    // Очищаем холст
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    // Функция для визуализации сектора на холсте
    function drawSector(startAngle, endAngle, sectorLabel) {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fillStyle = '#FFD700'; // Золотистый сектор
        ctx.fill();
        // Нарисуем текст номера посередине сектора
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000000';
        const midX = canvas.width / 2 + (canvas.width / 2 - 10) * Math.cos((startAngle + endAngle) / 2);
        const midY = canvas.height / 2 + (canvas.width / 2 - 10) * Math.sin((startAngle + endAngle) / 2);
        ctx.fillText(sectorLabel, midX, midY);
    }
    // Функция для генерации случайного числа и вращения рулетки
    async function generateAndSpin() {
        const minValue = parseInt(minValueInput.value);
        const maxValue = parseInt(maxValueInput.value);

        if (isNaN(minValue) || isNaN(maxValue) || minValue > maxValue) {
            alert('Некорректный диапазон!');
            return;
        }
        // Генерация случайного числа
        const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    // Предварительная очистка холста
    clearCanvas();
        // Начнем рисовать "рулетку"
        segmentsCount = maxValue - minValue + 1;
        segmentSize = (2 * Math.PI) / segmentsCount;
        let currentAngle = 0;

        for (let i = 0; i < segmentsCount; i++) {
            const startAngle = currentAngle;
            const endAngle = currentAngle + segmentSize;
            drawSector(startAngle, endAngle, minValue + i);
            currentAngle += segmentSize;
        }
        // Покажем игроку, что идет процесс генерации
        resultMessage.textContent = 'Идет выбор числа.'
            drawSector(startAngle, endAngle, minValue + i);
            currentAngle += segmentSize;
        }
        // Простая анимация вращения
        let duration = 2000; // Длительность вращения (мс)
        let speed = 360 / duration;

        let timeElapsed = 0;
        while (timeElapsed <= duration) {
            clearCanvas();
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(timeElapsed * speed * Math.PI / 180);
            ctx.drawImage(canvas, -canvas.width / 2, -canvas.save());
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(timeElapsed * speed * Math.PI / 180);
            ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
            ctx.restore();
            wait(16); // Ждем примерно 16 мс (примерно 60 fps)
            timeElapsed += 16;
            height / 2;
            ctx.restore();
            timeElapsed += 16;
        }

        // Теперь покажем результат
        resultMessage.textContent = `Выбрано число: ${randomNumber}`;

    // Пауза на указанное количество миллисекунд
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
        }
        resultMessage.textContent = `Выбрано число: ${randomNumber}`;
    }

    ,)

document.addEventListener('submit', event => {
        event.preventDefault(); 
        generateAndSpin();
})