import { fetchCoffeeStoreById } from "@/lib/coffeeStores";

const handler = async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const business = await fetchCoffeeStoreById(id);
    return res.status(200).json({ fetchedCoffeeStore: business });
  } catch (err) {
    console.error("There is an error", err);
    return res
      .status(500)
      .json({ message: "Oh no! Something went wrong!", err });
  }
};

export default handler;
