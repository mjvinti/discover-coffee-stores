import styles from "./Banner.module.css";

const Banner = ({
  buttonText,
  handleOnClick,
  hasCoffeeStores,
  isFindingLocation,
}) => {
  const renderButton = () => {
    if (hasCoffeeStores) {
      return null;
    }

    return (
      <div className={styles.buttonWrapper}>
        <button
          className={styles.button}
          onClick={handleOnClick}
          disabled={isFindingLocation}
        >
          {buttonText}
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}> Connoisseur</span>
      </h1>
      <p className={styles.subTitle}>Discover your local coffee shops!</p>
      {renderButton()}
    </div>
  );
};

export default Banner;
