import Head from "next/head";
import Banner from "@/components/Banner";

import styles from "@/styles/Home.module.css";

export default function Home() {
  const onClick = () => console.log("hi banner button");

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner buttonText="View stores nearby" handleOnClick={onClick} />
      </main>
    </div>
  );
}
