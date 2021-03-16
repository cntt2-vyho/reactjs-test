const initialState = {
    user: {}
    

}
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "ON_DETAILS":
            console.log('ahihi');
            
            return {...state, user: action.payload}
        default:
            return state;

    }
}
export default rootReducer;