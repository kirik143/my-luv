let currentCard = null;
let typingInterval = null;

function showText(cardId, text, date) {
  if (currentCard) hideText(currentCard);
  clearInterval(typingInterval);
  
  const card = document.getElementById(cardId);
  const bubble = document.getElementById(`bubble${cardId.slice(4)}`);
  const overlay = document.querySelector('.overlay');
  const img = card.querySelector('img');
  
  // Определение свободного пространства
  const imgRect = img.getBoundingClientRect();
  const spaceRight = window.innerWidth - imgRect.right - 30;
  const spaceLeft = imgRect.left - 30;
  
  // Умное позиционирование
  if (window.innerWidth <= 768) {
    // Для мобильных - всегда по центру
    bubble.style.left = '50%';
    bubble.style.right = 'auto';
    bubble.style.top = '50%';
  } else {
    // Для десктопа - выбираем сторону
    if (spaceRight >= 350 || spaceRight > spaceLeft) {
      // Показываем справа
      bubble.style.left = `${imgRect.right + 20}px`;
      bubble.style.right = 'auto';
    } else {
      // Показываем слева
      bubble.style.right = `${window.innerWidth - imgRect.left + 20}px`;
      bubble.style.left = 'auto';
    }
    
    // Вертикальная корректировка
    bubble.style.top = `${Math.min(
      imgRect.top,
      window.innerHeight - bubble.offsetHeight - 20
    )}px`;
  }
  
  // Анимации
  overlay.style.display = 'block';
  setTimeout(() => overlay.classList.add('active'), 10);
  card.classList.add('active');
  currentCard = cardId;
  
  setTimeout(() => {
    bubble.style.display = 'block';
    setTimeout(() => bubble.classList.add('active'), 10);
    
    const typedElement = bubble.querySelector('.typed-text');
    typedElement.innerHTML = `<p style="color:#777;margin-bottom:15px">${date}</p>`;
    
    let i = 0;
    typingInterval = setInterval(() => {
      if (i < text.length) {
        typedElement.innerHTML += text.charAt(i);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
  }, 200);
}

function hideText(cardId) {
  const card = document.getElementById(cardId);
  const bubble = document.getElementById(`bubble${cardId.slice(4)}`);
  const overlay = document.querySelector('.overlay');
  
  bubble.classList.remove('active');
  overlay.classList.remove('active');
  
  setTimeout(() => {
    bubble.style.display = 'none';
    overlay.style.display = 'none';
    card.classList.remove('active');
    currentCard = null;
  }, 400);
}

// Закрытие по клику на фон
document.querySelector('.overlay').addEventListener('click', () => {
  if (currentCard) hideText(currentCard);
});

// Ресайз
window.addEventListener('resize', () => {
  if (currentCard) {
    const card = document.getElementById(currentCard);
    const bubble = document.getElementById(`bubble${currentCard.slice(4)}`);
    const img = card.querySelector('img');
    const imgRect = img.getBoundingClientRect();
    
    if (window.innerWidth <= 768) {
      bubble.style.left = '50%';
      bubble.style.right = 'auto';
      bubble.style.top = '50%';
    } else {
      const spaceRight = window.innerWidth - imgRect.right - 30;
      const spaceLeft = imgRect.left - 30;
      
      if (spaceRight >= 350 || spaceRight > spaceLeft) {
        bubble.style.left = `${imgRect.right + 20}px`;
        bubble.style.right = 'auto';
      } else {
        bubble.style.right = `${window.innerWidth - imgRect.left + 20}px`;
        bubble.style.left = 'auto';
      }
      
      bubble.style.top = `${Math.min(
        imgRect.top,
        window.innerHeight - bubble.offsetHeight - 20
      )}px`;
    }
  }
});