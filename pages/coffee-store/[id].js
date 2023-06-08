import Link from "next/link";
import { useRouter } from "next/router";

import coffeeStoresData from "@/data/coffee-stores.json";

export function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (store) => store.id.toString() === params.id
      ),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: false,
  };
}

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();
  return (
    <div>
      Coffee Store Page {router.query.id}
      <Link href="/">Back to home</Link>
      <Link href="/coffee-store/dynamic">Go to page dynamic</Link>
      <p>{coffeeStore.address}</p>
      <p>{coffeeStore.name}</p>
    </div>
  );
};

export default CoffeeStore;
