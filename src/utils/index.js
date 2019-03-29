
const store = (name,val)=>{
    window.localStorage.setItem(name,val);
};

const get = (name)=>window.localStorage.getItem(name);


export  {store, get};