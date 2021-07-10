import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";
import { Card, Typography, CardContent } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import Edit from "./Edit";
import { actionCreators as listActions } from "../redux/modules/articles";

const List = (props) => {
  const scrollTarget = useRef();
  const dispatch = useDispatch();
  const article_list = useSelector((state) => state.article.article_list);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(listActions.loadArticleSV());
  }, []);
  return (
    <ListWrap ref={scrollTarget}>
      {article_list.map((l, idx) => {
        return (
          <Card
            key={idx}
            id={l.id}
            style={{
              margin: "20px",
              border: "2px solid #888",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              position: "relative",
            }}
          >
            <IconButton
              size="small"
              aria-label="delete"
              style={{
                backgroundColor: "#0B184E",
                padding: "8px",
                position: "absolute",
                top: "3px",
                right: "5px",
              }}
              onClick={() => {}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            </IconButton>
            <IconButton
              size="small"
              aria-label="edit"
              style={{
                backgroundColor: "#0B184E",
                padding: "8px",
                position: "absolute",
                top: "3px",
                right: "45px",
              }}
              onClick={() => {
                dispatch(modalOpen(true));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M5 19h1.414l9.314-9.314-1.414-1.414L5 17.586V19zm16 2H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L9.243 19H21v2zM15.728 6.858l1.414 1.414 1.414-1.414-1.414-1.414-1.414 1.414z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            </IconButton>

            <CardContent>
              <Typography
                variant="subtitle1"
                component="h4"
                style={{
                  fontWeight: "800",
                }}
              >
                고민
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {l.content}
              </Typography>
              <Typography
                variant="subtitle1"
                component="h4"
                style={{
                  fontWeight: "800",
                }}
              >
                phrase
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {l.saying}
              </Typography>
            </CardContent>
          </Card>
        );
      })}

      {/* <Edit></Edit> */}
    </ListWrap>
  );
};

const ListWrap = styled.div`
  padding-top: 30px;
`;

export default withRouter(List);