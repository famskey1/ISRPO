class RouletteGenerator {
    constructor() {
        this.min = 1;
        this.max = 10;
        this.isSpinning = false;
        
        this.initElements();
        this.setupEventListeners();
        this.generateNumbers();
    }
    
    initElements() {
        this.minInput = document.getElementById('min');
        this.maxInput = document.getElementById('max');
        this.spinButton = document.getElementById('spin');
        this.roulette = document.getElementById('roulette');
        this.result = document.getElementById('result');
        
        // Создаём указатель
        const pointer = document.createElement('div');
        pointer.className = 'pointer';
        this.roulette.parentElement.appendChild(pointer);
    }
    
    setupEventListeners() {
        this.minInput.addEventListener('change', () => {
            this.min = parseInt(this.minInput.value);
            if (this.min >= this.max) this.min = this.max - 1;
            this.generateNumbers();
        });
        
        this.maxInput.addEventListener('change', () => {
            this.max = parseInt(this.maxInput.value);
            if (this.max <= this.min) this.max = this.min + 1;
            this.generateNumbers();
        });
        
        this.spinButton.addEventListener('click', () => this.spin());
    }
    
    generateNumbers() {
        // Очищаем предыдущее содержимое
        this.roulette.innerHTML = '';
        
        const count = this.max - this.min + 1;
        const angle = 360 / count;
        
        for (let i = 0; i < count; i++) {
            const number = this.min + i;
            const numberElement = document.createElement('div');
            numberElement.className = 'number';
            numberElement.textContent = number;
            numberElement.style.transform = `rotate(${i * angle}deg)`;
            this.roulette.appendChild(numberElement);
        }
    }
    
    spin() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        this.spinButton.disabled = true;
        this.result.textContent = 'Результат: крутится...';
        
        // Генерируем случайное число
        const randomNumber = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
        const numberIndex = randomNumber - this.min;
        
        // Рассчитываем угол поворота (несколько полных оборотов + нужный сектор)
        const fullRotations = 5; // Количество полных оборотов
        const sectorAngle = 360 / (this.max - this.min + 1);
        const targetAngle = fullRotations * 3
    }
}