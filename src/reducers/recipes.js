const recipes = (state = [], action) => {
  switch (action.type) {
    case "SHOW_RECIPES":
      return action.recipes;
    default:
      return state;
  }
};
export default recipes;
