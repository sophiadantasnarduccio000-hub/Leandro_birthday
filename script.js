/* ========================================
   CONTAGEM REGRESSIVA PARA 26/06
   ======================================== */

function updateCountdown() {
    // Data do aniversário - 26 de junho
    const birthdayDate = new Date(2026, 5, 26, 0, 0, 0).getTime();
    const now = new Date().getTime();
    
    const timeRemaining = birthdayDate - now;
    
    if (timeRemaining > 0) {
        // Cálculos para dias, horas, minutos e segundos
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Atualizar elementos HTML
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        // Se já passou a data
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Exibir mensagem especial
        const countdownElement = document.getElementById('countdown');
        countdownElement.innerHTML = '<h2 style="color: #e91e63; font-size: 2rem; margin: 20px 0;">🎉 FELIZ ANIVERSÁRIO LEANDRO! 🎉</h2>';
        createConfetti();
    }
}

// Atualizar contagem a cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Chamar uma vez ao carregar

/* ========================================
   EFEITO DE CONFETE
   ======================================== */

function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    
    // Criar múltiplos confetes
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Posição aleatória horizontal
        const startX = Math.random() * window.innerWidth;
        confetti.style.left = startX + 'px';
        confetti.style.top = '-10px';
        
        // Trajetória aleatória
        const tx = (Math.random() - 0.5) * 200;
        confetti.style.setProperty('--tx', tx + 'px');
        
        // Cores aleatórias
        const colors = ['#e91e63', '#ff7043', '#f48fb1', '#fce4ec', '#ff1744'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = randomColor;
        
        // Tamanho aleatório
        const size = Math.random() * 10 + 5;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        confettiContainer.appendChild(confetti);
        
        // Remover confete após animação
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
    
    // Som (opcional - comentado para evitar erros se não houver áudio)
    playConfettiSound();
}

/* ========================================
   SOM DO CONFETE
   ======================================== */

function playConfettiSound() {
    // Você pode adicionar um som aqui se desejar
    // Criar um som simples usando Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Se houver erro, apenas ignorar
        console.log('Som não disponível');
    }
}

/* ========================================
   REPRODUÇÃO AUTOMÁTICA DE MÚSICA
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    
    if (audioPlayer) {
        // Tentar reproduzir automaticamente (alguns navegadores podem bloquear)
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Autoplay bloqueado. O usuário pode clicar para reproduzir.');
            });
        }
    }
});

/* ========================================
   EFEITO DE SCROLL SUAVE
   ======================================== */

// Animação ao fazer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todos os elementos com classe fade-in-up
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

/* ========================================
   EVENTOS INTERATIVOS
   ======================================== */

// Animar mensagens ao passar o mouse
document.querySelectorAll('.message-box').forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Adicionar efeito ao clicar na galeria
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // Criar pequena animação de pulso
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'pulse 0.6s ease-in-out';
        }, 10);
    });
});

/* ========================================
   DETECÇÃO DE DISPOSITIVO MÓVEL
   ======================================== */

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustar confete para dispositivos móveis
if (isMobileDevice()) {
    // Reduzir quantidade de confetes em dispositivos móveis
    window.originalCreateConfetti = createConfetti;
    window.createConfetti = function() {
        const confettiContainer = document.getElementById('confettiContainer');
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            const startX = Math.random() * window.innerWidth;
            confetti.style.left = startX + 'px';
            confetti.style.top = '-10px';
            
            const tx = (Math.random() - 0.5) * 150;
            confetti.style.setProperty('--tx', tx + 'px');
            
            const colors = ['#e91e63', '#ff7043', '#f48fb1', '#fce4ec', '#ff1744'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = randomColor;
            
            const size = Math.random() * 8 + 4;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    };
}

/* ========================================
   ANIMAÇÕES INICIAIS
   ======================================== */

window.addEventListener('load', function() {
    // Animar título em letras
    const letters = document.querySelectorAll('.main-title .letter');
    letters.forEach((letter, index) => {
        letter.style.animation = `bounce 0.6s ease-in-out ${index * 0.1}s`;
    });
    
    // Animar itens da contagem regressiva
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach((item, index) => {
        item.style.animation = `pulse 2s ease-in-out ${index * 0.3}s infinite`;
    });
});

/* ========================================
   FUNÇÃO PARA ADICIONAR MAIS MENSAGENS (OPCIONAL)
   ======================================== */

function addCustomMessage(message) {
    const messagesSection = document.querySelector('.messages-section');
    const newMessageBox = document.createElement('div');
    newMessageBox.classList.add('message-box', 'fade-in-up');
    newMessageBox.innerHTML = `<p>${message}</p>`;
    newMessageBox.style.opacity = '1';
    newMessageBox.style.transform = 'translateY(0)';
    messagesSection.appendChild(newMessageBox);
}

/* ========================================
   TEMAS ALTERNATIVOS (OPCIONAL)
   ======================================== */

function changeTheme(themeName) {
    const root = document.documentElement;
    
    const themes = {
        'love': {
            '--primary-red': '#e91e63',
            '--dark-red': '#c2185b',
            '--light-pink': '#f48fb1',
            '--coral': '#ff7043',
            '--soft-pink': '#fce4ec'
        },
        'neon': {
            '--primary-red': '#ff006e',
            '--dark-red': '#e6005c',
            '--light-pink': '#ff4da6',
            '--coral': '#ff1744',
            '--soft-pink': '#ffe0f0'
        }
    };
    
    if (themes[themeName]) {
        Object.entries(themes[themeName]).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }
}

/* ========================================
   COMPARTILHAMENTO DE MENSAGENS (OPCIONAL)
   ======================================== */

function shareMessage() {
    const message = "🎉 Vem celebrar o aniversário do Leandro comigo! Um site incrível cheio de amor e animações! 💕";
    
    if (navigator.share) {
        navigator.share({
            title: 'Feliz Aniversário Leandro!',
            text: message,
            url: window.location.href
        });
    } else {
        alert('Copie este link e compartilhe:\n' + window.location.href);
    }
}

/* ========================================
   DICAS E EASTER EGGS
   ======================================== */

// Pressionar 'L' para liberar confete extra
document.addEventListener('keypress', function(event) {
    if (event.key === 'l' || event.key === 'L') {
        createConfetti();
        createConfetti(); // Confete dobrado!
    }
});

// Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function(event) {
    if (event.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            createConfetti();
            createConfetti();
            createConfetti();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

console.log('🎉 Feliz Aniversário Leandro! 💕');
console.log('Dica: Pressione "L" para liberar confete extra!');
console.log('Segredo: Use o Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) para uma surpresa! 🎊');
