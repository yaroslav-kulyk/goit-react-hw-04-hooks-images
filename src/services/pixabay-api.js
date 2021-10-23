const API_KEY = '22978515-5cb8795ed8e9eafc86c022855';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImages(query, page) {
  const searchParams = new URLSearchParams({
    q: query,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page,
  });

  const url = `${BASE_URL}?${searchParams}`;

  return fetch(url)
    .then(response =>
      response.ok
        ? response.json()
        : Promise.reject(
            new Error(`Something went wrong, please try again later`),
          ),
    )
    .then(({ hits }) => hits);
}

export default fetchImages;
