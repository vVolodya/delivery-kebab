const productContainer = document.querySelector('.productContainer');

productContainer.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.tagName === 'BUTTON' && e.target.classList.contains('deliveredBtn')) {
    const { orderid, productid } = e.target.dataset;

    const body = JSON.stringify({ orderid, productid });

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    };

    const res = await fetch(`/orders/${orderid}`, options);

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

  if (e.target.tagName === 'BUTTON' && e.target.classList.contains('removeOrderBtn')) {
    const { orderid, productid } = e.target.dataset;

    const body = JSON.stringify({ orderid, productid });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    };

    const res = await fetch(`/orders/${orderid}`, options);

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
