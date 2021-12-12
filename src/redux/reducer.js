// imports

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //sample
    case "A":
    // code here;
    case "B":
    // code here;
    // case etc.

    //DON'T DELETE THIS:
    default:
      return state;
  }
};

export default reducer;
