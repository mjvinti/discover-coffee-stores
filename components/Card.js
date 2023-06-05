import Image from "next/image";
import Link from "next/link";

const Card = ({ href, imgUrl, name }) => {
  return (
    <Link href={href}>
      <h2>{name}</h2>
      <Image alt={name} height={160} src={imgUrl} width={260} />
    </Link>
  );
};

export default Card;
