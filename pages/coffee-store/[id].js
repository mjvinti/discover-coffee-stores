import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import cls from "classnames";

import { fetchCoffeeStores } from "@/lib/coffeeStores";

import styles from "@/styles/CoffeeStore.module.css";

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStore: coffeeStores.find((store) => store.id === params.id),
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

const CoffeeStore = ({
  coffeeStore: {
    image_url,
    location: { city, display_address },
    name,
    rating,
  },
}) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading...</div>;
  }

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
            src={image_url}
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
