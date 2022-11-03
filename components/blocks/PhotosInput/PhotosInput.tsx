import { ChangeEventHandler, useRef, useState } from "react";
import { API } from "../../../utils/api";
import { P } from "../../elements";
import styles from "./PhotosInput.module.sass";
import { IPhotosInputProps } from "./PhotosInput.props";

export const PhotosInput = ({
  onFileLoad,
  multy = false,
  label = "add image...",
  text,
  ...props
}: IPhotosInputProps): JSX.Element => {
  const input = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const handleFileInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = () => {
        if (reader.result) {
          API.loadImage(
            file.name.split(".").pop() as string,
            reader.result as string
          ).then((data) => {
            console.log(data.data);
            setImages([...images, data.data.message]);
            onFileLoad([...images, data.data.message]);
          });
        }
      };
    }
  };

  const remove = (name: string) => {
    API.deleteImage(name).then((res) => {
      console.log();
      const newImages = images.filter((img) => img != res.data.name);
      setImages([...newImages]);
      onFileLoad([...newImages]);
    });
  };

  return (
    <div className={styles.photosinput}>
      <label>{label}</label>
      <P size="s">{text}</P>
      <div className={styles.photosinput_body}>
        {images.map((image) => (
          <div key={image} className={styles.photosinput_item}>
            <img src={image} alt={image} />
            <span>{image}</span>
            <span onClick={() => remove(image)}>delete</span>
          </div>
        ))}
      </div>
      {multy || images.length === 0 ? (
        <div
          className={styles.photosinput_btn}
          onClick={() => input.current && input.current.click()}
        >
          add...
        </div>
      ) : (
        ""
      )}
      <input
        {...props}
        name="img"
        type="file"
        onChange={handleFileInput}
        ref={input}
        accept="image/*"
      />
    </div>
  );
};
