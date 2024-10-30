const commonReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_DATA': 
    console.log(action)
    return {
        ...state,RegisterData:action.RegisterData
    };
    case "LOGIN_DATA":
      return {
        ...state,LoginData:action.LoginData
      }
    default: return state;
  }
};
export default commonReducer;