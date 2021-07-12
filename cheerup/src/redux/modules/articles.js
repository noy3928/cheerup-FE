import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import RESP from "../../shared/response";
import instance from "../../shared/Request";
import axios from "axios";
import { history } from "../configureStore";

const LOAD_ARTICLE = "articles/LOAD_ARTICLE";
const CREATE_ARTICLE = "articles/CREATE_ARTICLE";
const UPDATE_ARTICLE = "articles/UPDATE_ARTICLE";
const DELETE_ARTICLE = "articles/DELETE_ARTICLE";

const loadArticle = createAction(LOAD_ARTICLE, (article_list) => ({
  article_list,
}));
const createArticle = createAction(CREATE_ARTICLE, (article_list, pharase) => ({
  article_list,
  pharase,
}));
const updateArticle = createAction(UPDATE_ARTICLE, (id, content) => ({
  id,
  content,
}));
const deleteArticle = createAction(DELETE_ARTICLE, (id) => ({
  id,
}));

const initialState = {
  article_list: [],
  saying: [],
};

const loadArticleSV = (id) => {
  console.log("로드 디스패치가 실행되었다.");
  return function (dispatch, getState, { history }) {
    instance
      .get("/article")
      .then((res) => {
        if (id) {
          const article = res.data.filter((l, idx) => {
            return l.id === parseInt(id);
          });
          dispatch(loadArticle(article));
        } else {
          dispatch(loadArticle(res.data));
        }
      })
      .catch((err) => {
        console.log("list load error!");
      });
  };
};

const createArticleSV = (new_article) => {
  console.log(new_article);
  return function (dispatch, getState, { history }) {
    axios
      .post("http://52.78.217.45/article", {
        username: new_article.username,
        content: new_article.content,
        saying: new_article.pharase,
      })
      .then((res) => {
        console.log(res);
        dispatch(createArticle(new_article));
        history.push("/list");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const updateArticleSV = (id, content) => {
  return function (dispatch, getState, { history }) {
    const resp = RESP.ARTICLE.articles;
    resp.map((l, idx) => {
      // if (l.id === id) {
      //   console.log(content);
      //   return { ...l, content: content };
      // } else {
      //   return l;
      // }
    });
    dispatch(updateArticle(id, content));
  };
};
const deleteArticleSV = (id) => {
  return function (dispatch, getState, { history }) {
    const resp = RESP.ARTICLE.articles;
    resp.map((l, idx) => {
      // if (l.id === id) {
      //   console.log(content);
      //   return { ...l, content: content };
      // } else {
      //   return l;
      // }
    });
    dispatch(deleteArticle(id));
  };
};

export default handleActions(
  {
    [LOAD_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        draft.article_list = action.payload.article_list;
      }),
    [CREATE_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        draft.article_list.push(action.payload.article_list);
      }),
    [UPDATE_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        draft.article_list = draft.article_list.map((l, idx) => {
          if (l.id === action.payload.id) {
            return { ...l, content: action.payload.content };
          } else {
            return l;
          }
        });
        console.log(draft.article_list[0].content);
      }),
    [DELETE_ARTICLE]: (state, action) =>
      produce(state, (draft) => {
        draft.article_list = draft.article_list.filter((l, idx) => {
          return l.id !== action.payload.id;
        });
      }),
  },
  initialState
);
const actionCreators = {
  createArticle,
  createArticleSV,
  loadArticleSV,
  updateArticleSV,
  deleteArticleSV,
};
export { actionCreators };
