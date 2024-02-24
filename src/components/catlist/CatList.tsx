import React, { useEffect, useCallback, useState } from "react";
import _ from "lodash-es";
import css from "./CatList.module.scss";
import cx from 'classnames';
import { CatListItem } from "../catlistitem/CatListItem";
import { Link } from "react-router-dom";
import {
  CatFactType,
  setCatFactsAppData,
} from "../../redux/slices/CatFactAppDataSlice";
import { RootState, store } from "../../redux/store";
import { useSelector } from "react-redux";

export type CatFactResType = {
  fact?: string;
  length?: string;
};

export type PaginationType = {
  currentPage: number;
  lastPage?: number;
};

export interface CatListProps {}

export const CatList: React.FC<CatListProps> = () => {
  const { catFactsAppData } = useSelector(
    (state: RootState) => state.catFactsAppData
  );

  const [{ currentPage, lastPage }, setPagination] = useState<PaginationType>({
    currentPage: 1,
    lastPage: undefined,
  });

  const apiCatFactsCall = useCallback(async () => {
    try {
      const response = await fetch(
        `https://catfact.ninja/facts?page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error("Error during cat facts loading");
      }
      const res = await response.json();
      setPagination((old: PaginationType) => ({
        ...old,
        lastPage: res.last_page,
      }));
      return res.data;
    } catch (error) {
      alert(error);
    }
    Promise.resolve();
  }, [currentPage]);

  const apiPlaceKittenCall = useCallback(async (catFacts: CatFactResType[]) => {
    const imagesRes: string[] = [];
    try {
      for (let index = 0; index < catFacts.length; index++) {
        const imageNumber = Math.floor(Math.random() * catFacts.length);
        const response = await fetch(
          `http://placekitten.com/100/100?image=${imageNumber}`
        );
        if (!response.ok) {
          throw new Error("Error during cat images loading");
        }
        const res = await response.blob();
        const imageUrl = URL.createObjectURL(res);
        imagesRes.push(imageUrl);
      }
    } catch (error) {
      alert(error);
    }
    return imagesRes;
  }, []);

  const buildItemsList = useCallback(
    (catFacts: CatFactResType[], images: string[]) => {
      const itemList = _.map(
        catFacts,
        (data: CatFactResType, index: number) => {
          return {
            ...data,
            imageSrc: images[index] || undefined,
            id: _.uniqueId(),
            currentPage
          };
        }
      );

      store.dispatch(setCatFactsAppData(itemList));
    },
    [currentPage]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catFactsData = await apiCatFactsCall();
        const imagesData = await apiPlaceKittenCall(catFactsData);
        buildItemsList(catFactsData, imagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [apiCatFactsCall, apiPlaceKittenCall, buildItemsList, currentPage]);

  const onPrevious = useCallback(() => {
    if (currentPage !== 1) {
      setPagination((old: PaginationType) => ({
        ...old,
        currentPage: old.currentPage - 1,
      }));
    }
  }, [currentPage, setPagination]);

  const onNext = useCallback(() => {
    if (lastPage && currentPage < lastPage) {
      setPagination((old: PaginationType) => ({
        ...old,
        currentPage: old.currentPage + 1,
      }));
    }
  }, [currentPage, lastPage]);

  return (
    <section className={css.catListSection}>
      {currentPage > 1 && (
        <div className={cx(css.paginationLabel, css.previous)}>
          Page {currentPage} of {lastPage}
          <button onClick={onPrevious}>Previous</button>
        </div>
      )}
      <div className={css.listContent}>
        {catFactsAppData &&
          _.map(catFactsAppData, (catItem: CatFactType, index: number) => {
            const { id, imageSrc, fact, length } = catItem;
            return (
              <Link to={`detail/${id}`} key={index}>
                <CatListItem imageSrc={imageSrc} fact={fact} length={length} />
              </Link>
            );
          })}
      </div>
      {lastPage && currentPage < lastPage && (
        <div className={cx(css.paginationLabel, css.next)}>
          <button onClick={onNext}>Next</button>
          Page {currentPage} of {lastPage}
        </div>
      )}
    </section>
  );
};
