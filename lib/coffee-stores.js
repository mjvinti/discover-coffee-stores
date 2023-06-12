const getUrlForCoffeeStores = (lat, long, query, limit) => {
  return `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&term=${query}&sort_by=best_match&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(42.88023, -78.878738, "coffee", 6),
    options
  );
  const data = await response.json();
  return data.businesses;
};
