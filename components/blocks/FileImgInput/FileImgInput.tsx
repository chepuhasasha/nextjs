import { ChangeEventHandler, useRef, useState } from "react";
import styles from "./FileImgInput.module.sass";
import { IFileImgInputProps } from "./FileImgInput.props";

export const FileImgInput = ({ onFileSelect, text='add image...', ...props }: IFileImgInputProps): JSX.Element => {
  const input = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState({
    shortName: "Load file",
    name: "",
  });
  const [src, setSRC] = useState<string | null>(null);

  const handleFileInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSRC(reader.result as string);
        onFileSelect(reader.result);
      };

      if (file.name.length > 10) {
        setName({
          shortName: file.name.slice(0, 7) + "...",
          name: file.name,
        });
      } else {
        setName({ shortName: file.name, name: file.name });
      }
    }
  };

  return (
    <div className={styles.fileimginput} title={name.name} onClick={() => input.current && input.current.click()}>
      {src && <img
        src={src}
        alt="test"
      />}
      {!src && <span>{text}</span>}
      <input
        {...props}
        name='img'
        type="file"
        onChange={handleFileInput}
        ref={input}
        accept="image/*"
      />
    </div>
  );
};
