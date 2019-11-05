import {itemTemplate} from "../templates.js";

const  elementItem = ({index,data:{price,v,counter},info:{ category, name, img }})=>{
    let daraArrayToString =["0","30","50","100","150"].map(function(item,ind){
        return (' data-price-'+item+'="'+(price>=Number(item))+'" ');
    }).join("");
    const params = { index, price, v, counter, category, name, img,daraArrayToString};
    return itemTemplate(params)
}
export default elementItem;