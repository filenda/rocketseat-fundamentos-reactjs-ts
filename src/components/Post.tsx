import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "link" | "paragraph";
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState(["Post mto bacana hein?"]);

  const [newCommentText, setNewCommentText] = useState("");

  // const publishedDateFormatted = new Intl.DateTimeFormat("pt-BR", {
  //   day: "2-digit",
  //   month: "long",
  //   hour: "2-digit",
  //   minute: "2-digit",
  // }).format(publishedAt);

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const deleteComment = (comment: string) => {
    const commentsWithoutDeletedOne = comments.filter((c) => c !== comment);

    setComments(commentsWithoutDeletedOne);
  };

  const handleCreateNewComment = (e: FormEvent) => {
    e.preventDefault();

    // TALK: 'comment' here is the 'name' property of the textarea form element
    // const newCommentText = e.target.comment.value;

    setComments([...comments, newCommentText]);

    setNewCommentText("");
  };

  const handleNewCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //TALK: This is a html/react bug IMO but you have to clear the custom
    // validity set before (to not allow empty string in comment textarea input) in order for the form to accept the new inputed value
    e.target.setCustomValidity("");

    setNewCommentText(e.target.value);
  };

  const handleNewCommentInvalid = (e: InvalidEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity("Esse campo é obrigatório");
  };

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            // TALK: if you wanna pass 'true' as value of a property that is boolean, just mention it, like here
            // where you omit the '={true}' part and it works just fine. This is react
            // hasBorder
            src={author.avatarUrl}
          />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        {/* TALK: JSX/REACT requires attribute to be written in camel case like 'dateTime',
      instead of default html 'datetime'; */}
        <time title="11 de maior às 8:13h" dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href={line.content}>{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form
        onSubmit={(e) => handleCreateNewComment(e)}
        className={styles.commentForm}
      >
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={(e) => handleNewCommentChange(e)}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((c) => (
          //TALK: It's is not cool to use the map index as the key
          //key properties in array maps serve one main purpose: to avoid unnessessary re-rendering
          <Comment key={c} content={c} onDeleteComment={deleteComment} />
        ))}
      </div>
    </article>
  );
}
