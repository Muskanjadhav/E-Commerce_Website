const searchKey = decodeURL(location.pathname.split('/').pop());

getProduct(searchKey).then(data => createProductCards(data, searchKey, 'search-listing'))