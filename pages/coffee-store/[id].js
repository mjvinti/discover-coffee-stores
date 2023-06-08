import Head from "next/head";
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
  const paths = coffeeStoresData.map((store) => ({
    params: { id: store.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = ({ coffeeStore: { address, name, neighbourhood } }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/">Back to home</Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
    </div>
  );
};

export default CoffeeStore;
