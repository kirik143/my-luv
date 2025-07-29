function showText(imgElement, text, date) {
  // Находим элементы
  const card = imgElement.closest('.pin-card');
  const bubble = card.querySelector('.text-bubble');
  const typedElement = bubble.querySelector('.typed-text');
  
  // Очищаем предыдущий текст
  typedElement.innerHTML = '';
  
  // Добавляем дату
  const dateElement = document.createElement('p');
  dateElement.style.color = '#777';
  dateElement.style.marginBottom = '15px';
  dateElement.textContent = date;
  typedElement.appendChild(dateElement);
  
  // Показываем пузырь
  bubble.classList.add('active');
  
  // Эффект печатания
  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      typedElement.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, 50);
}

function hideText(bubbleId) {
  const bubble = document.getElementById(bubbleId);
  bubble.classList.remove('active');
}

// Закрытие при клике вне пузыря
document.addEventListener('click', (e) => {
  if (!e.target.closest('.text-bubble') && !e.target.closest('.photo-content img')) {
    document.querySelectorAll('.text-bubble').forEach(bubble => {
      bubble.classList.remove('active');
    });
  }
});