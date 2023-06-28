import { fetchCoffeeStoreById } from "@/lib/coffeeStores";

const handler = async (req, res) => {
  const {
    query: { id },
  } = req;

  if (!id) {
    return res
      .status(400)
      .json({ message: "You must provide the following: id" });
  }

  try {
    const fetchedCoffeeStore = await fetchCoffeeStoreById(id);
    return res.status(200).json({ fetchedCoffeeStore });
  } catch (err) {
    console.error("There is an error", err);
    return res
      .status(500)
      .json({ message: "Oh no! Something went wrong!", err });
  }
};

export default handler;
