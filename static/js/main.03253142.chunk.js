(this["webpackJsonpgithub-repo"]=this["webpackJsonpgithub-repo"]||[]).push([[0],{138:function(e,t,o){e.exports={common:o(232)("./".concat("prod","/common.json"))}},232:function(e,t,o){var n={"./dev/common.json":233,"./prod/common.json":234};function r(e){var t=i(e);return o(t)}function i(e){if(!o.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=i,e.exports=r,r.id=232},233:function(e){e.exports=JSON.parse('{"api_proxy_uri":"https://api.github.com"}')},234:function(e){e.exports=JSON.parse('{"api_proxy_uri":"https://api.github.com"}')},236:function(e,t,o){"use strict";o.r(t);var n,r=o(35),i=o(5),a=o(0),c=o(18),s=o(9),l=o(146),u=o(269),p=o(144),d=o(276),f=o(268),b=o(34),j=o(59),m=o(117),h=o(143),O=o(15),g=o(135),E=o(270),x=o(130),v=o(31),y=o(275),R=o(45),C=o(33),N=o(76),D=o(57),I=o(147),T=o(110),_=o.n(T),w=o(139),M=o.n(w),S=o(58),L=o.n(S),F=o(140),A=function(e){if(!e||!e.epics)return[];var t=M()(Object.entries(e).filter((function(e){var t=Object(D.a)(e,1)[0];return"default"!==t&&"epics"!==t})).filter((function(e){var t=Object(D.a)(e,2)[1];return t&&t.type})).map((function(e){var t=Object(D.a)(e,2);return[t[0],t[1].type]})));return Object.entries(e.epics).map((function(e){var o=Object(D.a)(e,2),n=o[0],r=o[1];return n.endsWith("Epic")?r:function(e,o){return e.pipe(Object(I.a)(t[n]),Object(F.a)((function(t){return r(e,o,t)})))}}))},k=y.a.apply(void 0,Object(r.a)((n=[R,C,N],L()(n)?[]:_()(n.map(A))))),U=Object(v.a)(),B=Object(E.a)(),V=function(){console.warn("React app flavor is setting at: prod");var e,t=Object(O.createStore)((e=U,Object(O.combineReducers)({router:Object(j.b)(e),error:R.default,notification:C.default,search:N.default})),Object(g.composeWithDevTools)({trace:!1})(Object(O.applyMiddleware)(Object(x.a)(U),B)));return B.run(k),t},W=o(66),q=o(16),H=o(277),P=o(272),X=function(e){return Object(i.jsx)(P.a,Object(q.a)({elevation:6,variant:"filled"},e))},Y=function(){var e=Object(b.d)(),t=Object(b.e)((function(e){return e.notification.open})),o=Object(b.e)((function(e){return e.notification.queue})),n=function(){e(Object(C.closeNotification)())};return Object(i.jsx)(H.a,{open:t,autoHideDuration:6e3,onClose:n,onExited:function(){e(Object(C.processNotification)())},anchorOrigin:{vertical:"top",horizontal:"right"},children:Object(i.jsx)(X,{onClose:n,severity:"success",children:o.length&&o[0].message})})},J=o(115),z=o.n(J),G=o(267),K=function(e){var t=e.message,o=e.className,n=e.style;return Object(i.jsxs)("div",{className:z()("d-flex flex-column justify-center align-center vh-100",o),style:n,children:[Object(i.jsx)(G.a,{}),t&&Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("br",{}),Object(i.jsx)("p",{children:t})]})]})},Q=Object(a.lazy)((function(){return Promise.all([o.e(3),o.e(5)]).then(o.bind(null,356))})),Z=Object(a.lazy)((function(){return o.e(4).then(o.bind(null,357))})),$=function(){return Object(i.jsxs)(a.Suspense,{fallback:Object(i.jsx)(K,{message:"Loading..."}),children:[Object(i.jsx)(Y,{}),Object(i.jsxs)(W.c,{children:[Object(i.jsx)(W.a,{path:"".concat("/github-repo"),component:Q}),Object(i.jsx)(W.a,{path:"".concat("/github-repo","/error"),component:Z})]})]})};m.b.add(h.a);var ee,te=V(),oe=function(){return Object(i.jsx)(b.a,{store:te,children:Object(i.jsx)(j.a,{history:U,children:Object(i.jsx)($,{})})})},ne={palette:{primary:{main:"#005585"},secondary:{main:"#e50658"},error:{main:"#FF3B30"},background:{default:"#bdced8"},link:{main:"#11456C"},action:{hover:"#b3ccda",selected:"#e0ebf0"}}},re=function(e){return{".color-white":{color:"#ffffff"},".color-black":{color:"#000000"},".color-primary":{color:e.palette.primary.main},".color-error":{color:e.palette.error.main},".color-success":{color:e.palette.success.main},".color-warning":{color:e.palette.warning.main},".color-info":{color:e.palette.info.main},".color-text-primary":{color:e.palette.text.primary},".color-text-secondary":{color:e.palette.text.secondary}}},ie={".d-none":{display:"none"},".d-inline":{display:"inline"},".d-inline-block":{display:"inline-block"},".d-inline-flex":{display:"inline-flex"},".d-block":{display:"block"},".d-flex":{display:"flex"}},ae={".flex-row":{flexDirection:"row"},".flex-row-rev":{flexDirection:"row-reverse"},".flex-column":{flexDirection:"column"},".flex-column-rev":{flexDirection:"column-reverse"},".justify-start":{justifyContent:"flex-start"},".justify-end":{justifyContent:"flex-end"},".justify-center":{justifyContent:"center"},".justify-space-between":{justifyContent:"space-between"},".justify-space-around":{justifyContent:"space-around"},".justify-space-evenly":{justifyContent:"space-evenly"},".justify-row":{justifyContent:"row"},".align-start":{alignItems:"flex-start"},".align-end":{alignItems:"flex-end"},".align-center":{alignItems:"center"},".align-stretch":{alignItems:"stretch"},".align-baseline":{alignItems:"baseline"},".align-self-start":{alignSelf:"flex-start"},".align-self-end":{alignSelf:"flex-end"},".align-self-center":{alignSelf:"center"},".align-self-stretch":{alignSelf:"stretch"},".align-self-baseline":{alignSelf:"baseline"},".flex-nowrap":{flexWrap:"nowrap"},".flex-wrap":{flexWrap:"wrap"},".flex-wrap-reverse":{flexWrap:"wrap-reverse"},".flex-shrink-0":{flexShrink:0}},ce={".position-static":{position:"static"},".position-relative":{position:"relative"},".position-absolute":{position:"absolute"},".position-fixed":{position:"fixed"},".position-sticky":{position:"sticky"}},se={".w-100":{width:"100%"},".h-100":{height:"100%"},".vw-100":{width:"100vw"},".vh-100":{height:"100vh"},".min-w-100":{minWidth:"100%"},".min-h-100":{minHeight:"100%"},".min-vw-100":{minWidth:"100vw"},".min-vh-100":{minHeight:"100vh"},".max-w-100":{maxWidth:"100%"},".max-h-100":{maxHeight:"100%"},".max-vw-100":{maxWidth:"100vw"},".max-vh-100":{maxHeight:"100vh"}},le=o(24),ue={m:"margin",p:"padding"},pe={t:"Top",b:"Bottom",l:"Left",r:"Right"},de=function(e){var t={},o=["t","b","l","r","x","y","a"],n=[].concat(Object(r.a)(new Array(20).fill().map((function(e,t){return-t/2}))),Object(r.a)(new Array(20).fill().map((function(e,t){return t/2}))));return["m","p"].forEach((function(r){o.forEach((function(o){n.forEach((function(n){var i;switch(o){case"x":var a,c=ue[r];a={},Object(le.a)(a,"".concat(c,"Left"),e.spacing(n)),Object(le.a)(a,"".concat(c,"Right"),e.spacing(n)),i=a;break;case"y":var s,l=ue[r];s={},Object(le.a)(s,"".concat(l,"Top"),e.spacing(n)),Object(le.a)(s,"".concat(l,"Bottom"),e.spacing(n)),i=s;break;case"a":var u,p=ue[r];u={},Object(le.a)(u,"".concat(p,"Top"),e.spacing(n)),Object(le.a)(u,"".concat(p,"Bottom"),e.spacing(n)),Object(le.a)(u,"".concat(p,"Left"),e.spacing(n)),Object(le.a)(u,"".concat(p,"Right"),e.spacing(n)),i=u;break;default:var d="".concat(ue[r]).concat(pe[o]);i=Object(le.a)({},d,e.spacing(n))}var f=".".concat(r).concat(o,"-").concat(n.toString().replace("-","n").replace(".","_"));t[f]=i}))}))})),t},fe={".text-center":{textAlign:"center"},".text-left":{textAlign:"left"},".text-right":{textAlign:"right"},".text-truncate":{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},".text-bold":{fontWeight:500}},be=Object(p.a)(ne),je=Object(s.b)({plugins:Object(r.a)(Object(l.a)().plugins)});je.createStyleSheet((ee=be,{"@global":Object(q.a)(Object(q.a)(Object(q.a)(Object(q.a)(Object(q.a)(Object(q.a)(Object(q.a)({html:{height:"100%",overflow:"hidden"},body:{height:"100%",fontFamily:"Roboto, Noto Sans TC, sans-serif","-webkit-font-smoothing":"antialiased"},"#root":{height:"100%"},"h1, h2, h3, h4, h5, h6, p":{margin:0,padding:0},a:{display:"inline-block",textDecoration:"none",color:"inherit"},button:{outline:"none",border:"none"}},ie),ae),ce),se),fe),re(ee)),de(ee))}),{meta:"global"}).attach();var me=document.getElementById("root");me&&Object(c.render)(Object(i.jsx)(d.b,{jss:je,children:Object(i.jsxs)(f.a,{theme:be,children:[Object(i.jsx)(u.a,{}),Object(i.jsx)(oe,{})]})}),me)},27:function(e,t,o){"use strict";o.d(t,"d",(function(){return n})),o.d(t,"c",(function(){return r})),o.d(t,"b",(function(){return i})),o.d(t,"a",(function(){return a})),o.d(t,"e",(function(){return c}));var n="q",r="per_page",i="page",a="error",c="success"},33:function(e,t,o){"use strict";o.r(t),o.d(t,"closeNotification",(function(){return s})),o.d(t,"addNotification",(function(){return l})),o.d(t,"processNotification",(function(){return u}));var n=o(16),r=o(35),i=o(49),a=Object(i.a)({name:"notification",initialState:{open:!1,queue:[]},reducers:{closeNotification:function(e,t){e.open=!1},addNotification:function(e,t){var o=t.payload.notification;e.open=!0,e.queue=[].concat(Object(r.a)(e.queue),[o])},processNotification:function(e,t){return e.queue.length>1?Object(n.a)(Object(n.a)({},e),{},{open:!0,queue:e.queue.slice(1)}):Object(n.a)(Object(n.a)({},e),{},{open:!1,queue:[]})}}}),c=a.actions,s=c.closeNotification,l=c.addNotification,u=c.processNotification;t.default=a.reducer},44:function(e,t,o){"use strict";o.d(t,"b",(function(){return n})),o.d(t,"c",(function(){return r})),o.d(t,"d",(function(){return i})),o.d(t,"e",(function(){return a})),o.d(t,"a",(function(){return c}));var n=15,r=["id","full_name","description","updated_at","html_url","homepage","language","forks","watchers"],i="yyyy\u5e74M\u6708d\u65e5 HH:mm:ss",a=500,c={root:null,rootMargin:"0px",threshold:1}},45:function(e,t,o){"use strict";o.r(t),o.d(t,"addError",(function(){return p})),o.d(t,"removeError",(function(){return d})),o.d(t,"epics",(function(){return f}));var n=o(136),r=o(49),i={UNPROCESSABLE_ENTITY:"Unprocessable Entity",RATE_LIMIT_EXCEEDED:"rate limit exceeded",NOT_MODIFIED:"Not Modified",FORBIDDEN:"Forbidden",SERVICE_UNAVAILABLE:"Service Unavailable",NOT_FOUND:"Not Found",messageToEnum:{"Unprocessable Entity":"UNPROCESSABLE_ENTITY","rate limit exceeded":"RATE_LIMIT_EXCEEDED","Not Modified":"NOT_MODIFIED",Forbidden:"FORBIDDEN","Service Unavailable":"SERVICE_UNAVAILABLE","Not Found":"NOT_FOUND"},mapCustomErrorCode:{UNPROCESSABLE_ENTITY:422,RATE_LIMIT_EXCEEDED:403,NOT_MODIFIED:304,FORBIDDEN:403,SERVICE_UNAVAILABLE:503,NOT_FOUND:404},customErrorMessage:{UNPROCESSABLE_ENTITY:"\u8acb\u8f38\u5165\u6b63\u78ba\u7684\u95dc\u9375\u5b57\u641c\u5c0b",RATE_LIMIT_EXCEEDED:"\u641c\u5c0b\u6b21\u6578\u8d85\u904e Rate limit\uff0c\u8acb\u7a0d\u5f8c\u518d\u8a66",SERVER_ERROR:"\u767c\u751f\u932f\u8aa4\uff0c\u8acb\u7a0d\u5f8c\u518d\u8a66"}},a=o(27),c=o(33),s={type:"",message:""},l=Object(r.a)({name:"error",initialState:s,reducers:{addError:function(e,t){var o=t.payload,n=o.status,r=o.statusText;return r===i.UNPROCESSABLE_ENTITY&&n===i.mapCustomErrorCode.UNPROCESSABLE_ENTITY||r===i.RATE_LIMIT_EXCEEDED&&n===i.mapCustomErrorCode.RATE_LIMIT_EXCEEDED?{type:a.a,message:i.customErrorMessage[i.messageToEnum[r]]}:r===i.NOT_MODIFIED&&n===i.mapCustomErrorCode.NOT_MODIFIED||r===i.FORBIDDEN&&n===i.mapCustomErrorCode.FORBIDDEN||r===i.SERVICE_UNAVAILABLE&&n===i.mapCustomErrorCode.SERVICE_UNAVAILABLE||r===i.NOT_FOUND&&n===i.mapCustomErrorCode.NOT_FOUND?{type:a.a,message:i.customErrorMessage.SERVER_ERROR}:void 0},removeError:function(){return s}}}),u=l.actions,p=u.addError,d=u.removeError,f={addError:function(e,t,o){var r=t.value.error.type,i=t.value.error.message;return Object(n.a)(Object(c.addNotification)({notification:{severity:r,message:i}}))}};t.default=l.reducer},76:function(e,t,o){"use strict";o.r(t),o.d(t,"searchRepositories",(function(){return I})),o.d(t,"searchRepositoriesFulfilled",(function(){return T})),o.d(t,"searchRepositoriesRejected",(function(){return _})),o.d(t,"searchRepositoriesCancelled",(function(){return w})),o.d(t,"loadMoreRepositories",(function(){return M})),o.d(t,"loadMoreRepositoriesFulfilled",(function(){return S})),o.d(t,"loadMoreRepositoriesRejected",(function(){return L})),o.d(t,"loadMoreRepositoriesCancelled",(function(){return F})),o.d(t,"epics",(function(){return A}));var n={};o.r(n),o.d(n,"searchRepositories",(function(){return y}));var r=o(147),i=o(137),a=o.n(i),c=o(65),s=o.n(c),l=o(58),u=o.n(l),p=o(111),d=o.n(p),f=o(136),b=o(92),j=o(261),m=o(262),h=o(49),O=o(16),g=o(278),E=o(138),x=o(44),v=o(27),y=function(e){var t=e.inputValue,o=e.page,n="/search/repositories";return n="".concat(n,"?").concat(v.d,"=").concat(t),o&&(n="".concat(n,"&").concat(v.b,"=").concat(o)),n="".concat(n,"&").concat(v.c,"=").concat(x.b),Object(g.a)({method:"GET",url:E.common.api_proxy_uri+"".concat(n),headers:{Accept:"application/vnd.github.v3+json","Content-Type":"Application/json"}})},R=Object(O.a)({},n),C=o(45),N=Object(h.a)({name:"search",initialState:{inputValue:"",page:1,totalCount:0,items:[],isLoadingFromSearch:!1,isLoadingFromLoadMore:!1,isMoreData:!1,lockingCode:0},reducers:{searchRepositories:function(e,t){var o=t.payload.inputValue;e.inputValue=o,e.page=1,e.totalCount=0,e.items=[],e.isLoadingFromSearch=!0,e.isMoreData=!1,e.lockingCode=0},searchRepositoriesFulfilled:function(e,t){var o=t.payload.response;if(!u()(o)){var n=o.total_count,r=o.items;e.totalCount=n,e.items=r.map((function(e){return d()(e,x.c)})),e.isMoreData=n>x.b}e.isLoadingFromSearch=!1},searchRepositoriesRejected:function(e,t){e.isLoadingFromSearch=!1},searchRepositoriesCancelled:function(e,t){e.isLoadingFromSearch=!1},loadMoreRepositories:function(e,t){e.page=e.page+1,e.lockingCode=e.lockingCode+1,e.isLoadingFromLoadMore=!0},loadMoreRepositoriesFulfilled:function(e,t){var o=t.payload.response;if(u()(o))e.page=e.page-1;else{var n=o.items;e.items=a()(e.items,n.map((function(e){return d()(e,x.c)}))),e.isMoreData=e.totalCount>(e.page-1)*x.b+n.length}e.lockingCode=e.lockingCode-1,e.isLoadingFromLoadMore=!1},loadMoreRepositoriesRejected:function(e,t){e.page=e.page-1,e.lockingCode=e.lockingCode-1,e.isLoadingFromLoadMore=!1},loadMoreRepositoriesCancelled:function(e,t){e.page=e.page-1,e.lockingCode=e.lockingCode-1,e.isLoadingFromLoadMore=!1}}}),D=N.actions,I=D.searchRepositories,T=D.searchRepositoriesFulfilled,_=D.searchRepositoriesRejected,w=D.searchRepositoriesCancelled,M=D.loadMoreRepositories,S=D.loadMoreRepositoriesFulfilled,L=D.loadMoreRepositoriesRejected,F=D.loadMoreRepositoriesCancelled,A={searchRepositories:function(e,t,o){var n=o.payload,i=n.inputValue,a=n.page;return i?R.searchRepositories({inputValue:i,page:a}).pipe(Object(b.a)((function(e){return T(e)})),Object(j.a)((function(e){return Object(f.a)(_({type:o.type,error:e}))})),Object(m.a)(e.pipe(Object(r.a)(w.type)))):Object(f.a)(_({type:o.type}))},searchRepositoriesRejected:function(e,t,o){var n=o.payload.error;return Object(f.a)(Object(C.addError)({status:s()(n,"xhr.status"),statusText:s()(n,"xhr.statusText")}))},loadMoreRepositories:function(e,t,o){var n=t.value.search.inputValue,i=t.value.search.page,a=t.value.search.isMoreData,c=t.value.search.lockingCode;return n&&a?c>1?Object(f.a)(L({type:o.type})):R.searchRepositories({inputValue:n,page:i}).pipe(Object(b.a)((function(e){return S(e)})),Object(j.a)((function(e){return Object(f.a)(L({type:o.type,error:e}))})),Object(m.a)(e.pipe(Object(r.a)(F.type)))):Object(f.a)(L({type:o.type}))},loadMoreRepositoriesRejected:function(e,t,o){var n=o.payload.error;return Object(f.a)(Object(C.addError)({status:s()(n,"xhr.status"),statusText:s()(n,"xhr.statusText")}))}};t.default=N.reducer}},[[236,1,2]]]);
//# sourceMappingURL=main.03253142.chunk.js.map