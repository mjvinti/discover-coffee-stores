import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/Banner";
import Card from "@/components/Card";

import { fetchCoffeeStores } from "@/lib/coffee-stores";
import useTrackLocation from "@/hooks/useTrackLocation";

import styles from "@/styles/Home.module.css";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();
  return { props: { coffeeStores } };
}

export default function Home({ coffeeStores }) {
  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

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
        <div className={styles.heroImage}>
          <Image
            alt="hero-image"
            height={400}
            src="/static/hero-image.png"
            width={700}
          />
        </div>
        {coffeeStores.length && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Buffalo Stores</h2>
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
      </main>
    </div>
  );
}
