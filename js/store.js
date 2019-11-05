const store = function(state, fn){
    this.state ={ ...state };
    this.getState = () => ({...this.state});
    this.setState = (state) => {
        this.state = {...this.state, ...state}
    };
    return fn({ ...this})
}
/*TODO implement common state to the other parts  of  native code*/