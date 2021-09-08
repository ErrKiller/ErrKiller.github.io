function  sjx(){
    document.write("三角形<br/>");
for(var a=1;a<=7;a++){  //层数控制
     for(var b=1;b<=a;b++){  //每层打印的星星数量
       if(b==1)
           { 
               for(var c=1;c<=7-a;c++)//每层第一星前打印的空格数
               {
              document.write("&nbsp;&nbsp;&nbsp;");
              }
            document.write("★");
          }
          else if(b>1)
            document.write("&nbsp;&nbsp;★");
     }
   document.write("<br\>");
  }
document.write("<br/>");
}
sjx();



function  pxsbx(){
    document.write("平行四边形<br/>");
for(var a=1;a<=7;a++){  //层数控制
     for(var b=1;b<=7;b++){  //每层打印的星星数量
       if(b==1)
           { 
               for(var c=1;c<=7-a;c++)//每层第一星前打印的空格数
               {
              document.write("&nbsp;&nbsp;");
              }
            document.write("★");
          }
          else if(b>1)
            document.write("&nbsp;★");
     }
   document.write("<br\>");
  }
document.write("<br/>");
}
pxsbx();



function  lx(){
    document.write("菱形<br/>");
for(var a=1;a<=7;a++){  //层数控制
  
  //层数小于4层的情况
  if(a<=4){
     for(var b=1;b<=a*2-1;b++){  //每层打印的星星数量
       if(b==1)
           { 
               for(var c=1;c<=(4-a)*2;c++)//每层第一星前打印的空格数
               {
              document.write("&nbsp;&nbsp;&nbsp;");
              }
            document.write("★");
          }
          else if(b>1)
            document.write("&nbsp;&nbsp;★");
     }
   document.write("<br\>");
   }
   
else {    //层数大于4层的情况

  for(var b=1;b<=(8-a)*2-1;b++){  //每一层星星的数量
    if(b==1){ //第一个星星前面的空格数量
      for(var c=1;c<=(a-4)*2;c++)  
      {
    document.write("&nbsp;&nbsp;&nbsp;");
    }
  document.write("★");
  }
  else if(b>1)
  document.write("&nbsp;&nbsp;★");
}
document.write("<br/>");
}

}
}
lx();




