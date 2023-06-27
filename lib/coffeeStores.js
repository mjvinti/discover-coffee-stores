const getUrlForCoffeeStores = (latitude, longitude, limit) =>
  `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=coffee&sort_by=best_match&limit=${limit}`;

const getUrlForCoffeeStore = (id) => `https://api.yelp.com/v3/businesses/${id}`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};

export const fetchCoffeeStores = async (
  latitude = 42.88023,
  longitude = -78.878738,
  limit = 6
) => {
  const response = await fetch(
    getUrlForCoffeeStores(latitude, longitude, limit),
    options
  );
  const data = await response.json();
  return data.businesses;
};

export const fetchCoffeeStoreById = async (id) => {
  const response = await fetch(getUrlForCoffeeStore(id), options);
  const data = await response.json();
  return data;
};
