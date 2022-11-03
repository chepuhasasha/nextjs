import { ChangeEvent, useState } from "react";
import { P } from "../../elements";
import styles from "./MapObject.module.sass";
import { IMapObjectProps } from "./MapObject.props";

export const MapObject = ({
  changeMap,
  label = "add prop...",
  ...props
}: IMapObjectProps): JSX.Element => {
  const [mapobject, setMapobject] = useState({});
  const [name, setName] = useState({ value: "" });
  const [value, setValue] = useState({ value: "" });

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue({ value: e.target.value });
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName({ value: e.target.value });
  };

  const add = () => {
    mapobject[name.value] = value.value;
    setValue({ value: "" });
    setName({ value: "" });

    setMapobject({ ...mapobject });
    changeMap(mapobject);
  };

  const remove = (name: string) => {
    delete mapobject[name];
    setMapobject({ ...mapobject });
    changeMap(mapobject);
  };

  return (
    <div className={styles.mapobject} {...props}>
      <label>{label}</label>
      {Object.keys(mapobject).length > 0 && (
        <div className={styles.mapobject_body}>
          {Object.keys(mapobject).map((key) => (
            <div key={key} className={styles.mapobject_item}>
              <span>{key}</span>
              <P size="s">{mapobject[key]}</P>
              <span onClick={() => remove(key)}>delete</span>
            </div>
          ))}
        </div>
      )}
      <div className={styles.mapobject_body}>
        <input
          type="text"
          placeholder="name"
          value={name.value}
          onChange={handleChangeName}
        />
        <textarea
          placeholder="text"
          value={value.value}
          onChange={handleChangeValue}
        />
      </div>
      <div className={styles.mapobject_btn} onClick={() => add()}>
        add...
      </div>
    </div>
  );
};
