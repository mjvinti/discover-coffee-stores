const handler = async (req, res) => {
  const {
    query: { latitude, longitude },
  } = req;
  const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    },
    url = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=coffee&sort_by=best_match&limit=6`;

  const response = await fetch(url, options);
  const { businesses } = await response.json();
  return res.status(200).json({ fetchedCoffeeStores: businesses });
};

export default handler;
