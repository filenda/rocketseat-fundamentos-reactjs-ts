import styles from "./Avatar.module.css";

interface AvatarProps {
  hasBorder?: boolean;
  src: string;
  alt?: string;
}

//TALK: this is destructuring + default values!!
export function Avatar({ hasBorder = true, src, alt }: AvatarProps) {
  //TALK: null/undefined is different from false, that's why this works
  // const hasBorder = prop.hasBorder !== false;
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
      alt={alt}
    />
  );
}
