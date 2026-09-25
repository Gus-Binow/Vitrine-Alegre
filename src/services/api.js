const BASE_URL = 'https://dummyjson.com/products';

export async function listarProdutos({ pagina = 1, limite = 12, busca = '', categoria = '', ordenacao = '' }) {
  const skip = (pagina - 1) * limite;
  let url = `${BASE_URL}?limit=${limite}&skip=${skip}`;

  if (busca) {
    url = `${BASE_URL}/search?q=${encodeURIComponent(busca)}&limit=${limite}&skip=${skip}`;
  } else if (categoria && categoria !== 'Todas') {
    url = `${BASE_URL}/category/${encodeURIComponent(categoria)}?limit=${limite}&skip=${skip}`;
  }

  if (ordenacao) {
    const [sortBy, order] = ordenacao.split('-');
    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Não foi possível carregar os produtos.');
  }

  const data = await response.json();
  return {
    produtos: data.products,
    total: data.total,
    skip: data.skip,
    limit: data.limit
  };
}

export async function buscarProduto(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Produto não encontrado.');
  }
  return await response.json();
}

export async function listarCategorias() {
  const response = await fetch(`${BASE_URL}/category-list`);
  if (!response.ok) {
    throw new Error('Não foi possível carregar as categorias.');
  }
  return await response.json();
}