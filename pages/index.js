import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/Banner";
import Card from "@/components/Card";

import coffeStores from "@/data/coffee-stores.json";

import styles from "@/styles/Home.module.css";

export async function getStaticProps(context) {
  return { props: { coffeStores } };
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
        <div className={styles.cardLayout}>
          {coffeStores.map((store) => (
            <Card
              className={styles.card}
              href={`/coffee-store/${store.id}`}
              imgUrl={store.imgUrl}
              key={store.id}
              name={store.name}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
