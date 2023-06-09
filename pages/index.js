import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/Banner";
import Card from "@/components/Card";

import styles from "@/styles/Home.module.css";

export async function getStaticProps(context) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  const response = await fetch(
    "https://api.yelp.com/v3/businesses/search?location=Buffalo%2C%20NY&term=coffee&sort_by=best_match&limit=6",
    options
  );
  const data = await response.json();
  return { props: { coffeStores: data.businesses } };
}

export default function Home({ coffeStores }) {
  const onClick = () => console.log("hi banner button");

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner buttonText="View stores nearby" handleOnClick={onClick} />
        <div className={styles.heroImage}>
          <Image
            alt="hero-image"
            height={400}
            src="/static/hero-image.png"
            width={700}
          />
        </div>
        {coffeStores.length && (
          <>
            <h2 className={styles.heading2}>Buffalo Stores</h2>
            <div className={styles.cardLayout}>
              {coffeStores.map((store) => (
                <Card
                  className={styles.card}
                  href={`/coffee-store/${store.id}`}
                  imgUrl={store.image_url}
                  key={store.id}
                  name={store.name}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
