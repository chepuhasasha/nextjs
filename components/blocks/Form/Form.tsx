import styles from "./Form.module.sass";
import type { IFormProps } from "./Form.props";
import { H2, P, Button } from "../../elements";

export const Form = ({
  title,
  description,
  children,
  ...props
}: IFormProps): JSX.Element => {
  return (
    <form className={styles.form} {...props}>
      {title && <H2>{title}</H2>}
      {description && <P size="s">{description}</P>}
      {children}
      <div className={styles.form_buttons}>
        <Button type="reset" appearance="ghost">
          clear
        </Button>
        <Button type="submit">submit</Button>
      </div>
    </form>
  );
};
