import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";

import "./Pagination.scss";

import { setPage } from "../store/actions/filters";

export const PaginationBar = (props) => {
  const dispatch = useDispatch();

  const onChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className="pagination-box">
      <Pagination
        colorPrimary={"#1677ff"}
        showSizeChanger={false}
        onChange={onChange}
        total={props.total}
        defaultPageSize={20}
        current={props.current}
        defaultCurrent={props.current}
      />
    </div>
  );
};
