// Troque esta URL pela URL REAL do backend publicado na Vercel.
const API_URL = 'http://localhost:3000/api/hardwares';

const grid = document.querySelector('#hardwareGrid');
const message = document.querySelector('#message');
const search = document.querySelector('#search');
const retryBtn = document.querySelector('#retryBtn');
const statusApi = document.querySelector('#statusApi');
const template = document.querySelector('#cardTemplate');

let hardwareList = [];

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

function setStatus(text, online = null) {
  statusApi.textContent = text;
  statusApi.classList.remove('online', 'offline');
  if (online === true) statusApi.classList.add('online');
  if (online === false) statusApi.classList.add('offline');
}

function render(items) {
  grid.innerHTML = '';
  if (!items.length) {
    message.textContent = 'Nenhum hardware cadastrado.';
    message.classList.remove('hidden');
    return;
  }

  message.classList.add('hidden');
  items.forEach((item) => {
    const fragment = template.content.cloneNode(true);
    const img = fragment.querySelector('.card-image');
    img.src = item.foto;
    img.alt = `${item.hardware} ${item.marca} ${item.modelo}`;
    img.addEventListener('error', () => {
      img.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="100%" height="100%" fill="#ececec"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="34" fill="#777">Imagem indisponível</text></svg>`);
    }, { once: true });

    fragment.querySelector('.badge').textContent = item.hardware;
    fragment.querySelector('.card-title').textContent = item.marca;
    fragment.querySelector('.card-model').textContent = item.modelo;
    fragment.querySelector('.card-price').textContent = currency.format(item.preco);
    grid.appendChild(fragment);
  });
}

async function loadHardware() {
  message.textContent = 'Carregando aparelhos...';
  message.classList.remove('hidden');
  retryBtn.classList.add('hidden');
  setStatus('Verificando API...');

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    hardwareList = await response.json();
    setStatus('API conectada', true);
    render(hardwareList);
  } catch (error) {
    console.error(error);
    grid.innerHTML = '';
    message.textContent = 'Não foi possível carregar os aparelhos.';
    retryBtn.classList.remove('hidden');
    setStatus('API indisponível', false);
  }
}

search.addEventListener('input', () => {
  const term = search.value.trim().toLocaleLowerCase('pt-BR');
  const filtered = hardwareList.filter((item) =>
    [item.hardware, item.marca, item.modelo].some((value) => String(value).toLocaleLowerCase('pt-BR').includes(term))
  );
  render(filtered);
});

retryBtn.addEventListener('click', loadHardware);
loadHardware();
