export const FETCH_EXAMPLE_REQUEST = 'FETCH_EXAMPLE_REQUEST';
export const FETCH_EXAMPLE_FAILURE = 'FETCH_EXAMPLE_FAILURE';
export const FETCH_EXAMPLE_SUCCESS = 'FETCH_EXAMPLE_SUCCESS';

const AJAX_A_REQUEST = 'AJAX_A_REQUEST';
const AJAX_A_FAILURE = 'AJAX_A_FAILURE';
const AJAX_A_SUCCESS = 'AJAX_A_SUCCESS';

const AJAX_B_REQUEST = 'AJAX_B_REQUEST';
const AJAX_B_FAILURE = 'AJAX_B_FAILURE';
const AJAX_B_SUCCESS = 'AJAX_B_SUCCESS';

export function ajaxA() {
  return function(dispatch) {
    dispatch({ type: AJAX_A_REQUEST });
    return fetch('https://api.github.com/')
      .then(response => response.json())
      .then(
        json => dispatch({ type: AJAX_A_SUCCESS, payload: json }),
        err => dispatch({ type: AJAX_A_FAILURE, payload: err })
      );
  };
}

export function ajaxB() {
  return function(dispatch) {
    dispatch({ type: AJAX_B_REQUEST });
    return fetch('https://api.github.com/users/anton072')
      .then(response => response.json())
      .then(
        json => dispatch({ type: AJAX_B_SUCCESS, payload: json }),
        err => dispatch({ type: AJAX_B_FAILURE, payload: err })
      );
  };
}

export function exampleAjax() {
  return function(dispatch) {
    dispatch({ type: FETCH_EXAMPLE_REQUEST });
    return Promise.all([dispatch(ajaxA()), dispatch(ajaxB())])
      .then(responces => {
        dispatch({
          type: FETCH_EXAMPLE_SUCCESS,
          payload: {
            apis: responces[0].payload,
            user: responces[1].payload
          }
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_EXAMPLE_FAILURE,
          payload: err
        });
      });
  };
}
