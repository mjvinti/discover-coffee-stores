import { fetchCoffeeStores } from "@/lib/coffeeStores";

const handler = async (req, res) => {
  const {
    query: { latitude, limit, longitude },
  } = req;

  try {
    const businesses = await fetchCoffeeStores(latitude, longitude, limit);
    return res.status(200).json({ fetchedCoffeeStores: businesses });
  } catch (err) {
    console.error("There is an error", err);
    return res
      .status(500)
      .json({ message: "Oh no! Something went wrong!", err });
  }
};

export default handler;
