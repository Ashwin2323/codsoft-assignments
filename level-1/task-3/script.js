// const btn_0 = document.getElementById('btn-0');
// const btn_1 = document.getElementById('btn-1');
// const btn_2 = document.getElementById('btn-2');
// const btn_3 = document.getElementById('btn-3');
// const btn_4 = document.getElementById('btn-4');
// const btn_5 = document.getElementById('btn-5');
// const btn_6 = document.getElementById('btn-6');
// const btn_7 = document.getElementById('btn-7');
// const btn_8 = document.getElementById('btn-8');
// const btn_9 = document.getElementById('btn-9');
// const btn_dot = document.getElementById('btn-dot');
// const btn_add = document.getElementById('btn-add');
// const btn_sub = document.getElementById('btn-sub');
// const btn_mul = document.getElementById('btn-mul');
// const btn_divide = document.getElementById('btn-divide');
// const btn_del = document.getElementById('btn-del');
// const btn_reset = document.getElementById('btn-reset');
const buttons = document.querySelectorAll('.btns');
const screenText = document.getElementById('screen-text');
let screen_input="";
let result=0.0;
const ops = new Set(["+","-","*","/","."]);

function updateScreen(newValue) {
    newValue=newValue.split(" ");
    newValue=newValue.join('');
    if (newValue.length > 9){
      newValue=newValue.slice(0,9);
    }
    if(newValue===""){newValue="0";}
    screenText.textContent = newValue;
}
updateScreen("0")

function operation(a,b,operator){
    if(operator==="+"){
        return a+b;
    }
    else if(operator==="-"){
        return a-b;
    }
    else if(operator==="*"){
        return a*b;
    }
    else if(operator==="/"){
        return a/b;
    }
}

function evaluate(screen_input){
    let expression=screen_input.split(" ");
    if(expression.length===0){return "";}
    if(expression.length<=2){return expression[0];}
    let result=0;
    let val=parseFloat(expression[0]);
    for(let i=1;i<expression.length;i+=2){
        let num=parseFloat(expression[i+1]); 
        let temp=operation(val,num,expression[i]);
        // if(Number.isNaN(temp) || temp===Infinity || temp===undefined){return temp;}
        result=temp;
        val=result;
    }

    // console.log(screen_input);
    let ans=result.toString();
    // console.log(ans);
    if(ans.length>9){ans=ans.slice(0,9);}
    return ans
}


buttons.forEach(button => {
    const value = button.textContent;
    if(value==="DEL"){
        button.addEventListener('click', () => {
        if(screen_input==="ERROR" || screen_input==="Infinity" || screen_input==="-Infinity" || screen_input==="NaN"){
            screen_input="";
        }
        else{
            screen_input=screen_input.substring(0,Math.max(0,screen_input.length-1));
        }
        updateScreen(screen_input);
        });
    }
    else if(value==="RESET"){
        button.addEventListener('click', () => {
        screen_input="";
        updateScreen(screen_input);
        return;
    });}
    else{
        button.addEventListener('click', () => {
            try{
                let prev="";
                let newValue=screen_input.split(" ");
                newValue=newValue.join('');
                if (newValue.length > 9){return;}
                if(newValue.length>0){prev=newValue[newValue.length-1];}
                if(value==="+"){
                    if(ops.has(prev)){return;}
                    if(screen_input.length===0){return;}
                    screen_input+=" "+value+" ";
                }
                else if(value==="-"){
                    if(ops.has(prev)){return;}
                    if(screen_input.length===0){
                        screen_input+=value;
                    }
                    else{
                        screen_input+=" "+value+" ";
                    }
                }
                else if(value==="x"){
                    if(ops.has(prev)){return;}
                    if(screen_input.length===0){return;}
                    screen_input+=" "+"*"+" ";
                }
                else if(value==="/"){
                    if(ops.has(prev)){return;}
                    if(screen_input==="0"){return;}
                    screen_input+=" "+value+" ";
                }
                else if(value==="."){
                    if(ops.has(prev)){return;}
                    screen_input+=value;
                }
                else if(value==="="){
                    screen_input=evaluate(screen_input)
                    updateScreen(screen_input);
                    return;
                }
                else{
                    if(screen_input==="0"){screen_input="";}
                    screen_input+=value;
                }
                updateScreen(screen_input);
            } catch(e){
                screen_input="ERROR"
                updateScreen(screen_input);
            }
        });
    }
  });
