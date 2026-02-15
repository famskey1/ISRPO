class RandomNumberRoulette {
    constructor() {
        this.minInput = document.getElementById('min');
        this.maxInput = document.getElementById('max');
        this.generateBtn = document.getElementById('generateBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.resultDiv = document.getElementById('result');
        this.rouletteNumbers = document.getElementById('rouletteNumbers');
        this.historyList = document.getElementById('historyList');
        
        this.history = [];
        this.isSpinning = false;
        
        this.init();
    }
    
    init() {
        this.generateBtn.addEventListener('click', () => this.generateNumber());
        this.resetBtn.addEventListener('click', () => this.resetHistory());
        this.minInput.addEventListener('change', () => this.validateRange());
        this.maxInput.addEventListener('change', () => this.validateRange());
        
        this.updateRouletteDisplay();
    }
    
    validateRange() {
        let min = parseInt(this.minInput.value);
        let max = parseInt(this.maxInput.value);
        
        if (min > max) {
            this.maxInput.value = min + 1;
        }
        
        this.updateRouletteDisplay();
    }
    
    updateRouletteDisplay() {
        const min = parseInt(this.minInput.value);
        const max = parseInt(this.maxInput.value);
        const range = max - min + 1;
        
        if (range > 100) {
            // Для больших диапазонов показываем примерные числа
            this.rouletteNumbers.innerHTML = '';
            const numbersToShow = 20;
            for (let i = 0; i < numbersToShow; i++) {
                const num = min + Math.floor(Math.random() * range);
                const div = document.createElement('div');
                div.className = 'number-item';
                div.textContent = num;
                this.rouletteNumbers.appendChild(div);
            }
        } else {
            // Для маленьких диапазонов показываем все числа
            this.rouletteNumbers.innerHTML = '';
            for (let i = min; i <= max; i++) {
                const div = document.createElement('div');
                div.className = 'number-item';
                div.textContent = i;
                this.rouletteNumbers.appendChild(div);
            }
        }
    }
    
    async generateNumber() {
        if (this.isSpinning) return;
        
        const min = parseInt(this.minInput.value);
        const max = parseInt(this.maxInput.value);
        
        // Анимация рулетки
        this.isSpinning = true;
        this.generateBtn.disabled = true;
        this.resultDiv.textContent = '???';
        
        const spinDuration = 2000; // 2 секунды
        const spinInterval = 50; // обновление каждые 50ms
        const startTime = Date.now();
        
        // Добавляем класс анимации
        this.rouletteNumbers.style.transition = 'transform 0.1s linear';
        
        const spinPromise = new Promise((resolve) => {
            const interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                
                if (elapsed < spinDuration) {
                    // Показываем случайные числа во время анимации
                    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                    this.resultDiv.textContent = randomNum;
                    
                    // Двигаем рулетку
                    const move = (elapsed % 100) * 2;
                    this.rouletteNumbers.style.transform = `translateX(-${move}px)`;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, spinInterval);
        });
        
        // Ждем окончания анимации
        await spinPromise;
        
        // Генерируем финальное число
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        this.resultDiv.textContent = randomNum;
        
        // Добавляем в историю
        this.addToHistory(randomNum);
        
        // Обновляем позицию рулетки (имитация остановки на числе)
        this.rouletteNumbers.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.2)';
        
        if (max - min + 1 <= 20) {
            // Для маленьких диапазонов позиционируем на выбранном числе
            const index = randomNum - min;
            const itemWidth = 80; // ширина .number-item
            this.rouletteNumbers.style.transform = `translateX(-${index * itemWidth}px)`;
        } else {
            this.rouletteNumbers.style.transform = 'translateX(0)';
        }
        
        // Сбрасываем состояние
        setTimeout(() => {
            this.isSpinning = false;
            this.generateBtn.disabled = false;
            this.rouletteNumbers.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 500);
    }
    
    addToHistory(number) {
        this.history.unshift(number);
        if (this.history.length > 10) {
            this.history.pop();
        }
        
        this.updateHistoryDisplay();
    }
    
    resetHistory() {
        this.history = [];
        this.updateHistoryDisplay();
    }
    
    updateHistoryDisplay() {
        this.historyList.innerHTML = '';
        this.history.forEach((num, index) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.textContent = num;
            div.style.animation = `slideIn ${0.3 + index * 0.1}s ease`;
            this.historyList.appendChild(div);
        });
        
        if (this.history.length === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.textContent = 'История пуста';
            emptyMsg.style.color = '#999';
            this.historyList.appendChild(emptyMsg);
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new RandomNumberRoulette();
});