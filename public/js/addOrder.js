const productContainer = document.querySelector('.productContainer');

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
  }
});
