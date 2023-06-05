import Image from "next/image";
import Link from "next/link";
import cls from "classnames";

import styles from "./Card.module.css";

const Card = ({ href, imgUrl, name }) => {
  return (
    <Link className={styles.cardLink} href={href}>
      <div className={cls("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            alt={name}
            className={styles.cardImage}
            height={160}
            src={imgUrl}
            width={260}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
