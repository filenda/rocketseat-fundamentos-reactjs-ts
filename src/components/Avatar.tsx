import { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

//TALK: This way you can make you custom interfaces extend interfaces from react
//to inherit it's properties without having to rewrite all of them on your own
interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
}

//TALK: this is destructuring + default values!!
// '...props' here is a 'rest operation' which takes all remaining properties
// and throw them into a variable called 'props'
export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
  //TALK: null/undefined is different from false, that's why this works
  // const hasBorder = prop.hasBorder !== false;
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      //TALL: here '{...props}' is using an spread operator to throw all
      // properties of 'props' as properties of the img tag
      {...props}
    />
  );
}
