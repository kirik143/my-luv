function openModal(imageSrc, title, date) {
  const modal = document.getElementById('imageModal');
  document.getElementById('modalImage').src = imageSrc;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalDate').textContent = date;
  modal.style.display = 'block';
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
}

// Закрытие при клике вне окна
window.onclick = function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target == modal) {
    closeModal();
  }
}