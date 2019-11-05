import {
    elementOptionsContainer,
    elemntOptionsItems,
} from "./templates.js";
import  elementItem from "./component/elementItem.js";
const $ = (str)=>document.getElementById(str),
      $query = (str)=>document.querySelector(str),
      $queryAll = (str)=>document.querySelectorAll(str);
/*TODO:
     3. При нажатии на кнопку ОФОРМИТЬ ЗАКАЗ вывести модальное окно с 2-мя полями - Имя, email и кнопкой Отправить
     При нажатии на кнопку Отправить проверить заполнение полей формы
     - Если поля не заполнены (или заполнены только пробелами) не разрешать отправку формы,
     при этом вывести сообщение в alert

     - Если поля прошли валидацию вывести через alert пользователю сообщение с благодарностью за покупки,
     очистить верхний блок c информацией о товарах, добавленных в корзину
     Товаров в корзине - XXX, на сумму XXX грн

     */
export const marketMethods = {
    addToBasket:(event)=>{
        event.preventDefault();
        const basket = {};
        basket.id = event.target.id.slice(0,event.target.id.length-3);
        basket.inputCount = $query('[name="'+basket.id+'-input"]').value;
        basket.inputPrice = $query('[name="'+basket.id+'-input"]').getAttribute("data-sum");
        let totalPrice = basket.inputPrice*basket.inputCount+Number($query('#total_sum').textContent);
        let totalCount = Number(basket.inputCount)+Number($query('#total_cont').textContent);
        console.log("total_sum==="+Number($query('#total_sum').textContent)
            +" basket.inputCount "+totalCount+" ");
        $query('#total_sum').innerHTML = totalPrice;
        $query('#total_cont').innerHTML = totalCount;
        $query('#confirmBtn').setAttribute("data-total-sum",totalPrice);
        $query('#confirmBtn').setAttribute("data-total-count",totalCount);

    },
    loadPage:({ dishes, options, })=>{
        const htmlComponents = {
                filters:  options.map( option => ({ name: option.codeName, value:"", active: false }) ),
                SelectInput :  options.map((item,ind) => {
                    item.ind= ind;
                    item.select = item.select.map((select,value) =>  elemntOptionsItems({ select, value }));

                    return elementOptionsContainer(item);

                }),
                Items :   dishes.map((item,ind)=>{
                    item.index= ind;
                    return elementItem(item);
                })
            },
            selectMethod =function(){
                const  selectorName=[];

                const filters = htmlComponents.filters.map(function(f){
                        var str = f.name!=="price"?'[data-'+f.name+'="'+f.value+'"]':'[data-'+f.name+'-'+["0","30","50","100","150"][f.value]+'="false"]';

                        if(f.active){
                            selectorName.push(str);
                        }else{
                            selectorName.slice(selectorName.indexOf(str),1)
                        }
                        return f
                    }),
                    length = selectorName.length-1;
                const selectedItem = $queryAll('div.product-box__item'+selectorName.join(""));
                const notSelectedItem = $queryAll('div.product-box__item');
                for(let y=0 ;y<=notSelectedItem.length-1;y++ ){
                    notSelectedItem[y].style.display="none";
                }
                for(let i=0 ;i<=selectedItem.length-1;i++ ){
                    selectedItem[i].style.display="block";
                }
                console.log(" str "+selectorName );
            } ;
        $("filter-container").innerHTML= htmlComponents.SelectInput.join("");
        $("items-container").innerHTML= htmlComponents.Items.join("");
        for(let rr=0; rr<= dishes.length-1; rr++){
            $(''+rr+'Btn')
                .addEventListener("click",marketMethods.addToBasket,false);
        }
        for(let y=0 ; y <= options.length-1; y++){
            $queryAll('select')[y].addEventListener("change",function (e) {
                e.preventDefault();
                let flag,
                    newSelect =htmlComponents.filters[e.target.name];
                newSelect.active = Number( e.target.value )!==0 ;
                newSelect.value =Number(e.target.name!=="price"?e.target.value
                    :[0,30,50,100,150][Number( e.target.value )]);
                flag = htmlComponents.filters.filter(function(obj){ return obj.active===true }).length!==0;
                setTimeout(function(){
                    flag? selectMethod():$("items-container")
                        .innerHTML = htmlComponents.Items.join("");
                },0);

            });
        }
        console.log(" location "+window.location.path);

    },
    modalGenerator : function(event){
        !marketData.flag?$query("body").style.zIndex=0:console.log("!!");
        var formContainer =document.createElement("DIV"),
            formOptions =
                {
                    form:{class:"form-body"},
                    inputEmail:{ class:"qty__item form-input",
                        type:"email",placeholder:"email",id:"input_mail"},
                    inputPass:{ class:"qty__item form-input",
                        type:"text",placeholder:"имя",id:"input_name"},
                    inputButton:{class:"send-btn btn-check"
                        ,id:"sendBtn",type:"button"},
                    span:{class:"span-form"}
                },
            formHTMLnode ={
                form : document.createElement("FORM"),
                inputPass : document.createElement("INPUT"),
                inputEmail : document.createElement("INPUT"),
                span : document.createElement("SPAN"),
                inputButton : document.createElement("BUTTON")
            };
        for(var key in formHTMLnode ){
            var target = formHTMLnode[key];
            for(var k in formOptions[key] ){
                target.setAttribute(""+k+"",""+formOptions[key][k]+"");
            }
            formContainer.appendChild(formHTMLnode[key]);

        };

        formHTMLnode.inputButton.textContent = "Отправить";
        formHTMLnode.span.textContent = "В приобрели блюд:"+
            $query('#total_cont').textContent
            +" на сумму = "+
            $query('#total_sum').textContent
            +" грн.";
        formContainer.setAttribute("class","form-container");
        formContainer.setAttribute("id","formContainer");
        formHTMLnode.form.appendChild(formHTMLnode.span);
        formHTMLnode.form.appendChild(formHTMLnode.inputPass);
        formHTMLnode.form.appendChild(formHTMLnode.inputEmail);
        formHTMLnode.form.appendChild(formHTMLnode.inputButton);

        formHTMLnode.inputButton.addEventListener("click",function(event){
            event.preventDefault();
            var obj ={};
            ["mail","name"].map(function(item){
                obj[item]= $query("#input_"+item).value;
                return item;
            });
            if(obj.name.length>=4&&obj.name.match( / /ig ).length!==obj.name.length){
                alert("В приобрели блюд:"+
                    $query('#total_cont').textContent
                    +" на сумму = "+
                    $query('#total_sum').textContent
                    +" грн. Спасибо за покупку!");
                $query('#total_cont').textContent=0;
                $query('#total_sum').textContent=0;
                $query('#formContainer').remove();
            }else{
                alert("Вы не правильно заполнили форму");
            }
            console.log(" objobj "+JSON.stringify(obj.name));


        });


        $query("body").appendChild(formContainer);
        marketData.flag = !marketData.flag;

    }
}, marketData ={flag:false};