(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b92b78b"],{6988:function(e,t,a){"use strict";let n;const i=()=>{let e=window.navigator.userAgent;return e.indexOf("MSIE")>=0?"ie":e.indexOf("Firefox")>=0?"Firefox":e.indexOf("Chrome")>=0?"Chrome":e.indexOf("Opera")>=0?"Opera":e.indexOf("Safari")>=0?"Safari":void 0},o=(e,t)=>{"ie"==i()?r(e,t):l(e,t)},r=(e,t)=>{let a=e,i=new ActiveXObject("Excel.Application"),o=i.Workbooks.Add(),r=o.Worksheets(1),l=document.body.createTextRange();l.moveToElementText(a),l.select,l.execCommand("Copy"),r.Paste(),i.Visible=!0;try{let e=i.Application.GetSaveAsFilename("Excel.xls","Excel Spreadsheets (*.xls), *.xls")}catch(s){print("Nested catch caught "+s)}finally{o.SaveAs(e),o.Close(savechanges=!1),i.Quit(),i=null,window.setInterval("Cleanup();",1),n=window.setInterval("Cleanup();",1)}},l=function(){const e="data:application/vnd.ms-excel;base64,",t='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body><table>{table}</table></body></html>',a=function(e){return window.btoa(unescape(encodeURIComponent(e)))},n=(e,t)=>e.replace(/{(\w+)}/g,(e,a)=>t[a]);return(i,o)=>{const r={worksheet:o,table:i},l=e+a(n(t,r));if(navigator.userAgent.indexOf("Firefox")>-1)window.location.href=l;else{const e=document.createElement("a");let t;e.href=l,e.download=o||"",window.MouseEvent?t=new MouseEvent("click"):(t=document.createEvent("MouseEvents"),t.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null)),e.dispatchEvent(t)}}}(),s=(e,t,a)=>{const n={image:c,text:s};let i=e.reduce((e,t)=>(e+=`<th>${t.title}</th>`,e),"");i=`<thead><tr>${i}</tr></thead>`;let r=t.reduce((t,a)=>{const i=e.reduce((e,t)=>(e+=n[t.type||"text"](a[t.key],t),e),"");return t+=`<tr>${i}</tr>`,t},"");r=`<tbody>${r}</tbody>`;const l=i+r;function s(e){return`<td style="text-align: center">${e}</td>`}function c(e,t){return t=Object.assign({width:40,height:60},t),`<td style="width: ${t.width}px; height: ${t.height}px; text-align: center; vertical-align: middle"><img src="${e}" width=${t.width} height=${t.height}></td>`}o(l,a)};t["a"]=s},f32f:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-button",{attrs:{type:"primary"},on:{click:e.downTable}},[e._v("下载订单表格")]),a("div",{staticClass:"tableMag"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{id:"example",data:e.tableData,border:"",stripe:""}},[a("el-table-column",{attrs:{prop:"xdOrderno",label:"单号","min-width":"6%"}}),a("el-table-column",{attrs:{prop:"ProductImgUrl",label:"图片","min-width":"4%"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("a",{attrs:{href:e.row.ProductUrl,target:"_blank"}},[a("el-popover",{attrs:{placement:"right",width:"200",trigger:"hover",content:e.row.ProductTitle}},[a("img",{staticStyle:{width:"50px"},attrs:{slot:"reference",src:e.row.ProductImgUrl},slot:"reference"})])],1)]}}])}),a("el-table-column",{attrs:{prop:"realproductdj",label:"价格","min-width":"4%"}}),a("el-table-column",{attrs:{prop:"realxddate",label:"下单时间","min-width":"6%"}}),a("el-table-column",{attrs:{prop:"lpstate",label:"是否上评","min-width":"4%"},scopedSlots:e._u([{key:"default",fn:function(t){return["0"!=t.row.lpstate?a("p",[e._v("已留评")]):a("p",[e._v("未留评")])]}}])}),a("el-table-column",{attrs:{prop:"lpurl",label:"留评链接","min-width":"10%"}})],1)],1),a("Pagination",{staticClass:"pagination",attrs:{pagination:e.pagination},on:{search:e.search}})],1)},i=[],o=(a("ac1f"),a("841c"),a("333d")),r=a("6988"),l=[{title:"单号",key:"xdOrderno",type:"text"},{title:"图片",key:"ProductImgUrl",type:"image",widta:"100px",height:"100px"},{title:"价格",key:"realproductdj",type:"text"},{title:"下单时间",key:"realxddate",type:"text"},{title:"是否上评",key:"lpstate",type:"text"},{title:"留评链接",key:"lpurl",type:"text"}],s={name:"downloadTable",components:{Pagination:o["a"]},props:{orderno:{type:String,default:""}},data:function(){return{tableData:[],pagination:{total:0,size:500,current:1},loading:!0,neworderno:"",productTable:[]}},mounted:function(){this.neworderno=this.orderno,this.search()},methods:{search:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];0!=t.length&&("current"==t[0]?this.pagination.current=t[1]:"size"==t[0]&&(this.pagination.size=t[1])),this.loading=!0,this.axios.get("/Handler/CPManageSystem.ashx?cmd=getMJExportCPOrderDetailList",{params:{pageSize:this.pagination.size,pageNum:this.pagination.current-1,orderno:this.neworderno,sjs:"",sje:"",sjid:"-1"}}).then((function(t){e.pagination.total=t.data.results,e.tableData=t.data.rows,e.loading=!1})).catch((function(e){}))},downTable:function(){0==this.tableData.length?this.$message({type:"warning",message:"表格数据为空"}):Object(r["a"])(l,this.tableData,"订单表格数据.xls")}},watch:{orderno:function(e,t){this.neworderno=e,this.search()}}},c=s,d=a("2877"),h=Object(d["a"])(c,n,i,!1,null,null,null);t["default"]=h.exports}}]);