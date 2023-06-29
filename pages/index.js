import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/Banner";
import Card from "@/components/Card";

import { fetchCoffeeStores } from "@/lib/coffeeStores";
import useTrackLocation from "@/hooks/useTrackLocation";
import { ACTION_TYPES, StoreContext } from "@/store/storeContext";

import styles from "@/styles/Home.module.css";

export async function getStaticProps(context) {
  const defaultCoffeeStores = await fetchCoffeeStores();
  return { props: { defaultCoffeeStores } };
}

export default function Home({ defaultCoffeeStores }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const {
    dispatch,
    state: { coffeeStores, latitude, longitude },
  } = useContext(StoreContext);
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latitude && longitude) {
        try {
          const response = await fetch(
            `/api/coffee/stores?latitude=${latitude}&longitude=${longitude}&limit=${30}`
          );
          const { fetchedCoffeeStores } = await response.json();
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores: fetchedCoffeeStores },
          });
          setErrorMsg(null);
        } catch (err) {
          setErrorMsg(err.message);
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [dispatch, latitude, longitude]);

  const onClick = () => handleTrackLocation();

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={onClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {errorMsg && <p>Something went wrong: {errorMsg}</p>}
        <div className={styles.heroImage}>
          <Image
            alt="hero-image"
            height={400}
            src="/static/hero-image.png"
            width={700}
          />
        </div>
        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores Near Me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => (
                <Card
                  className={styles.card}
                  href={`/coffee-store/${store.id}`}
                  imgUrl={store.image_url}
                  key={store.id}
                  name={store.name}
                />
              ))}
            </div>
          </div>
        )}
        {defaultCoffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Buffalo Stores</h2>
            <div className={styles.cardLayout}>
              {defaultCoffeeStores.map((store) => (
                <Card
                  className={styles.card}
                  href={`/coffee-store/${store.id}`}
                  imgUrl={store.image_url}
                  key={store.id}
                  name={store.name}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
