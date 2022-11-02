import { ChangeEventHandler, useRef, useState } from "react";
import { API } from "../../../utils/api";
import { H3, P } from "../../elements";
import styles from "./PhotosInput.module.sass";
import { IPhotosInputProps } from "./PhotosInput.props";

export const PhotosInput = ({
  onFileLoad,
  onFileRemove,
  multy = false,
  label = "add image...",
  text,
  ...props
}: IPhotosInputProps): JSX.Element => {
  const input = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>(['images/test.jpg','images/test2.jpg','images/test3.jpg']);

  const handleFileInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsBinaryString(file)
      reader.onload = (r) => {
        // images.push(file.name,
        //   img: reader.result as string,
        // });

        if(r.currentTarget) {
          API.loadImage(
            file.name.split('.').pop() as string,
            r.currentTarget.result as string
            ).then(data => {
            console.log(data.data)
            setImages([...images, data.data.message])
          })
        }
        // setImages(images);
      };
      // onFileLoad(images});
    }
  };

  const remove = (name: string) => {
    // onFileRemove(name)
    console.log(name)
  };

  return (
    <div className={styles.photosinput}>
      <label>{label}</label>
      <P size='s'>{text}</P>
      <div className={styles.photosinput_body}>
        {images.map(image => (
          <div key={image} className={styles.photosinput_item}>
            <span>{image}</span>
            <span onClick={() => remove(image)}>delete</span>
          </div>
        ))}
      </div>
      <div className={styles.photosinput_btn} onClick={() => input.current && input.current.click()}>
        add...
      </div>
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
