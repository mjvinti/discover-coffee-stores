import { useRouter } from "next/router";

const CoffeeStore = () => {
  const router = useRouter();
  console.log("router", router);
  return <div>Coffee Store Pagr {router.query.id}</div>;
};

export default CoffeeStore;
