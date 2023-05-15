import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { Trash, ThumbsUp } from "phosphor-react";

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  const handleDeleteComment = () => {
    onDeleteComment(content);
  };

  // TALK: State self depending updates: whenever you want to update a state valu
  // e with the most recent value of itself, it is recommended to use the arrow
  // function as the parameter of the setState like in the example below.
  // In this case, the parameter ‘state’ holds the most recent value of that state
  // (likeCount), and it is more adequate than using the ‘likeCount’ variable value
  // decalred in the first line of code of this component.
  const handleLikeComment = () => {
    setLikeCount((state) => {
      return state + 1;
    });
  };

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/vfilenga.png" alt="" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Vini Filenga</strong>
              <time title="11 de Maio às 08:13h" dateTime="2022-05-11 08:13:30">
                Cerca de 1h atrás
              </time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>
        <footer>
          <button onClick={() => handleLikeComment()}>
            {/* TALK: This (below) is actually an anonymous function declaration */}
            {/* If it was left like this : <button onClick={setLikeCount(likeCount + 1)}> */}
            {/* than react would enter an infinite loop of component rerendering */}
            {/* <button onClick={() => setLikeCount(likeCount + 1)}> */}
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
