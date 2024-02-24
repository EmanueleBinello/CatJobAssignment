import React from "react";
import css from './CatListItem.module.scss';
import reactSvg from './../../assets/react.svg';
import { CatFactType } from "../../redux/slices/CatFactAppDataSlice";

export interface CatListItemProps extends CatFactType {
  index?: number;
}

export const CatListItem: React.FC<CatListItemProps> = (props) => {
  const { index, imageSrc, fact, length} = props;

  return (
    <div className={css.catListItem}>
      <div className={css.imageBox}>
        {imageSrc ? <img src={imageSrc} alt={`Immagine ${index}`} /> : <img src={reactSvg} />}
      </div>
      <div className={css.catFactText}>
        {fact}
      </div>
      <div className={css.length}>{length}</div>
    </div>
  );
};
