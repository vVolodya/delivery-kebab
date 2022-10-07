const productContainer = document.querySelector('.productContainer');
const alertPlaceholder = document.querySelector('.liveAlertPlaceholder');

const alert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="popup alert alert-${type} alert-dismissible" fade show role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Закрыть"></button>',
    '</div>',
  ].join('');

  alertPlaceholder.append(wrapper);
};

productContainer.addEventListener('click', async (e) => {
  if (e.target.tagName === 'BUTTON' && e.target.classList.contains('buyBtn')) {
    const { userid, productid } = e.target.dataset;
    const body = JSON.stringify({ userid, productid });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    };
    const res = await fetch('/orders', options);

    const $productCard = e.target
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement;

    if (res.ok) {
      $productCard.remove();
    }
    alert('Kebab added to your order', 'success');

    setTimeout(() => {
      bootstrap.Alert.getOrCreateInstance(document.querySelector('.alert')).close();
    }, 2500);
  }
});
