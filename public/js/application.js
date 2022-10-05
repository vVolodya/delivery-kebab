const $mainContainer = document.querySelector('.main-content');

$mainContainer?.addEventListener('click', async (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.classList.contains('deleteProductBtn')) {
    event.preventDefault();
    const $productContainer = event.target
      .parentElement
      .parentElement
      .parentElement
      .parentElement
      .parentElement;
    const productID = $productContainer.dataset.id;

    const options = {
      method: 'DELETE',
    };

    const response = await fetch(`/product/${productID}`, options);
    const data = await response.json();

    if (data.isDeleteSuccessful) {
      $productContainer.remove();
    }
  }
});
