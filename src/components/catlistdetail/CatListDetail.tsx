import React from "react";
import css from "./CatListDetail.module.scss";
import { Link, useParams } from "react-router-dom";
import { CatFactType } from "../../redux/slices/CatFactAppDataSlice";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export interface CatListDetailProps extends CatFactType {}

export const CatListDetail: React.FC<CatListDetailProps> = () => {
  const { id } = useParams();
  const { catFactsAppData } = useSelector(
    (state: RootState) => state.catFactsAppData
  );

  const catDetail = catFactsAppData.find((detail) => detail.id === id);

  if (!catDetail) {
    return (
      <div className={css.panel}>
        <div className={css.panelContent}>
          <div className={css.header}>Error</div>
          <div className={css.body}>The selected element does not exist</div>
          <div className={css.footer}>
            <Link to="/">
              <button>Back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { imageSrc, fact, length } = catDetail;

  return (
    <section className={css.panel}>
      <div className={css.panelContent}>
        <h2 className={css.header}>Cat fact: {id}</h2>
        <div className={css.body}>
          {imageSrc && <img src={imageSrc} />}
          <div>{fact}</div>
          <div>
            <b>Length: </b>
            {length}
          </div>
        </div>
        <div className={css.footer}>
          <Link to="/">
            <button>Back</button>
          </Link>
        </div>
      </div>
    </section>
  );
};
