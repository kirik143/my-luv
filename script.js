document.addEventListener('DOMContentLoaded', function() {
  // Закрытие по клику на оверлей
  document.querySelector('.overlay').addEventListener('click', hideAllTextBubbles);
  
  // Закрытие по ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') hideAllTextBubbles();
  });
});

let currentActiveCard = null;
let typingInterval = null;

function showText(cardId, text, date) {
  // Блокируем скролл страницы
  document.body.style.overflow = 'hidden';
  
  // Скрываем предыдущее окошко
  hideAllTextBubbles();
  
  const card = document.getElementById(cardId);
  const bubbleId = `bubble${cardId.replace('card', '')}`;
  const bubble = document.getElementById(bubbleId);
  const overlay = document.querySelector('.overlay');
  
  if (!card || !bubble || !overlay) return;
  
  // Устанавливаем дату и текст
  bubble.querySelector('.modal-date').textContent = date;
  const typedElement = bubble.querySelector('.typed-text');
  typedElement.innerHTML = '<span class="typing-cursor"></span>';
  
  // Позиционируем окошко только слева/справа
  positionBubble(card, bubble);
  
  // Показываем элементы
  overlay.classList.add('active');
  bubble.classList.add('active');
  currentActiveCard = cardId;
  
  // Анимация печати
  let i = 0;
  const typingSpeed = 30;
  
  function typeWriter() {
    if (i < text.length) {
      const cursor = typedElement.querySelector('.typing-cursor');
      cursor.insertAdjacentText('beforebegin', text.charAt(i));
      i++;
      typingInterval = setTimeout(typeWriter, typingSpeed);
    } else {
      const cursor = typedElement.querySelector('.typing-cursor');
      if (cursor) cursor.remove();
    }
  }
  
  typeWriter();
}

function positionBubble(card, bubble) {
  const cardRect = card.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  
  // Проверяем, где больше места: слева или справа
  const spaceRight = viewportWidth - cardRect.right;
  const spaceLeft = cardRect.left;
  
  if (spaceRight >= spaceLeft && spaceRight >= 350) {
    // Показываем справа
    bubble.style.left = `${cardRect.right + 20}px`;
    bubble.style.top = `${cardRect.top}px`;
    bubble.style.right = 'auto';
  } else {
    // Показываем слева
    bubble.style.right = `${viewportWidth - cardRect.left + 20}px`;
    bubble.style.top = `${cardRect.top}px`;
    bubble.style.left = 'auto';
  }
  
  // Фиксируем позицию (не даем уходить за верх/низ)
  bubble.style.bottom = 'auto';
}

function hideAllTextBubbles() {
  // Разблокируем скролл
  document.body.style.overflow = 'auto';
  
  clearTimeout(typingInterval);
  document.querySelectorAll('.text-bubble').forEach(bubble => {
    bubble.classList.remove('active');
  });
  document.querySelector('.overlay').classList.remove('active');
  currentActiveCard = null;
}

// Репозиционируем при ресайзе
window.addEventListener('resize', function() {
  if (currentActiveCard) {
    const card = document.getElementById(currentActiveCard);
    const bubbleId = `bubble${currentActiveCard.replace('card', '')}`;
    const bubble = document.getElementById(bubbleId);
    if (card && bubble) positionBubble(card, bubble);
  }
});