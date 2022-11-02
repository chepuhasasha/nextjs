import { ChangeEventHandler, useRef, useState } from "react";
import { API } from "../../../utils/api";
import { Input, P } from "../../elements";
import styles from "./MapObject.module.sass";
import { IMapObjectProps } from "./MapObject.props";

export const MapObject = ({
  changeMap,
  label = "add prop...",
  ...props
}: IMapObjectProps): JSX.Element => {
  const [mapobject, setMapobject] = useState({
    test: "123",
    tests: "public of Korea. We represent our clients’ business interests to strengthen relations between Korea and other countries. We provide to our distributors different types of cosmetic products and OEM/ODM service for Global Brands. We search huge Korean cosmetic market for very new trends and suggest it to our customers. That's why our clients up to"
  })

  const add = (name:  string, value: string) => {
    console.log('add')
    mapobject[name] = value
    setMapobject({...mapobject})
    changeMap(mapobject)
  };
  
  const remove = (name: string) => {
    console.log('remove')
    delete mapobject[name]
    setMapobject({...mapobject})
    changeMap(mapobject)
  };

  return (
    <div className={styles.mapobject}>
      <label>{label}</label>
        <div className={styles.mapobject_body}>
          {Object.keys(mapobject).map(key => (
          <div key={key} className={styles.mapobject_item}>
            <span>{key}</span>
            <P size="s">{mapobject[key]}</P>
            <span onClick={() => remove(key)}>delete</span>
          </div>
          ))}
        </div>
        {/* <Input register={}/> */}
        <div className={styles.mapobject_btn} onClick={() => add('tess')}>add...</div>
    </div>
  );
};
