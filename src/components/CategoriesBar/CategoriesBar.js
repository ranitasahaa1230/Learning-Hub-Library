import React from "react";
import { useCategory, useVideos } from "../../contexts";
import { videosActions } from "../../reducers/actionTypes";
import "./CategoriesBar.css";

export const CategoriesBar = () => {
  const {
    categoryState: { categories },
  } = useCategory();
  const {
    videoState: {selectedCategory},
    videoDispatch,
  } = useVideos();
  const { SET_CATEGORY } = videosActions;

  return (
    <span className="categoriesBar">
      <span
        className={`${selectedCategory === "all" ? "active" : ""}`}
        onClick={() => videoDispatch({ type: SET_CATEGORY, payload: "all" })}
      >
        All
      </span>
      {categories.map(({ _id, categoryName }) => {
        return (
          <span
            key={_id}
            className={`${selectedCategory === categoryName ? "active" : ""}`}
            onClick={() => videoDispatch({ type: SET_CATEGORY, payload: categoryName })}
          >
            {categoryName}
          </span>
        );
      })}
    </span>
  );
};
