function showText(imgElement, text, date) {
  const modal = document.getElementById('textModal');
  const typedText = document.getElementById('typedText');
  
  // Показываем модальное окно с анимацией
  modal.classList.add('active');
  
  // Очищаем предыдущий текст
  typedText.innerHTML = '';
  
  // Добавляем дату
  const dateElement = document.createElement('p');
  dateElement.style.color = '#777';
  dateElement.style.marginBottom = '20px';
  dateElement.textContent = date;
  typedText.appendChild(dateElement);
  
  // Эффект печатания текста
  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      typedText.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, 50); // Скорость печати (50ms на символ)
}

function hideText() {
  const modal = document.getElementById('textModal');
  modal.classList.remove('active');
}

// Закрытие при клике вне окна
window.addEventListener('click', (e) => {
  const modal = document.getElementById('textModal');
  if (e.target === modal) {
    hideText();
  }
});