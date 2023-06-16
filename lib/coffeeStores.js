const getUrlForCoffeeStores = (latitude, longitude) =>
  `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=coffee&sort_by=best_match&limit=6`;

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(42.88023, -78.878738),
    options
  );
  const data = await response.json();
  return data.businesses;
};
