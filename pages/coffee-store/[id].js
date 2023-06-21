import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import cls from "classnames";

import { isEmpty } from "@/utils";
import { fetchCoffeeStores } from "@/lib/coffeeStores";
import { StoreContext } from "../_app";

import styles from "@/styles/CoffeeStore.module.css";

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find(
    (store) => store.id === params.id
  );
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((store) => ({
    params: { id: store.id },
  }));
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const {
    isFallback,
    query: { id },
  } = useRouter();
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore);

  useEffect(() => {
    if (isEmpty(props.coffeeStore)) {
      if (coffeeStores.length) {
        const findCoffeeStoreById = coffeeStores.find(
          (store) => store.id === id
        );
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [coffeeStores, props.coffeeStore, id]);

  if (isFallback) {
    return <div>Loading...</div>;
  }

  if (!coffeeStore || isEmpty(coffeeStore)) {
    return null;
  }

  const {
    image_url,
    location: { city, display_address },
    name,
    rating,
  } = coffeeStore;
  const address = display_address.join(", ");
  const handleUpvoteButton = () => console.log("upvote handler");

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">← Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            alt={"name"}
            className={styles.storeImg}
            height={360}
            src={
              image_url ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              alt="address"
              height={24}
              src="/static/icons/places.svg"
              width={24}
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              alt="neighbourhood"
              height={24}
              src="/static/icons/nearMe.svg"
              width={24}
            />
            <p className={styles.text}>{city}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              alt="stars"
              height={24}
              src="/static/icons/star.svg"
              width={24}
            />
            <p className={styles.text}>{rating}</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
