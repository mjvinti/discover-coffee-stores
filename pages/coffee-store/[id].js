import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import cls from "classnames";
import useSWR from "swr";

import { fetcher } from "@/utils";

import styles from "@/styles/CoffeeStore.module.css";

const CoffeeStore = () => {
  const {
    query: { id },
  } = useRouter();
  const { data, error, isLoading } = useSWR(
    `/api/coffee/stores/${id}`,
    fetcher
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (!data) {
    return null;
  }

  const {
    coffeeStore: {
      image_url,
      location: { city, display_address },
      name,
      rating,
    },
  } = data;

  const address = display_address.join(", ");

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`${name} coffee store`} />
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
            alt={name}
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
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
