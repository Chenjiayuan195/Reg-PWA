(function(){

  /*全局变量*/
  var regVal,//正则输入值
      txtVal,//待匹配内容
      RULEALL='',//是否全局
      RULESIZE='';//是否区分大小写

  /*获取元素*/
  var reg=document.getElementById('reg'),
      txt=document.getElementById('txt'),
      input=document.getElementById('input'),
      button=document.getElementById('button'),
      result=document.getElementById('result'),
      txtPre=document.getElementById('txtPre'),
      checkboxAll=document.getElementById('checkboxAll'),
      checkboxSize=document.getElementById('checkboxSize');


  /*元素事件绑定*/
  reg.addEventListener('input',onChangeReg);
  txt.addEventListener('input',onChangeTxt);
  button.addEventListener('click',onClickBtn);
  checkboxAll.addEventListener('click',onClickChkAll);
  checkboxSize.addEventListener('click',onClickChkSize);



/*正则输入*/
function onChangeReg(){
  regVal=reg.value;
  switch (regVal) {
    case '\\B':
      MatchBorder('B');
      break;
    case '\\b':
      MatchBorder('b');
      break;
    default:
      MatchOther();

  }
}

/*内容变更*/
function onChangeTxt(){
  txtVal=txt.value;
  txtPre.innerHTML=txtVal;
  onChangeReg();
}

/*边界匹配*/
function MatchBorder(val){
  if(!txtVal){
    return;
  }
  var frag=document.createDocumentFragment(),
      txtArr=txt.value.split('');
      if(val=='B'){
        for(var i=0,l=txtArr.length;i<l;i++){
          var child=document.createElement('span');
          i==0&&(child.style.borderLeft='2px dashed #F2780C');
          child.style.borderRight='2px dashed #F2780C';
          child.innerHTML=txtArr[i];
          frag.appendChild(child);
        }
      }
      if(val=='b'){
        var arr=txtVal.split(/\s/);
        for(var i=0,l=arr.length;i<l;i++){
          var child=document.createElement('span');
          if(arr[i]){
              child.style.borderRight='2px dashed #F2780C';
              child.style.borderLeft='2px dashed #F2780C';
              child.innerHTML=arr[i];
              var child1=document.createElement('span');
              child1.innerHTML=' ';
              frag.appendChild(child1);
          }else{
            child.innerHTML=' '
          }
          frag.appendChild(child);
        }
      }
      txtPre.innerHTML='';
      txtPre.appendChild(frag);
}

/*其他匹配*/
function MatchOther(){
  if(!regVal||!txtVal){
    return;
  }
  MatchClear();
  var id=0,
      regEx=new RegExp(regVal,RULEALL+RULESIZE);
      newVal=txtVal.replace(regEx,function(match){
        if(id%2==0){
          id++;
          return '<b>'+match+'</b>';
        }else{
          id++;
          return '<i>'+match+'</i>';
        }
      });
      txtPre.innerHTML=newVal;
}

/*按钮触发函数(替换)*/
function onClickBtn(){
  var replaceVal=txtVal,
      regEx=new RegExp(regVal,RULEALL+RULESIZE),
      newReplace=replaceVal.replace(regEx,input.value);
      result.innerHTML=newReplace;
}

/*全局检索*/
function onClickChkAll(){
  this.checked?
   RULEALL='g':
   RULEALL='';
   MatchOther();
}

/*不区别大小写*/
function onClickChkSize(){
  this.checked?
   RULESIZE='i':
   RULESIZE='';
   MatchOther();
}

/*清除所有样式*/
function MatchClear(){
  txtPre.innerHTML=txtVal;
}
})()
