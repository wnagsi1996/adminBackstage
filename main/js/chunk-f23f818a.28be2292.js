(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f23f818a"],{"25f4":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.fromorder}},[a("el-form-item",{attrs:{label:"创建时间"}},[a("el-col",{attrs:{span:11}},[a("el-form-item",{attrs:{prop:"date1"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"开始时间"},model:{value:e.fromorder.date1,callback:function(t){e.$set(e.fromorder,"date1",t)},expression:"fromorder.date1"}})],1)],1),a("el-col",{staticClass:"line",attrs:{span:1}},[e._v("-")]),a("el-col",{attrs:{span:11}},[a("el-form-item",{attrs:{prop:"date2"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"datetime",placeholder:"结束时间"},model:{value:e.fromorder.date2,callback:function(t){e.$set(e.fromorder,"date2",t)},expression:"fromorder.date2"}})],1)],1)],1),a("el-form-item",[a("el-form-item",{attrs:{label:"订单类型"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.fromorder.orderType,callback:function(t){e.$set(e.fromorder,"orderType",t)},expression:"fromorder.orderType"}},[a("el-option",{attrs:{label:"全部",value:"-1"}}),a("el-option",{attrs:{label:"免评单",value:"0"}}),a("el-option",{attrs:{label:"留评单",value:"1"}})],1)],1),a("el-form-item",{attrs:{label:"客户",prop:"name"}},[a("el-select",{attrs:{filterable:"",remote:"",placeholder:"请输入关键词","remote-method":e.remoteMethod,loading:e.clearloading},model:{value:e.fromorder.name,callback:function(t){e.$set(e.fromorder,"name",t)},expression:"fromorder.name"}},e._l(e.sellerdata,(function(e){return a("el-option",{key:e.id,attrs:{label:e.cname,value:e.id}})})),1)],1)],1),a("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")])],1),a("el-button",{attrs:{type:"primary"},on:{click:e.downTable}},[e._v("下载订单表格")]),a("div",{staticClass:"tableMag"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{id:"example",data:e.tableData,border:"",stripe:""}},[a("el-table-column",{attrs:{prop:"xdOrderno",label:"单号","min-width":"6%"}}),a("el-table-column",{attrs:{prop:"ProductImgUrl",label:"图片","min-width":"4%"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{width:"50px"},attrs:{slot:"reference",src:e.row.ProductImgUrl},slot:"reference"})]}}])}),a("el-table-column",{attrs:{prop:"productdj",label:"产品价格","min-width":"4%"}}),a("el-table-column",{attrs:{prop:"realproductdj",label:"下单价格","min-width":"4%"}}),a("el-table-column",{attrs:{prop:"xddate",label:"下单时间","min-width":"6%"}}),a("el-table-column",{attrs:{prop:"ordertypetxt",label:"订单类型","min-width":"4%"}})],1)],1)],1)},o=[],l=(a("4160"),a("b0c0"),a("159b"),a("6988")),n=[{title:"单号",key:"xdOrderno",type:"text"},{title:"图片",key:"ProductImgUrl",type:"image",widta:"100px",height:"100px"},{title:"产品价格",key:"productdj",type:"text"},{title:"下单价格",key:"realproductdj",type:"text"},{title:"下单时间",key:"xddate",type:"text"},{title:"订单类型",key:"ordertypetxt",type:"text"}],i={name:"downloadTable",components:{},data:function(){return{tableData:[],loading:!1,clearloading:!1,neworderno:"",productTable:[],sellerdata:[],fromorder:{name:"",date1:"",date2:"",orderType:"-1"}}},mounted:function(){},methods:{search:function(){var e=this;this.loading=!0,this.axios.post("/Handler/CPManageSystem.ashx?cmd=getMJExportCPOrderDetailList_waitsh",this.qs.stringify({ordertype:this.fromorder.orderType,sjs:this.fromorder.date1,sje:this.fromorder.date2,sjid:this.fromorder.name})).then((function(t){var a=t.data.rows;a.forEach((function(e){"0"==e.ordertype?e.ordertypetxt="免评单":"1"==e.ordertype&&(e.ordertypetxt="留评单")})),e.tableData=a,e.loading=!1})).catch((function(e){}))},remoteMethod:function(e){var t=this;""!==e?(this.clearloading=!0,setTimeout((function(){t.axios.get("/Handler/CPManageSystem.ashx?cmd=getHzsjListBySjname&sjname="+e).then((function(e){""!=e.data&&(t.sellerdata=e.data,t.clearloading=!1)})).catch((function(e){}))}),200)):this.sellerdata=[]},downTable:function(){0==this.tableData.length?this.$message({type:"warning",message:"表格数据为空"}):Object(l["a"])(n,this.tableData,"订单表格数据.xls")}}},s=i,d=a("2877"),c=Object(d["a"])(s,r,o,!1,null,null,null);t["default"]=c.exports},6988:function(e,t,a){"use strict";let r;const o=()=>{let e=window.navigator.userAgent;return e.indexOf("MSIE")>=0?"ie":e.indexOf("Firefox")>=0?"Firefox":e.indexOf("Chrome")>=0?"Chrome":e.indexOf("Opera")>=0?"Opera":e.indexOf("Safari")>=0?"Safari":void 0},l=(e,t)=>{"ie"==o()?n(e,t):i(e,t)},n=(e,t)=>{let a=e,o=new ActiveXObject("Excel.Application"),l=o.Workbooks.Add(),n=l.Worksheets(1),i=document.body.createTextRange();i.moveToElementText(a),i.select,i.execCommand("Copy"),n.Paste(),o.Visible=!0;try{let e=o.Application.GetSaveAsFilename("Excel.xls","Excel Spreadsheets (*.xls), *.xls")}catch(s){print("Nested catch caught "+s)}finally{l.SaveAs(e),l.Close(savechanges=!1),o.Quit(),o=null,window.setInterval("Cleanup();",1),r=window.setInterval("Cleanup();",1)}},i=function(){const e="data:application/vnd.ms-excel;base64,",t='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e</head><body><table>{table}</table></body></html>',a=function(e){return window.btoa(unescape(encodeURIComponent(e)))},r=(e,t)=>e.replace(/{(\w+)}/g,(e,a)=>t[a]);return(o,l)=>{const n={worksheet:l,table:o},i=e+a(r(t,n));if(navigator.userAgent.indexOf("Firefox")>-1)window.location.href=i;else{const e=document.createElement("a");let t;e.href=i,e.download=l||"",window.MouseEvent?t=new MouseEvent("click"):(t=document.createEvent("MouseEvents"),t.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null)),e.dispatchEvent(t)}}}(),s=(e,t,a)=>{const r={image:d,text:s};let o=e.reduce((e,t)=>(e+=`<th>${t.title}</th>`,e),"");o=`<thead><tr>${o}</tr></thead>`;let n=t.reduce((t,a)=>{const o=e.reduce((e,t)=>(e+=r[t.type||"text"](a[t.key],t),e),"");return t+=`<tr>${o}</tr>`,t},"");n=`<tbody>${n}</tbody>`;const i=o+n;function s(e){return`<td style="text-align: center">${e}</td>`}function d(e,t){return t=Object.assign({width:40,height:60},t),`<td style="width: ${t.width}px; height: ${t.height}px; text-align: center; vertical-align: middle"><img src="${e}" width=${t.width} height=${t.height}></td>`}l(i,a)};t["a"]=s}}]);