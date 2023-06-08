import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import cls from "classnames";

import coffeeStoresData from "@/data/coffee-stores.json";

import styles from "@/styles/CoffeeStore.module.css";
import Image from "next/image";

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

const CoffeeStore = ({
  coffeeStore: { address, imgUrl, name, neighbourhood },
}) => {
  const { isFallback } = useRouter();

  const handleUpvoteButton = () => console.log("up vote");

  if (isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            alt={name}
            className={styles.storeImg}
            height={360}
            src={imgUrl}
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
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              alt="stars"
              height={24}
              src="/static/icons/star.svg"
              width={24}
            />
            <p className={styles.text}>1</p>
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
