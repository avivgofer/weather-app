import { message } from "antd";

export default store => next => action => {
  if (Array.isArray(action.type)) {
    const [START, SUCCESS, FAILED] = action.type;
    const { type, ...rest } = action;
    action.payload
      .then(res => {
        store.dispatch({ ...rest, type: SUCCESS, payload: res });
      })
      .catch(error => {
        message.error(error.toString());
        store.dispatch({ ...rest, type: FAILED, payload: error });
      });
  }
  return next(action);
};
