const $reloadBtn = document.querySelector('.reloadBtn');
const $buyBtn = document.querySelector('.buyBtn');

console.log($buyBtn);

$reloadBtn?.addEventListener('click', (e) => {
  window.location.reload();
});

$buyBtn.addEventListener('click', async (e) => {
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

  if (res.ok) {
    window.location.replace('/');
  }
});
