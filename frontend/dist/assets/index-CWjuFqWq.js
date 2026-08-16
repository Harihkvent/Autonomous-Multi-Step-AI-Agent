(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const u of o)if(u.type==="childList")for(const h of u.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function t(o){const u={};return o.integrity&&(u.integrity=o.integrity),o.referrerPolicy&&(u.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?u.credentials="include":o.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(o){if(o.ep)return;o.ep=!0;const u=t(o);fetch(o.href,u)}})();function Cy(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Gh={exports:{}},Aa={},Qh={exports:{}},Re={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $m;function lw(){if($m)return Re;$m=1;var r=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),h=Symbol.for("react.context"),m=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),_=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),R=Symbol.iterator;function b(O){return O===null||typeof O!="object"?null:(O=R&&O[R]||O["@@iterator"],typeof O=="function"?O:null)}var z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Z=Object.assign,Q={};function G(O,$,_e){this.props=O,this.context=$,this.refs=Q,this.updater=_e||z}G.prototype.isReactComponent={},G.prototype.setState=function(O,$){if(typeof O!="object"&&typeof O!="function"&&O!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,O,$,"setState")},G.prototype.forceUpdate=function(O){this.updater.enqueueForceUpdate(this,O,"forceUpdate")};function ye(){}ye.prototype=G.prototype;function Ee(O,$,_e){this.props=O,this.context=$,this.refs=Q,this.updater=_e||z}var Ce=Ee.prototype=new ye;Ce.constructor=Ee,Z(Ce,G.prototype),Ce.isPureReactComponent=!0;var Fe=Array.isArray,je=Object.prototype.hasOwnProperty,De={current:null},N={key:!0,ref:!0,__self:!0,__source:!0};function S(O,$,_e){var ue,Ie={},Se=null,Be=null;if($!=null)for(ue in $.ref!==void 0&&(Be=$.ref),$.key!==void 0&&(Se=""+$.key),$)je.call($,ue)&&!N.hasOwnProperty(ue)&&(Ie[ue]=$[ue]);var Le=arguments.length-2;if(Le===1)Ie.children=_e;else if(1<Le){for(var qe=Array(Le),jt=0;jt<Le;jt++)qe[jt]=arguments[jt+2];Ie.children=qe}if(O&&O.defaultProps)for(ue in Le=O.defaultProps,Le)Ie[ue]===void 0&&(Ie[ue]=Le[ue]);return{$$typeof:r,type:O,key:Se,ref:Be,props:Ie,_owner:De.current}}function C(O,$){return{$$typeof:r,type:O.type,key:$,ref:O.ref,props:O.props,_owner:O._owner}}function D(O){return typeof O=="object"&&O!==null&&O.$$typeof===r}function A(O){var $={"=":"=0",":":"=2"};return"$"+O.replace(/[=:]/g,function(_e){return $[_e]})}var V=/\/+/g;function T(O,$){return typeof O=="object"&&O!==null&&O.key!=null?A(""+O.key):$.toString(36)}function fe(O,$,_e,ue,Ie){var Se=typeof O;(Se==="undefined"||Se==="boolean")&&(O=null);var Be=!1;if(O===null)Be=!0;else switch(Se){case"string":case"number":Be=!0;break;case"object":switch(O.$$typeof){case r:case e:Be=!0}}if(Be)return Be=O,Ie=Ie(Be),O=ue===""?"."+T(Be,0):ue,Fe(Ie)?(_e="",O!=null&&(_e=O.replace(V,"$&/")+"/"),fe(Ie,$,_e,"",function(jt){return jt})):Ie!=null&&(D(Ie)&&(Ie=C(Ie,_e+(!Ie.key||Be&&Be.key===Ie.key?"":(""+Ie.key).replace(V,"$&/")+"/")+O)),$.push(Ie)),1;if(Be=0,ue=ue===""?".":ue+":",Fe(O))for(var Le=0;Le<O.length;Le++){Se=O[Le];var qe=ue+T(Se,Le);Be+=fe(Se,$,_e,qe,Ie)}else if(qe=b(O),typeof qe=="function")for(O=qe.call(O),Le=0;!(Se=O.next()).done;)Se=Se.value,qe=ue+T(Se,Le++),Be+=fe(Se,$,_e,qe,Ie);else if(Se==="object")throw $=String(O),Error("Objects are not valid as a React child (found: "+($==="[object Object]"?"object with keys {"+Object.keys(O).join(", ")+"}":$)+"). If you meant to render a collection of children, use an array instead.");return Be}function ze(O,$,_e){if(O==null)return O;var ue=[],Ie=0;return fe(O,ue,"","",function(Se){return $.call(_e,Se,Ie++)}),ue}function Oe(O){if(O._status===-1){var $=O._result;$=$(),$.then(function(_e){(O._status===0||O._status===-1)&&(O._status=1,O._result=_e)},function(_e){(O._status===0||O._status===-1)&&(O._status=2,O._result=_e)}),O._status===-1&&(O._status=0,O._result=$)}if(O._status===1)return O._result.default;throw O._result}var Ae={current:null},J={transition:null},ae={ReactCurrentDispatcher:Ae,ReactCurrentBatchConfig:J,ReactCurrentOwner:De};function ee(){throw Error("act(...) is not supported in production builds of React.")}return Re.Children={map:ze,forEach:function(O,$,_e){ze(O,function(){$.apply(this,arguments)},_e)},count:function(O){var $=0;return ze(O,function(){$++}),$},toArray:function(O){return ze(O,function($){return $})||[]},only:function(O){if(!D(O))throw Error("React.Children.only expected to receive a single React element child.");return O}},Re.Component=G,Re.Fragment=t,Re.Profiler=o,Re.PureComponent=Ee,Re.StrictMode=s,Re.Suspense=g,Re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ae,Re.act=ee,Re.cloneElement=function(O,$,_e){if(O==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+O+".");var ue=Z({},O.props),Ie=O.key,Se=O.ref,Be=O._owner;if($!=null){if($.ref!==void 0&&(Se=$.ref,Be=De.current),$.key!==void 0&&(Ie=""+$.key),O.type&&O.type.defaultProps)var Le=O.type.defaultProps;for(qe in $)je.call($,qe)&&!N.hasOwnProperty(qe)&&(ue[qe]=$[qe]===void 0&&Le!==void 0?Le[qe]:$[qe])}var qe=arguments.length-2;if(qe===1)ue.children=_e;else if(1<qe){Le=Array(qe);for(var jt=0;jt<qe;jt++)Le[jt]=arguments[jt+2];ue.children=Le}return{$$typeof:r,type:O.type,key:Ie,ref:Se,props:ue,_owner:Be}},Re.createContext=function(O){return O={$$typeof:h,_currentValue:O,_currentValue2:O,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},O.Provider={$$typeof:u,_context:O},O.Consumer=O},Re.createElement=S,Re.createFactory=function(O){var $=S.bind(null,O);return $.type=O,$},Re.createRef=function(){return{current:null}},Re.forwardRef=function(O){return{$$typeof:m,render:O}},Re.isValidElement=D,Re.lazy=function(O){return{$$typeof:w,_payload:{_status:-1,_result:O},_init:Oe}},Re.memo=function(O,$){return{$$typeof:_,type:O,compare:$===void 0?null:$}},Re.startTransition=function(O){var $=J.transition;J.transition={};try{O()}finally{J.transition=$}},Re.unstable_act=ee,Re.useCallback=function(O,$){return Ae.current.useCallback(O,$)},Re.useContext=function(O){return Ae.current.useContext(O)},Re.useDebugValue=function(){},Re.useDeferredValue=function(O){return Ae.current.useDeferredValue(O)},Re.useEffect=function(O,$){return Ae.current.useEffect(O,$)},Re.useId=function(){return Ae.current.useId()},Re.useImperativeHandle=function(O,$,_e){return Ae.current.useImperativeHandle(O,$,_e)},Re.useInsertionEffect=function(O,$){return Ae.current.useInsertionEffect(O,$)},Re.useLayoutEffect=function(O,$){return Ae.current.useLayoutEffect(O,$)},Re.useMemo=function(O,$){return Ae.current.useMemo(O,$)},Re.useReducer=function(O,$,_e){return Ae.current.useReducer(O,$,_e)},Re.useRef=function(O){return Ae.current.useRef(O)},Re.useState=function(O){return Ae.current.useState(O)},Re.useSyncExternalStore=function(O,$,_e){return Ae.current.useSyncExternalStore(O,$,_e)},Re.useTransition=function(){return Ae.current.useTransition()},Re.version="18.3.1",Re}var Wm;function zd(){return Wm||(Wm=1,Qh.exports=lw()),Qh.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hm;function uw(){if(Hm)return Aa;Hm=1;var r=zd(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function h(m,g,_){var w,R={},b=null,z=null;_!==void 0&&(b=""+_),g.key!==void 0&&(b=""+g.key),g.ref!==void 0&&(z=g.ref);for(w in g)s.call(g,w)&&!u.hasOwnProperty(w)&&(R[w]=g[w]);if(m&&m.defaultProps)for(w in g=m.defaultProps,g)R[w]===void 0&&(R[w]=g[w]);return{$$typeof:e,type:m,key:b,ref:z,props:R,_owner:o.current}}return Aa.Fragment=t,Aa.jsx=h,Aa.jsxs=h,Aa}var qm;function cw(){return qm||(qm=1,Gh.exports=uw()),Gh.exports}var P=cw(),He=zd();const hw=Cy(He);var Su={},Yh={exports:{}},Qt={},Jh={exports:{}},Xh={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Km;function dw(){return Km||(Km=1,(function(r){function e(J,ae){var ee=J.length;J.push(ae);e:for(;0<ee;){var O=ee-1>>>1,$=J[O];if(0<o($,ae))J[O]=ae,J[ee]=$,ee=O;else break e}}function t(J){return J.length===0?null:J[0]}function s(J){if(J.length===0)return null;var ae=J[0],ee=J.pop();if(ee!==ae){J[0]=ee;e:for(var O=0,$=J.length,_e=$>>>1;O<_e;){var ue=2*(O+1)-1,Ie=J[ue],Se=ue+1,Be=J[Se];if(0>o(Ie,ee))Se<$&&0>o(Be,Ie)?(J[O]=Be,J[Se]=ee,O=Se):(J[O]=Ie,J[ue]=ee,O=ue);else if(Se<$&&0>o(Be,ee))J[O]=Be,J[Se]=ee,O=Se;else break e}}return ae}function o(J,ae){var ee=J.sortIndex-ae.sortIndex;return ee!==0?ee:J.id-ae.id}if(typeof performance=="object"&&typeof performance.now=="function"){var u=performance;r.unstable_now=function(){return u.now()}}else{var h=Date,m=h.now();r.unstable_now=function(){return h.now()-m}}var g=[],_=[],w=1,R=null,b=3,z=!1,Z=!1,Q=!1,G=typeof setTimeout=="function"?setTimeout:null,ye=typeof clearTimeout=="function"?clearTimeout:null,Ee=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Ce(J){for(var ae=t(_);ae!==null;){if(ae.callback===null)s(_);else if(ae.startTime<=J)s(_),ae.sortIndex=ae.expirationTime,e(g,ae);else break;ae=t(_)}}function Fe(J){if(Q=!1,Ce(J),!Z)if(t(g)!==null)Z=!0,Oe(je);else{var ae=t(_);ae!==null&&Ae(Fe,ae.startTime-J)}}function je(J,ae){Z=!1,Q&&(Q=!1,ye(S),S=-1),z=!0;var ee=b;try{for(Ce(ae),R=t(g);R!==null&&(!(R.expirationTime>ae)||J&&!A());){var O=R.callback;if(typeof O=="function"){R.callback=null,b=R.priorityLevel;var $=O(R.expirationTime<=ae);ae=r.unstable_now(),typeof $=="function"?R.callback=$:R===t(g)&&s(g),Ce(ae)}else s(g);R=t(g)}if(R!==null)var _e=!0;else{var ue=t(_);ue!==null&&Ae(Fe,ue.startTime-ae),_e=!1}return _e}finally{R=null,b=ee,z=!1}}var De=!1,N=null,S=-1,C=5,D=-1;function A(){return!(r.unstable_now()-D<C)}function V(){if(N!==null){var J=r.unstable_now();D=J;var ae=!0;try{ae=N(!0,J)}finally{ae?T():(De=!1,N=null)}}else De=!1}var T;if(typeof Ee=="function")T=function(){Ee(V)};else if(typeof MessageChannel<"u"){var fe=new MessageChannel,ze=fe.port2;fe.port1.onmessage=V,T=function(){ze.postMessage(null)}}else T=function(){G(V,0)};function Oe(J){N=J,De||(De=!0,T())}function Ae(J,ae){S=G(function(){J(r.unstable_now())},ae)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(J){J.callback=null},r.unstable_continueExecution=function(){Z||z||(Z=!0,Oe(je))},r.unstable_forceFrameRate=function(J){0>J||125<J?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<J?Math.floor(1e3/J):5},r.unstable_getCurrentPriorityLevel=function(){return b},r.unstable_getFirstCallbackNode=function(){return t(g)},r.unstable_next=function(J){switch(b){case 1:case 2:case 3:var ae=3;break;default:ae=b}var ee=b;b=ae;try{return J()}finally{b=ee}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(J,ae){switch(J){case 1:case 2:case 3:case 4:case 5:break;default:J=3}var ee=b;b=J;try{return ae()}finally{b=ee}},r.unstable_scheduleCallback=function(J,ae,ee){var O=r.unstable_now();switch(typeof ee=="object"&&ee!==null?(ee=ee.delay,ee=typeof ee=="number"&&0<ee?O+ee:O):ee=O,J){case 1:var $=-1;break;case 2:$=250;break;case 5:$=1073741823;break;case 4:$=1e4;break;default:$=5e3}return $=ee+$,J={id:w++,callback:ae,priorityLevel:J,startTime:ee,expirationTime:$,sortIndex:-1},ee>O?(J.sortIndex=ee,e(_,J),t(g)===null&&J===t(_)&&(Q?(ye(S),S=-1):Q=!0,Ae(Fe,ee-O))):(J.sortIndex=$,e(g,J),Z||z||(Z=!0,Oe(je))),J},r.unstable_shouldYield=A,r.unstable_wrapCallback=function(J){var ae=b;return function(){var ee=b;b=ae;try{return J.apply(this,arguments)}finally{b=ee}}}})(Xh)),Xh}var Gm;function fw(){return Gm||(Gm=1,Jh.exports=dw()),Jh.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qm;function pw(){if(Qm)return Qt;Qm=1;var r=zd(),e=fw();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,a=1;a<arguments.length;a++)i+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,o={};function u(n,i){h(n,i),h(n+"Capture",i)}function h(n,i){for(o[n]=i,n=0;n<i.length;n++)s.add(i[n])}var m=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),g=Object.prototype.hasOwnProperty,_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,w={},R={};function b(n){return g.call(R,n)?!0:g.call(w,n)?!1:_.test(n)?R[n]=!0:(w[n]=!0,!1)}function z(n,i,a,c){if(a!==null&&a.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function Z(n,i,a,c){if(i===null||typeof i>"u"||z(n,i,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function Q(n,i,a,c,d,f,v){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=a,this.propertyName=n,this.type=i,this.sanitizeURL=f,this.removeEmptyString=v}var G={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){G[n]=new Q(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];G[i]=new Q(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){G[n]=new Q(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){G[n]=new Q(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){G[n]=new Q(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){G[n]=new Q(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){G[n]=new Q(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){G[n]=new Q(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){G[n]=new Q(n,5,!1,n.toLowerCase(),null,!1,!1)});var ye=/[\-:]([a-z])/g;function Ee(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(ye,Ee);G[i]=new Q(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(ye,Ee);G[i]=new Q(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(ye,Ee);G[i]=new Q(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){G[n]=new Q(n,1,!1,n.toLowerCase(),null,!1,!1)}),G.xlinkHref=new Q("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){G[n]=new Q(n,1,!1,n.toLowerCase(),null,!0,!0)});function Ce(n,i,a,c){var d=G.hasOwnProperty(i)?G[i]:null;(d!==null?d.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(Z(i,a,d,c)&&(a=null),c||d===null?b(i)&&(a===null?n.removeAttribute(i):n.setAttribute(i,""+a)):d.mustUseProperty?n[d.propertyName]=a===null?d.type===3?!1:"":a:(i=d.attributeName,c=d.attributeNamespace,a===null?n.removeAttribute(i):(d=d.type,a=d===3||d===4&&a===!0?"":""+a,c?n.setAttributeNS(c,i,a):n.setAttribute(i,a))))}var Fe=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,je=Symbol.for("react.element"),De=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),D=Symbol.for("react.provider"),A=Symbol.for("react.context"),V=Symbol.for("react.forward_ref"),T=Symbol.for("react.suspense"),fe=Symbol.for("react.suspense_list"),ze=Symbol.for("react.memo"),Oe=Symbol.for("react.lazy"),Ae=Symbol.for("react.offscreen"),J=Symbol.iterator;function ae(n){return n===null||typeof n!="object"?null:(n=J&&n[J]||n["@@iterator"],typeof n=="function"?n:null)}var ee=Object.assign,O;function $(n){if(O===void 0)try{throw Error()}catch(a){var i=a.stack.trim().match(/\n( *(at )?)/);O=i&&i[1]||""}return`
`+O+n}var _e=!1;function ue(n,i){if(!n||_e)return"";_e=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(U){var c=U}Reflect.construct(n,[],i)}else{try{i.call()}catch(U){c=U}n.call(i.prototype)}else{try{throw Error()}catch(U){c=U}n()}}catch(U){if(U&&c&&typeof U.stack=="string"){for(var d=U.stack.split(`
`),f=c.stack.split(`
`),v=d.length-1,I=f.length-1;1<=v&&0<=I&&d[v]!==f[I];)I--;for(;1<=v&&0<=I;v--,I--)if(d[v]!==f[I]){if(v!==1||I!==1)do if(v--,I--,0>I||d[v]!==f[I]){var k=`
`+d[v].replace(" at new "," at ");return n.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",n.displayName)),k}while(1<=v&&0<=I);break}}}finally{_e=!1,Error.prepareStackTrace=a}return(n=n?n.displayName||n.name:"")?$(n):""}function Ie(n){switch(n.tag){case 5:return $(n.type);case 16:return $("Lazy");case 13:return $("Suspense");case 19:return $("SuspenseList");case 0:case 2:case 15:return n=ue(n.type,!1),n;case 11:return n=ue(n.type.render,!1),n;case 1:return n=ue(n.type,!0),n;default:return""}}function Se(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case N:return"Fragment";case De:return"Portal";case C:return"Profiler";case S:return"StrictMode";case T:return"Suspense";case fe:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case A:return(n.displayName||"Context")+".Consumer";case D:return(n._context.displayName||"Context")+".Provider";case V:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case ze:return i=n.displayName||null,i!==null?i:Se(n.type)||"Memo";case Oe:i=n._payload,n=n._init;try{return Se(n(i))}catch{}}return null}function Be(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Se(i);case 8:return i===S?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Le(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function qe(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function jt(n){var i=qe(n)?"checked":"value",a=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var d=a.get,f=a.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return d.call(this)},set:function(v){c=""+v,f.call(this,v)}}),Object.defineProperty(n,i,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(v){c=""+v},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function _s(n){n._valueTracker||(n._valueTracker=jt(n))}function xo(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var a=i.getValue(),c="";return n&&(c=qe(n)?n.checked?"true":"false":n.value),n=c,n!==a?(i.setValue(n),!0):!1}function Or(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function vs(n,i){var a=i.checked;return ee({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??n._wrapperState.initialChecked})}function ul(n,i){var a=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;a=Le(i.value!=null?i.value:a),n._wrapperState={initialChecked:c,initialValue:a,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Es(n,i){i=i.checked,i!=null&&Ce(n,"checked",i,!1)}function Ni(n,i){Es(n,i);var a=Le(i.value),c=i.type;if(a!=null)c==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=""+a):n.value!==""+a&&(n.value=""+a);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?ct(n,i.type,a):i.hasOwnProperty("defaultValue")&&ct(n,i.type,Le(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function Do(n,i,a){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,a||i===n.value||(n.value=i),n.defaultValue=i}a=n.name,a!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,a!==""&&(n.name=a)}function ct(n,i,a){(i!=="number"||Or(n.ownerDocument)!==n)&&(a==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+a&&(n.defaultValue=""+a))}var ot=Array.isArray;function vn(n,i,a,c){if(n=n.options,i){i={};for(var d=0;d<a.length;d++)i["$"+a[d]]=!0;for(a=0;a<n.length;a++)d=i.hasOwnProperty("$"+n[a].value),n[a].selected!==d&&(n[a].selected=d),d&&c&&(n[a].defaultSelected=!0)}else{for(a=""+Le(a),i=null,d=0;d<n.length;d++){if(n[d].value===a){n[d].selected=!0,c&&(n[d].defaultSelected=!0);return}i!==null||n[d].disabled||(i=n[d])}i!==null&&(i.selected=!0)}}function Vo(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return ee({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Oo(n,i){var a=i.value;if(a==null){if(a=i.children,i=i.defaultValue,a!=null){if(i!=null)throw Error(t(92));if(ot(a)){if(1<a.length)throw Error(t(93));a=a[0]}i=a}i==null&&(i=""),a=i}n._wrapperState={initialValue:Le(a)}}function cl(n,i){var a=Le(i.value),c=Le(i.defaultValue);a!=null&&(a=""+a,a!==n.value&&(n.value=a),i.defaultValue==null&&n.defaultValue!==a&&(n.defaultValue=a)),c!=null&&(n.defaultValue=""+c)}function Lr(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function Lo(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ws(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?Lo(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Mr,hl=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,a,c,d){MSApp.execUnsafeLocalFunction(function(){return n(i,a,c,d)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Mr=Mr||document.createElement("div"),Mr.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Mr.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function xi(n,i){if(i){var a=n.firstChild;if(a&&a===n.lastChild&&a.nodeType===3){a.nodeValue=i;return}}n.textContent=i}var br={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},dl=["Webkit","ms","Moz","O"];Object.keys(br).forEach(function(n){dl.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),br[i]=br[n]})});function Fr(n,i,a){return i==null||typeof i=="boolean"||i===""?"":a||typeof i!="number"||i===0||br.hasOwnProperty(n)&&br[n]?(""+i).trim():i+"px"}function Ts(n,i){n=n.style;for(var a in i)if(i.hasOwnProperty(a)){var c=a.indexOf("--")===0,d=Fr(a,i[a],c);a==="float"&&(a="cssFloat"),c?n.setProperty(a,d):n[a]=d}}var Mo=ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function En(n,i){if(i){if(Mo[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function Is(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ur=null;function Ss(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var ir=null,sr=null,it=null;function bo(n){if(n=ca(n)){if(typeof ir!="function")throw Error(t(280));var i=n.stateNode;i&&(i=Ul(i),ir(n.stateNode,n.type,i))}}function jr(n){sr?it?it.push(n):it=[n]:sr=n}function zr(){if(sr){var n=sr,i=it;if(it=sr=null,bo(n),i)for(n=0;n<i.length;n++)bo(i[n])}}function fl(n,i){return n(i)}function pl(){}var On=!1;function ml(n,i,a){if(On)return n(i,a);On=!0;try{return fl(n,i,a)}finally{On=!1,(sr!==null||it!==null)&&(pl(),zr())}}function Di(n,i){var a=n.stateNode;if(a===null)return null;var c=Ul(a);if(c===null)return null;a=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(a&&typeof a!="function")throw Error(t(231,i,typeof a));return a}var Br=!1;if(m)try{var $r={};Object.defineProperty($r,"passive",{get:function(){Br=!0}}),window.addEventListener("test",$r,$r),window.removeEventListener("test",$r,$r)}catch{Br=!1}function gl(n,i,a,c,d,f,v,I,k){var U=Array.prototype.slice.call(arguments,3);try{i.apply(a,U)}catch(q){this.onError(q)}}var or=!1,Ln=null,As=!1,ln=null,yl={onError:function(n){or=!0,Ln=n}};function _l(n,i,a,c,d,f,v,I,k){or=!1,Ln=null,gl.apply(yl,arguments)}function Fo(n,i,a,c,d,f,v,I,k){if(_l.apply(this,arguments),or){if(or){var U=Ln;or=!1,Ln=null}else throw Error(t(198));As||(As=!0,ln=U)}}function wn(n){var i=n,a=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(a=i.return),n=i.return;while(n)}return i.tag===3?a:null}function Uo(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function vl(n){if(wn(n)!==n)throw Error(t(188))}function El(n){var i=n.alternate;if(!i){if(i=wn(n),i===null)throw Error(t(188));return i!==n?null:n}for(var a=n,c=i;;){var d=a.return;if(d===null)break;var f=d.alternate;if(f===null){if(c=d.return,c!==null){a=c;continue}break}if(d.child===f.child){for(f=d.child;f;){if(f===a)return vl(d),n;if(f===c)return vl(d),i;f=f.sibling}throw Error(t(188))}if(a.return!==c.return)a=d,c=f;else{for(var v=!1,I=d.child;I;){if(I===a){v=!0,a=d,c=f;break}if(I===c){v=!0,c=d,a=f;break}I=I.sibling}if(!v){for(I=f.child;I;){if(I===a){v=!0,a=f,c=d;break}if(I===c){v=!0,c=f,a=d;break}I=I.sibling}if(!v)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?n:i}function wl(n){return n=El(n),n!==null?Vi(n):null}function Vi(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=Vi(n);if(i!==null)return i;n=n.sibling}return null}var jo=e.unstable_scheduleCallback,Rs=e.unstable_cancelCallback,Oi=e.unstable_shouldYield,ar=e.unstable_requestPaint,Ye=e.unstable_now,Ac=e.unstable_getCurrentPriorityLevel,Cs=e.unstable_ImmediatePriority,zo=e.unstable_UserBlockingPriority,Li=e.unstable_NormalPriority,Bo=e.unstable_LowPriority,ks=e.unstable_IdlePriority,Mi=null,Jt=null;function Tl(n){if(Jt&&typeof Jt.onCommitFiberRoot=="function")try{Jt.onCommitFiberRoot(Mi,n,void 0,(n.current.flags&128)===128)}catch{}}var Xt=Math.clz32?Math.clz32:bi,Mn=Math.log,un=Math.LN2;function bi(n){return n>>>=0,n===0?32:31-(Mn(n)/un|0)|0}var bn=64,Wr=4194304;function Ue(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function lr(n,i){var a=n.pendingLanes;if(a===0)return 0;var c=0,d=n.suspendedLanes,f=n.pingedLanes,v=a&268435455;if(v!==0){var I=v&~d;I!==0?c=Ue(I):(f&=v,f!==0&&(c=Ue(f)))}else v=a&~d,v!==0?c=Ue(v):f!==0&&(c=Ue(f));if(c===0)return 0;if(i!==0&&i!==c&&(i&d)===0&&(d=c&-c,f=i&-i,d>=f||d===16&&(f&4194240)!==0))return i;if((c&4)!==0&&(c|=a&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)a=31-Xt(i),d=1<<a,c|=n[a],i&=~d;return c}function Fi(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ui(n,i){for(var a=n.suspendedLanes,c=n.pingedLanes,d=n.expirationTimes,f=n.pendingLanes;0<f;){var v=31-Xt(f),I=1<<v,k=d[v];k===-1?((I&a)===0||(I&c)!==0)&&(d[v]=Fi(I,i)):k<=i&&(n.expiredLanes|=I),f&=~I}}function $o(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Wo(){var n=bn;return bn<<=1,(bn&4194240)===0&&(bn=64),n}function Ho(n){for(var i=[],a=0;31>a;a++)i.push(n);return i}function ji(n,i,a){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-Xt(i),n[i]=a}function Rc(n,i){var a=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<a;){var d=31-Xt(a),f=1<<d;i[d]=0,c[d]=-1,n[d]=-1,a&=~f}}function qo(n,i){var a=n.entangledLanes|=i;for(n=n.entanglements;a;){var c=31-Xt(a),d=1<<c;d&i|n[c]&i&&(n[c]|=i),a&=~d}}var xe=0;function Fn(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var Ko,Ps,Go,Qo,Yo,Un=!1,Ns=[],jn=null,zn=null,St=null,zi=new Map,ur=new Map,Zt=[],Il="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Hr(n,i){switch(n){case"focusin":case"focusout":jn=null;break;case"dragenter":case"dragleave":zn=null;break;case"mouseover":case"mouseout":St=null;break;case"pointerover":case"pointerout":zi.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":ur.delete(i.pointerId)}}function Tn(n,i,a,c,d,f){return n===null||n.nativeEvent!==f?(n={blockedOn:i,domEventName:a,eventSystemFlags:c,nativeEvent:f,targetContainers:[d]},i!==null&&(i=ca(i),i!==null&&Ps(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,d!==null&&i.indexOf(d)===-1&&i.push(d),n)}function Sl(n,i,a,c,d){switch(i){case"focusin":return jn=Tn(jn,n,i,a,c,d),!0;case"dragenter":return zn=Tn(zn,n,i,a,c,d),!0;case"mouseover":return St=Tn(St,n,i,a,c,d),!0;case"pointerover":var f=d.pointerId;return zi.set(f,Tn(zi.get(f)||null,n,i,a,c,d)),!0;case"gotpointercapture":return f=d.pointerId,ur.set(f,Tn(ur.get(f)||null,n,i,a,c,d)),!0}return!1}function xs(n){var i=Hi(n.target);if(i!==null){var a=wn(i);if(a!==null){if(i=a.tag,i===13){if(i=Uo(a),i!==null){n.blockedOn=i,Yo(n.priority,function(){Go(a)});return}}else if(i===3&&a.stateNode.current.memoizedState.isDehydrated){n.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Ke(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var a=Ds(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(a===null){a=n.nativeEvent;var c=new a.constructor(a.type,a);Ur=c,a.target.dispatchEvent(c),Ur=null}else return i=ca(a),i!==null&&Ps(i),n.blockedOn=a,!1;i.shift()}return!0}function Al(n,i,a){Ke(n)&&a.delete(i)}function Cc(){Un=!1,jn!==null&&Ke(jn)&&(jn=null),zn!==null&&Ke(zn)&&(zn=null),St!==null&&Ke(St)&&(St=null),zi.forEach(Al),ur.forEach(Al)}function qr(n,i){n.blockedOn===i&&(n.blockedOn=null,Un||(Un=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,Cc)))}function Kr(n){function i(d){return qr(d,n)}if(0<Ns.length){qr(Ns[0],n);for(var a=1;a<Ns.length;a++){var c=Ns[a];c.blockedOn===n&&(c.blockedOn=null)}}for(jn!==null&&qr(jn,n),zn!==null&&qr(zn,n),St!==null&&qr(St,n),zi.forEach(i),ur.forEach(i),a=0;a<Zt.length;a++)c=Zt[a],c.blockedOn===n&&(c.blockedOn=null);for(;0<Zt.length&&(a=Zt[0],a.blockedOn===null);)xs(a),a.blockedOn===null&&Zt.shift()}var cr=Fe.ReactCurrentBatchConfig,hr=!0;function Bn(n,i,a,c){var d=xe,f=cr.transition;cr.transition=null;try{xe=1,Jo(n,i,a,c)}finally{xe=d,cr.transition=f}}function Rl(n,i,a,c){var d=xe,f=cr.transition;cr.transition=null;try{xe=4,Jo(n,i,a,c)}finally{xe=d,cr.transition=f}}function Jo(n,i,a,c){if(hr){var d=Ds(n,i,a,c);if(d===null)Fc(n,i,c,$n,a),Hr(n,c);else if(Sl(d,n,i,a,c))c.stopPropagation();else if(Hr(n,c),i&4&&-1<Il.indexOf(n)){for(;d!==null;){var f=ca(d);if(f!==null&&Ko(f),f=Ds(n,i,a,c),f===null&&Fc(n,i,c,$n,a),f===d)break;d=f}d!==null&&c.stopPropagation()}else Fc(n,i,c,null,a)}}var $n=null;function Ds(n,i,a,c){if($n=null,n=Ss(c),n=Hi(n),n!==null)if(i=wn(n),i===null)n=null;else if(a=i.tag,a===13){if(n=Uo(i),n!==null)return n;n=null}else if(a===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return $n=n,null}function Vs(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ac()){case Cs:return 1;case zo:return 4;case Li:case Bo:return 16;case ks:return 536870912;default:return 16}default:return 16}}var en=null,Os=null,dr=null;function Cl(){if(dr)return dr;var n,i=Os,a=i.length,c,d="value"in en?en.value:en.textContent,f=d.length;for(n=0;n<a&&i[n]===d[n];n++);var v=a-n;for(c=1;c<=v&&i[a-c]===d[f-c];c++);return dr=d.slice(n,1<c?1-c:void 0)}function Bi(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Wn(){return!0}function Xo(){return!1}function xt(n){function i(a,c,d,f,v){this._reactName=a,this._targetInst=d,this.type=c,this.nativeEvent=f,this.target=v,this.currentTarget=null;for(var I in n)n.hasOwnProperty(I)&&(a=n[I],this[I]=a?a(f):f[I]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?Wn:Xo,this.isPropagationStopped=Xo,this}return ee(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Wn)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Wn)},persist:function(){},isPersistent:Wn}),i}var Hn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},$i=xt(Hn),Gr=ee({},Hn,{view:0,detail:0}),Ls=xt(Gr),Ms,bs,tn,Wi=ee({},Gr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:we,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==tn&&(tn&&n.type==="mousemove"?(Ms=n.screenX-tn.screenX,bs=n.screenY-tn.screenY):bs=Ms=0,tn=n),Ms)},movementY:function(n){return"movementY"in n?n.movementY:bs}}),Zo=xt(Wi),kl=ee({},Wi,{dataTransfer:0}),Pl=xt(kl),Fs=ee({},Gr,{relatedTarget:0}),At=xt(Fs),Nl=ee({},Hn,{animationName:0,elapsedTime:0,pseudoElement:0}),xl=xt(Nl),Qr=ee({},Hn,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),l=xt(Qr),p=ee({},Hn,{data:0}),y=xt(p),E={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},M={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},j={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function X(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=j[n])?!!i[n]:!1}function we(){return X}var at=ee({},Gr,{key:function(n){if(n.key){var i=E[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=Bi(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?M[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:we,charCode:function(n){return n.type==="keypress"?Bi(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Bi(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),We=xt(at),ht=ee({},Wi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),nn=xt(ht),fr=ee({},Gr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:we}),qn=xt(fr),Kn=ee({},Hn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Us=xt(Kn),ea=ee({},Wi,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),nE=xt(ea),rE=[9,13,27,32],kc=m&&"CompositionEvent"in window,ta=null;m&&"documentMode"in document&&(ta=document.documentMode);var iE=m&&"TextEvent"in window&&!ta,Lf=m&&(!kc||ta&&8<ta&&11>=ta),Mf=" ",bf=!1;function Ff(n,i){switch(n){case"keyup":return rE.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Uf(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var js=!1;function sE(n,i){switch(n){case"compositionend":return Uf(i);case"keypress":return i.which!==32?null:(bf=!0,Mf);case"textInput":return n=i.data,n===Mf&&bf?null:n;default:return null}}function oE(n,i){if(js)return n==="compositionend"||!kc&&Ff(n,i)?(n=Cl(),dr=Os=en=null,js=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Lf&&i.locale!=="ko"?null:i.data;default:return null}}var aE={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jf(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!aE[n.type]:i==="textarea"}function zf(n,i,a,c){jr(c),i=Ml(i,"onChange"),0<i.length&&(a=new $i("onChange","change",null,a,c),n.push({event:a,listeners:i}))}var na=null,ra=null;function lE(n){sp(n,0)}function Dl(n){var i=Hs(n);if(xo(i))return n}function uE(n,i){if(n==="change")return i}var Bf=!1;if(m){var Pc;if(m){var Nc="oninput"in document;if(!Nc){var $f=document.createElement("div");$f.setAttribute("oninput","return;"),Nc=typeof $f.oninput=="function"}Pc=Nc}else Pc=!1;Bf=Pc&&(!document.documentMode||9<document.documentMode)}function Wf(){na&&(na.detachEvent("onpropertychange",Hf),ra=na=null)}function Hf(n){if(n.propertyName==="value"&&Dl(ra)){var i=[];zf(i,ra,n,Ss(n)),ml(lE,i)}}function cE(n,i,a){n==="focusin"?(Wf(),na=i,ra=a,na.attachEvent("onpropertychange",Hf)):n==="focusout"&&Wf()}function hE(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Dl(ra)}function dE(n,i){if(n==="click")return Dl(i)}function fE(n,i){if(n==="input"||n==="change")return Dl(i)}function pE(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var In=typeof Object.is=="function"?Object.is:pE;function ia(n,i){if(In(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var a=Object.keys(n),c=Object.keys(i);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var d=a[c];if(!g.call(i,d)||!In(n[d],i[d]))return!1}return!0}function qf(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Kf(n,i){var a=qf(n);n=0;for(var c;a;){if(a.nodeType===3){if(c=n+a.textContent.length,n<=i&&c>=i)return{node:a,offset:i-n};n=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=qf(a)}}function Gf(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?Gf(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Qf(){for(var n=window,i=Or();i instanceof n.HTMLIFrameElement;){try{var a=typeof i.contentWindow.location.href=="string"}catch{a=!1}if(a)n=i.contentWindow;else break;i=Or(n.document)}return i}function xc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function mE(n){var i=Qf(),a=n.focusedElem,c=n.selectionRange;if(i!==a&&a&&a.ownerDocument&&Gf(a.ownerDocument.documentElement,a)){if(c!==null&&xc(a)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in a)a.selectionStart=i,a.selectionEnd=Math.min(n,a.value.length);else if(n=(i=a.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var d=a.textContent.length,f=Math.min(c.start,d);c=c.end===void 0?f:Math.min(c.end,d),!n.extend&&f>c&&(d=c,c=f,f=d),d=Kf(a,f);var v=Kf(a,c);d&&v&&(n.rangeCount!==1||n.anchorNode!==d.node||n.anchorOffset!==d.offset||n.focusNode!==v.node||n.focusOffset!==v.offset)&&(i=i.createRange(),i.setStart(d.node,d.offset),n.removeAllRanges(),f>c?(n.addRange(i),n.extend(v.node,v.offset)):(i.setEnd(v.node,v.offset),n.addRange(i)))}}for(i=[],n=a;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<i.length;a++)n=i[a],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var gE=m&&"documentMode"in document&&11>=document.documentMode,zs=null,Dc=null,sa=null,Vc=!1;function Yf(n,i,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Vc||zs==null||zs!==Or(c)||(c=zs,"selectionStart"in c&&xc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),sa&&ia(sa,c)||(sa=c,c=Ml(Dc,"onSelect"),0<c.length&&(i=new $i("onSelect","select",null,i,a),n.push({event:i,listeners:c}),i.target=zs)))}function Vl(n,i){var a={};return a[n.toLowerCase()]=i.toLowerCase(),a["Webkit"+n]="webkit"+i,a["Moz"+n]="moz"+i,a}var Bs={animationend:Vl("Animation","AnimationEnd"),animationiteration:Vl("Animation","AnimationIteration"),animationstart:Vl("Animation","AnimationStart"),transitionend:Vl("Transition","TransitionEnd")},Oc={},Jf={};m&&(Jf=document.createElement("div").style,"AnimationEvent"in window||(delete Bs.animationend.animation,delete Bs.animationiteration.animation,delete Bs.animationstart.animation),"TransitionEvent"in window||delete Bs.transitionend.transition);function Ol(n){if(Oc[n])return Oc[n];if(!Bs[n])return n;var i=Bs[n],a;for(a in i)if(i.hasOwnProperty(a)&&a in Jf)return Oc[n]=i[a];return n}var Xf=Ol("animationend"),Zf=Ol("animationiteration"),ep=Ol("animationstart"),tp=Ol("transitionend"),np=new Map,rp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Yr(n,i){np.set(n,i),u(i,[n])}for(var Lc=0;Lc<rp.length;Lc++){var Mc=rp[Lc],yE=Mc.toLowerCase(),_E=Mc[0].toUpperCase()+Mc.slice(1);Yr(yE,"on"+_E)}Yr(Xf,"onAnimationEnd"),Yr(Zf,"onAnimationIteration"),Yr(ep,"onAnimationStart"),Yr("dblclick","onDoubleClick"),Yr("focusin","onFocus"),Yr("focusout","onBlur"),Yr(tp,"onTransitionEnd"),h("onMouseEnter",["mouseout","mouseover"]),h("onMouseLeave",["mouseout","mouseover"]),h("onPointerEnter",["pointerout","pointerover"]),h("onPointerLeave",["pointerout","pointerover"]),u("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),u("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),u("onBeforeInput",["compositionend","keypress","textInput","paste"]),u("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),u("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var oa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),vE=new Set("cancel close invalid load scroll toggle".split(" ").concat(oa));function ip(n,i,a){var c=n.type||"unknown-event";n.currentTarget=a,Fo(c,i,void 0,n),n.currentTarget=null}function sp(n,i){i=(i&4)!==0;for(var a=0;a<n.length;a++){var c=n[a],d=c.event;c=c.listeners;e:{var f=void 0;if(i)for(var v=c.length-1;0<=v;v--){var I=c[v],k=I.instance,U=I.currentTarget;if(I=I.listener,k!==f&&d.isPropagationStopped())break e;ip(d,I,U),f=k}else for(v=0;v<c.length;v++){if(I=c[v],k=I.instance,U=I.currentTarget,I=I.listener,k!==f&&d.isPropagationStopped())break e;ip(d,I,U),f=k}}}if(As)throw n=ln,As=!1,ln=null,n}function Je(n,i){var a=i[Wc];a===void 0&&(a=i[Wc]=new Set);var c=n+"__bubble";a.has(c)||(op(i,n,2,!1),a.add(c))}function bc(n,i,a){var c=0;i&&(c|=4),op(a,n,c,i)}var Ll="_reactListening"+Math.random().toString(36).slice(2);function aa(n){if(!n[Ll]){n[Ll]=!0,s.forEach(function(a){a!=="selectionchange"&&(vE.has(a)||bc(a,!1,n),bc(a,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[Ll]||(i[Ll]=!0,bc("selectionchange",!1,i))}}function op(n,i,a,c){switch(Vs(i)){case 1:var d=Bn;break;case 4:d=Rl;break;default:d=Jo}a=d.bind(null,i,a,n),d=void 0,!Br||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(d=!0),c?d!==void 0?n.addEventListener(i,a,{capture:!0,passive:d}):n.addEventListener(i,a,!0):d!==void 0?n.addEventListener(i,a,{passive:d}):n.addEventListener(i,a,!1)}function Fc(n,i,a,c,d){var f=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var v=c.tag;if(v===3||v===4){var I=c.stateNode.containerInfo;if(I===d||I.nodeType===8&&I.parentNode===d)break;if(v===4)for(v=c.return;v!==null;){var k=v.tag;if((k===3||k===4)&&(k=v.stateNode.containerInfo,k===d||k.nodeType===8&&k.parentNode===d))return;v=v.return}for(;I!==null;){if(v=Hi(I),v===null)return;if(k=v.tag,k===5||k===6){c=f=v;continue e}I=I.parentNode}}c=c.return}ml(function(){var U=f,q=Ss(a),K=[];e:{var H=np.get(n);if(H!==void 0){var te=$i,se=n;switch(n){case"keypress":if(Bi(a)===0)break e;case"keydown":case"keyup":te=We;break;case"focusin":se="focus",te=At;break;case"focusout":se="blur",te=At;break;case"beforeblur":case"afterblur":te=At;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":te=Zo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":te=Pl;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":te=qn;break;case Xf:case Zf:case ep:te=xl;break;case tp:te=Us;break;case"scroll":te=Ls;break;case"wheel":te=nE;break;case"copy":case"cut":case"paste":te=l;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":te=nn}var oe=(i&4)!==0,lt=!oe&&n==="scroll",L=oe?H!==null?H+"Capture":null:H;oe=[];for(var x=U,F;x!==null;){F=x;var Y=F.stateNode;if(F.tag===5&&Y!==null&&(F=Y,L!==null&&(Y=Di(x,L),Y!=null&&oe.push(la(x,Y,F)))),lt)break;x=x.return}0<oe.length&&(H=new te(H,se,null,a,q),K.push({event:H,listeners:oe}))}}if((i&7)===0){e:{if(H=n==="mouseover"||n==="pointerover",te=n==="mouseout"||n==="pointerout",H&&a!==Ur&&(se=a.relatedTarget||a.fromElement)&&(Hi(se)||se[pr]))break e;if((te||H)&&(H=q.window===q?q:(H=q.ownerDocument)?H.defaultView||H.parentWindow:window,te?(se=a.relatedTarget||a.toElement,te=U,se=se?Hi(se):null,se!==null&&(lt=wn(se),se!==lt||se.tag!==5&&se.tag!==6)&&(se=null)):(te=null,se=U),te!==se)){if(oe=Zo,Y="onMouseLeave",L="onMouseEnter",x="mouse",(n==="pointerout"||n==="pointerover")&&(oe=nn,Y="onPointerLeave",L="onPointerEnter",x="pointer"),lt=te==null?H:Hs(te),F=se==null?H:Hs(se),H=new oe(Y,x+"leave",te,a,q),H.target=lt,H.relatedTarget=F,Y=null,Hi(q)===U&&(oe=new oe(L,x+"enter",se,a,q),oe.target=F,oe.relatedTarget=lt,Y=oe),lt=Y,te&&se)t:{for(oe=te,L=se,x=0,F=oe;F;F=$s(F))x++;for(F=0,Y=L;Y;Y=$s(Y))F++;for(;0<x-F;)oe=$s(oe),x--;for(;0<F-x;)L=$s(L),F--;for(;x--;){if(oe===L||L!==null&&oe===L.alternate)break t;oe=$s(oe),L=$s(L)}oe=null}else oe=null;te!==null&&ap(K,H,te,oe,!1),se!==null&&lt!==null&&ap(K,lt,se,oe,!0)}}e:{if(H=U?Hs(U):window,te=H.nodeName&&H.nodeName.toLowerCase(),te==="select"||te==="input"&&H.type==="file")var le=uE;else if(jf(H))if(Bf)le=fE;else{le=hE;var he=cE}else(te=H.nodeName)&&te.toLowerCase()==="input"&&(H.type==="checkbox"||H.type==="radio")&&(le=dE);if(le&&(le=le(n,U))){zf(K,le,a,q);break e}he&&he(n,H,U),n==="focusout"&&(he=H._wrapperState)&&he.controlled&&H.type==="number"&&ct(H,"number",H.value)}switch(he=U?Hs(U):window,n){case"focusin":(jf(he)||he.contentEditable==="true")&&(zs=he,Dc=U,sa=null);break;case"focusout":sa=Dc=zs=null;break;case"mousedown":Vc=!0;break;case"contextmenu":case"mouseup":case"dragend":Vc=!1,Yf(K,a,q);break;case"selectionchange":if(gE)break;case"keydown":case"keyup":Yf(K,a,q)}var de;if(kc)e:{switch(n){case"compositionstart":var ge="onCompositionStart";break e;case"compositionend":ge="onCompositionEnd";break e;case"compositionupdate":ge="onCompositionUpdate";break e}ge=void 0}else js?Ff(n,a)&&(ge="onCompositionEnd"):n==="keydown"&&a.keyCode===229&&(ge="onCompositionStart");ge&&(Lf&&a.locale!=="ko"&&(js||ge!=="onCompositionStart"?ge==="onCompositionEnd"&&js&&(de=Cl()):(en=q,Os="value"in en?en.value:en.textContent,js=!0)),he=Ml(U,ge),0<he.length&&(ge=new y(ge,n,null,a,q),K.push({event:ge,listeners:he}),de?ge.data=de:(de=Uf(a),de!==null&&(ge.data=de)))),(de=iE?sE(n,a):oE(n,a))&&(U=Ml(U,"onBeforeInput"),0<U.length&&(q=new y("onBeforeInput","beforeinput",null,a,q),K.push({event:q,listeners:U}),q.data=de))}sp(K,i)})}function la(n,i,a){return{instance:n,listener:i,currentTarget:a}}function Ml(n,i){for(var a=i+"Capture",c=[];n!==null;){var d=n,f=d.stateNode;d.tag===5&&f!==null&&(d=f,f=Di(n,a),f!=null&&c.unshift(la(n,f,d)),f=Di(n,i),f!=null&&c.push(la(n,f,d))),n=n.return}return c}function $s(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function ap(n,i,a,c,d){for(var f=i._reactName,v=[];a!==null&&a!==c;){var I=a,k=I.alternate,U=I.stateNode;if(k!==null&&k===c)break;I.tag===5&&U!==null&&(I=U,d?(k=Di(a,f),k!=null&&v.unshift(la(a,k,I))):d||(k=Di(a,f),k!=null&&v.push(la(a,k,I)))),a=a.return}v.length!==0&&n.push({event:i,listeners:v})}var EE=/\r\n?/g,wE=/\u0000|\uFFFD/g;function lp(n){return(typeof n=="string"?n:""+n).replace(EE,`
`).replace(wE,"")}function bl(n,i,a){if(i=lp(i),lp(n)!==i&&a)throw Error(t(425))}function Fl(){}var Uc=null,jc=null;function zc(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Bc=typeof setTimeout=="function"?setTimeout:void 0,TE=typeof clearTimeout=="function"?clearTimeout:void 0,up=typeof Promise=="function"?Promise:void 0,IE=typeof queueMicrotask=="function"?queueMicrotask:typeof up<"u"?function(n){return up.resolve(null).then(n).catch(SE)}:Bc;function SE(n){setTimeout(function(){throw n})}function $c(n,i){var a=i,c=0;do{var d=a.nextSibling;if(n.removeChild(a),d&&d.nodeType===8)if(a=d.data,a==="/$"){if(c===0){n.removeChild(d),Kr(i);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=d}while(a);Kr(i)}function Jr(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function cp(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="$"||a==="$!"||a==="$?"){if(i===0)return n;i--}else a==="/$"&&i++}n=n.previousSibling}return null}var Ws=Math.random().toString(36).slice(2),Gn="__reactFiber$"+Ws,ua="__reactProps$"+Ws,pr="__reactContainer$"+Ws,Wc="__reactEvents$"+Ws,AE="__reactListeners$"+Ws,RE="__reactHandles$"+Ws;function Hi(n){var i=n[Gn];if(i)return i;for(var a=n.parentNode;a;){if(i=a[pr]||a[Gn]){if(a=i.alternate,i.child!==null||a!==null&&a.child!==null)for(n=cp(n);n!==null;){if(a=n[Gn])return a;n=cp(n)}return i}n=a,a=n.parentNode}return null}function ca(n){return n=n[Gn]||n[pr],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function Hs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Ul(n){return n[ua]||null}var Hc=[],qs=-1;function Xr(n){return{current:n}}function Xe(n){0>qs||(n.current=Hc[qs],Hc[qs]=null,qs--)}function Ge(n,i){qs++,Hc[qs]=n.current,n.current=i}var Zr={},Dt=Xr(Zr),Wt=Xr(!1),qi=Zr;function Ks(n,i){var a=n.type.contextTypes;if(!a)return Zr;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var d={},f;for(f in a)d[f]=i[f];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=d),d}function Ht(n){return n=n.childContextTypes,n!=null}function jl(){Xe(Wt),Xe(Dt)}function hp(n,i,a){if(Dt.current!==Zr)throw Error(t(168));Ge(Dt,i),Ge(Wt,a)}function dp(n,i,a){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var d in c)if(!(d in i))throw Error(t(108,Be(n)||"Unknown",d));return ee({},a,c)}function zl(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||Zr,qi=Dt.current,Ge(Dt,n),Ge(Wt,Wt.current),!0}function fp(n,i,a){var c=n.stateNode;if(!c)throw Error(t(169));a?(n=dp(n,i,qi),c.__reactInternalMemoizedMergedChildContext=n,Xe(Wt),Xe(Dt),Ge(Dt,n)):Xe(Wt),Ge(Wt,a)}var mr=null,Bl=!1,qc=!1;function pp(n){mr===null?mr=[n]:mr.push(n)}function CE(n){Bl=!0,pp(n)}function ei(){if(!qc&&mr!==null){qc=!0;var n=0,i=xe;try{var a=mr;for(xe=1;n<a.length;n++){var c=a[n];do c=c(!0);while(c!==null)}mr=null,Bl=!1}catch(d){throw mr!==null&&(mr=mr.slice(n+1)),jo(Cs,ei),d}finally{xe=i,qc=!1}}return null}var Gs=[],Qs=0,$l=null,Wl=0,cn=[],hn=0,Ki=null,gr=1,yr="";function Gi(n,i){Gs[Qs++]=Wl,Gs[Qs++]=$l,$l=n,Wl=i}function mp(n,i,a){cn[hn++]=gr,cn[hn++]=yr,cn[hn++]=Ki,Ki=n;var c=gr;n=yr;var d=32-Xt(c)-1;c&=~(1<<d),a+=1;var f=32-Xt(i)+d;if(30<f){var v=d-d%5;f=(c&(1<<v)-1).toString(32),c>>=v,d-=v,gr=1<<32-Xt(i)+d|a<<d|c,yr=f+n}else gr=1<<f|a<<d|c,yr=n}function Kc(n){n.return!==null&&(Gi(n,1),mp(n,1,0))}function Gc(n){for(;n===$l;)$l=Gs[--Qs],Gs[Qs]=null,Wl=Gs[--Qs],Gs[Qs]=null;for(;n===Ki;)Ki=cn[--hn],cn[hn]=null,yr=cn[--hn],cn[hn]=null,gr=cn[--hn],cn[hn]=null}var rn=null,sn=null,et=!1,Sn=null;function gp(n,i){var a=mn(5,null,null,0);a.elementType="DELETED",a.stateNode=i,a.return=n,i=n.deletions,i===null?(n.deletions=[a],n.flags|=16):i.push(a)}function yp(n,i){switch(n.tag){case 5:var a=n.type;return i=i.nodeType!==1||a.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,rn=n,sn=Jr(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,rn=n,sn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(a=Ki!==null?{id:gr,overflow:yr}:null,n.memoizedState={dehydrated:i,treeContext:a,retryLane:1073741824},a=mn(18,null,null,0),a.stateNode=i,a.return=n,n.child=a,rn=n,sn=null,!0):!1;default:return!1}}function Qc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Yc(n){if(et){var i=sn;if(i){var a=i;if(!yp(n,i)){if(Qc(n))throw Error(t(418));i=Jr(a.nextSibling);var c=rn;i&&yp(n,i)?gp(c,a):(n.flags=n.flags&-4097|2,et=!1,rn=n)}}else{if(Qc(n))throw Error(t(418));n.flags=n.flags&-4097|2,et=!1,rn=n}}}function _p(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;rn=n}function Hl(n){if(n!==rn)return!1;if(!et)return _p(n),et=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!zc(n.type,n.memoizedProps)),i&&(i=sn)){if(Qc(n))throw vp(),Error(t(418));for(;i;)gp(n,i),i=Jr(i.nextSibling)}if(_p(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var a=n.data;if(a==="/$"){if(i===0){sn=Jr(n.nextSibling);break e}i--}else a!=="$"&&a!=="$!"&&a!=="$?"||i++}n=n.nextSibling}sn=null}}else sn=rn?Jr(n.stateNode.nextSibling):null;return!0}function vp(){for(var n=sn;n;)n=Jr(n.nextSibling)}function Ys(){sn=rn=null,et=!1}function Jc(n){Sn===null?Sn=[n]:Sn.push(n)}var kE=Fe.ReactCurrentBatchConfig;function ha(n,i,a){if(n=a.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,n));var d=c,f=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===f?i.ref:(i=function(v){var I=d.refs;v===null?delete I[f]:I[f]=v},i._stringRef=f,i)}if(typeof n!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,n))}return n}function ql(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function Ep(n){var i=n._init;return i(n._payload)}function wp(n){function i(L,x){if(n){var F=L.deletions;F===null?(L.deletions=[x],L.flags|=16):F.push(x)}}function a(L,x){if(!n)return null;for(;x!==null;)i(L,x),x=x.sibling;return null}function c(L,x){for(L=new Map;x!==null;)x.key!==null?L.set(x.key,x):L.set(x.index,x),x=x.sibling;return L}function d(L,x){return L=li(L,x),L.index=0,L.sibling=null,L}function f(L,x,F){return L.index=F,n?(F=L.alternate,F!==null?(F=F.index,F<x?(L.flags|=2,x):F):(L.flags|=2,x)):(L.flags|=1048576,x)}function v(L){return n&&L.alternate===null&&(L.flags|=2),L}function I(L,x,F,Y){return x===null||x.tag!==6?(x=Bh(F,L.mode,Y),x.return=L,x):(x=d(x,F),x.return=L,x)}function k(L,x,F,Y){var le=F.type;return le===N?q(L,x,F.props.children,Y,F.key):x!==null&&(x.elementType===le||typeof le=="object"&&le!==null&&le.$$typeof===Oe&&Ep(le)===x.type)?(Y=d(x,F.props),Y.ref=ha(L,x,F),Y.return=L,Y):(Y=gu(F.type,F.key,F.props,null,L.mode,Y),Y.ref=ha(L,x,F),Y.return=L,Y)}function U(L,x,F,Y){return x===null||x.tag!==4||x.stateNode.containerInfo!==F.containerInfo||x.stateNode.implementation!==F.implementation?(x=$h(F,L.mode,Y),x.return=L,x):(x=d(x,F.children||[]),x.return=L,x)}function q(L,x,F,Y,le){return x===null||x.tag!==7?(x=ns(F,L.mode,Y,le),x.return=L,x):(x=d(x,F),x.return=L,x)}function K(L,x,F){if(typeof x=="string"&&x!==""||typeof x=="number")return x=Bh(""+x,L.mode,F),x.return=L,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case je:return F=gu(x.type,x.key,x.props,null,L.mode,F),F.ref=ha(L,null,x),F.return=L,F;case De:return x=$h(x,L.mode,F),x.return=L,x;case Oe:var Y=x._init;return K(L,Y(x._payload),F)}if(ot(x)||ae(x))return x=ns(x,L.mode,F,null),x.return=L,x;ql(L,x)}return null}function H(L,x,F,Y){var le=x!==null?x.key:null;if(typeof F=="string"&&F!==""||typeof F=="number")return le!==null?null:I(L,x,""+F,Y);if(typeof F=="object"&&F!==null){switch(F.$$typeof){case je:return F.key===le?k(L,x,F,Y):null;case De:return F.key===le?U(L,x,F,Y):null;case Oe:return le=F._init,H(L,x,le(F._payload),Y)}if(ot(F)||ae(F))return le!==null?null:q(L,x,F,Y,null);ql(L,F)}return null}function te(L,x,F,Y,le){if(typeof Y=="string"&&Y!==""||typeof Y=="number")return L=L.get(F)||null,I(x,L,""+Y,le);if(typeof Y=="object"&&Y!==null){switch(Y.$$typeof){case je:return L=L.get(Y.key===null?F:Y.key)||null,k(x,L,Y,le);case De:return L=L.get(Y.key===null?F:Y.key)||null,U(x,L,Y,le);case Oe:var he=Y._init;return te(L,x,F,he(Y._payload),le)}if(ot(Y)||ae(Y))return L=L.get(F)||null,q(x,L,Y,le,null);ql(x,Y)}return null}function se(L,x,F,Y){for(var le=null,he=null,de=x,ge=x=0,wt=null;de!==null&&ge<F.length;ge++){de.index>ge?(wt=de,de=null):wt=de.sibling;var be=H(L,de,F[ge],Y);if(be===null){de===null&&(de=wt);break}n&&de&&be.alternate===null&&i(L,de),x=f(be,x,ge),he===null?le=be:he.sibling=be,he=be,de=wt}if(ge===F.length)return a(L,de),et&&Gi(L,ge),le;if(de===null){for(;ge<F.length;ge++)de=K(L,F[ge],Y),de!==null&&(x=f(de,x,ge),he===null?le=de:he.sibling=de,he=de);return et&&Gi(L,ge),le}for(de=c(L,de);ge<F.length;ge++)wt=te(de,L,ge,F[ge],Y),wt!==null&&(n&&wt.alternate!==null&&de.delete(wt.key===null?ge:wt.key),x=f(wt,x,ge),he===null?le=wt:he.sibling=wt,he=wt);return n&&de.forEach(function(ui){return i(L,ui)}),et&&Gi(L,ge),le}function oe(L,x,F,Y){var le=ae(F);if(typeof le!="function")throw Error(t(150));if(F=le.call(F),F==null)throw Error(t(151));for(var he=le=null,de=x,ge=x=0,wt=null,be=F.next();de!==null&&!be.done;ge++,be=F.next()){de.index>ge?(wt=de,de=null):wt=de.sibling;var ui=H(L,de,be.value,Y);if(ui===null){de===null&&(de=wt);break}n&&de&&ui.alternate===null&&i(L,de),x=f(ui,x,ge),he===null?le=ui:he.sibling=ui,he=ui,de=wt}if(be.done)return a(L,de),et&&Gi(L,ge),le;if(de===null){for(;!be.done;ge++,be=F.next())be=K(L,be.value,Y),be!==null&&(x=f(be,x,ge),he===null?le=be:he.sibling=be,he=be);return et&&Gi(L,ge),le}for(de=c(L,de);!be.done;ge++,be=F.next())be=te(de,L,ge,be.value,Y),be!==null&&(n&&be.alternate!==null&&de.delete(be.key===null?ge:be.key),x=f(be,x,ge),he===null?le=be:he.sibling=be,he=be);return n&&de.forEach(function(aw){return i(L,aw)}),et&&Gi(L,ge),le}function lt(L,x,F,Y){if(typeof F=="object"&&F!==null&&F.type===N&&F.key===null&&(F=F.props.children),typeof F=="object"&&F!==null){switch(F.$$typeof){case je:e:{for(var le=F.key,he=x;he!==null;){if(he.key===le){if(le=F.type,le===N){if(he.tag===7){a(L,he.sibling),x=d(he,F.props.children),x.return=L,L=x;break e}}else if(he.elementType===le||typeof le=="object"&&le!==null&&le.$$typeof===Oe&&Ep(le)===he.type){a(L,he.sibling),x=d(he,F.props),x.ref=ha(L,he,F),x.return=L,L=x;break e}a(L,he);break}else i(L,he);he=he.sibling}F.type===N?(x=ns(F.props.children,L.mode,Y,F.key),x.return=L,L=x):(Y=gu(F.type,F.key,F.props,null,L.mode,Y),Y.ref=ha(L,x,F),Y.return=L,L=Y)}return v(L);case De:e:{for(he=F.key;x!==null;){if(x.key===he)if(x.tag===4&&x.stateNode.containerInfo===F.containerInfo&&x.stateNode.implementation===F.implementation){a(L,x.sibling),x=d(x,F.children||[]),x.return=L,L=x;break e}else{a(L,x);break}else i(L,x);x=x.sibling}x=$h(F,L.mode,Y),x.return=L,L=x}return v(L);case Oe:return he=F._init,lt(L,x,he(F._payload),Y)}if(ot(F))return se(L,x,F,Y);if(ae(F))return oe(L,x,F,Y);ql(L,F)}return typeof F=="string"&&F!==""||typeof F=="number"?(F=""+F,x!==null&&x.tag===6?(a(L,x.sibling),x=d(x,F),x.return=L,L=x):(a(L,x),x=Bh(F,L.mode,Y),x.return=L,L=x),v(L)):a(L,x)}return lt}var Js=wp(!0),Tp=wp(!1),Kl=Xr(null),Gl=null,Xs=null,Xc=null;function Zc(){Xc=Xs=Gl=null}function eh(n){var i=Kl.current;Xe(Kl),n._currentValue=i}function th(n,i,a){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===a)break;n=n.return}}function Zs(n,i){Gl=n,Xc=Xs=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(qt=!0),n.firstContext=null)}function dn(n){var i=n._currentValue;if(Xc!==n)if(n={context:n,memoizedValue:i,next:null},Xs===null){if(Gl===null)throw Error(t(308));Xs=n,Gl.dependencies={lanes:0,firstContext:n}}else Xs=Xs.next=n;return i}var Qi=null;function nh(n){Qi===null?Qi=[n]:Qi.push(n)}function Ip(n,i,a,c){var d=i.interleaved;return d===null?(a.next=a,nh(i)):(a.next=d.next,d.next=a),i.interleaved=a,_r(n,c)}function _r(n,i){n.lanes|=i;var a=n.alternate;for(a!==null&&(a.lanes|=i),a=n,n=n.return;n!==null;)n.childLanes|=i,a=n.alternate,a!==null&&(a.childLanes|=i),a=n,n=n.return;return a.tag===3?a.stateNode:null}var ti=!1;function rh(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Sp(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function vr(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function ni(n,i,a){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(Me&2)!==0){var d=c.pending;return d===null?i.next=i:(i.next=d.next,d.next=i),c.pending=i,_r(n,a)}return d=c.interleaved,d===null?(i.next=i,nh(c)):(i.next=d.next,d.next=i),c.interleaved=i,_r(n,a)}function Ql(n,i,a){if(i=i.updateQueue,i!==null&&(i=i.shared,(a&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,qo(n,a)}}function Ap(n,i){var a=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var d=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var v={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};f===null?d=f=v:f=f.next=v,a=a.next}while(a!==null);f===null?d=f=i:f=f.next=i}else d=f=i;a={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:f,shared:c.shared,effects:c.effects},n.updateQueue=a;return}n=a.lastBaseUpdate,n===null?a.firstBaseUpdate=i:n.next=i,a.lastBaseUpdate=i}function Yl(n,i,a,c){var d=n.updateQueue;ti=!1;var f=d.firstBaseUpdate,v=d.lastBaseUpdate,I=d.shared.pending;if(I!==null){d.shared.pending=null;var k=I,U=k.next;k.next=null,v===null?f=U:v.next=U,v=k;var q=n.alternate;q!==null&&(q=q.updateQueue,I=q.lastBaseUpdate,I!==v&&(I===null?q.firstBaseUpdate=U:I.next=U,q.lastBaseUpdate=k))}if(f!==null){var K=d.baseState;v=0,q=U=k=null,I=f;do{var H=I.lane,te=I.eventTime;if((c&H)===H){q!==null&&(q=q.next={eventTime:te,lane:0,tag:I.tag,payload:I.payload,callback:I.callback,next:null});e:{var se=n,oe=I;switch(H=i,te=a,oe.tag){case 1:if(se=oe.payload,typeof se=="function"){K=se.call(te,K,H);break e}K=se;break e;case 3:se.flags=se.flags&-65537|128;case 0:if(se=oe.payload,H=typeof se=="function"?se.call(te,K,H):se,H==null)break e;K=ee({},K,H);break e;case 2:ti=!0}}I.callback!==null&&I.lane!==0&&(n.flags|=64,H=d.effects,H===null?d.effects=[I]:H.push(I))}else te={eventTime:te,lane:H,tag:I.tag,payload:I.payload,callback:I.callback,next:null},q===null?(U=q=te,k=K):q=q.next=te,v|=H;if(I=I.next,I===null){if(I=d.shared.pending,I===null)break;H=I,I=H.next,H.next=null,d.lastBaseUpdate=H,d.shared.pending=null}}while(!0);if(q===null&&(k=K),d.baseState=k,d.firstBaseUpdate=U,d.lastBaseUpdate=q,i=d.shared.interleaved,i!==null){d=i;do v|=d.lane,d=d.next;while(d!==i)}else f===null&&(d.shared.lanes=0);Xi|=v,n.lanes=v,n.memoizedState=K}}function Rp(n,i,a){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],d=c.callback;if(d!==null){if(c.callback=null,c=a,typeof d!="function")throw Error(t(191,d));d.call(c)}}}var da={},Qn=Xr(da),fa=Xr(da),pa=Xr(da);function Yi(n){if(n===da)throw Error(t(174));return n}function ih(n,i){switch(Ge(pa,i),Ge(fa,n),Ge(Qn,da),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:ws(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=ws(i,n)}Xe(Qn),Ge(Qn,i)}function eo(){Xe(Qn),Xe(fa),Xe(pa)}function Cp(n){Yi(pa.current);var i=Yi(Qn.current),a=ws(i,n.type);i!==a&&(Ge(fa,n),Ge(Qn,a))}function sh(n){fa.current===n&&(Xe(Qn),Xe(fa))}var tt=Xr(0);function Jl(n){for(var i=n;i!==null;){if(i.tag===13){var a=i.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var oh=[];function ah(){for(var n=0;n<oh.length;n++)oh[n]._workInProgressVersionPrimary=null;oh.length=0}var Xl=Fe.ReactCurrentDispatcher,lh=Fe.ReactCurrentBatchConfig,Ji=0,nt=null,gt=null,vt=null,Zl=!1,ma=!1,ga=0,PE=0;function Vt(){throw Error(t(321))}function uh(n,i){if(i===null)return!1;for(var a=0;a<i.length&&a<n.length;a++)if(!In(n[a],i[a]))return!1;return!0}function ch(n,i,a,c,d,f){if(Ji=f,nt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Xl.current=n===null||n.memoizedState===null?VE:OE,n=a(c,d),ma){f=0;do{if(ma=!1,ga=0,25<=f)throw Error(t(301));f+=1,vt=gt=null,i.updateQueue=null,Xl.current=LE,n=a(c,d)}while(ma)}if(Xl.current=nu,i=gt!==null&&gt.next!==null,Ji=0,vt=gt=nt=null,Zl=!1,i)throw Error(t(300));return n}function hh(){var n=ga!==0;return ga=0,n}function Yn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return vt===null?nt.memoizedState=vt=n:vt=vt.next=n,vt}function fn(){if(gt===null){var n=nt.alternate;n=n!==null?n.memoizedState:null}else n=gt.next;var i=vt===null?nt.memoizedState:vt.next;if(i!==null)vt=i,gt=n;else{if(n===null)throw Error(t(310));gt=n,n={memoizedState:gt.memoizedState,baseState:gt.baseState,baseQueue:gt.baseQueue,queue:gt.queue,next:null},vt===null?nt.memoizedState=vt=n:vt=vt.next=n}return vt}function ya(n,i){return typeof i=="function"?i(n):i}function dh(n){var i=fn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=gt,d=c.baseQueue,f=a.pending;if(f!==null){if(d!==null){var v=d.next;d.next=f.next,f.next=v}c.baseQueue=d=f,a.pending=null}if(d!==null){f=d.next,c=c.baseState;var I=v=null,k=null,U=f;do{var q=U.lane;if((Ji&q)===q)k!==null&&(k=k.next={lane:0,action:U.action,hasEagerState:U.hasEagerState,eagerState:U.eagerState,next:null}),c=U.hasEagerState?U.eagerState:n(c,U.action);else{var K={lane:q,action:U.action,hasEagerState:U.hasEagerState,eagerState:U.eagerState,next:null};k===null?(I=k=K,v=c):k=k.next=K,nt.lanes|=q,Xi|=q}U=U.next}while(U!==null&&U!==f);k===null?v=c:k.next=I,In(c,i.memoizedState)||(qt=!0),i.memoizedState=c,i.baseState=v,i.baseQueue=k,a.lastRenderedState=c}if(n=a.interleaved,n!==null){d=n;do f=d.lane,nt.lanes|=f,Xi|=f,d=d.next;while(d!==n)}else d===null&&(a.lanes=0);return[i.memoizedState,a.dispatch]}function fh(n){var i=fn(),a=i.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=n;var c=a.dispatch,d=a.pending,f=i.memoizedState;if(d!==null){a.pending=null;var v=d=d.next;do f=n(f,v.action),v=v.next;while(v!==d);In(f,i.memoizedState)||(qt=!0),i.memoizedState=f,i.baseQueue===null&&(i.baseState=f),a.lastRenderedState=f}return[f,c]}function kp(){}function Pp(n,i){var a=nt,c=fn(),d=i(),f=!In(c.memoizedState,d);if(f&&(c.memoizedState=d,qt=!0),c=c.queue,ph(Dp.bind(null,a,c,n),[n]),c.getSnapshot!==i||f||vt!==null&&vt.memoizedState.tag&1){if(a.flags|=2048,_a(9,xp.bind(null,a,c,d,i),void 0,null),Et===null)throw Error(t(349));(Ji&30)!==0||Np(a,i,d)}return d}function Np(n,i,a){n.flags|=16384,n={getSnapshot:i,value:a},i=nt.updateQueue,i===null?(i={lastEffect:null,stores:null},nt.updateQueue=i,i.stores=[n]):(a=i.stores,a===null?i.stores=[n]:a.push(n))}function xp(n,i,a,c){i.value=a,i.getSnapshot=c,Vp(i)&&Op(n)}function Dp(n,i,a){return a(function(){Vp(i)&&Op(n)})}function Vp(n){var i=n.getSnapshot;n=n.value;try{var a=i();return!In(n,a)}catch{return!0}}function Op(n){var i=_r(n,1);i!==null&&kn(i,n,1,-1)}function Lp(n){var i=Yn();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ya,lastRenderedState:n},i.queue=n,n=n.dispatch=DE.bind(null,nt,n),[i.memoizedState,n]}function _a(n,i,a,c){return n={tag:n,create:i,destroy:a,deps:c,next:null},i=nt.updateQueue,i===null?(i={lastEffect:null,stores:null},nt.updateQueue=i,i.lastEffect=n.next=n):(a=i.lastEffect,a===null?i.lastEffect=n.next=n:(c=a.next,a.next=n,n.next=c,i.lastEffect=n)),n}function Mp(){return fn().memoizedState}function eu(n,i,a,c){var d=Yn();nt.flags|=n,d.memoizedState=_a(1|i,a,void 0,c===void 0?null:c)}function tu(n,i,a,c){var d=fn();c=c===void 0?null:c;var f=void 0;if(gt!==null){var v=gt.memoizedState;if(f=v.destroy,c!==null&&uh(c,v.deps)){d.memoizedState=_a(i,a,f,c);return}}nt.flags|=n,d.memoizedState=_a(1|i,a,f,c)}function bp(n,i){return eu(8390656,8,n,i)}function ph(n,i){return tu(2048,8,n,i)}function Fp(n,i){return tu(4,2,n,i)}function Up(n,i){return tu(4,4,n,i)}function jp(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function zp(n,i,a){return a=a!=null?a.concat([n]):null,tu(4,4,jp.bind(null,i,n),a)}function mh(){}function Bp(n,i){var a=fn();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&uh(i,c[1])?c[0]:(a.memoizedState=[n,i],n)}function $p(n,i){var a=fn();i=i===void 0?null:i;var c=a.memoizedState;return c!==null&&i!==null&&uh(i,c[1])?c[0]:(n=n(),a.memoizedState=[n,i],n)}function Wp(n,i,a){return(Ji&21)===0?(n.baseState&&(n.baseState=!1,qt=!0),n.memoizedState=a):(In(a,i)||(a=Wo(),nt.lanes|=a,Xi|=a,n.baseState=!0),i)}function NE(n,i){var a=xe;xe=a!==0&&4>a?a:4,n(!0);var c=lh.transition;lh.transition={};try{n(!1),i()}finally{xe=a,lh.transition=c}}function Hp(){return fn().memoizedState}function xE(n,i,a){var c=oi(n);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},qp(n))Kp(i,a);else if(a=Ip(n,i,a,c),a!==null){var d=Bt();kn(a,n,c,d),Gp(a,i,c)}}function DE(n,i,a){var c=oi(n),d={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(qp(n))Kp(i,d);else{var f=n.alternate;if(n.lanes===0&&(f===null||f.lanes===0)&&(f=i.lastRenderedReducer,f!==null))try{var v=i.lastRenderedState,I=f(v,a);if(d.hasEagerState=!0,d.eagerState=I,In(I,v)){var k=i.interleaved;k===null?(d.next=d,nh(i)):(d.next=k.next,k.next=d),i.interleaved=d;return}}catch{}finally{}a=Ip(n,i,d,c),a!==null&&(d=Bt(),kn(a,n,c,d),Gp(a,i,c))}}function qp(n){var i=n.alternate;return n===nt||i!==null&&i===nt}function Kp(n,i){ma=Zl=!0;var a=n.pending;a===null?i.next=i:(i.next=a.next,a.next=i),n.pending=i}function Gp(n,i,a){if((a&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,a|=c,i.lanes=a,qo(n,a)}}var nu={readContext:dn,useCallback:Vt,useContext:Vt,useEffect:Vt,useImperativeHandle:Vt,useInsertionEffect:Vt,useLayoutEffect:Vt,useMemo:Vt,useReducer:Vt,useRef:Vt,useState:Vt,useDebugValue:Vt,useDeferredValue:Vt,useTransition:Vt,useMutableSource:Vt,useSyncExternalStore:Vt,useId:Vt,unstable_isNewReconciler:!1},VE={readContext:dn,useCallback:function(n,i){return Yn().memoizedState=[n,i===void 0?null:i],n},useContext:dn,useEffect:bp,useImperativeHandle:function(n,i,a){return a=a!=null?a.concat([n]):null,eu(4194308,4,jp.bind(null,i,n),a)},useLayoutEffect:function(n,i){return eu(4194308,4,n,i)},useInsertionEffect:function(n,i){return eu(4,2,n,i)},useMemo:function(n,i){var a=Yn();return i=i===void 0?null:i,n=n(),a.memoizedState=[n,i],n},useReducer:function(n,i,a){var c=Yn();return i=a!==void 0?a(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=xE.bind(null,nt,n),[c.memoizedState,n]},useRef:function(n){var i=Yn();return n={current:n},i.memoizedState=n},useState:Lp,useDebugValue:mh,useDeferredValue:function(n){return Yn().memoizedState=n},useTransition:function(){var n=Lp(!1),i=n[0];return n=NE.bind(null,n[1]),Yn().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,a){var c=nt,d=Yn();if(et){if(a===void 0)throw Error(t(407));a=a()}else{if(a=i(),Et===null)throw Error(t(349));(Ji&30)!==0||Np(c,i,a)}d.memoizedState=a;var f={value:a,getSnapshot:i};return d.queue=f,bp(Dp.bind(null,c,f,n),[n]),c.flags|=2048,_a(9,xp.bind(null,c,f,a,i),void 0,null),a},useId:function(){var n=Yn(),i=Et.identifierPrefix;if(et){var a=yr,c=gr;a=(c&~(1<<32-Xt(c)-1)).toString(32)+a,i=":"+i+"R"+a,a=ga++,0<a&&(i+="H"+a.toString(32)),i+=":"}else a=PE++,i=":"+i+"r"+a.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},OE={readContext:dn,useCallback:Bp,useContext:dn,useEffect:ph,useImperativeHandle:zp,useInsertionEffect:Fp,useLayoutEffect:Up,useMemo:$p,useReducer:dh,useRef:Mp,useState:function(){return dh(ya)},useDebugValue:mh,useDeferredValue:function(n){var i=fn();return Wp(i,gt.memoizedState,n)},useTransition:function(){var n=dh(ya)[0],i=fn().memoizedState;return[n,i]},useMutableSource:kp,useSyncExternalStore:Pp,useId:Hp,unstable_isNewReconciler:!1},LE={readContext:dn,useCallback:Bp,useContext:dn,useEffect:ph,useImperativeHandle:zp,useInsertionEffect:Fp,useLayoutEffect:Up,useMemo:$p,useReducer:fh,useRef:Mp,useState:function(){return fh(ya)},useDebugValue:mh,useDeferredValue:function(n){var i=fn();return gt===null?i.memoizedState=n:Wp(i,gt.memoizedState,n)},useTransition:function(){var n=fh(ya)[0],i=fn().memoizedState;return[n,i]},useMutableSource:kp,useSyncExternalStore:Pp,useId:Hp,unstable_isNewReconciler:!1};function An(n,i){if(n&&n.defaultProps){i=ee({},i),n=n.defaultProps;for(var a in n)i[a]===void 0&&(i[a]=n[a]);return i}return i}function gh(n,i,a,c){i=n.memoizedState,a=a(c,i),a=a==null?i:ee({},i,a),n.memoizedState=a,n.lanes===0&&(n.updateQueue.baseState=a)}var ru={isMounted:function(n){return(n=n._reactInternals)?wn(n)===n:!1},enqueueSetState:function(n,i,a){n=n._reactInternals;var c=Bt(),d=oi(n),f=vr(c,d);f.payload=i,a!=null&&(f.callback=a),i=ni(n,f,d),i!==null&&(kn(i,n,d,c),Ql(i,n,d))},enqueueReplaceState:function(n,i,a){n=n._reactInternals;var c=Bt(),d=oi(n),f=vr(c,d);f.tag=1,f.payload=i,a!=null&&(f.callback=a),i=ni(n,f,d),i!==null&&(kn(i,n,d,c),Ql(i,n,d))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var a=Bt(),c=oi(n),d=vr(a,c);d.tag=2,i!=null&&(d.callback=i),i=ni(n,d,c),i!==null&&(kn(i,n,c,a),Ql(i,n,c))}};function Qp(n,i,a,c,d,f,v){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,f,v):i.prototype&&i.prototype.isPureReactComponent?!ia(a,c)||!ia(d,f):!0}function Yp(n,i,a){var c=!1,d=Zr,f=i.contextType;return typeof f=="object"&&f!==null?f=dn(f):(d=Ht(i)?qi:Dt.current,c=i.contextTypes,f=(c=c!=null)?Ks(n,d):Zr),i=new i(a,f),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=ru,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=d,n.__reactInternalMemoizedMaskedChildContext=f),i}function Jp(n,i,a,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(a,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(a,c),i.state!==n&&ru.enqueueReplaceState(i,i.state,null)}function yh(n,i,a,c){var d=n.stateNode;d.props=a,d.state=n.memoizedState,d.refs={},rh(n);var f=i.contextType;typeof f=="object"&&f!==null?d.context=dn(f):(f=Ht(i)?qi:Dt.current,d.context=Ks(n,f)),d.state=n.memoizedState,f=i.getDerivedStateFromProps,typeof f=="function"&&(gh(n,i,f,a),d.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(i=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),i!==d.state&&ru.enqueueReplaceState(d,d.state,null),Yl(n,a,d,c),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308)}function to(n,i){try{var a="",c=i;do a+=Ie(c),c=c.return;while(c);var d=a}catch(f){d=`
Error generating stack: `+f.message+`
`+f.stack}return{value:n,source:i,stack:d,digest:null}}function _h(n,i,a){return{value:n,source:null,stack:a??null,digest:i??null}}function vh(n,i){try{console.error(i.value)}catch(a){setTimeout(function(){throw a})}}var ME=typeof WeakMap=="function"?WeakMap:Map;function Xp(n,i,a){a=vr(-1,a),a.tag=3,a.payload={element:null};var c=i.value;return a.callback=function(){cu||(cu=!0,Oh=c),vh(n,i)},a}function Zp(n,i,a){a=vr(-1,a),a.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;a.payload=function(){return c(d)},a.callback=function(){vh(n,i)}}var f=n.stateNode;return f!==null&&typeof f.componentDidCatch=="function"&&(a.callback=function(){vh(n,i),typeof c!="function"&&(ii===null?ii=new Set([this]):ii.add(this));var v=i.stack;this.componentDidCatch(i.value,{componentStack:v!==null?v:""})}),a}function em(n,i,a){var c=n.pingCache;if(c===null){c=n.pingCache=new ME;var d=new Set;c.set(i,d)}else d=c.get(i),d===void 0&&(d=new Set,c.set(i,d));d.has(a)||(d.add(a),n=YE.bind(null,n,i,a),i.then(n,n))}function tm(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function nm(n,i,a,c,d){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(i=vr(-1,1),i.tag=2,ni(a,i,1))),a.lanes|=1),n):(n.flags|=65536,n.lanes=d,n)}var bE=Fe.ReactCurrentOwner,qt=!1;function zt(n,i,a,c){i.child=n===null?Tp(i,null,a,c):Js(i,n.child,a,c)}function rm(n,i,a,c,d){a=a.render;var f=i.ref;return Zs(i,d),c=ch(n,i,a,c,f,d),a=hh(),n!==null&&!qt?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,Er(n,i,d)):(et&&a&&Kc(i),i.flags|=1,zt(n,i,c,d),i.child)}function im(n,i,a,c,d){if(n===null){var f=a.type;return typeof f=="function"&&!zh(f)&&f.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(i.tag=15,i.type=f,sm(n,i,f,c,d)):(n=gu(a.type,null,c,i,i.mode,d),n.ref=i.ref,n.return=i,i.child=n)}if(f=n.child,(n.lanes&d)===0){var v=f.memoizedProps;if(a=a.compare,a=a!==null?a:ia,a(v,c)&&n.ref===i.ref)return Er(n,i,d)}return i.flags|=1,n=li(f,c),n.ref=i.ref,n.return=i,i.child=n}function sm(n,i,a,c,d){if(n!==null){var f=n.memoizedProps;if(ia(f,c)&&n.ref===i.ref)if(qt=!1,i.pendingProps=c=f,(n.lanes&d)!==0)(n.flags&131072)!==0&&(qt=!0);else return i.lanes=n.lanes,Er(n,i,d)}return Eh(n,i,a,c,d)}function om(n,i,a){var c=i.pendingProps,d=c.children,f=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ge(ro,on),on|=a;else{if((a&1073741824)===0)return n=f!==null?f.baseLanes|a:a,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Ge(ro,on),on|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=f!==null?f.baseLanes:a,Ge(ro,on),on|=c}else f!==null?(c=f.baseLanes|a,i.memoizedState=null):c=a,Ge(ro,on),on|=c;return zt(n,i,d,a),i.child}function am(n,i){var a=i.ref;(n===null&&a!==null||n!==null&&n.ref!==a)&&(i.flags|=512,i.flags|=2097152)}function Eh(n,i,a,c,d){var f=Ht(a)?qi:Dt.current;return f=Ks(i,f),Zs(i,d),a=ch(n,i,a,c,f,d),c=hh(),n!==null&&!qt?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~d,Er(n,i,d)):(et&&c&&Kc(i),i.flags|=1,zt(n,i,a,d),i.child)}function lm(n,i,a,c,d){if(Ht(a)){var f=!0;zl(i)}else f=!1;if(Zs(i,d),i.stateNode===null)su(n,i),Yp(i,a,c),yh(i,a,c,d),c=!0;else if(n===null){var v=i.stateNode,I=i.memoizedProps;v.props=I;var k=v.context,U=a.contextType;typeof U=="object"&&U!==null?U=dn(U):(U=Ht(a)?qi:Dt.current,U=Ks(i,U));var q=a.getDerivedStateFromProps,K=typeof q=="function"||typeof v.getSnapshotBeforeUpdate=="function";K||typeof v.UNSAFE_componentWillReceiveProps!="function"&&typeof v.componentWillReceiveProps!="function"||(I!==c||k!==U)&&Jp(i,v,c,U),ti=!1;var H=i.memoizedState;v.state=H,Yl(i,c,v,d),k=i.memoizedState,I!==c||H!==k||Wt.current||ti?(typeof q=="function"&&(gh(i,a,q,c),k=i.memoizedState),(I=ti||Qp(i,a,I,c,H,k,U))?(K||typeof v.UNSAFE_componentWillMount!="function"&&typeof v.componentWillMount!="function"||(typeof v.componentWillMount=="function"&&v.componentWillMount(),typeof v.UNSAFE_componentWillMount=="function"&&v.UNSAFE_componentWillMount()),typeof v.componentDidMount=="function"&&(i.flags|=4194308)):(typeof v.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=k),v.props=c,v.state=k,v.context=U,c=I):(typeof v.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{v=i.stateNode,Sp(n,i),I=i.memoizedProps,U=i.type===i.elementType?I:An(i.type,I),v.props=U,K=i.pendingProps,H=v.context,k=a.contextType,typeof k=="object"&&k!==null?k=dn(k):(k=Ht(a)?qi:Dt.current,k=Ks(i,k));var te=a.getDerivedStateFromProps;(q=typeof te=="function"||typeof v.getSnapshotBeforeUpdate=="function")||typeof v.UNSAFE_componentWillReceiveProps!="function"&&typeof v.componentWillReceiveProps!="function"||(I!==K||H!==k)&&Jp(i,v,c,k),ti=!1,H=i.memoizedState,v.state=H,Yl(i,c,v,d);var se=i.memoizedState;I!==K||H!==se||Wt.current||ti?(typeof te=="function"&&(gh(i,a,te,c),se=i.memoizedState),(U=ti||Qp(i,a,U,c,H,se,k)||!1)?(q||typeof v.UNSAFE_componentWillUpdate!="function"&&typeof v.componentWillUpdate!="function"||(typeof v.componentWillUpdate=="function"&&v.componentWillUpdate(c,se,k),typeof v.UNSAFE_componentWillUpdate=="function"&&v.UNSAFE_componentWillUpdate(c,se,k)),typeof v.componentDidUpdate=="function"&&(i.flags|=4),typeof v.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof v.componentDidUpdate!="function"||I===n.memoizedProps&&H===n.memoizedState||(i.flags|=4),typeof v.getSnapshotBeforeUpdate!="function"||I===n.memoizedProps&&H===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=se),v.props=c,v.state=se,v.context=k,c=U):(typeof v.componentDidUpdate!="function"||I===n.memoizedProps&&H===n.memoizedState||(i.flags|=4),typeof v.getSnapshotBeforeUpdate!="function"||I===n.memoizedProps&&H===n.memoizedState||(i.flags|=1024),c=!1)}return wh(n,i,a,c,f,d)}function wh(n,i,a,c,d,f){am(n,i);var v=(i.flags&128)!==0;if(!c&&!v)return d&&fp(i,a,!1),Er(n,i,f);c=i.stateNode,bE.current=i;var I=v&&typeof a.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&v?(i.child=Js(i,n.child,null,f),i.child=Js(i,null,I,f)):zt(n,i,I,f),i.memoizedState=c.state,d&&fp(i,a,!0),i.child}function um(n){var i=n.stateNode;i.pendingContext?hp(n,i.pendingContext,i.pendingContext!==i.context):i.context&&hp(n,i.context,!1),ih(n,i.containerInfo)}function cm(n,i,a,c,d){return Ys(),Jc(d),i.flags|=256,zt(n,i,a,c),i.child}var Th={dehydrated:null,treeContext:null,retryLane:0};function Ih(n){return{baseLanes:n,cachePool:null,transitions:null}}function hm(n,i,a){var c=i.pendingProps,d=tt.current,f=!1,v=(i.flags&128)!==0,I;if((I=v)||(I=n!==null&&n.memoizedState===null?!1:(d&2)!==0),I?(f=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(d|=1),Ge(tt,d&1),n===null)return Yc(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(v=c.children,n=c.fallback,f?(c=i.mode,f=i.child,v={mode:"hidden",children:v},(c&1)===0&&f!==null?(f.childLanes=0,f.pendingProps=v):f=yu(v,c,0,null),n=ns(n,c,a,null),f.return=i,n.return=i,f.sibling=n,i.child=f,i.child.memoizedState=Ih(a),i.memoizedState=Th,n):Sh(i,v));if(d=n.memoizedState,d!==null&&(I=d.dehydrated,I!==null))return FE(n,i,v,c,I,d,a);if(f){f=c.fallback,v=i.mode,d=n.child,I=d.sibling;var k={mode:"hidden",children:c.children};return(v&1)===0&&i.child!==d?(c=i.child,c.childLanes=0,c.pendingProps=k,i.deletions=null):(c=li(d,k),c.subtreeFlags=d.subtreeFlags&14680064),I!==null?f=li(I,f):(f=ns(f,v,a,null),f.flags|=2),f.return=i,c.return=i,c.sibling=f,i.child=c,c=f,f=i.child,v=n.child.memoizedState,v=v===null?Ih(a):{baseLanes:v.baseLanes|a,cachePool:null,transitions:v.transitions},f.memoizedState=v,f.childLanes=n.childLanes&~a,i.memoizedState=Th,c}return f=n.child,n=f.sibling,c=li(f,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=a),c.return=i,c.sibling=null,n!==null&&(a=i.deletions,a===null?(i.deletions=[n],i.flags|=16):a.push(n)),i.child=c,i.memoizedState=null,c}function Sh(n,i){return i=yu({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function iu(n,i,a,c){return c!==null&&Jc(c),Js(i,n.child,null,a),n=Sh(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function FE(n,i,a,c,d,f,v){if(a)return i.flags&256?(i.flags&=-257,c=_h(Error(t(422))),iu(n,i,v,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(f=c.fallback,d=i.mode,c=yu({mode:"visible",children:c.children},d,0,null),f=ns(f,d,v,null),f.flags|=2,c.return=i,f.return=i,c.sibling=f,i.child=c,(i.mode&1)!==0&&Js(i,n.child,null,v),i.child.memoizedState=Ih(v),i.memoizedState=Th,f);if((i.mode&1)===0)return iu(n,i,v,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var I=c.dgst;return c=I,f=Error(t(419)),c=_h(f,c,void 0),iu(n,i,v,c)}if(I=(v&n.childLanes)!==0,qt||I){if(c=Et,c!==null){switch(v&-v){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|v))!==0?0:d,d!==0&&d!==f.retryLane&&(f.retryLane=d,_r(n,d),kn(c,n,d,-1))}return jh(),c=_h(Error(t(421))),iu(n,i,v,c)}return d.data==="$?"?(i.flags|=128,i.child=n.child,i=JE.bind(null,n),d._reactRetry=i,null):(n=f.treeContext,sn=Jr(d.nextSibling),rn=i,et=!0,Sn=null,n!==null&&(cn[hn++]=gr,cn[hn++]=yr,cn[hn++]=Ki,gr=n.id,yr=n.overflow,Ki=i),i=Sh(i,c.children),i.flags|=4096,i)}function dm(n,i,a){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),th(n.return,i,a)}function Ah(n,i,a,c,d){var f=n.memoizedState;f===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:d}:(f.isBackwards=i,f.rendering=null,f.renderingStartTime=0,f.last=c,f.tail=a,f.tailMode=d)}function fm(n,i,a){var c=i.pendingProps,d=c.revealOrder,f=c.tail;if(zt(n,i,c.children,a),c=tt.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&dm(n,a,i);else if(n.tag===19)dm(n,a,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(Ge(tt,c),(i.mode&1)===0)i.memoizedState=null;else switch(d){case"forwards":for(a=i.child,d=null;a!==null;)n=a.alternate,n!==null&&Jl(n)===null&&(d=a),a=a.sibling;a=d,a===null?(d=i.child,i.child=null):(d=a.sibling,a.sibling=null),Ah(i,!1,d,a,f);break;case"backwards":for(a=null,d=i.child,i.child=null;d!==null;){if(n=d.alternate,n!==null&&Jl(n)===null){i.child=d;break}n=d.sibling,d.sibling=a,a=d,d=n}Ah(i,!0,a,null,f);break;case"together":Ah(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function su(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Er(n,i,a){if(n!==null&&(i.dependencies=n.dependencies),Xi|=i.lanes,(a&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,a=li(n,n.pendingProps),i.child=a,a.return=i;n.sibling!==null;)n=n.sibling,a=a.sibling=li(n,n.pendingProps),a.return=i;a.sibling=null}return i.child}function UE(n,i,a){switch(i.tag){case 3:um(i),Ys();break;case 5:Cp(i);break;case 1:Ht(i.type)&&zl(i);break;case 4:ih(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,d=i.memoizedProps.value;Ge(Kl,c._currentValue),c._currentValue=d;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(Ge(tt,tt.current&1),i.flags|=128,null):(a&i.child.childLanes)!==0?hm(n,i,a):(Ge(tt,tt.current&1),n=Er(n,i,a),n!==null?n.sibling:null);Ge(tt,tt.current&1);break;case 19:if(c=(a&i.childLanes)!==0,(n.flags&128)!==0){if(c)return fm(n,i,a);i.flags|=128}if(d=i.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),Ge(tt,tt.current),c)break;return null;case 22:case 23:return i.lanes=0,om(n,i,a)}return Er(n,i,a)}var pm,Rh,mm,gm;pm=function(n,i){for(var a=i.child;a!==null;){if(a.tag===5||a.tag===6)n.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===i)break;for(;a.sibling===null;){if(a.return===null||a.return===i)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},Rh=function(){},mm=function(n,i,a,c){var d=n.memoizedProps;if(d!==c){n=i.stateNode,Yi(Qn.current);var f=null;switch(a){case"input":d=vs(n,d),c=vs(n,c),f=[];break;case"select":d=ee({},d,{value:void 0}),c=ee({},c,{value:void 0}),f=[];break;case"textarea":d=Vo(n,d),c=Vo(n,c),f=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=Fl)}En(a,c);var v;a=null;for(U in d)if(!c.hasOwnProperty(U)&&d.hasOwnProperty(U)&&d[U]!=null)if(U==="style"){var I=d[U];for(v in I)I.hasOwnProperty(v)&&(a||(a={}),a[v]="")}else U!=="dangerouslySetInnerHTML"&&U!=="children"&&U!=="suppressContentEditableWarning"&&U!=="suppressHydrationWarning"&&U!=="autoFocus"&&(o.hasOwnProperty(U)?f||(f=[]):(f=f||[]).push(U,null));for(U in c){var k=c[U];if(I=d!=null?d[U]:void 0,c.hasOwnProperty(U)&&k!==I&&(k!=null||I!=null))if(U==="style")if(I){for(v in I)!I.hasOwnProperty(v)||k&&k.hasOwnProperty(v)||(a||(a={}),a[v]="");for(v in k)k.hasOwnProperty(v)&&I[v]!==k[v]&&(a||(a={}),a[v]=k[v])}else a||(f||(f=[]),f.push(U,a)),a=k;else U==="dangerouslySetInnerHTML"?(k=k?k.__html:void 0,I=I?I.__html:void 0,k!=null&&I!==k&&(f=f||[]).push(U,k)):U==="children"?typeof k!="string"&&typeof k!="number"||(f=f||[]).push(U,""+k):U!=="suppressContentEditableWarning"&&U!=="suppressHydrationWarning"&&(o.hasOwnProperty(U)?(k!=null&&U==="onScroll"&&Je("scroll",n),f||I===k||(f=[])):(f=f||[]).push(U,k))}a&&(f=f||[]).push("style",a);var U=f;(i.updateQueue=U)&&(i.flags|=4)}},gm=function(n,i,a,c){a!==c&&(i.flags|=4)};function va(n,i){if(!et)switch(n.tailMode){case"hidden":i=n.tail;for(var a=null;i!==null;)i.alternate!==null&&(a=i),i=i.sibling;a===null?n.tail=null:a.sibling=null;break;case"collapsed":a=n.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function Ot(n){var i=n.alternate!==null&&n.alternate.child===n.child,a=0,c=0;if(i)for(var d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=n,d=d.sibling;else for(d=n.child;d!==null;)a|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=n,d=d.sibling;return n.subtreeFlags|=c,n.childLanes=a,i}function jE(n,i,a){var c=i.pendingProps;switch(Gc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ot(i),null;case 1:return Ht(i.type)&&jl(),Ot(i),null;case 3:return c=i.stateNode,eo(),Xe(Wt),Xe(Dt),ah(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(Hl(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Sn!==null&&(bh(Sn),Sn=null))),Rh(n,i),Ot(i),null;case 5:sh(i);var d=Yi(pa.current);if(a=i.type,n!==null&&i.stateNode!=null)mm(n,i,a,c,d),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return Ot(i),null}if(n=Yi(Qn.current),Hl(i)){c=i.stateNode,a=i.type;var f=i.memoizedProps;switch(c[Gn]=i,c[ua]=f,n=(i.mode&1)!==0,a){case"dialog":Je("cancel",c),Je("close",c);break;case"iframe":case"object":case"embed":Je("load",c);break;case"video":case"audio":for(d=0;d<oa.length;d++)Je(oa[d],c);break;case"source":Je("error",c);break;case"img":case"image":case"link":Je("error",c),Je("load",c);break;case"details":Je("toggle",c);break;case"input":ul(c,f),Je("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!f.multiple},Je("invalid",c);break;case"textarea":Oo(c,f),Je("invalid",c)}En(a,f),d=null;for(var v in f)if(f.hasOwnProperty(v)){var I=f[v];v==="children"?typeof I=="string"?c.textContent!==I&&(f.suppressHydrationWarning!==!0&&bl(c.textContent,I,n),d=["children",I]):typeof I=="number"&&c.textContent!==""+I&&(f.suppressHydrationWarning!==!0&&bl(c.textContent,I,n),d=["children",""+I]):o.hasOwnProperty(v)&&I!=null&&v==="onScroll"&&Je("scroll",c)}switch(a){case"input":_s(c),Do(c,f,!0);break;case"textarea":_s(c),Lr(c);break;case"select":case"option":break;default:typeof f.onClick=="function"&&(c.onclick=Fl)}c=d,i.updateQueue=c,c!==null&&(i.flags|=4)}else{v=d.nodeType===9?d:d.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=Lo(a)),n==="http://www.w3.org/1999/xhtml"?a==="script"?(n=v.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=v.createElement(a,{is:c.is}):(n=v.createElement(a),a==="select"&&(v=n,c.multiple?v.multiple=!0:c.size&&(v.size=c.size))):n=v.createElementNS(n,a),n[Gn]=i,n[ua]=c,pm(n,i,!1,!1),i.stateNode=n;e:{switch(v=Is(a,c),a){case"dialog":Je("cancel",n),Je("close",n),d=c;break;case"iframe":case"object":case"embed":Je("load",n),d=c;break;case"video":case"audio":for(d=0;d<oa.length;d++)Je(oa[d],n);d=c;break;case"source":Je("error",n),d=c;break;case"img":case"image":case"link":Je("error",n),Je("load",n),d=c;break;case"details":Je("toggle",n),d=c;break;case"input":ul(n,c),d=vs(n,c),Je("invalid",n);break;case"option":d=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},d=ee({},c,{value:void 0}),Je("invalid",n);break;case"textarea":Oo(n,c),d=Vo(n,c),Je("invalid",n);break;default:d=c}En(a,d),I=d;for(f in I)if(I.hasOwnProperty(f)){var k=I[f];f==="style"?Ts(n,k):f==="dangerouslySetInnerHTML"?(k=k?k.__html:void 0,k!=null&&hl(n,k)):f==="children"?typeof k=="string"?(a!=="textarea"||k!=="")&&xi(n,k):typeof k=="number"&&xi(n,""+k):f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&f!=="autoFocus"&&(o.hasOwnProperty(f)?k!=null&&f==="onScroll"&&Je("scroll",n):k!=null&&Ce(n,f,k,v))}switch(a){case"input":_s(n),Do(n,c,!1);break;case"textarea":_s(n),Lr(n);break;case"option":c.value!=null&&n.setAttribute("value",""+Le(c.value));break;case"select":n.multiple=!!c.multiple,f=c.value,f!=null?vn(n,!!c.multiple,f,!1):c.defaultValue!=null&&vn(n,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(n.onclick=Fl)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return Ot(i),null;case 6:if(n&&i.stateNode!=null)gm(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(a=Yi(pa.current),Yi(Qn.current),Hl(i)){if(c=i.stateNode,a=i.memoizedProps,c[Gn]=i,(f=c.nodeValue!==a)&&(n=rn,n!==null))switch(n.tag){case 3:bl(c.nodeValue,a,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&bl(c.nodeValue,a,(n.mode&1)!==0)}f&&(i.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[Gn]=i,i.stateNode=c}return Ot(i),null;case 13:if(Xe(tt),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(et&&sn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)vp(),Ys(),i.flags|=98560,f=!1;else if(f=Hl(i),c!==null&&c.dehydrated!==null){if(n===null){if(!f)throw Error(t(318));if(f=i.memoizedState,f=f!==null?f.dehydrated:null,!f)throw Error(t(317));f[Gn]=i}else Ys(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Ot(i),f=!1}else Sn!==null&&(bh(Sn),Sn=null),f=!0;if(!f)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=a,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(tt.current&1)!==0?yt===0&&(yt=3):jh())),i.updateQueue!==null&&(i.flags|=4),Ot(i),null);case 4:return eo(),Rh(n,i),n===null&&aa(i.stateNode.containerInfo),Ot(i),null;case 10:return eh(i.type._context),Ot(i),null;case 17:return Ht(i.type)&&jl(),Ot(i),null;case 19:if(Xe(tt),f=i.memoizedState,f===null)return Ot(i),null;if(c=(i.flags&128)!==0,v=f.rendering,v===null)if(c)va(f,!1);else{if(yt!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(v=Jl(n),v!==null){for(i.flags|=128,va(f,!1),c=v.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=a,a=i.child;a!==null;)f=a,n=c,f.flags&=14680066,v=f.alternate,v===null?(f.childLanes=0,f.lanes=n,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=v.childLanes,f.lanes=v.lanes,f.child=v.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=v.memoizedProps,f.memoizedState=v.memoizedState,f.updateQueue=v.updateQueue,f.type=v.type,n=v.dependencies,f.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),a=a.sibling;return Ge(tt,tt.current&1|2),i.child}n=n.sibling}f.tail!==null&&Ye()>io&&(i.flags|=128,c=!0,va(f,!1),i.lanes=4194304)}else{if(!c)if(n=Jl(v),n!==null){if(i.flags|=128,c=!0,a=n.updateQueue,a!==null&&(i.updateQueue=a,i.flags|=4),va(f,!0),f.tail===null&&f.tailMode==="hidden"&&!v.alternate&&!et)return Ot(i),null}else 2*Ye()-f.renderingStartTime>io&&a!==1073741824&&(i.flags|=128,c=!0,va(f,!1),i.lanes=4194304);f.isBackwards?(v.sibling=i.child,i.child=v):(a=f.last,a!==null?a.sibling=v:i.child=v,f.last=v)}return f.tail!==null?(i=f.tail,f.rendering=i,f.tail=i.sibling,f.renderingStartTime=Ye(),i.sibling=null,a=tt.current,Ge(tt,c?a&1|2:a&1),i):(Ot(i),null);case 22:case 23:return Uh(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(on&1073741824)!==0&&(Ot(i),i.subtreeFlags&6&&(i.flags|=8192)):Ot(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function zE(n,i){switch(Gc(i),i.tag){case 1:return Ht(i.type)&&jl(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return eo(),Xe(Wt),Xe(Dt),ah(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return sh(i),null;case 13:if(Xe(tt),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));Ys()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Xe(tt),null;case 4:return eo(),null;case 10:return eh(i.type._context),null;case 22:case 23:return Uh(),null;case 24:return null;default:return null}}var ou=!1,Lt=!1,BE=typeof WeakSet=="function"?WeakSet:Set,ie=null;function no(n,i){var a=n.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){st(n,i,c)}else a.current=null}function Ch(n,i,a){try{a()}catch(c){st(n,i,c)}}var ym=!1;function $E(n,i){if(Uc=hr,n=Qf(),xc(n)){if("selectionStart"in n)var a={start:n.selectionStart,end:n.selectionEnd};else e:{a=(a=n.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var d=c.anchorOffset,f=c.focusNode;c=c.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break e}var v=0,I=-1,k=-1,U=0,q=0,K=n,H=null;t:for(;;){for(var te;K!==a||d!==0&&K.nodeType!==3||(I=v+d),K!==f||c!==0&&K.nodeType!==3||(k=v+c),K.nodeType===3&&(v+=K.nodeValue.length),(te=K.firstChild)!==null;)H=K,K=te;for(;;){if(K===n)break t;if(H===a&&++U===d&&(I=v),H===f&&++q===c&&(k=v),(te=K.nextSibling)!==null)break;K=H,H=K.parentNode}K=te}a=I===-1||k===-1?null:{start:I,end:k}}else a=null}a=a||{start:0,end:0}}else a=null;for(jc={focusedElem:n,selectionRange:a},hr=!1,ie=i;ie!==null;)if(i=ie,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,ie=n;else for(;ie!==null;){i=ie;try{var se=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(se!==null){var oe=se.memoizedProps,lt=se.memoizedState,L=i.stateNode,x=L.getSnapshotBeforeUpdate(i.elementType===i.type?oe:An(i.type,oe),lt);L.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var F=i.stateNode.containerInfo;F.nodeType===1?F.textContent="":F.nodeType===9&&F.documentElement&&F.removeChild(F.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Y){st(i,i.return,Y)}if(n=i.sibling,n!==null){n.return=i.return,ie=n;break}ie=i.return}return se=ym,ym=!1,se}function Ea(n,i,a){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&n)===n){var f=d.destroy;d.destroy=void 0,f!==void 0&&Ch(i,a,f)}d=d.next}while(d!==c)}}function au(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&n)===n){var c=a.create;a.destroy=c()}a=a.next}while(a!==i)}}function kh(n){var i=n.ref;if(i!==null){var a=n.stateNode;switch(n.tag){case 5:n=a;break;default:n=a}typeof i=="function"?i(n):i.current=n}}function _m(n){var i=n.alternate;i!==null&&(n.alternate=null,_m(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[Gn],delete i[ua],delete i[Wc],delete i[AE],delete i[RE])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function vm(n){return n.tag===5||n.tag===3||n.tag===4}function Em(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||vm(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Ph(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.nodeType===8?a.parentNode.insertBefore(n,i):a.insertBefore(n,i):(a.nodeType===8?(i=a.parentNode,i.insertBefore(n,a)):(i=a,i.appendChild(n)),a=a._reactRootContainer,a!=null||i.onclick!==null||(i.onclick=Fl));else if(c!==4&&(n=n.child,n!==null))for(Ph(n,i,a),n=n.sibling;n!==null;)Ph(n,i,a),n=n.sibling}function Nh(n,i,a){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?a.insertBefore(n,i):a.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(Nh(n,i,a),n=n.sibling;n!==null;)Nh(n,i,a),n=n.sibling}var Rt=null,Rn=!1;function ri(n,i,a){for(a=a.child;a!==null;)wm(n,i,a),a=a.sibling}function wm(n,i,a){if(Jt&&typeof Jt.onCommitFiberUnmount=="function")try{Jt.onCommitFiberUnmount(Mi,a)}catch{}switch(a.tag){case 5:Lt||no(a,i);case 6:var c=Rt,d=Rn;Rt=null,ri(n,i,a),Rt=c,Rn=d,Rt!==null&&(Rn?(n=Rt,a=a.stateNode,n.nodeType===8?n.parentNode.removeChild(a):n.removeChild(a)):Rt.removeChild(a.stateNode));break;case 18:Rt!==null&&(Rn?(n=Rt,a=a.stateNode,n.nodeType===8?$c(n.parentNode,a):n.nodeType===1&&$c(n,a),Kr(n)):$c(Rt,a.stateNode));break;case 4:c=Rt,d=Rn,Rt=a.stateNode.containerInfo,Rn=!0,ri(n,i,a),Rt=c,Rn=d;break;case 0:case 11:case 14:case 15:if(!Lt&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var f=d,v=f.destroy;f=f.tag,v!==void 0&&((f&2)!==0||(f&4)!==0)&&Ch(a,i,v),d=d.next}while(d!==c)}ri(n,i,a);break;case 1:if(!Lt&&(no(a,i),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(I){st(a,i,I)}ri(n,i,a);break;case 21:ri(n,i,a);break;case 22:a.mode&1?(Lt=(c=Lt)||a.memoizedState!==null,ri(n,i,a),Lt=c):ri(n,i,a);break;default:ri(n,i,a)}}function Tm(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var a=n.stateNode;a===null&&(a=n.stateNode=new BE),i.forEach(function(c){var d=XE.bind(null,n,c);a.has(c)||(a.add(c),c.then(d,d))})}}function Cn(n,i){var a=i.deletions;if(a!==null)for(var c=0;c<a.length;c++){var d=a[c];try{var f=n,v=i,I=v;e:for(;I!==null;){switch(I.tag){case 5:Rt=I.stateNode,Rn=!1;break e;case 3:Rt=I.stateNode.containerInfo,Rn=!0;break e;case 4:Rt=I.stateNode.containerInfo,Rn=!0;break e}I=I.return}if(Rt===null)throw Error(t(160));wm(f,v,d),Rt=null,Rn=!1;var k=d.alternate;k!==null&&(k.return=null),d.return=null}catch(U){st(d,i,U)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)Im(i,n),i=i.sibling}function Im(n,i){var a=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Cn(i,n),Jn(n),c&4){try{Ea(3,n,n.return),au(3,n)}catch(oe){st(n,n.return,oe)}try{Ea(5,n,n.return)}catch(oe){st(n,n.return,oe)}}break;case 1:Cn(i,n),Jn(n),c&512&&a!==null&&no(a,a.return);break;case 5:if(Cn(i,n),Jn(n),c&512&&a!==null&&no(a,a.return),n.flags&32){var d=n.stateNode;try{xi(d,"")}catch(oe){st(n,n.return,oe)}}if(c&4&&(d=n.stateNode,d!=null)){var f=n.memoizedProps,v=a!==null?a.memoizedProps:f,I=n.type,k=n.updateQueue;if(n.updateQueue=null,k!==null)try{I==="input"&&f.type==="radio"&&f.name!=null&&Es(d,f),Is(I,v);var U=Is(I,f);for(v=0;v<k.length;v+=2){var q=k[v],K=k[v+1];q==="style"?Ts(d,K):q==="dangerouslySetInnerHTML"?hl(d,K):q==="children"?xi(d,K):Ce(d,q,K,U)}switch(I){case"input":Ni(d,f);break;case"textarea":cl(d,f);break;case"select":var H=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!f.multiple;var te=f.value;te!=null?vn(d,!!f.multiple,te,!1):H!==!!f.multiple&&(f.defaultValue!=null?vn(d,!!f.multiple,f.defaultValue,!0):vn(d,!!f.multiple,f.multiple?[]:"",!1))}d[ua]=f}catch(oe){st(n,n.return,oe)}}break;case 6:if(Cn(i,n),Jn(n),c&4){if(n.stateNode===null)throw Error(t(162));d=n.stateNode,f=n.memoizedProps;try{d.nodeValue=f}catch(oe){st(n,n.return,oe)}}break;case 3:if(Cn(i,n),Jn(n),c&4&&a!==null&&a.memoizedState.isDehydrated)try{Kr(i.containerInfo)}catch(oe){st(n,n.return,oe)}break;case 4:Cn(i,n),Jn(n);break;case 13:Cn(i,n),Jn(n),d=n.child,d.flags&8192&&(f=d.memoizedState!==null,d.stateNode.isHidden=f,!f||d.alternate!==null&&d.alternate.memoizedState!==null||(Vh=Ye())),c&4&&Tm(n);break;case 22:if(q=a!==null&&a.memoizedState!==null,n.mode&1?(Lt=(U=Lt)||q,Cn(i,n),Lt=U):Cn(i,n),Jn(n),c&8192){if(U=n.memoizedState!==null,(n.stateNode.isHidden=U)&&!q&&(n.mode&1)!==0)for(ie=n,q=n.child;q!==null;){for(K=ie=q;ie!==null;){switch(H=ie,te=H.child,H.tag){case 0:case 11:case 14:case 15:Ea(4,H,H.return);break;case 1:no(H,H.return);var se=H.stateNode;if(typeof se.componentWillUnmount=="function"){c=H,a=H.return;try{i=c,se.props=i.memoizedProps,se.state=i.memoizedState,se.componentWillUnmount()}catch(oe){st(c,a,oe)}}break;case 5:no(H,H.return);break;case 22:if(H.memoizedState!==null){Rm(K);continue}}te!==null?(te.return=H,ie=te):Rm(K)}q=q.sibling}e:for(q=null,K=n;;){if(K.tag===5){if(q===null){q=K;try{d=K.stateNode,U?(f=d.style,typeof f.setProperty=="function"?f.setProperty("display","none","important"):f.display="none"):(I=K.stateNode,k=K.memoizedProps.style,v=k!=null&&k.hasOwnProperty("display")?k.display:null,I.style.display=Fr("display",v))}catch(oe){st(n,n.return,oe)}}}else if(K.tag===6){if(q===null)try{K.stateNode.nodeValue=U?"":K.memoizedProps}catch(oe){st(n,n.return,oe)}}else if((K.tag!==22&&K.tag!==23||K.memoizedState===null||K===n)&&K.child!==null){K.child.return=K,K=K.child;continue}if(K===n)break e;for(;K.sibling===null;){if(K.return===null||K.return===n)break e;q===K&&(q=null),K=K.return}q===K&&(q=null),K.sibling.return=K.return,K=K.sibling}}break;case 19:Cn(i,n),Jn(n),c&4&&Tm(n);break;case 21:break;default:Cn(i,n),Jn(n)}}function Jn(n){var i=n.flags;if(i&2){try{e:{for(var a=n.return;a!==null;){if(vm(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(xi(d,""),c.flags&=-33);var f=Em(n);Nh(n,f,d);break;case 3:case 4:var v=c.stateNode.containerInfo,I=Em(n);Ph(n,I,v);break;default:throw Error(t(161))}}catch(k){st(n,n.return,k)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function WE(n,i,a){ie=n,Sm(n)}function Sm(n,i,a){for(var c=(n.mode&1)!==0;ie!==null;){var d=ie,f=d.child;if(d.tag===22&&c){var v=d.memoizedState!==null||ou;if(!v){var I=d.alternate,k=I!==null&&I.memoizedState!==null||Lt;I=ou;var U=Lt;if(ou=v,(Lt=k)&&!U)for(ie=d;ie!==null;)v=ie,k=v.child,v.tag===22&&v.memoizedState!==null?Cm(d):k!==null?(k.return=v,ie=k):Cm(d);for(;f!==null;)ie=f,Sm(f),f=f.sibling;ie=d,ou=I,Lt=U}Am(n)}else(d.subtreeFlags&8772)!==0&&f!==null?(f.return=d,ie=f):Am(n)}}function Am(n){for(;ie!==null;){var i=ie;if((i.flags&8772)!==0){var a=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:Lt||au(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!Lt)if(a===null)c.componentDidMount();else{var d=i.elementType===i.type?a.memoizedProps:An(i.type,a.memoizedProps);c.componentDidUpdate(d,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var f=i.updateQueue;f!==null&&Rp(i,f,c);break;case 3:var v=i.updateQueue;if(v!==null){if(a=null,i.child!==null)switch(i.child.tag){case 5:a=i.child.stateNode;break;case 1:a=i.child.stateNode}Rp(i,v,a)}break;case 5:var I=i.stateNode;if(a===null&&i.flags&4){a=I;var k=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":k.autoFocus&&a.focus();break;case"img":k.src&&(a.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var U=i.alternate;if(U!==null){var q=U.memoizedState;if(q!==null){var K=q.dehydrated;K!==null&&Kr(K)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}Lt||i.flags&512&&kh(i)}catch(H){st(i,i.return,H)}}if(i===n){ie=null;break}if(a=i.sibling,a!==null){a.return=i.return,ie=a;break}ie=i.return}}function Rm(n){for(;ie!==null;){var i=ie;if(i===n){ie=null;break}var a=i.sibling;if(a!==null){a.return=i.return,ie=a;break}ie=i.return}}function Cm(n){for(;ie!==null;){var i=ie;try{switch(i.tag){case 0:case 11:case 15:var a=i.return;try{au(4,i)}catch(k){st(i,a,k)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var d=i.return;try{c.componentDidMount()}catch(k){st(i,d,k)}}var f=i.return;try{kh(i)}catch(k){st(i,f,k)}break;case 5:var v=i.return;try{kh(i)}catch(k){st(i,v,k)}}}catch(k){st(i,i.return,k)}if(i===n){ie=null;break}var I=i.sibling;if(I!==null){I.return=i.return,ie=I;break}ie=i.return}}var HE=Math.ceil,lu=Fe.ReactCurrentDispatcher,xh=Fe.ReactCurrentOwner,pn=Fe.ReactCurrentBatchConfig,Me=0,Et=null,dt=null,Ct=0,on=0,ro=Xr(0),yt=0,wa=null,Xi=0,uu=0,Dh=0,Ta=null,Kt=null,Vh=0,io=1/0,wr=null,cu=!1,Oh=null,ii=null,hu=!1,si=null,du=0,Ia=0,Lh=null,fu=-1,pu=0;function Bt(){return(Me&6)!==0?Ye():fu!==-1?fu:fu=Ye()}function oi(n){return(n.mode&1)===0?1:(Me&2)!==0&&Ct!==0?Ct&-Ct:kE.transition!==null?(pu===0&&(pu=Wo()),pu):(n=xe,n!==0||(n=window.event,n=n===void 0?16:Vs(n.type)),n)}function kn(n,i,a,c){if(50<Ia)throw Ia=0,Lh=null,Error(t(185));ji(n,a,c),((Me&2)===0||n!==Et)&&(n===Et&&((Me&2)===0&&(uu|=a),yt===4&&ai(n,Ct)),Gt(n,c),a===1&&Me===0&&(i.mode&1)===0&&(io=Ye()+500,Bl&&ei()))}function Gt(n,i){var a=n.callbackNode;Ui(n,i);var c=lr(n,n===Et?Ct:0);if(c===0)a!==null&&Rs(a),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(a!=null&&Rs(a),i===1)n.tag===0?CE(Pm.bind(null,n)):pp(Pm.bind(null,n)),IE(function(){(Me&6)===0&&ei()}),a=null;else{switch(Fn(c)){case 1:a=Cs;break;case 4:a=zo;break;case 16:a=Li;break;case 536870912:a=ks;break;default:a=Li}a=bm(a,km.bind(null,n))}n.callbackPriority=i,n.callbackNode=a}}function km(n,i){if(fu=-1,pu=0,(Me&6)!==0)throw Error(t(327));var a=n.callbackNode;if(so()&&n.callbackNode!==a)return null;var c=lr(n,n===Et?Ct:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=mu(n,c);else{i=c;var d=Me;Me|=2;var f=xm();(Et!==n||Ct!==i)&&(wr=null,io=Ye()+500,es(n,i));do try{GE();break}catch(I){Nm(n,I)}while(!0);Zc(),lu.current=f,Me=d,dt!==null?i=0:(Et=null,Ct=0,i=yt)}if(i!==0){if(i===2&&(d=$o(n),d!==0&&(c=d,i=Mh(n,d))),i===1)throw a=wa,es(n,0),ai(n,c),Gt(n,Ye()),a;if(i===6)ai(n,c);else{if(d=n.current.alternate,(c&30)===0&&!qE(d)&&(i=mu(n,c),i===2&&(f=$o(n),f!==0&&(c=f,i=Mh(n,f))),i===1))throw a=wa,es(n,0),ai(n,c),Gt(n,Ye()),a;switch(n.finishedWork=d,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:ts(n,Kt,wr);break;case 3:if(ai(n,c),(c&130023424)===c&&(i=Vh+500-Ye(),10<i)){if(lr(n,0)!==0)break;if(d=n.suspendedLanes,(d&c)!==c){Bt(),n.pingedLanes|=n.suspendedLanes&d;break}n.timeoutHandle=Bc(ts.bind(null,n,Kt,wr),i);break}ts(n,Kt,wr);break;case 4:if(ai(n,c),(c&4194240)===c)break;for(i=n.eventTimes,d=-1;0<c;){var v=31-Xt(c);f=1<<v,v=i[v],v>d&&(d=v),c&=~f}if(c=d,c=Ye()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*HE(c/1960))-c,10<c){n.timeoutHandle=Bc(ts.bind(null,n,Kt,wr),c);break}ts(n,Kt,wr);break;case 5:ts(n,Kt,wr);break;default:throw Error(t(329))}}}return Gt(n,Ye()),n.callbackNode===a?km.bind(null,n):null}function Mh(n,i){var a=Ta;return n.current.memoizedState.isDehydrated&&(es(n,i).flags|=256),n=mu(n,i),n!==2&&(i=Kt,Kt=a,i!==null&&bh(i)),n}function bh(n){Kt===null?Kt=n:Kt.push.apply(Kt,n)}function qE(n){for(var i=n;;){if(i.flags&16384){var a=i.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var d=a[c],f=d.getSnapshot;d=d.value;try{if(!In(f(),d))return!1}catch{return!1}}}if(a=i.child,i.subtreeFlags&16384&&a!==null)a.return=i,i=a;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function ai(n,i){for(i&=~Dh,i&=~uu,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var a=31-Xt(i),c=1<<a;n[a]=-1,i&=~c}}function Pm(n){if((Me&6)!==0)throw Error(t(327));so();var i=lr(n,0);if((i&1)===0)return Gt(n,Ye()),null;var a=mu(n,i);if(n.tag!==0&&a===2){var c=$o(n);c!==0&&(i=c,a=Mh(n,c))}if(a===1)throw a=wa,es(n,0),ai(n,i),Gt(n,Ye()),a;if(a===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,ts(n,Kt,wr),Gt(n,Ye()),null}function Fh(n,i){var a=Me;Me|=1;try{return n(i)}finally{Me=a,Me===0&&(io=Ye()+500,Bl&&ei())}}function Zi(n){si!==null&&si.tag===0&&(Me&6)===0&&so();var i=Me;Me|=1;var a=pn.transition,c=xe;try{if(pn.transition=null,xe=1,n)return n()}finally{xe=c,pn.transition=a,Me=i,(Me&6)===0&&ei()}}function Uh(){on=ro.current,Xe(ro)}function es(n,i){n.finishedWork=null,n.finishedLanes=0;var a=n.timeoutHandle;if(a!==-1&&(n.timeoutHandle=-1,TE(a)),dt!==null)for(a=dt.return;a!==null;){var c=a;switch(Gc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&jl();break;case 3:eo(),Xe(Wt),Xe(Dt),ah();break;case 5:sh(c);break;case 4:eo();break;case 13:Xe(tt);break;case 19:Xe(tt);break;case 10:eh(c.type._context);break;case 22:case 23:Uh()}a=a.return}if(Et=n,dt=n=li(n.current,null),Ct=on=i,yt=0,wa=null,Dh=uu=Xi=0,Kt=Ta=null,Qi!==null){for(i=0;i<Qi.length;i++)if(a=Qi[i],c=a.interleaved,c!==null){a.interleaved=null;var d=c.next,f=a.pending;if(f!==null){var v=f.next;f.next=d,c.next=v}a.pending=c}Qi=null}return n}function Nm(n,i){do{var a=dt;try{if(Zc(),Xl.current=nu,Zl){for(var c=nt.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}Zl=!1}if(Ji=0,vt=gt=nt=null,ma=!1,ga=0,xh.current=null,a===null||a.return===null){yt=1,wa=i,dt=null;break}e:{var f=n,v=a.return,I=a,k=i;if(i=Ct,I.flags|=32768,k!==null&&typeof k=="object"&&typeof k.then=="function"){var U=k,q=I,K=q.tag;if((q.mode&1)===0&&(K===0||K===11||K===15)){var H=q.alternate;H?(q.updateQueue=H.updateQueue,q.memoizedState=H.memoizedState,q.lanes=H.lanes):(q.updateQueue=null,q.memoizedState=null)}var te=tm(v);if(te!==null){te.flags&=-257,nm(te,v,I,f,i),te.mode&1&&em(f,U,i),i=te,k=U;var se=i.updateQueue;if(se===null){var oe=new Set;oe.add(k),i.updateQueue=oe}else se.add(k);break e}else{if((i&1)===0){em(f,U,i),jh();break e}k=Error(t(426))}}else if(et&&I.mode&1){var lt=tm(v);if(lt!==null){(lt.flags&65536)===0&&(lt.flags|=256),nm(lt,v,I,f,i),Jc(to(k,I));break e}}f=k=to(k,I),yt!==4&&(yt=2),Ta===null?Ta=[f]:Ta.push(f),f=v;do{switch(f.tag){case 3:f.flags|=65536,i&=-i,f.lanes|=i;var L=Xp(f,k,i);Ap(f,L);break e;case 1:I=k;var x=f.type,F=f.stateNode;if((f.flags&128)===0&&(typeof x.getDerivedStateFromError=="function"||F!==null&&typeof F.componentDidCatch=="function"&&(ii===null||!ii.has(F)))){f.flags|=65536,i&=-i,f.lanes|=i;var Y=Zp(f,I,i);Ap(f,Y);break e}}f=f.return}while(f!==null)}Vm(a)}catch(le){i=le,dt===a&&a!==null&&(dt=a=a.return);continue}break}while(!0)}function xm(){var n=lu.current;return lu.current=nu,n===null?nu:n}function jh(){(yt===0||yt===3||yt===2)&&(yt=4),Et===null||(Xi&268435455)===0&&(uu&268435455)===0||ai(Et,Ct)}function mu(n,i){var a=Me;Me|=2;var c=xm();(Et!==n||Ct!==i)&&(wr=null,es(n,i));do try{KE();break}catch(d){Nm(n,d)}while(!0);if(Zc(),Me=a,lu.current=c,dt!==null)throw Error(t(261));return Et=null,Ct=0,yt}function KE(){for(;dt!==null;)Dm(dt)}function GE(){for(;dt!==null&&!Oi();)Dm(dt)}function Dm(n){var i=Mm(n.alternate,n,on);n.memoizedProps=n.pendingProps,i===null?Vm(n):dt=i,xh.current=null}function Vm(n){var i=n;do{var a=i.alternate;if(n=i.return,(i.flags&32768)===0){if(a=jE(a,i,on),a!==null){dt=a;return}}else{if(a=zE(a,i),a!==null){a.flags&=32767,dt=a;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{yt=6,dt=null;return}}if(i=i.sibling,i!==null){dt=i;return}dt=i=n}while(i!==null);yt===0&&(yt=5)}function ts(n,i,a){var c=xe,d=pn.transition;try{pn.transition=null,xe=1,QE(n,i,a,c)}finally{pn.transition=d,xe=c}return null}function QE(n,i,a,c){do so();while(si!==null);if((Me&6)!==0)throw Error(t(327));a=n.finishedWork;var d=n.finishedLanes;if(a===null)return null;if(n.finishedWork=null,n.finishedLanes=0,a===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var f=a.lanes|a.childLanes;if(Rc(n,f),n===Et&&(dt=Et=null,Ct=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||hu||(hu=!0,bm(Li,function(){return so(),null})),f=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||f){f=pn.transition,pn.transition=null;var v=xe;xe=1;var I=Me;Me|=4,xh.current=null,$E(n,a),Im(a,n),mE(jc),hr=!!Uc,jc=Uc=null,n.current=a,WE(a),ar(),Me=I,xe=v,pn.transition=f}else n.current=a;if(hu&&(hu=!1,si=n,du=d),f=n.pendingLanes,f===0&&(ii=null),Tl(a.stateNode),Gt(n,Ye()),i!==null)for(c=n.onRecoverableError,a=0;a<i.length;a++)d=i[a],c(d.value,{componentStack:d.stack,digest:d.digest});if(cu)throw cu=!1,n=Oh,Oh=null,n;return(du&1)!==0&&n.tag!==0&&so(),f=n.pendingLanes,(f&1)!==0?n===Lh?Ia++:(Ia=0,Lh=n):Ia=0,ei(),null}function so(){if(si!==null){var n=Fn(du),i=pn.transition,a=xe;try{if(pn.transition=null,xe=16>n?16:n,si===null)var c=!1;else{if(n=si,si=null,du=0,(Me&6)!==0)throw Error(t(331));var d=Me;for(Me|=4,ie=n.current;ie!==null;){var f=ie,v=f.child;if((ie.flags&16)!==0){var I=f.deletions;if(I!==null){for(var k=0;k<I.length;k++){var U=I[k];for(ie=U;ie!==null;){var q=ie;switch(q.tag){case 0:case 11:case 15:Ea(8,q,f)}var K=q.child;if(K!==null)K.return=q,ie=K;else for(;ie!==null;){q=ie;var H=q.sibling,te=q.return;if(_m(q),q===U){ie=null;break}if(H!==null){H.return=te,ie=H;break}ie=te}}}var se=f.alternate;if(se!==null){var oe=se.child;if(oe!==null){se.child=null;do{var lt=oe.sibling;oe.sibling=null,oe=lt}while(oe!==null)}}ie=f}}if((f.subtreeFlags&2064)!==0&&v!==null)v.return=f,ie=v;else e:for(;ie!==null;){if(f=ie,(f.flags&2048)!==0)switch(f.tag){case 0:case 11:case 15:Ea(9,f,f.return)}var L=f.sibling;if(L!==null){L.return=f.return,ie=L;break e}ie=f.return}}var x=n.current;for(ie=x;ie!==null;){v=ie;var F=v.child;if((v.subtreeFlags&2064)!==0&&F!==null)F.return=v,ie=F;else e:for(v=x;ie!==null;){if(I=ie,(I.flags&2048)!==0)try{switch(I.tag){case 0:case 11:case 15:au(9,I)}}catch(le){st(I,I.return,le)}if(I===v){ie=null;break e}var Y=I.sibling;if(Y!==null){Y.return=I.return,ie=Y;break e}ie=I.return}}if(Me=d,ei(),Jt&&typeof Jt.onPostCommitFiberRoot=="function")try{Jt.onPostCommitFiberRoot(Mi,n)}catch{}c=!0}return c}finally{xe=a,pn.transition=i}}return!1}function Om(n,i,a){i=to(a,i),i=Xp(n,i,1),n=ni(n,i,1),i=Bt(),n!==null&&(ji(n,1,i),Gt(n,i))}function st(n,i,a){if(n.tag===3)Om(n,n,a);else for(;i!==null;){if(i.tag===3){Om(i,n,a);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(ii===null||!ii.has(c))){n=to(a,n),n=Zp(i,n,1),i=ni(i,n,1),n=Bt(),i!==null&&(ji(i,1,n),Gt(i,n));break}}i=i.return}}function YE(n,i,a){var c=n.pingCache;c!==null&&c.delete(i),i=Bt(),n.pingedLanes|=n.suspendedLanes&a,Et===n&&(Ct&a)===a&&(yt===4||yt===3&&(Ct&130023424)===Ct&&500>Ye()-Vh?es(n,0):Dh|=a),Gt(n,i)}function Lm(n,i){i===0&&((n.mode&1)===0?i=1:(i=Wr,Wr<<=1,(Wr&130023424)===0&&(Wr=4194304)));var a=Bt();n=_r(n,i),n!==null&&(ji(n,i,a),Gt(n,a))}function JE(n){var i=n.memoizedState,a=0;i!==null&&(a=i.retryLane),Lm(n,a)}function XE(n,i){var a=0;switch(n.tag){case 13:var c=n.stateNode,d=n.memoizedState;d!==null&&(a=d.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),Lm(n,a)}var Mm;Mm=function(n,i,a){if(n!==null)if(n.memoizedProps!==i.pendingProps||Wt.current)qt=!0;else{if((n.lanes&a)===0&&(i.flags&128)===0)return qt=!1,UE(n,i,a);qt=(n.flags&131072)!==0}else qt=!1,et&&(i.flags&1048576)!==0&&mp(i,Wl,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;su(n,i),n=i.pendingProps;var d=Ks(i,Dt.current);Zs(i,a),d=ch(null,i,c,n,d,a);var f=hh();return i.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Ht(c)?(f=!0,zl(i)):f=!1,i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,rh(i),d.updater=ru,i.stateNode=d,d._reactInternals=i,yh(i,c,n,a),i=wh(null,i,c,!0,f,a)):(i.tag=0,et&&f&&Kc(i),zt(null,i,d,a),i=i.child),i;case 16:c=i.elementType;e:{switch(su(n,i),n=i.pendingProps,d=c._init,c=d(c._payload),i.type=c,d=i.tag=ew(c),n=An(c,n),d){case 0:i=Eh(null,i,c,n,a);break e;case 1:i=lm(null,i,c,n,a);break e;case 11:i=rm(null,i,c,n,a);break e;case 14:i=im(null,i,c,An(c.type,n),a);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:An(c,d),Eh(n,i,c,d,a);case 1:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:An(c,d),lm(n,i,c,d,a);case 3:e:{if(um(i),n===null)throw Error(t(387));c=i.pendingProps,f=i.memoizedState,d=f.element,Sp(n,i),Yl(i,c,null,a);var v=i.memoizedState;if(c=v.element,f.isDehydrated)if(f={element:c,isDehydrated:!1,cache:v.cache,pendingSuspenseBoundaries:v.pendingSuspenseBoundaries,transitions:v.transitions},i.updateQueue.baseState=f,i.memoizedState=f,i.flags&256){d=to(Error(t(423)),i),i=cm(n,i,c,a,d);break e}else if(c!==d){d=to(Error(t(424)),i),i=cm(n,i,c,a,d);break e}else for(sn=Jr(i.stateNode.containerInfo.firstChild),rn=i,et=!0,Sn=null,a=Tp(i,null,c,a),i.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Ys(),c===d){i=Er(n,i,a);break e}zt(n,i,c,a)}i=i.child}return i;case 5:return Cp(i),n===null&&Yc(i),c=i.type,d=i.pendingProps,f=n!==null?n.memoizedProps:null,v=d.children,zc(c,d)?v=null:f!==null&&zc(c,f)&&(i.flags|=32),am(n,i),zt(n,i,v,a),i.child;case 6:return n===null&&Yc(i),null;case 13:return hm(n,i,a);case 4:return ih(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=Js(i,null,c,a):zt(n,i,c,a),i.child;case 11:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:An(c,d),rm(n,i,c,d,a);case 7:return zt(n,i,i.pendingProps,a),i.child;case 8:return zt(n,i,i.pendingProps.children,a),i.child;case 12:return zt(n,i,i.pendingProps.children,a),i.child;case 10:e:{if(c=i.type._context,d=i.pendingProps,f=i.memoizedProps,v=d.value,Ge(Kl,c._currentValue),c._currentValue=v,f!==null)if(In(f.value,v)){if(f.children===d.children&&!Wt.current){i=Er(n,i,a);break e}}else for(f=i.child,f!==null&&(f.return=i);f!==null;){var I=f.dependencies;if(I!==null){v=f.child;for(var k=I.firstContext;k!==null;){if(k.context===c){if(f.tag===1){k=vr(-1,a&-a),k.tag=2;var U=f.updateQueue;if(U!==null){U=U.shared;var q=U.pending;q===null?k.next=k:(k.next=q.next,q.next=k),U.pending=k}}f.lanes|=a,k=f.alternate,k!==null&&(k.lanes|=a),th(f.return,a,i),I.lanes|=a;break}k=k.next}}else if(f.tag===10)v=f.type===i.type?null:f.child;else if(f.tag===18){if(v=f.return,v===null)throw Error(t(341));v.lanes|=a,I=v.alternate,I!==null&&(I.lanes|=a),th(v,a,i),v=f.sibling}else v=f.child;if(v!==null)v.return=f;else for(v=f;v!==null;){if(v===i){v=null;break}if(f=v.sibling,f!==null){f.return=v.return,v=f;break}v=v.return}f=v}zt(n,i,d.children,a),i=i.child}return i;case 9:return d=i.type,c=i.pendingProps.children,Zs(i,a),d=dn(d),c=c(d),i.flags|=1,zt(n,i,c,a),i.child;case 14:return c=i.type,d=An(c,i.pendingProps),d=An(c.type,d),im(n,i,c,d,a);case 15:return sm(n,i,i.type,i.pendingProps,a);case 17:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:An(c,d),su(n,i),i.tag=1,Ht(c)?(n=!0,zl(i)):n=!1,Zs(i,a),Yp(i,c,d),yh(i,c,d,a),wh(null,i,c,!0,n,a);case 19:return fm(n,i,a);case 22:return om(n,i,a)}throw Error(t(156,i.tag))};function bm(n,i){return jo(n,i)}function ZE(n,i,a,c){this.tag=n,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function mn(n,i,a,c){return new ZE(n,i,a,c)}function zh(n){return n=n.prototype,!(!n||!n.isReactComponent)}function ew(n){if(typeof n=="function")return zh(n)?1:0;if(n!=null){if(n=n.$$typeof,n===V)return 11;if(n===ze)return 14}return 2}function li(n,i){var a=n.alternate;return a===null?(a=mn(n.tag,i,n.key,n.mode),a.elementType=n.elementType,a.type=n.type,a.stateNode=n.stateNode,a.alternate=n,n.alternate=a):(a.pendingProps=i,a.type=n.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=n.flags&14680064,a.childLanes=n.childLanes,a.lanes=n.lanes,a.child=n.child,a.memoizedProps=n.memoizedProps,a.memoizedState=n.memoizedState,a.updateQueue=n.updateQueue,i=n.dependencies,a.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},a.sibling=n.sibling,a.index=n.index,a.ref=n.ref,a}function gu(n,i,a,c,d,f){var v=2;if(c=n,typeof n=="function")zh(n)&&(v=1);else if(typeof n=="string")v=5;else e:switch(n){case N:return ns(a.children,d,f,i);case S:v=8,d|=8;break;case C:return n=mn(12,a,i,d|2),n.elementType=C,n.lanes=f,n;case T:return n=mn(13,a,i,d),n.elementType=T,n.lanes=f,n;case fe:return n=mn(19,a,i,d),n.elementType=fe,n.lanes=f,n;case Ae:return yu(a,d,f,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case D:v=10;break e;case A:v=9;break e;case V:v=11;break e;case ze:v=14;break e;case Oe:v=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=mn(v,a,i,d),i.elementType=n,i.type=c,i.lanes=f,i}function ns(n,i,a,c){return n=mn(7,n,c,i),n.lanes=a,n}function yu(n,i,a,c){return n=mn(22,n,c,i),n.elementType=Ae,n.lanes=a,n.stateNode={isHidden:!1},n}function Bh(n,i,a){return n=mn(6,n,null,i),n.lanes=a,n}function $h(n,i,a){return i=mn(4,n.children!==null?n.children:[],n.key,i),i.lanes=a,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function tw(n,i,a,c,d){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ho(0),this.expirationTimes=Ho(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ho(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function Wh(n,i,a,c,d,f,v,I,k){return n=new tw(n,i,a,I,k),i===1?(i=1,f===!0&&(i|=8)):i=0,f=mn(3,null,null,i),n.current=f,f.stateNode=n,f.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},rh(f),n}function nw(n,i,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:De,key:c==null?null:""+c,children:n,containerInfo:i,implementation:a}}function Fm(n){if(!n)return Zr;n=n._reactInternals;e:{if(wn(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Ht(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var a=n.type;if(Ht(a))return dp(n,a,i)}return i}function Um(n,i,a,c,d,f,v,I,k){return n=Wh(a,c,!0,n,d,f,v,I,k),n.context=Fm(null),a=n.current,c=Bt(),d=oi(a),f=vr(c,d),f.callback=i??null,ni(a,f,d),n.current.lanes=d,ji(n,d,c),Gt(n,c),n}function _u(n,i,a,c){var d=i.current,f=Bt(),v=oi(d);return a=Fm(a),i.context===null?i.context=a:i.pendingContext=a,i=vr(f,v),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=ni(d,i,v),n!==null&&(kn(n,d,v,f),Ql(n,d,v)),v}function vu(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function jm(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var a=n.retryLane;n.retryLane=a!==0&&a<i?a:i}}function Hh(n,i){jm(n,i),(n=n.alternate)&&jm(n,i)}function rw(){return null}var zm=typeof reportError=="function"?reportError:function(n){console.error(n)};function qh(n){this._internalRoot=n}Eu.prototype.render=qh.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));_u(n,i,null,null)},Eu.prototype.unmount=qh.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;Zi(function(){_u(null,n,null,null)}),i[pr]=null}};function Eu(n){this._internalRoot=n}Eu.prototype.unstable_scheduleHydration=function(n){if(n){var i=Qo();n={blockedOn:null,target:n,priority:i};for(var a=0;a<Zt.length&&i!==0&&i<Zt[a].priority;a++);Zt.splice(a,0,n),a===0&&xs(n)}};function Kh(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function wu(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Bm(){}function iw(n,i,a,c,d){if(d){if(typeof c=="function"){var f=c;c=function(){var U=vu(v);f.call(U)}}var v=Um(i,c,n,0,null,!1,!1,"",Bm);return n._reactRootContainer=v,n[pr]=v.current,aa(n.nodeType===8?n.parentNode:n),Zi(),v}for(;d=n.lastChild;)n.removeChild(d);if(typeof c=="function"){var I=c;c=function(){var U=vu(k);I.call(U)}}var k=Wh(n,0,!1,null,null,!1,!1,"",Bm);return n._reactRootContainer=k,n[pr]=k.current,aa(n.nodeType===8?n.parentNode:n),Zi(function(){_u(i,k,a,c)}),k}function Tu(n,i,a,c,d){var f=a._reactRootContainer;if(f){var v=f;if(typeof d=="function"){var I=d;d=function(){var k=vu(v);I.call(k)}}_u(i,v,n,d)}else v=iw(a,i,n,d,c);return vu(v)}Ko=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var a=Ue(i.pendingLanes);a!==0&&(qo(i,a|1),Gt(i,Ye()),(Me&6)===0&&(io=Ye()+500,ei()))}break;case 13:Zi(function(){var c=_r(n,1);if(c!==null){var d=Bt();kn(c,n,1,d)}}),Hh(n,1)}},Ps=function(n){if(n.tag===13){var i=_r(n,134217728);if(i!==null){var a=Bt();kn(i,n,134217728,a)}Hh(n,134217728)}},Go=function(n){if(n.tag===13){var i=oi(n),a=_r(n,i);if(a!==null){var c=Bt();kn(a,n,i,c)}Hh(n,i)}},Qo=function(){return xe},Yo=function(n,i){var a=xe;try{return xe=n,i()}finally{xe=a}},ir=function(n,i,a){switch(i){case"input":if(Ni(n,a),i=a.name,a.type==="radio"&&i!=null){for(a=n;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<a.length;i++){var c=a[i];if(c!==n&&c.form===n.form){var d=Ul(c);if(!d)throw Error(t(90));xo(c),Ni(c,d)}}}break;case"textarea":cl(n,a);break;case"select":i=a.value,i!=null&&vn(n,!!a.multiple,i,!1)}},fl=Fh,pl=Zi;var sw={usingClientEntryPoint:!1,Events:[ca,Hs,Ul,jr,zr,Fh]},Sa={findFiberByHostInstance:Hi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ow={bundleType:Sa.bundleType,version:Sa.version,rendererPackageName:Sa.rendererPackageName,rendererConfig:Sa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Fe.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=wl(n),n===null?null:n.stateNode},findFiberByHostInstance:Sa.findFiberByHostInstance||rw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Iu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Iu.isDisabled&&Iu.supportsFiber)try{Mi=Iu.inject(ow),Jt=Iu}catch{}}return Qt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sw,Qt.createPortal=function(n,i){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Kh(i))throw Error(t(200));return nw(n,i,null,a)},Qt.createRoot=function(n,i){if(!Kh(n))throw Error(t(299));var a=!1,c="",d=zm;return i!=null&&(i.unstable_strictMode===!0&&(a=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(d=i.onRecoverableError)),i=Wh(n,1,!1,null,null,a,!1,c,d),n[pr]=i.current,aa(n.nodeType===8?n.parentNode:n),new qh(i)},Qt.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=wl(i),n=n===null?null:n.stateNode,n},Qt.flushSync=function(n){return Zi(n)},Qt.hydrate=function(n,i,a){if(!wu(i))throw Error(t(200));return Tu(null,n,i,!0,a)},Qt.hydrateRoot=function(n,i,a){if(!Kh(n))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,d=!1,f="",v=zm;if(a!=null&&(a.unstable_strictMode===!0&&(d=!0),a.identifierPrefix!==void 0&&(f=a.identifierPrefix),a.onRecoverableError!==void 0&&(v=a.onRecoverableError)),i=Um(i,null,n,1,a??null,d,!1,f,v),n[pr]=i.current,aa(n),c)for(n=0;n<c.length;n++)a=c[n],d=a._getVersion,d=d(a._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[a,d]:i.mutableSourceEagerHydrationData.push(a,d);return new Eu(i)},Qt.render=function(n,i,a){if(!wu(i))throw Error(t(200));return Tu(null,n,i,!1,a)},Qt.unmountComponentAtNode=function(n){if(!wu(n))throw Error(t(40));return n._reactRootContainer?(Zi(function(){Tu(null,null,n,!1,function(){n._reactRootContainer=null,n[pr]=null})}),!0):!1},Qt.unstable_batchedUpdates=Fh,Qt.unstable_renderSubtreeIntoContainer=function(n,i,a,c){if(!wu(a))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return Tu(n,i,a,!1,c)},Qt.version="18.3.1-next-f1338f8080-20240426",Qt}var Ym;function mw(){if(Ym)return Yh.exports;Ym=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Yh.exports=pw(),Yh.exports}var Jm;function gw(){if(Jm)return Su;Jm=1;var r=mw();return Su.createRoot=r.createRoot,Su.hydrateRoot=r.hydrateRoot,Su}var yw=gw();const _w=Cy(yw),vw=()=>{};var Xm={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ky=function(r){const e=[];let t=0;for(let s=0;s<r.length;s++){let o=r.charCodeAt(s);o<128?e[t++]=o:o<2048?(e[t++]=o>>6|192,e[t++]=o&63|128):(o&64512)===55296&&s+1<r.length&&(r.charCodeAt(s+1)&64512)===56320?(o=65536+((o&1023)<<10)+(r.charCodeAt(++s)&1023),e[t++]=o>>18|240,e[t++]=o>>12&63|128,e[t++]=o>>6&63|128,e[t++]=o&63|128):(e[t++]=o>>12|224,e[t++]=o>>6&63|128,e[t++]=o&63|128)}return e},Ew=function(r){const e=[];let t=0,s=0;for(;t<r.length;){const o=r[t++];if(o<128)e[s++]=String.fromCharCode(o);else if(o>191&&o<224){const u=r[t++];e[s++]=String.fromCharCode((o&31)<<6|u&63)}else if(o>239&&o<365){const u=r[t++],h=r[t++],m=r[t++],g=((o&7)<<18|(u&63)<<12|(h&63)<<6|m&63)-65536;e[s++]=String.fromCharCode(55296+(g>>10)),e[s++]=String.fromCharCode(56320+(g&1023))}else{const u=r[t++],h=r[t++];e[s++]=String.fromCharCode((o&15)<<12|(u&63)<<6|h&63)}}return e.join("")},Py={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let o=0;o<r.length;o+=3){const u=r[o],h=o+1<r.length,m=h?r[o+1]:0,g=o+2<r.length,_=g?r[o+2]:0,w=u>>2,R=(u&3)<<4|m>>4;let b=(m&15)<<2|_>>6,z=_&63;g||(z=64,h||(b=64)),s.push(t[w],t[R],t[b],t[z])}return s.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(ky(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Ew(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let o=0;o<r.length;){const u=t[r.charAt(o++)],m=o<r.length?t[r.charAt(o)]:0;++o;const _=o<r.length?t[r.charAt(o)]:64;++o;const R=o<r.length?t[r.charAt(o)]:64;if(++o,u==null||m==null||_==null||R==null)throw new ww;const b=u<<2|m>>4;if(s.push(b),_!==64){const z=m<<4&240|_>>2;if(s.push(z),R!==64){const Z=_<<6&192|R;s.push(Z)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class ww extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Tw=function(r){const e=ky(r);return Py.encodeByteArray(e,!0)},Bu=function(r){return Tw(r).replace(/\./g,"")},Ny=function(r){try{return Py.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sw=()=>Iw().__FIREBASE_DEFAULTS__,Aw=()=>{if(typeof process>"u"||typeof Xm>"u")return;const r=Xm.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Rw=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&Ny(r[1]);return e&&JSON.parse(e)},ac=()=>{try{return vw()||Sw()||Aw()||Rw()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},xy=r=>{var e,t;return(t=(e=ac())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},Cw=r=>{const e=xy(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Dy=()=>{var r;return(r=ac())==null?void 0:r.config},Vy=r=>{var e;return(e=ac())==null?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pw(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",o=r.iat||0,u=r.sub||r.user_id;if(!u)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const h={iss:`https://securetoken.google.com/${s}`,aud:s,iat:o,exp:o+3600,auth_time:o,sub:u,user_id:u,firebase:{sign_in_provider:"custom",identities:{}},...r};return[Bu(JSON.stringify(t)),Bu(JSON.stringify(h)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ut(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Nw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ut())}function xw(){var e;const r=(e=ac())==null?void 0:e.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Dw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Vw(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Ow(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Lw(){const r=Ut();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Mw(){return!xw()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function bw(){try{return typeof indexedDB=="object"}catch{return!1}}function Fw(){return new Promise((r,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(s);o.onsuccess=()=>{o.result.close(),t||self.indexedDB.deleteDatabase(s),r(!0)},o.onupgradeneeded=()=>{t=!1},o.onerror=()=>{var u;e(((u=o.error)==null?void 0:u.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uw="FirebaseError";class Vr extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=Uw,Object.setPrototypeOf(this,Vr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ja.prototype.create)}}class Ja{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},o=`${this.service}/${e}`,u=this.errors[e],h=u?jw(u,s):"Error",m=`${this.serviceName}: ${h} (${o}).`;return new Vr(o,m,s)}}function jw(r,e){return r.replace(zw,(t,s)=>{const o=e[s];return o!=null?String(o):`<${s}?>`})}const zw=/\{\$([^}]+)}/g;function Bw(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function os(r,e){if(r===e)return!0;const t=Object.keys(r),s=Object.keys(e);for(const o of t){if(!s.includes(o))return!1;const u=r[o],h=e[o];if(Zm(u)&&Zm(h)){if(!os(u,h))return!1}else if(u!==h)return!1}for(const o of s)if(!t.includes(o))return!1;return!0}function Zm(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xa(r){const e=[];for(const[t,s]of Object.entries(r))Array.isArray(s)?s.forEach(o=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Na(r){const e={};return r.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[o,u]=s.split("=");e[decodeURIComponent(o)]=decodeURIComponent(u)}}),e}function xa(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function $w(r,e){const t=new Ww(r,e);return t.subscribe.bind(t)}class Ww{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let o;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");Hw(e,["next","error","complete"])?o=e:o={next:e,error:t,complete:s},o.next===void 0&&(o.next=Zh),o.error===void 0&&(o.error=Zh),o.complete===void 0&&(o.complete=Zh);const u=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),u}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Hw(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Zh(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(r){return r&&r._delegate?r._delegate:r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Za(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Oy(r){return(await fetch(r,{credentials:"include"})).ok}class as{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qw{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new kw;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:t});o&&s.resolve(o)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Gw(e))try{this.getOrInitializeService({instanceIdentifier:rs})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(t);try{const u=this.getOrInitializeService({instanceIdentifier:o});s.resolve(u)}catch{}}}}clearInstance(e=rs){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=rs){return this.instances.has(e)}getOptions(e=rs){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[u,h]of this.instancesDeferred.entries()){const m=this.normalizeInstanceIdentifier(u);s===m&&h.resolve(o)}return o}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),o=this.onInitCallbacks.get(s)??new Set;o.add(e),this.onInitCallbacks.set(s,o);const u=this.instances.get(s);return u&&e(u,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const o of s)try{o(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Kw(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=rs){return this.component?this.component.multipleInstances?e:rs:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Kw(r){return r===rs?void 0:r}function Gw(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new qw(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ke;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(ke||(ke={}));const Yw={debug:ke.DEBUG,verbose:ke.VERBOSE,info:ke.INFO,warn:ke.WARN,error:ke.ERROR,silent:ke.SILENT},Jw=ke.INFO,Xw={[ke.DEBUG]:"log",[ke.VERBOSE]:"log",[ke.INFO]:"info",[ke.WARN]:"warn",[ke.ERROR]:"error"},Zw=(r,e,...t)=>{if(e<r.logLevel)return;const s=new Date().toISOString(),o=Xw[e];if(o)console[o](`[${s}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Bd{constructor(e){this.name=e,this._logLevel=Jw,this._logHandler=Zw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ke))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Yw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ke.DEBUG,...e),this._logHandler(this,ke.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ke.VERBOSE,...e),this._logHandler(this,ke.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ke.INFO,...e),this._logHandler(this,ke.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ke.WARN,...e),this._logHandler(this,ke.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ke.ERROR,...e),this._logHandler(this,ke.ERROR,...e)}}const eT=(r,e)=>e.some(t=>r instanceof t);let eg,tg;function tT(){return eg||(eg=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function nT(){return tg||(tg=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ly=new WeakMap,fd=new WeakMap,My=new WeakMap,ed=new WeakMap,$d=new WeakMap;function rT(r){const e=new Promise((t,s)=>{const o=()=>{r.removeEventListener("success",u),r.removeEventListener("error",h)},u=()=>{t(mi(r.result)),o()},h=()=>{s(r.error),o()};r.addEventListener("success",u),r.addEventListener("error",h)});return e.then(t=>{t instanceof IDBCursor&&Ly.set(t,r)}).catch(()=>{}),$d.set(e,r),e}function iT(r){if(fd.has(r))return;const e=new Promise((t,s)=>{const o=()=>{r.removeEventListener("complete",u),r.removeEventListener("error",h),r.removeEventListener("abort",h)},u=()=>{t(),o()},h=()=>{s(r.error||new DOMException("AbortError","AbortError")),o()};r.addEventListener("complete",u),r.addEventListener("error",h),r.addEventListener("abort",h)});fd.set(r,e)}let pd={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return fd.get(r);if(e==="objectStoreNames")return r.objectStoreNames||My.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return mi(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function sT(r){pd=r(pd)}function oT(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=r.call(td(this),e,...t);return My.set(s,e.sort?e.sort():[e]),mi(s)}:nT().includes(r)?function(...e){return r.apply(td(this),e),mi(Ly.get(this))}:function(...e){return mi(r.apply(td(this),e))}}function aT(r){return typeof r=="function"?oT(r):(r instanceof IDBTransaction&&iT(r),eT(r,tT())?new Proxy(r,pd):r)}function mi(r){if(r instanceof IDBRequest)return rT(r);if(ed.has(r))return ed.get(r);const e=aT(r);return e!==r&&(ed.set(r,e),$d.set(e,r)),e}const td=r=>$d.get(r);function lT(r,e,{blocked:t,upgrade:s,blocking:o,terminated:u}={}){const h=indexedDB.open(r,e),m=mi(h);return s&&h.addEventListener("upgradeneeded",g=>{s(mi(h.result),g.oldVersion,g.newVersion,mi(h.transaction),g)}),t&&h.addEventListener("blocked",g=>t(g.oldVersion,g.newVersion,g)),m.then(g=>{u&&g.addEventListener("close",()=>u()),o&&g.addEventListener("versionchange",_=>o(_.oldVersion,_.newVersion,_))}).catch(()=>{}),m}const uT=["get","getKey","getAll","getAllKeys","count"],cT=["put","add","delete","clear"],nd=new Map;function ng(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(nd.get(e))return nd.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,o=cT.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(o||uT.includes(t)))return;const u=async function(h,...m){const g=this.transaction(h,o?"readwrite":"readonly");let _=g.store;return s&&(_=_.index(m.shift())),(await Promise.all([_[t](...m),o&&g.done]))[0]};return nd.set(e,u),u}sT(r=>({...r,get:(e,t,s)=>ng(e,t)||r.get(e,t,s),has:(e,t)=>!!ng(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hT{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(dT(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function dT(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const md="@firebase/app",rg="0.14.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr=new Bd("@firebase/app"),fT="@firebase/app-compat",pT="@firebase/analytics-compat",mT="@firebase/analytics",gT="@firebase/app-check-compat",yT="@firebase/app-check",_T="@firebase/auth",vT="@firebase/auth-compat",ET="@firebase/database",wT="@firebase/data-connect",TT="@firebase/database-compat",IT="@firebase/functions",ST="@firebase/functions-compat",AT="@firebase/installations",RT="@firebase/installations-compat",CT="@firebase/messaging",kT="@firebase/messaging-compat",PT="@firebase/performance",NT="@firebase/performance-compat",xT="@firebase/remote-config",DT="@firebase/remote-config-compat",VT="@firebase/storage",OT="@firebase/storage-compat",LT="@firebase/firestore",MT="@firebase/ai",bT="@firebase/firestore-compat",FT="firebase",UT="12.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gd="[DEFAULT]",jT={[md]:"fire-core",[fT]:"fire-core-compat",[mT]:"fire-analytics",[pT]:"fire-analytics-compat",[yT]:"fire-app-check",[gT]:"fire-app-check-compat",[_T]:"fire-auth",[vT]:"fire-auth-compat",[ET]:"fire-rtdb",[wT]:"fire-data-connect",[TT]:"fire-rtdb-compat",[IT]:"fire-fn",[ST]:"fire-fn-compat",[AT]:"fire-iid",[RT]:"fire-iid-compat",[CT]:"fire-fcm",[kT]:"fire-fcm-compat",[PT]:"fire-perf",[NT]:"fire-perf-compat",[xT]:"fire-rc",[DT]:"fire-rc-compat",[VT]:"fire-gcs",[OT]:"fire-gcs-compat",[LT]:"fire-fst",[bT]:"fire-fst-compat",[MT]:"fire-vertex","fire-js":"fire-js",[FT]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $u=new Map,zT=new Map,yd=new Map;function ig(r,e){try{r.container.addComponent(e)}catch(t){Pr.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function _o(r){const e=r.name;if(yd.has(e))return Pr.debug(`There were multiple attempts to register component ${e}.`),!1;yd.set(e,r);for(const t of $u.values())ig(t,r);for(const t of zT.values())ig(t,r);return!0}function Wd(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function an(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},gi=new Ja("app","Firebase",BT);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $T{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new as("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw gi.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const So=UT;function by(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const s={name:gd,automaticDataCollectionEnabled:!0,...e},o=s.name;if(typeof o!="string"||!o)throw gi.create("bad-app-name",{appName:String(o)});if(t||(t=Dy()),!t)throw gi.create("no-options");const u=$u.get(o);if(u){if(os(t,u.options)&&os(s,u.config))return u;throw gi.create("duplicate-app",{appName:o})}const h=new Qw(o);for(const g of yd.values())h.addComponent(g);const m=new $T(t,s,h);return $u.set(o,m),m}function Fy(r=gd){const e=$u.get(r);if(!e&&r===gd&&Dy())return by();if(!e)throw gi.create("no-app",{appName:r});return e}function yi(r,e,t){let s=jT[r]??r;t&&(s+=`-${t}`);const o=s.match(/\s|\//),u=e.match(/\s|\//);if(o||u){const h=[`Unable to register library "${s}" with version "${e}":`];o&&h.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&u&&h.push("and"),u&&h.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Pr.warn(h.join(" "));return}_o(new as(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WT="firebase-heartbeat-database",HT=1,ja="firebase-heartbeat-store";let rd=null;function Uy(){return rd||(rd=lT(WT,HT,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(ja)}catch(t){console.warn(t)}}}}).catch(r=>{throw gi.create("idb-open",{originalErrorMessage:r.message})})),rd}async function qT(r){try{const t=(await Uy()).transaction(ja),s=await t.objectStore(ja).get(jy(r));return await t.done,s}catch(e){if(e instanceof Vr)Pr.warn(e.message);else{const t=gi.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Pr.warn(t.message)}}}async function sg(r,e){try{const s=(await Uy()).transaction(ja,"readwrite");await s.objectStore(ja).put(e,jy(r)),await s.done}catch(t){if(t instanceof Vr)Pr.warn(t.message);else{const s=gi.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Pr.warn(s.message)}}}function jy(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KT=1024,GT=30;class QT{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new JT(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const o=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),u=og();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===u||this._heartbeatsCache.heartbeats.some(h=>h.date===u))return;if(this._heartbeatsCache.heartbeats.push({date:u,agent:o}),this._heartbeatsCache.heartbeats.length>GT){const h=XT(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(h,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){Pr.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=og(),{heartbeatsToSend:s,unsentEntries:o}=YT(this._heartbeatsCache.heartbeats),u=Bu(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),u}catch(t){return Pr.warn(t),""}}}function og(){return new Date().toISOString().substring(0,10)}function YT(r,e=KT){const t=[];let s=r.slice();for(const o of r){const u=t.find(h=>h.agent===o.agent);if(u){if(u.dates.push(o.date),ag(t)>e){u.dates.pop();break}}else if(t.push({agent:o.agent,dates:[o.date]}),ag(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class JT{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return bw()?Fw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await qT(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return sg(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return sg(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ag(r){return Bu(JSON.stringify({version:2,heartbeats:r})).length}function XT(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let s=1;s<r.length;s++)r[s].date<t&&(t=r[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZT(r){_o(new as("platform-logger",e=>new hT(e),"PRIVATE")),_o(new as("heartbeat",e=>new QT(e),"PRIVATE")),yi(md,rg,r),yi(md,rg,"esm2020"),yi("fire-js","")}ZT("");function zy(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const eI=zy,By=new Ja("auth","Firebase",zy());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wu=new Bd("@firebase/auth");function tI(r,...e){Wu.logLevel<=ke.WARN&&Wu.warn(`Auth (${So}): ${r}`,...e)}function Du(r,...e){Wu.logLevel<=ke.ERROR&&Wu.error(`Auth (${So}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _n(r,...e){throw qd(r,...e)}function xn(r,...e){return qd(r,...e)}function Hd(r,e,t){const s={...eI(),[e]:t};return new Ja("auth","Firebase",s).create(e,{appName:r.name})}function Rr(r){return Hd(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function nI(r,e,t){const s=t;if(!(e instanceof s))throw s.name!==e.constructor.name&&_n(r,"argument-error"),Hd(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function qd(r,...e){if(typeof r!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=r.name),r._errorFactory.create(t,...s)}return By.create(r,...e)}function pe(r,e,...t){if(!r)throw qd(e,...t)}function Sr(r){const e="INTERNAL ASSERTION FAILED: "+r;throw Du(e),new Error(e)}function Nr(r,e){r||Sr(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _d(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.href)||""}function rI(){return lg()==="http:"||lg()==="https:"}function lg(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(rI()||Vw()||"connection"in navigator)?navigator.onLine:!0}function sI(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(e,t){this.shortDelay=e,this.longDelay=t,Nr(t>e,"Short delay should be less than long delay!"),this.isMobile=Nw()||Ow()}get(){return iI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kd(r,e){Nr(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Sr("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Sr("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Sr("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aI=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],lI=new el(3e4,6e4);function Ci(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function ki(r,e,t,s,o={}){return Wy(r,o,async()=>{let u={},h={};s&&(e==="GET"?h=s:u={body:JSON.stringify(s)});const m=Xa({key:r.config.apiKey,...h}).slice(1),g=await r._getAdditionalHeaders();g["Content-Type"]="application/json",r.languageCode&&(g["X-Firebase-Locale"]=r.languageCode);const _={method:e,headers:g,...u};return Dw()||(_.referrerPolicy="no-referrer"),r.emulatorConfig&&Za(r.emulatorConfig.host)&&(_.credentials="include"),$y.fetch()(await Hy(r,r.config.apiHost,t,m),_)})}async function Wy(r,e,t){r._canInitEmulator=!1;const s={...oI,...e};try{const o=new cI(r),u=await Promise.race([t(),o.promise]);o.clearNetworkTimeout();const h=await u.json();if("needConfirmation"in h)throw Au(r,"account-exists-with-different-credential",h);if(u.ok&&!("errorMessage"in h))return h;{const m=u.ok?h.errorMessage:h.error.message,[g,_]=m.split(" : ");if(g==="FEDERATED_USER_ID_ALREADY_LINKED")throw Au(r,"credential-already-in-use",h);if(g==="EMAIL_EXISTS")throw Au(r,"email-already-in-use",h);if(g==="USER_DISABLED")throw Au(r,"user-disabled",h);const w=s[g]||g.toLowerCase().replace(/[_\s]+/g,"-");if(_)throw Hd(r,w,_);_n(r,w)}}catch(o){if(o instanceof Vr)throw o;_n(r,"network-request-failed",{message:String(o)})}}async function tl(r,e,t,s,o={}){const u=await ki(r,e,t,s,o);return"mfaPendingCredential"in u&&_n(r,"multi-factor-auth-required",{_serverResponse:u}),u}async function Hy(r,e,t,s){const o=`${e}${t}?${s}`,u=r,h=u.config.emulator?Kd(r.config,o):`${r.config.apiScheme}://${o}`;return aI.includes(t)&&(await u._persistenceManagerAvailable,u._getPersistenceType()==="COOKIE")?u._getPersistence()._getFinalTarget(h).toString():h}function uI(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class cI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(xn(this.auth,"network-request-failed")),lI.get())})}}function Au(r,e,t){const s={appName:r.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const o=xn(r,e,s);return o.customData._tokenResponse=t,o}function ug(r){return r!==void 0&&r.enterprise!==void 0}class hI{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return uI(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function dI(r,e){return ki(r,"GET","/v2/recaptchaConfig",Ci(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fI(r,e){return ki(r,"POST","/v1/accounts:delete",e)}async function Hu(r,e){return ki(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function La(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function pI(r,e=!1){const t=$t(r),s=await t.getIdToken(e),o=Gd(s);pe(o&&o.exp&&o.auth_time&&o.iat,t.auth,"internal-error");const u=typeof o.firebase=="object"?o.firebase:void 0,h=u==null?void 0:u.sign_in_provider;return{claims:o,token:s,authTime:La(id(o.auth_time)),issuedAtTime:La(id(o.iat)),expirationTime:La(id(o.exp)),signInProvider:h||null,signInSecondFactor:(u==null?void 0:u.sign_in_second_factor)||null}}function id(r){return Number(r)*1e3}function Gd(r){const[e,t,s]=r.split(".");if(e===void 0||t===void 0||s===void 0)return Du("JWT malformed, contained fewer than 3 sections"),null;try{const o=Ny(t);return o?JSON.parse(o):(Du("Failed to decode base64 JWT payload"),null)}catch(o){return Du("Caught error parsing JWT payload as JSON",o==null?void 0:o.toString()),null}}function cg(r){const e=Gd(r);return pe(e,"internal-error"),pe(typeof e.exp<"u","internal-error"),pe(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function za(r,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof Vr&&mI(s)&&r.auth.currentUser===r&&await r.auth.signOut(),s}}function mI({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=La(this.lastLoginAt),this.creationTime=La(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qu(r){var R;const e=r.auth,t=await r.getIdToken(),s=await za(r,Hu(e,{idToken:t}));pe(s==null?void 0:s.users.length,e,"internal-error");const o=s.users[0];r._notifyReloadListener(o);const u=(R=o.providerUserInfo)!=null&&R.length?qy(o.providerUserInfo):[],h=_I(r.providerData,u),m=r.isAnonymous,g=!(r.email&&o.passwordHash)&&!(h!=null&&h.length),_=m?g:!1,w={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:h,metadata:new vd(o.createdAt,o.lastLoginAt),isAnonymous:_};Object.assign(r,w)}async function yI(r){const e=$t(r);await qu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function _I(r,e){return[...r.filter(s=>!e.some(o=>o.providerId===s.providerId)),...e]}function qy(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vI(r,e){const t=await Wy(r,{},async()=>{const s=Xa({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:u}=r.config,h=await Hy(r,o,"/v1/token",`key=${u}`),m=await r._getAdditionalHeaders();m["Content-Type"]="application/x-www-form-urlencoded";const g={method:"POST",headers:m,body:s};return r.emulatorConfig&&Za(r.emulatorConfig.host)&&(g.credentials="include"),$y.fetch()(h,g)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function EI(r,e){return ki(r,"POST","/v2/accounts:revokeToken",Ci(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){pe(e.idToken,"internal-error"),pe(typeof e.idToken<"u","internal-error"),pe(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):cg(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){pe(e.length!==0,"internal-error");const t=cg(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(pe(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:o,expiresIn:u}=await vI(e,t);this.updateTokensAndExpiration(s,o,Number(u))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:o,expirationTime:u}=t,h=new co;return s&&(pe(typeof s=="string","internal-error",{appName:e}),h.refreshToken=s),o&&(pe(typeof o=="string","internal-error",{appName:e}),h.accessToken=o),u&&(pe(typeof u=="number","internal-error",{appName:e}),h.expirationTime=u),h}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new co,this.toJSON())}_performRefresh(){return Sr("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ci(r,e){pe(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class Pn{constructor({uid:e,auth:t,stsTokenManager:s,...o}){this.providerId="firebase",this.proactiveRefresh=new gI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new vd(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await za(this,this.stsTokenManager.getToken(this.auth,e));return pe(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return pI(this,e)}reload(){return yI(this)}_assign(e){this!==e&&(pe(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Pn({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){pe(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await qu(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(an(this.auth.app))return Promise.reject(Rr(this.auth));const e=await this.getIdToken();return await za(this,fI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const s=t.displayName??void 0,o=t.email??void 0,u=t.phoneNumber??void 0,h=t.photoURL??void 0,m=t.tenantId??void 0,g=t._redirectEventId??void 0,_=t.createdAt??void 0,w=t.lastLoginAt??void 0,{uid:R,emailVerified:b,isAnonymous:z,providerData:Z,stsTokenManager:Q}=t;pe(R&&Q,e,"internal-error");const G=co.fromJSON(this.name,Q);pe(typeof R=="string",e,"internal-error"),ci(s,e.name),ci(o,e.name),pe(typeof b=="boolean",e,"internal-error"),pe(typeof z=="boolean",e,"internal-error"),ci(u,e.name),ci(h,e.name),ci(m,e.name),ci(g,e.name),ci(_,e.name),ci(w,e.name);const ye=new Pn({uid:R,auth:e,email:o,emailVerified:b,displayName:s,isAnonymous:z,photoURL:h,phoneNumber:u,tenantId:m,stsTokenManager:G,createdAt:_,lastLoginAt:w});return Z&&Array.isArray(Z)&&(ye.providerData=Z.map(Ee=>({...Ee}))),g&&(ye._redirectEventId=g),ye}static async _fromIdTokenResponse(e,t,s=!1){const o=new co;o.updateFromServerResponse(t);const u=new Pn({uid:t.localId,auth:e,stsTokenManager:o,isAnonymous:s});return await qu(u),u}static async _fromGetAccountInfoResponse(e,t,s){const o=t.users[0];pe(o.localId!==void 0,"internal-error");const u=o.providerUserInfo!==void 0?qy(o.providerUserInfo):[],h=!(o.email&&o.passwordHash)&&!(u!=null&&u.length),m=new co;m.updateFromIdToken(s);const g=new Pn({uid:o.localId,auth:e,stsTokenManager:m,isAnonymous:h}),_={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new vd(o.createdAt,o.lastLoginAt),isAnonymous:!(o.email&&o.passwordHash)&&!(u!=null&&u.length)};return Object.assign(g,_),g}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hg=new Map;function Ar(r){Nr(r instanceof Function,"Expected a class definition");let e=hg.get(r);return e?(Nr(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,hg.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ky{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ky.type="NONE";const dg=Ky;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vu(r,e,t){return`firebase:${r}:${e}:${t}`}class ho{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:o,name:u}=this.auth;this.fullUserKey=Vu(this.userKey,o.apiKey,u),this.fullPersistenceKey=Vu("persistence",o.apiKey,u),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Hu(this.auth,{idToken:e}).catch(()=>{});return t?Pn._fromGetAccountInfoResponse(this.auth,t,e):null}return Pn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new ho(Ar(dg),e,s);const o=(await Promise.all(t.map(async _=>{if(await _._isAvailable())return _}))).filter(_=>_);let u=o[0]||Ar(dg);const h=Vu(s,e.config.apiKey,e.name);let m=null;for(const _ of t)try{const w=await _._get(h);if(w){let R;if(typeof w=="string"){const b=await Hu(e,{idToken:w}).catch(()=>{});if(!b)break;R=await Pn._fromGetAccountInfoResponse(e,b,w)}else R=Pn._fromJSON(e,w);_!==u&&(m=R),u=_;break}}catch{}const g=o.filter(_=>_._shouldAllowMigration);return!u._shouldAllowMigration||!g.length?new ho(u,e,s):(u=g[0],m&&await u._set(h,m.toJSON()),await Promise.all(t.map(async _=>{if(_!==u)try{await _._remove(h)}catch{}})),new ho(u,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fg(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Jy(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Gy(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Zy(e))return"Blackberry";if(e_(e))return"Webos";if(Qy(e))return"Safari";if((e.includes("chrome/")||Yy(e))&&!e.includes("edge/"))return"Chrome";if(Xy(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=r.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Gy(r=Ut()){return/firefox\//i.test(r)}function Qy(r=Ut()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Yy(r=Ut()){return/crios\//i.test(r)}function Jy(r=Ut()){return/iemobile/i.test(r)}function Xy(r=Ut()){return/android/i.test(r)}function Zy(r=Ut()){return/blackberry/i.test(r)}function e_(r=Ut()){return/webos/i.test(r)}function Qd(r=Ut()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function wI(r=Ut()){var e;return Qd(r)&&!!((e=window.navigator)!=null&&e.standalone)}function TI(){return Lw()&&document.documentMode===10}function t_(r=Ut()){return Qd(r)||Xy(r)||e_(r)||Zy(r)||/windows phone/i.test(r)||Jy(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n_(r,e=[]){let t;switch(r){case"Browser":t=fg(Ut());break;case"Worker":t=`${fg(Ut())}-${r}`;break;default:t=r}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${So}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class II{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=u=>new Promise((h,m)=>{try{const g=e(u);h(g)}catch(g){m(g)}});s.onAbort=t,this.queue.push(s);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const o of t)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SI(r,e={}){return ki(r,"GET","/v2/passwordPolicy",Ci(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AI=6;class RI{constructor(e){var s;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??AI,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,o=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),o&&(t.meetsMaxPasswordLength=e.length<=o)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let o=0;o<e.length;o++)s=e.charAt(o),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,o,u){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=o)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CI{constructor(e,t,s,o){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new pg(this),this.idTokenSubscription=new pg(this),this.beforeStateQueue=new II(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=By,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion,this._persistenceManagerAvailable=new Promise(u=>this._resolvePersistenceManagerAvailable=u)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ar(t)),this._initializationPromise=this.queue(async()=>{var s,o,u;if(!this._deleted&&(this.persistenceManager=await ho.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((o=this._popupRedirectResolver)!=null&&o._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((u=this.currentUser)==null?void 0:u.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Hu(this,{idToken:e}),s=await Pn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var u;if(an(this.app)){const h=this.app.settings.authIdToken;return h?new Promise(m=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(h).then(m,m))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let s=t,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const h=(u=this.redirectUser)==null?void 0:u._redirectEventId,m=s==null?void 0:s._redirectEventId,g=await this.tryRedirectSignIn(e);(!h||h===m)&&(g!=null&&g.user)&&(s=g.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(h){s=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(h))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return pe(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await qu(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=sI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(an(this.app))return Promise.reject(Rr(this));const t=e?$t(e):null;return t&&pe(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&pe(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return an(this.app)?Promise.reject(Rr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return an(this.app)?Promise.reject(Rr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ar(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await SI(this),t=new RI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ja("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await EI(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ar(e)||this._popupRedirectResolver;pe(t,this,"argument-error"),this.redirectPersistenceManager=await ho.create(this,[Ar(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,o){if(this._deleted)return()=>{};const u=typeof t=="function"?t:t.next.bind(t);let h=!1;const m=this._isInitialized?Promise.resolve():this._initializationPromise;if(pe(m,this,"internal-error"),m.then(()=>{h||u(this.currentUser)}),typeof t=="function"){const g=e.addObserver(t,s,o);return()=>{h=!0,g()}}else{const g=e.addObserver(t);return()=>{h=!0,g()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return pe(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=n_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var o;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((o=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:o.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var t;if(an(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&tI(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Pi(r){return $t(r)}class pg{constructor(e){this.auth=e,this.observer=null,this.addObserver=$w(t=>this.observer=t)}get next(){return pe(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function kI(r){lc=r}function r_(r){return lc.loadJS(r)}function PI(){return lc.recaptchaEnterpriseScript}function NI(){return lc.gapiScript}function xI(r){return`__${r}${Math.floor(Math.random()*1e6)}`}class DI{constructor(){this.enterprise=new VI}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class VI{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const OI="recaptcha-enterprise",i_="NO_RECAPTCHA";class LI{constructor(e){this.type=OI,this.auth=Pi(e)}async verify(e="verify",t=!1){async function s(u){if(!t){if(u.tenantId==null&&u._agentRecaptchaConfig!=null)return u._agentRecaptchaConfig.siteKey;if(u.tenantId!=null&&u._tenantRecaptchaConfigs[u.tenantId]!==void 0)return u._tenantRecaptchaConfigs[u.tenantId].siteKey}return new Promise(async(h,m)=>{dI(u,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(g=>{if(g.recaptchaKey===void 0)m(new Error("recaptcha Enterprise site key undefined"));else{const _=new hI(g);return u.tenantId==null?u._agentRecaptchaConfig=_:u._tenantRecaptchaConfigs[u.tenantId]=_,h(_.siteKey)}}).catch(g=>{m(g)})})}function o(u,h,m){const g=window.grecaptcha;ug(g)?g.enterprise.ready(()=>{g.enterprise.execute(u,{action:e}).then(_=>{h(_)}).catch(()=>{h(i_)})}):m(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new DI().execute("siteKey",{action:"verify"}):new Promise((u,h)=>{s(this.auth).then(m=>{if(!t&&ug(window.grecaptcha))o(m,u,h);else{if(typeof window>"u"){h(new Error("RecaptchaVerifier is only supported in browser"));return}let g=PI();g.length!==0&&(g+=m),r_(g).then(()=>{o(m,u,h)}).catch(_=>{h(_)})}}).catch(m=>{h(m)})})}}async function mg(r,e,t,s=!1,o=!1){const u=new LI(r);let h;if(o)h=i_;else try{h=await u.verify(t)}catch{h=await u.verify(t,!0)}const m={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in m){const g=m.phoneEnrollmentInfo.phoneNumber,_=m.phoneEnrollmentInfo.recaptchaToken;Object.assign(m,{phoneEnrollmentInfo:{phoneNumber:g,recaptchaToken:_,captchaResponse:h,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in m){const g=m.phoneSignInInfo.recaptchaToken;Object.assign(m,{phoneSignInInfo:{recaptchaToken:g,captchaResponse:h,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return m}return s?Object.assign(m,{captchaResp:h}):Object.assign(m,{captchaResponse:h}),Object.assign(m,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(m,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),m}async function Ed(r,e,t,s,o){var u;if((u=r._getRecaptchaConfig())!=null&&u.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const h=await mg(r,e,t,t==="getOobCode");return s(r,h)}else return s(r,e).catch(async h=>{if(h.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const m=await mg(r,e,t,t==="getOobCode");return s(r,m)}else return Promise.reject(h)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MI(r,e){const t=Wd(r,"auth");if(t.isInitialized()){const o=t.getImmediate(),u=t.getOptions();if(os(u,e??{}))return o;_n(o,"already-initialized")}return t.initialize({options:e})}function bI(r,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(Ar);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function FI(r,e,t){const s=Pi(r);pe(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const o=!1,u=s_(e),{host:h,port:m}=UI(e),g=m===null?"":`:${m}`,_={url:`${u}//${h}${g}/`},w=Object.freeze({host:h,port:m,protocol:u.replace(":",""),options:Object.freeze({disableWarnings:o})});if(!s._canInitEmulator){pe(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),pe(os(_,s.config.emulator)&&os(w,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=_,s.emulatorConfig=w,s.settings.appVerificationDisabledForTesting=!0,Za(h)?Oy(`${u}//${h}${g}`):jI()}function s_(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function UI(r){const e=s_(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",o=/^(\[[^\]]+\])(:|$)/.exec(s);if(o){const u=o[1];return{host:u,port:gg(s.substr(u.length+1))}}else{const[u,h]=s.split(":");return{host:u,port:gg(h)}}}function gg(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function jI(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Sr("not implemented")}_getIdTokenResponse(e){return Sr("not implemented")}_linkToIdToken(e,t){return Sr("not implemented")}_getReauthenticationResolver(e){return Sr("not implemented")}}async function zI(r,e){return ki(r,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BI(r,e){return tl(r,"POST","/v1/accounts:signInWithPassword",Ci(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $I(r,e){return tl(r,"POST","/v1/accounts:signInWithEmailLink",Ci(r,e))}async function WI(r,e){return tl(r,"POST","/v1/accounts:signInWithEmailLink",Ci(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba extends Yd{constructor(e,t,s,o=null){super("password",s),this._email=e,this._password=t,this._tenantId=o}static _fromEmailAndPassword(e,t){return new Ba(e,t,"password")}static _fromEmailAndCode(e,t,s=null){return new Ba(e,t,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ed(e,t,"signInWithPassword",BI);case"emailLink":return $I(e,{email:this._email,oobCode:this._password});default:_n(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const s={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ed(e,s,"signUpPassword",zI);case"emailLink":return WI(e,{idToken:t,email:this._email,oobCode:this._password});default:_n(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fo(r,e){return tl(r,"POST","/v1/accounts:signInWithIdp",Ci(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HI="http://localhost";class ls extends Yd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ls(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):_n("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:o,...u}=t;if(!s||!o)return null;const h=new ls(s,o);return h.idToken=u.idToken||void 0,h.accessToken=u.accessToken||void 0,h.secret=u.secret,h.nonce=u.nonce,h.pendingToken=u.pendingToken||null,h}_getIdTokenResponse(e){const t=this.buildRequest();return fo(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,fo(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,fo(e,t)}buildRequest(){const e={requestUri:HI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Xa(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qI(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function KI(r){const e=Na(xa(r)).link,t=e?Na(xa(e)).deep_link_id:null,s=Na(xa(r)).deep_link_id;return(s?Na(xa(s)).link:null)||s||t||e||r}class Jd{constructor(e){const t=Na(xa(e)),s=t.apiKey??null,o=t.oobCode??null,u=qI(t.mode??null);pe(s&&o&&u,"argument-error"),this.apiKey=s,this.operation=u,this.code=o,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=KI(e);try{return new Jd(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao{constructor(){this.providerId=Ao.PROVIDER_ID}static credential(e,t){return Ba._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const s=Jd.parseLink(t);return pe(s,"argument-error"),Ba._fromEmailAndCode(e,s.code,s.tenantId)}}Ao.PROVIDER_ID="password";Ao.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ao.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl extends Xd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi extends nl{constructor(){super("facebook.com")}static credential(e){return ls._fromParams({providerId:hi.PROVIDER_ID,signInMethod:hi.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return hi.credentialFromTaggedObject(e)}static credentialFromError(e){return hi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return hi.credential(e.oauthAccessToken)}catch{return null}}}hi.FACEBOOK_SIGN_IN_METHOD="facebook.com";hi.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir extends nl{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ls._fromParams({providerId:Ir.PROVIDER_ID,signInMethod:Ir.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ir.credentialFromTaggedObject(e)}static credentialFromError(e){return Ir.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return Ir.credential(t,s)}catch{return null}}}Ir.GOOGLE_SIGN_IN_METHOD="google.com";Ir.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di extends nl{constructor(){super("github.com")}static credential(e){return ls._fromParams({providerId:di.PROVIDER_ID,signInMethod:di.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return di.credentialFromTaggedObject(e)}static credentialFromError(e){return di.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return di.credential(e.oauthAccessToken)}catch{return null}}}di.GITHUB_SIGN_IN_METHOD="github.com";di.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi extends nl{constructor(){super("twitter.com")}static credential(e,t){return ls._fromParams({providerId:fi.PROVIDER_ID,signInMethod:fi.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return fi.credentialFromTaggedObject(e)}static credentialFromError(e){return fi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return fi.credential(t,s)}catch{return null}}}fi.TWITTER_SIGN_IN_METHOD="twitter.com";fi.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GI(r,e){return tl(r,"POST","/v1/accounts:signUp",Ci(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,o=!1){const u=await Pn._fromIdTokenResponse(e,s,o),h=yg(s);return new us({user:u,providerId:h,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const o=yg(s);return new us({user:e,providerId:o,_tokenResponse:s,operationType:t})}}function yg(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ku extends Vr{constructor(e,t,s,o){super(t.code,t.message),this.operationType=s,this.user=o,Object.setPrototypeOf(this,Ku.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,o){return new Ku(e,t,s,o)}}function o_(r,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(u=>{throw u.code==="auth/multi-factor-auth-required"?Ku._fromErrorAndOperation(r,u,e,s):u})}async function QI(r,e,t=!1){const s=await za(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return us._forOperation(r,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YI(r,e,t=!1){const{auth:s}=r;if(an(s.app))return Promise.reject(Rr(s));const o="reauthenticate";try{const u=await za(r,o_(s,o,e,r),t);pe(u.idToken,s,"internal-error");const h=Gd(u.idToken);pe(h,s,"internal-error");const{sub:m}=h;return pe(r.uid===m,s,"user-mismatch"),us._forOperation(r,o,u)}catch(u){throw(u==null?void 0:u.code)==="auth/user-not-found"&&_n(s,"user-mismatch"),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function a_(r,e,t=!1){if(an(r.app))return Promise.reject(Rr(r));const s="signIn",o=await o_(r,s,e),u=await us._fromIdTokenResponse(r,s,o);return t||await r._updateCurrentUser(u.user),u}async function JI(r,e){return a_(Pi(r),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function l_(r){const e=Pi(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function XI(r,e,t){if(an(r.app))return Promise.reject(Rr(r));const s=Pi(r),h=await Ed(s,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",GI).catch(g=>{throw g.code==="auth/password-does-not-meet-requirements"&&l_(r),g}),m=await us._fromIdTokenResponse(s,"signIn",h);return await s._updateCurrentUser(m.user),m}function ZI(r,e,t){return an(r.app)?Promise.reject(Rr(r)):JI($t(r),Ao.credential(e,t)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&l_(r),s})}function e0(r,e,t,s){return $t(r).onIdTokenChanged(e,t,s)}function t0(r,e,t){return $t(r).beforeAuthStateChanged(e,t)}function n0(r,e,t,s){return $t(r).onAuthStateChanged(e,t,s)}function r0(r){return $t(r).signOut()}const Gu="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u_{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Gu,"1"),this.storage.removeItem(Gu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i0=1e3,s0=10;class c_ extends u_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=t_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),o=this.localCache[t];s!==o&&e(t,o,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((h,m,g)=>{this.notifyListeners(h,g)});return}const s=e.key;t?this.detachListener():this.stopPolling();const o=()=>{const h=this.storage.getItem(s);!t&&this.localCache[s]===h||this.notifyListeners(s,h)},u=this.storage.getItem(s);TI()&&u!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,s0):o()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const o of Array.from(s))o(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},i0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}c_.type="LOCAL";const o0=c_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h_ extends u_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}h_.type="SESSION";const d_=h_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a0(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(o=>o.isListeningto(e));if(t)return t;const s=new uc(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:o,data:u}=t.data,h=this.handlersMap[o];if(!(h!=null&&h.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:o});const m=Array.from(h).map(async _=>_(t.origin,u)),g=await a0(m);t.ports[0].postMessage({status:"done",eventId:s,eventType:o,response:g})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}uc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zd(r="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l0{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let u,h;return new Promise((m,g)=>{const _=Zd("",20);o.port1.start();const w=setTimeout(()=>{g(new Error("unsupported_event"))},s);h={messageChannel:o,onMessage(R){const b=R;if(b.data.eventId===_)switch(b.data.status){case"ack":clearTimeout(w),u=setTimeout(()=>{g(new Error("timeout"))},3e3);break;case"done":clearTimeout(u),m(b.data.response);break;default:clearTimeout(w),clearTimeout(u),g(new Error("invalid_response"));break}}},this.handlers.add(h),o.port1.addEventListener("message",h.onMessage),this.target.postMessage({eventType:e,eventId:_,data:t},[o.port2])}).finally(()=>{h&&this.removeMessageHandler(h)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zn(){return window}function u0(r){Zn().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f_(){return typeof Zn().WorkerGlobalScope<"u"&&typeof Zn().importScripts=="function"}async function c0(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function h0(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)==null?void 0:r.controller)||null}function d0(){return f_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p_="firebaseLocalStorageDb",f0=1,Qu="firebaseLocalStorage",m_="fbase_key";class rl{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function cc(r,e){return r.transaction([Qu],e?"readwrite":"readonly").objectStore(Qu)}function p0(){const r=indexedDB.deleteDatabase(p_);return new rl(r).toPromise()}function wd(){const r=indexedDB.open(p_,f0);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const s=r.result;try{s.createObjectStore(Qu,{keyPath:m_})}catch(o){t(o)}}),r.addEventListener("success",async()=>{const s=r.result;s.objectStoreNames.contains(Qu)?e(s):(s.close(),await p0(),e(await wd()))})})}async function _g(r,e,t){const s=cc(r,!0).put({[m_]:e,value:t});return new rl(s).toPromise()}async function m0(r,e){const t=cc(r,!1).get(e),s=await new rl(t).toPromise();return s===void 0?null:s.value}function vg(r,e){const t=cc(r,!0).delete(e);return new rl(t).toPromise()}const g0=800,y0=3;class g_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await wd(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>y0)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return f_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=uc._getInstance(d0()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,s;if(this.activeServiceWorker=await c0(),!this.activeServiceWorker)return;this.sender=new l0(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||h0()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await wd();return await _g(e,Gu,"1"),await vg(e,Gu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>_g(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>m0(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>vg(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const u=cc(o,!1).getAll();return new rl(u).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:o,value:u}of e)s.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(u)&&(this.notifyListeners(o,u),t.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!s.has(o)&&(this.notifyListeners(o,null),t.push(o));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const o of Array.from(s))o(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),g0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}g_.type="LOCAL";const _0=g_;new el(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y_(r,e){return e?Ar(e):(pe(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef extends Yd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return fo(e,this._buildIdpRequest())}_linkToIdToken(e,t){return fo(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return fo(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function v0(r){return a_(r.auth,new ef(r),r.bypassAuthState)}function E0(r){const{auth:e,user:t}=r;return pe(t,e,"internal-error"),YI(t,new ef(r),r.bypassAuthState)}async function w0(r){const{auth:e,user:t}=r;return pe(t,e,"internal-error"),QI(t,new ef(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class __{constructor(e,t,s,o,u=!1){this.auth=e,this.resolver=s,this.user=o,this.bypassAuthState=u,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:o,tenantId:u,error:h,type:m}=e;if(h){this.reject(h);return}const g={auth:this.auth,requestUri:t,sessionId:s,tenantId:u||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(m)(g))}catch(_){this.reject(_)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return v0;case"linkViaPopup":case"linkViaRedirect":return w0;case"reauthViaPopup":case"reauthViaRedirect":return E0;default:_n(this.auth,"internal-error")}}resolve(e){Nr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Nr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T0=new el(2e3,1e4);async function I0(r,e,t){if(an(r.app))return Promise.reject(xn(r,"operation-not-supported-in-this-environment"));const s=Pi(r);nI(r,e,Xd);const o=y_(s,t);return new is(s,"signInViaPopup",e,o).executeNotNull()}class is extends __{constructor(e,t,s,o,u){super(e,t,o,u),this.provider=s,this.authWindow=null,this.pollId=null,is.currentPopupAction&&is.currentPopupAction.cancel(),is.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return pe(e,this.auth,"internal-error"),e}async onExecution(){Nr(this.filter.length===1,"Popup operations only handle one event");const e=Zd();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(xn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(xn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,is.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if((s=(t=this.authWindow)==null?void 0:t.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(xn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,T0.get())};e()}}is.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S0="pendingRedirect",Ou=new Map;class A0 extends __{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=Ou.get(this.auth._key());if(!e){try{const s=await R0(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}Ou.set(this.auth._key(),e)}return this.bypassAuthState||Ou.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function R0(r,e){const t=P0(e),s=k0(r);if(!await s._isAvailable())return!1;const o=await s._get(t)==="true";return await s._remove(t),o}function C0(r,e){Ou.set(r._key(),e)}function k0(r){return Ar(r._redirectPersistence)}function P0(r){return Vu(S0,r.config.apiKey,r.name)}async function N0(r,e,t=!1){if(an(r.app))return Promise.reject(Rr(r));const s=Pi(r),o=y_(s,e),h=await new A0(s,o,t).execute();return h&&!t&&(delete h.user._redirectEventId,await s._persistUserIfCurrent(h.user),await s._setRedirectUser(null,e)),h}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x0=600*1e3;class D0{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!V0(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!v_(e)){const o=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";t.onError(xn(this.auth,o))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=x0&&this.cachedEventUids.clear(),this.cachedEventUids.has(Eg(e))}saveEventToCache(e){this.cachedEventUids.add(Eg(e)),this.lastProcessedEventTime=Date.now()}}function Eg(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function v_({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function V0(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return v_(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function O0(r,e={}){return ki(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L0=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,M0=/^https?/;async function b0(r){if(r.config.emulator)return;const{authorizedDomains:e}=await O0(r);for(const t of e)try{if(F0(t))return}catch{}_n(r,"unauthorized-domain")}function F0(r){const e=_d(),{protocol:t,hostname:s}=new URL(e);if(r.startsWith("chrome-extension://")){const h=new URL(r);return h.hostname===""&&s===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&h.hostname===s}if(!M0.test(t))return!1;if(L0.test(r))return s===r;const o=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U0=new el(3e4,6e4);function wg(){const r=Zn().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function j0(r){return new Promise((e,t)=>{var o,u,h;function s(){wg(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{wg(),t(xn(r,"network-request-failed"))},timeout:U0.get()})}if((u=(o=Zn().gapi)==null?void 0:o.iframes)!=null&&u.Iframe)e(gapi.iframes.getContext());else if((h=Zn().gapi)!=null&&h.load)s();else{const m=xI("iframefcb");return Zn()[m]=()=>{gapi.load?s():t(xn(r,"network-request-failed"))},r_(`${NI()}?onload=${m}`).catch(g=>t(g))}}).catch(e=>{throw Lu=null,e})}let Lu=null;function z0(r){return Lu=Lu||j0(r),Lu}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B0=new el(5e3,15e3),$0="__/auth/iframe",W0="emulator/auth/iframe",H0={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},q0=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function K0(r){const e=r.config;pe(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?Kd(e,W0):`https://${r.config.authDomain}/${$0}`,s={apiKey:e.apiKey,appName:r.name,v:So},o=q0.get(r.config.apiHost);o&&(s.eid=o);const u=r._getFrameworks();return u.length&&(s.fw=u.join(",")),`${t}?${Xa(s).slice(1)}`}async function G0(r){const e=await z0(r),t=Zn().gapi;return pe(t,r,"internal-error"),e.open({where:document.body,url:K0(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:H0,dontclear:!0},s=>new Promise(async(o,u)=>{await s.restyle({setHideOnLeave:!1});const h=xn(r,"network-request-failed"),m=Zn().setTimeout(()=>{u(h)},B0.get());function g(){Zn().clearTimeout(m),o(s)}s.ping(g).then(g,()=>{u(h)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q0={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Y0=500,J0=600,X0="_blank",Z0="http://localhost";class Tg{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function eS(r,e,t,s=Y0,o=J0){const u=Math.max((window.screen.availHeight-o)/2,0).toString(),h=Math.max((window.screen.availWidth-s)/2,0).toString();let m="";const g={...Q0,width:s.toString(),height:o.toString(),top:u,left:h},_=Ut().toLowerCase();t&&(m=Yy(_)?X0:t),Gy(_)&&(e=e||Z0,g.scrollbars="yes");const w=Object.entries(g).reduce((b,[z,Z])=>`${b}${z}=${Z},`,"");if(wI(_)&&m!=="_self")return tS(e||"",m),new Tg(null);const R=window.open(e||"",m,w);pe(R,r,"popup-blocked");try{R.focus()}catch{}return new Tg(R)}function tS(r,e){const t=document.createElement("a");t.href=r,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nS="__/auth/handler",rS="emulator/auth/handler",iS=encodeURIComponent("fac");async function Ig(r,e,t,s,o,u){pe(r.config.authDomain,r,"auth-domain-config-required"),pe(r.config.apiKey,r,"invalid-api-key");const h={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:s,v:So,eventId:o};if(e instanceof Xd){e.setDefaultLanguage(r.languageCode),h.providerId=e.providerId||"",Bw(e.getCustomParameters())||(h.customParameters=JSON.stringify(e.getCustomParameters()));for(const[w,R]of Object.entries({}))h[w]=R}if(e instanceof nl){const w=e.getScopes().filter(R=>R!=="");w.length>0&&(h.scopes=w.join(","))}r.tenantId&&(h.tid=r.tenantId);const m=h;for(const w of Object.keys(m))m[w]===void 0&&delete m[w];const g=await r._getAppCheckToken(),_=g?`#${iS}=${encodeURIComponent(g)}`:"";return`${sS(r)}?${Xa(m).slice(1)}${_}`}function sS({config:r}){return r.emulator?Kd(r,rS):`https://${r.authDomain}/${nS}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sd="webStorageSupport";class oS{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=d_,this._completeRedirectFn=N0,this._overrideRedirectResult=C0}async _openPopup(e,t,s,o){var h;Nr((h=this.eventManagers[e._key()])==null?void 0:h.manager,"_initialize() not called before _openPopup()");const u=await Ig(e,t,s,_d(),o);return eS(e,u,Zd())}async _openRedirect(e,t,s,o){await this._originValidation(e);const u=await Ig(e,t,s,_d(),o);return u0(u),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:o,promise:u}=this.eventManagers[t];return o?Promise.resolve(o):(Nr(u,"If manager is not set, promise should be"),u)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await G0(e),s=new D0(e);return t.register("authEvent",o=>(pe(o==null?void 0:o.authEvent,e,"invalid-auth-event"),{status:s.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(sd,{type:sd},o=>{var h;const u=(h=o==null?void 0:o[0])==null?void 0:h[sd];u!==void 0&&t(!!u),_n(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=b0(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return t_()||Qy()||Qd()}}const aS=oS;var Sg="@firebase/auth",Ag="1.12.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lS{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){pe(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uS(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function cS(r){_o(new as("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),u=e.getProvider("app-check-internal"),{apiKey:h,authDomain:m}=s.options;pe(h&&!h.includes(":"),"invalid-api-key",{appName:s.name});const g={apiKey:h,authDomain:m,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:n_(r)},_=new CI(s,o,u,g);return bI(_,t),_},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),_o(new as("auth-internal",e=>{const t=Pi(e.getProvider("auth").getImmediate());return(s=>new lS(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),yi(Sg,Ag,uS(r)),yi(Sg,Ag,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hS=300,dS=Vy("authIdTokenMaxAge")||hS;let Rg=null;const fS=r=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>dS)return;const o=t==null?void 0:t.token;Rg!==o&&(Rg=o,await fetch(r,{method:o?"POST":"DELETE",headers:o?{Authorization:`Bearer ${o}`}:{}}))};function pS(r=Fy()){const e=Wd(r,"auth");if(e.isInitialized())return e.getImmediate();const t=MI(r,{popupRedirectResolver:aS,persistence:[_0,o0,d_]}),s=Vy("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const u=new URL(s,location.origin);if(location.origin===u.origin){const h=fS(u.toString());t0(t,h,()=>h(t.currentUser)),e0(t,m=>h(m))}}const o=xy("auth");return o&&FI(t,`http://${o}`),t}function mS(){var r;return((r=document.getElementsByTagName("head"))==null?void 0:r[0])??document}kI({loadJS(r){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",r),s.onload=e,s.onerror=o=>{const u=xn("internal-error");u.customData=o,t(u)},s.type="text/javascript",s.charset="UTF-8",mS().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});cS("Browser");var gS="firebase",yS="12.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */yi(gS,yS,"app");var Cg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var _i,E_;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(N,S){function C(){}C.prototype=S.prototype,N.F=S.prototype,N.prototype=new C,N.prototype.constructor=N,N.D=function(D,A,V){for(var T=Array(arguments.length-2),fe=2;fe<arguments.length;fe++)T[fe-2]=arguments[fe];return S.prototype[A].apply(D,T)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(s,t),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function o(N,S,C){C||(C=0);const D=Array(16);if(typeof S=="string")for(var A=0;A<16;++A)D[A]=S.charCodeAt(C++)|S.charCodeAt(C++)<<8|S.charCodeAt(C++)<<16|S.charCodeAt(C++)<<24;else for(A=0;A<16;++A)D[A]=S[C++]|S[C++]<<8|S[C++]<<16|S[C++]<<24;S=N.g[0],C=N.g[1],A=N.g[2];let V=N.g[3],T;T=S+(V^C&(A^V))+D[0]+3614090360&4294967295,S=C+(T<<7&4294967295|T>>>25),T=V+(A^S&(C^A))+D[1]+3905402710&4294967295,V=S+(T<<12&4294967295|T>>>20),T=A+(C^V&(S^C))+D[2]+606105819&4294967295,A=V+(T<<17&4294967295|T>>>15),T=C+(S^A&(V^S))+D[3]+3250441966&4294967295,C=A+(T<<22&4294967295|T>>>10),T=S+(V^C&(A^V))+D[4]+4118548399&4294967295,S=C+(T<<7&4294967295|T>>>25),T=V+(A^S&(C^A))+D[5]+1200080426&4294967295,V=S+(T<<12&4294967295|T>>>20),T=A+(C^V&(S^C))+D[6]+2821735955&4294967295,A=V+(T<<17&4294967295|T>>>15),T=C+(S^A&(V^S))+D[7]+4249261313&4294967295,C=A+(T<<22&4294967295|T>>>10),T=S+(V^C&(A^V))+D[8]+1770035416&4294967295,S=C+(T<<7&4294967295|T>>>25),T=V+(A^S&(C^A))+D[9]+2336552879&4294967295,V=S+(T<<12&4294967295|T>>>20),T=A+(C^V&(S^C))+D[10]+4294925233&4294967295,A=V+(T<<17&4294967295|T>>>15),T=C+(S^A&(V^S))+D[11]+2304563134&4294967295,C=A+(T<<22&4294967295|T>>>10),T=S+(V^C&(A^V))+D[12]+1804603682&4294967295,S=C+(T<<7&4294967295|T>>>25),T=V+(A^S&(C^A))+D[13]+4254626195&4294967295,V=S+(T<<12&4294967295|T>>>20),T=A+(C^V&(S^C))+D[14]+2792965006&4294967295,A=V+(T<<17&4294967295|T>>>15),T=C+(S^A&(V^S))+D[15]+1236535329&4294967295,C=A+(T<<22&4294967295|T>>>10),T=S+(A^V&(C^A))+D[1]+4129170786&4294967295,S=C+(T<<5&4294967295|T>>>27),T=V+(C^A&(S^C))+D[6]+3225465664&4294967295,V=S+(T<<9&4294967295|T>>>23),T=A+(S^C&(V^S))+D[11]+643717713&4294967295,A=V+(T<<14&4294967295|T>>>18),T=C+(V^S&(A^V))+D[0]+3921069994&4294967295,C=A+(T<<20&4294967295|T>>>12),T=S+(A^V&(C^A))+D[5]+3593408605&4294967295,S=C+(T<<5&4294967295|T>>>27),T=V+(C^A&(S^C))+D[10]+38016083&4294967295,V=S+(T<<9&4294967295|T>>>23),T=A+(S^C&(V^S))+D[15]+3634488961&4294967295,A=V+(T<<14&4294967295|T>>>18),T=C+(V^S&(A^V))+D[4]+3889429448&4294967295,C=A+(T<<20&4294967295|T>>>12),T=S+(A^V&(C^A))+D[9]+568446438&4294967295,S=C+(T<<5&4294967295|T>>>27),T=V+(C^A&(S^C))+D[14]+3275163606&4294967295,V=S+(T<<9&4294967295|T>>>23),T=A+(S^C&(V^S))+D[3]+4107603335&4294967295,A=V+(T<<14&4294967295|T>>>18),T=C+(V^S&(A^V))+D[8]+1163531501&4294967295,C=A+(T<<20&4294967295|T>>>12),T=S+(A^V&(C^A))+D[13]+2850285829&4294967295,S=C+(T<<5&4294967295|T>>>27),T=V+(C^A&(S^C))+D[2]+4243563512&4294967295,V=S+(T<<9&4294967295|T>>>23),T=A+(S^C&(V^S))+D[7]+1735328473&4294967295,A=V+(T<<14&4294967295|T>>>18),T=C+(V^S&(A^V))+D[12]+2368359562&4294967295,C=A+(T<<20&4294967295|T>>>12),T=S+(C^A^V)+D[5]+4294588738&4294967295,S=C+(T<<4&4294967295|T>>>28),T=V+(S^C^A)+D[8]+2272392833&4294967295,V=S+(T<<11&4294967295|T>>>21),T=A+(V^S^C)+D[11]+1839030562&4294967295,A=V+(T<<16&4294967295|T>>>16),T=C+(A^V^S)+D[14]+4259657740&4294967295,C=A+(T<<23&4294967295|T>>>9),T=S+(C^A^V)+D[1]+2763975236&4294967295,S=C+(T<<4&4294967295|T>>>28),T=V+(S^C^A)+D[4]+1272893353&4294967295,V=S+(T<<11&4294967295|T>>>21),T=A+(V^S^C)+D[7]+4139469664&4294967295,A=V+(T<<16&4294967295|T>>>16),T=C+(A^V^S)+D[10]+3200236656&4294967295,C=A+(T<<23&4294967295|T>>>9),T=S+(C^A^V)+D[13]+681279174&4294967295,S=C+(T<<4&4294967295|T>>>28),T=V+(S^C^A)+D[0]+3936430074&4294967295,V=S+(T<<11&4294967295|T>>>21),T=A+(V^S^C)+D[3]+3572445317&4294967295,A=V+(T<<16&4294967295|T>>>16),T=C+(A^V^S)+D[6]+76029189&4294967295,C=A+(T<<23&4294967295|T>>>9),T=S+(C^A^V)+D[9]+3654602809&4294967295,S=C+(T<<4&4294967295|T>>>28),T=V+(S^C^A)+D[12]+3873151461&4294967295,V=S+(T<<11&4294967295|T>>>21),T=A+(V^S^C)+D[15]+530742520&4294967295,A=V+(T<<16&4294967295|T>>>16),T=C+(A^V^S)+D[2]+3299628645&4294967295,C=A+(T<<23&4294967295|T>>>9),T=S+(A^(C|~V))+D[0]+4096336452&4294967295,S=C+(T<<6&4294967295|T>>>26),T=V+(C^(S|~A))+D[7]+1126891415&4294967295,V=S+(T<<10&4294967295|T>>>22),T=A+(S^(V|~C))+D[14]+2878612391&4294967295,A=V+(T<<15&4294967295|T>>>17),T=C+(V^(A|~S))+D[5]+4237533241&4294967295,C=A+(T<<21&4294967295|T>>>11),T=S+(A^(C|~V))+D[12]+1700485571&4294967295,S=C+(T<<6&4294967295|T>>>26),T=V+(C^(S|~A))+D[3]+2399980690&4294967295,V=S+(T<<10&4294967295|T>>>22),T=A+(S^(V|~C))+D[10]+4293915773&4294967295,A=V+(T<<15&4294967295|T>>>17),T=C+(V^(A|~S))+D[1]+2240044497&4294967295,C=A+(T<<21&4294967295|T>>>11),T=S+(A^(C|~V))+D[8]+1873313359&4294967295,S=C+(T<<6&4294967295|T>>>26),T=V+(C^(S|~A))+D[15]+4264355552&4294967295,V=S+(T<<10&4294967295|T>>>22),T=A+(S^(V|~C))+D[6]+2734768916&4294967295,A=V+(T<<15&4294967295|T>>>17),T=C+(V^(A|~S))+D[13]+1309151649&4294967295,C=A+(T<<21&4294967295|T>>>11),T=S+(A^(C|~V))+D[4]+4149444226&4294967295,S=C+(T<<6&4294967295|T>>>26),T=V+(C^(S|~A))+D[11]+3174756917&4294967295,V=S+(T<<10&4294967295|T>>>22),T=A+(S^(V|~C))+D[2]+718787259&4294967295,A=V+(T<<15&4294967295|T>>>17),T=C+(V^(A|~S))+D[9]+3951481745&4294967295,N.g[0]=N.g[0]+S&4294967295,N.g[1]=N.g[1]+(A+(T<<21&4294967295|T>>>11))&4294967295,N.g[2]=N.g[2]+A&4294967295,N.g[3]=N.g[3]+V&4294967295}s.prototype.v=function(N,S){S===void 0&&(S=N.length);const C=S-this.blockSize,D=this.C;let A=this.h,V=0;for(;V<S;){if(A==0)for(;V<=C;)o(this,N,V),V+=this.blockSize;if(typeof N=="string"){for(;V<S;)if(D[A++]=N.charCodeAt(V++),A==this.blockSize){o(this,D),A=0;break}}else for(;V<S;)if(D[A++]=N[V++],A==this.blockSize){o(this,D),A=0;break}}this.h=A,this.o+=S},s.prototype.A=function(){var N=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);N[0]=128;for(var S=1;S<N.length-8;++S)N[S]=0;S=this.o*8;for(var C=N.length-8;C<N.length;++C)N[C]=S&255,S/=256;for(this.v(N),N=Array(16),S=0,C=0;C<4;++C)for(let D=0;D<32;D+=8)N[S++]=this.g[C]>>>D&255;return N};function u(N,S){var C=m;return Object.prototype.hasOwnProperty.call(C,N)?C[N]:C[N]=S(N)}function h(N,S){this.h=S;const C=[];let D=!0;for(let A=N.length-1;A>=0;A--){const V=N[A]|0;D&&V==S||(C[A]=V,D=!1)}this.g=C}var m={};function g(N){return-128<=N&&N<128?u(N,function(S){return new h([S|0],S<0?-1:0)}):new h([N|0],N<0?-1:0)}function _(N){if(isNaN(N)||!isFinite(N))return R;if(N<0)return G(_(-N));const S=[];let C=1;for(let D=0;N>=C;D++)S[D]=N/C|0,C*=4294967296;return new h(S,0)}function w(N,S){if(N.length==0)throw Error("number format error: empty string");if(S=S||10,S<2||36<S)throw Error("radix out of range: "+S);if(N.charAt(0)=="-")return G(w(N.substring(1),S));if(N.indexOf("-")>=0)throw Error('number format error: interior "-" character');const C=_(Math.pow(S,8));let D=R;for(let V=0;V<N.length;V+=8){var A=Math.min(8,N.length-V);const T=parseInt(N.substring(V,V+A),S);A<8?(A=_(Math.pow(S,A)),D=D.j(A).add(_(T))):(D=D.j(C),D=D.add(_(T)))}return D}var R=g(0),b=g(1),z=g(16777216);r=h.prototype,r.m=function(){if(Q(this))return-G(this).m();let N=0,S=1;for(let C=0;C<this.g.length;C++){const D=this.i(C);N+=(D>=0?D:4294967296+D)*S,S*=4294967296}return N},r.toString=function(N){if(N=N||10,N<2||36<N)throw Error("radix out of range: "+N);if(Z(this))return"0";if(Q(this))return"-"+G(this).toString(N);const S=_(Math.pow(N,6));var C=this;let D="";for(;;){const A=Fe(C,S).g;C=ye(C,A.j(S));let V=((C.g.length>0?C.g[0]:C.h)>>>0).toString(N);if(C=A,Z(C))return V+D;for(;V.length<6;)V="0"+V;D=V+D}},r.i=function(N){return N<0?0:N<this.g.length?this.g[N]:this.h};function Z(N){if(N.h!=0)return!1;for(let S=0;S<N.g.length;S++)if(N.g[S]!=0)return!1;return!0}function Q(N){return N.h==-1}r.l=function(N){return N=ye(this,N),Q(N)?-1:Z(N)?0:1};function G(N){const S=N.g.length,C=[];for(let D=0;D<S;D++)C[D]=~N.g[D];return new h(C,~N.h).add(b)}r.abs=function(){return Q(this)?G(this):this},r.add=function(N){const S=Math.max(this.g.length,N.g.length),C=[];let D=0;for(let A=0;A<=S;A++){let V=D+(this.i(A)&65535)+(N.i(A)&65535),T=(V>>>16)+(this.i(A)>>>16)+(N.i(A)>>>16);D=T>>>16,V&=65535,T&=65535,C[A]=T<<16|V}return new h(C,C[C.length-1]&-2147483648?-1:0)};function ye(N,S){return N.add(G(S))}r.j=function(N){if(Z(this)||Z(N))return R;if(Q(this))return Q(N)?G(this).j(G(N)):G(G(this).j(N));if(Q(N))return G(this.j(G(N)));if(this.l(z)<0&&N.l(z)<0)return _(this.m()*N.m());const S=this.g.length+N.g.length,C=[];for(var D=0;D<2*S;D++)C[D]=0;for(D=0;D<this.g.length;D++)for(let A=0;A<N.g.length;A++){const V=this.i(D)>>>16,T=this.i(D)&65535,fe=N.i(A)>>>16,ze=N.i(A)&65535;C[2*D+2*A]+=T*ze,Ee(C,2*D+2*A),C[2*D+2*A+1]+=V*ze,Ee(C,2*D+2*A+1),C[2*D+2*A+1]+=T*fe,Ee(C,2*D+2*A+1),C[2*D+2*A+2]+=V*fe,Ee(C,2*D+2*A+2)}for(N=0;N<S;N++)C[N]=C[2*N+1]<<16|C[2*N];for(N=S;N<2*S;N++)C[N]=0;return new h(C,0)};function Ee(N,S){for(;(N[S]&65535)!=N[S];)N[S+1]+=N[S]>>>16,N[S]&=65535,S++}function Ce(N,S){this.g=N,this.h=S}function Fe(N,S){if(Z(S))throw Error("division by zero");if(Z(N))return new Ce(R,R);if(Q(N))return S=Fe(G(N),S),new Ce(G(S.g),G(S.h));if(Q(S))return S=Fe(N,G(S)),new Ce(G(S.g),S.h);if(N.g.length>30){if(Q(N)||Q(S))throw Error("slowDivide_ only works with positive integers.");for(var C=b,D=S;D.l(N)<=0;)C=je(C),D=je(D);var A=De(C,1),V=De(D,1);for(D=De(D,2),C=De(C,2);!Z(D);){var T=V.add(D);T.l(N)<=0&&(A=A.add(C),V=T),D=De(D,1),C=De(C,1)}return S=ye(N,A.j(S)),new Ce(A,S)}for(A=R;N.l(S)>=0;){for(C=Math.max(1,Math.floor(N.m()/S.m())),D=Math.ceil(Math.log(C)/Math.LN2),D=D<=48?1:Math.pow(2,D-48),V=_(C),T=V.j(S);Q(T)||T.l(N)>0;)C-=D,V=_(C),T=V.j(S);Z(V)&&(V=b),A=A.add(V),N=ye(N,T)}return new Ce(A,N)}r.B=function(N){return Fe(this,N).h},r.and=function(N){const S=Math.max(this.g.length,N.g.length),C=[];for(let D=0;D<S;D++)C[D]=this.i(D)&N.i(D);return new h(C,this.h&N.h)},r.or=function(N){const S=Math.max(this.g.length,N.g.length),C=[];for(let D=0;D<S;D++)C[D]=this.i(D)|N.i(D);return new h(C,this.h|N.h)},r.xor=function(N){const S=Math.max(this.g.length,N.g.length),C=[];for(let D=0;D<S;D++)C[D]=this.i(D)^N.i(D);return new h(C,this.h^N.h)};function je(N){const S=N.g.length+1,C=[];for(let D=0;D<S;D++)C[D]=N.i(D)<<1|N.i(D-1)>>>31;return new h(C,N.h)}function De(N,S){const C=S>>5;S%=32;const D=N.g.length-C,A=[];for(let V=0;V<D;V++)A[V]=S>0?N.i(V+C)>>>S|N.i(V+C+1)<<32-S:N.i(V+C);return new h(A,N.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,E_=s,h.prototype.add=h.prototype.add,h.prototype.multiply=h.prototype.j,h.prototype.modulo=h.prototype.B,h.prototype.compare=h.prototype.l,h.prototype.toNumber=h.prototype.m,h.prototype.toString=h.prototype.toString,h.prototype.getBits=h.prototype.i,h.fromNumber=_,h.fromString=w,_i=h}).apply(typeof Cg<"u"?Cg:typeof self<"u"?self:typeof window<"u"?window:{});var Ru=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var w_,Da,T_,Mu,Td,I_,S_,A_;(function(){var r,e=Object.defineProperty;function t(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ru=="object"&&Ru];for(var p=0;p<l.length;++p){var y=l[p];if(y&&y.Math==Math)return y}throw Error("Cannot find global object")}var s=t(this);function o(l,p){if(p)e:{var y=s;l=l.split(".");for(var E=0;E<l.length-1;E++){var M=l[E];if(!(M in y))break e;y=y[M]}l=l[l.length-1],E=y[l],p=p(E),p!=E&&p!=null&&e(y,l,{configurable:!0,writable:!0,value:p})}}o("Symbol.dispose",function(l){return l||Symbol("Symbol.dispose")}),o("Array.prototype.values",function(l){return l||function(){return this[Symbol.iterator]()}}),o("Object.entries",function(l){return l||function(p){var y=[],E;for(E in p)Object.prototype.hasOwnProperty.call(p,E)&&y.push([E,p[E]]);return y}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var u=u||{},h=this||self;function m(l){var p=typeof l;return p=="object"&&l!=null||p=="function"}function g(l,p,y){return l.call.apply(l.bind,arguments)}function _(l,p,y){return _=g,_.apply(null,arguments)}function w(l,p){var y=Array.prototype.slice.call(arguments,1);return function(){var E=y.slice();return E.push.apply(E,arguments),l.apply(this,E)}}function R(l,p){function y(){}y.prototype=p.prototype,l.Z=p.prototype,l.prototype=new y,l.prototype.constructor=l,l.Ob=function(E,M,j){for(var X=Array(arguments.length-2),we=2;we<arguments.length;we++)X[we-2]=arguments[we];return p.prototype[M].apply(E,X)}}var b=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?l=>l&&AsyncContext.Snapshot.wrap(l):l=>l;function z(l){const p=l.length;if(p>0){const y=Array(p);for(let E=0;E<p;E++)y[E]=l[E];return y}return[]}function Z(l,p){for(let E=1;E<arguments.length;E++){const M=arguments[E];var y=typeof M;if(y=y!="object"?y:M?Array.isArray(M)?"array":y:"null",y=="array"||y=="object"&&typeof M.length=="number"){y=l.length||0;const j=M.length||0;l.length=y+j;for(let X=0;X<j;X++)l[y+X]=M[X]}else l.push(M)}}class Q{constructor(p,y){this.i=p,this.j=y,this.h=0,this.g=null}get(){let p;return this.h>0?(this.h--,p=this.g,this.g=p.next,p.next=null):p=this.i(),p}}function G(l){h.setTimeout(()=>{throw l},0)}function ye(){var l=N;let p=null;return l.g&&(p=l.g,l.g=l.g.next,l.g||(l.h=null),p.next=null),p}class Ee{constructor(){this.h=this.g=null}add(p,y){const E=Ce.get();E.set(p,y),this.h?this.h.next=E:this.g=E,this.h=E}}var Ce=new Q(()=>new Fe,l=>l.reset());class Fe{constructor(){this.next=this.g=this.h=null}set(p,y){this.h=p,this.g=y,this.next=null}reset(){this.next=this.g=this.h=null}}let je,De=!1,N=new Ee,S=()=>{const l=Promise.resolve(void 0);je=()=>{l.then(C)}};function C(){for(var l;l=ye();){try{l.h.call(l.g)}catch(y){G(y)}var p=Ce;p.j(l),p.h<100&&(p.h++,l.next=p.g,p.g=l)}De=!1}function D(){this.u=this.u,this.C=this.C}D.prototype.u=!1,D.prototype.dispose=function(){this.u||(this.u=!0,this.N())},D.prototype[Symbol.dispose]=function(){this.dispose()},D.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function A(l,p){this.type=l,this.g=this.target=p,this.defaultPrevented=!1}A.prototype.h=function(){this.defaultPrevented=!0};var V=(function(){if(!h.addEventListener||!Object.defineProperty)return!1;var l=!1,p=Object.defineProperty({},"passive",{get:function(){l=!0}});try{const y=()=>{};h.addEventListener("test",y,p),h.removeEventListener("test",y,p)}catch{}return l})();function T(l){return/^[\s\xa0]*$/.test(l)}function fe(l,p){A.call(this,l?l.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,l&&this.init(l,p)}R(fe,A),fe.prototype.init=function(l,p){const y=this.type=l.type,E=l.changedTouches&&l.changedTouches.length?l.changedTouches[0]:null;this.target=l.target||l.srcElement,this.g=p,p=l.relatedTarget,p||(y=="mouseover"?p=l.fromElement:y=="mouseout"&&(p=l.toElement)),this.relatedTarget=p,E?(this.clientX=E.clientX!==void 0?E.clientX:E.pageX,this.clientY=E.clientY!==void 0?E.clientY:E.pageY,this.screenX=E.screenX||0,this.screenY=E.screenY||0):(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0),this.button=l.button,this.key=l.key||"",this.ctrlKey=l.ctrlKey,this.altKey=l.altKey,this.shiftKey=l.shiftKey,this.metaKey=l.metaKey,this.pointerId=l.pointerId||0,this.pointerType=l.pointerType,this.state=l.state,this.i=l,l.defaultPrevented&&fe.Z.h.call(this)},fe.prototype.h=function(){fe.Z.h.call(this);const l=this.i;l.preventDefault?l.preventDefault():l.returnValue=!1};var ze="closure_listenable_"+(Math.random()*1e6|0),Oe=0;function Ae(l,p,y,E,M){this.listener=l,this.proxy=null,this.src=p,this.type=y,this.capture=!!E,this.ha=M,this.key=++Oe,this.da=this.fa=!1}function J(l){l.da=!0,l.listener=null,l.proxy=null,l.src=null,l.ha=null}function ae(l,p,y){for(const E in l)p.call(y,l[E],E,l)}function ee(l,p){for(const y in l)p.call(void 0,l[y],y,l)}function O(l){const p={};for(const y in l)p[y]=l[y];return p}const $="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _e(l,p){let y,E;for(let M=1;M<arguments.length;M++){E=arguments[M];for(y in E)l[y]=E[y];for(let j=0;j<$.length;j++)y=$[j],Object.prototype.hasOwnProperty.call(E,y)&&(l[y]=E[y])}}function ue(l){this.src=l,this.g={},this.h=0}ue.prototype.add=function(l,p,y,E,M){const j=l.toString();l=this.g[j],l||(l=this.g[j]=[],this.h++);const X=Se(l,p,E,M);return X>-1?(p=l[X],y||(p.fa=!1)):(p=new Ae(p,this.src,j,!!E,M),p.fa=y,l.push(p)),p};function Ie(l,p){const y=p.type;if(y in l.g){var E=l.g[y],M=Array.prototype.indexOf.call(E,p,void 0),j;(j=M>=0)&&Array.prototype.splice.call(E,M,1),j&&(J(p),l.g[y].length==0&&(delete l.g[y],l.h--))}}function Se(l,p,y,E){for(let M=0;M<l.length;++M){const j=l[M];if(!j.da&&j.listener==p&&j.capture==!!y&&j.ha==E)return M}return-1}var Be="closure_lm_"+(Math.random()*1e6|0),Le={};function qe(l,p,y,E,M){if(Array.isArray(p)){for(let j=0;j<p.length;j++)qe(l,p[j],y,E,M);return null}return y=Do(y),l&&l[ze]?l.J(p,y,m(E)?!!E.capture:!1,M):jt(l,p,y,!1,E,M)}function jt(l,p,y,E,M,j){if(!p)throw Error("Invalid event type");const X=m(M)?!!M.capture:!!M;let we=Es(l);if(we||(l[Be]=we=new ue(l)),y=we.add(p,y,E,X,j),y.proxy)return y;if(E=_s(),y.proxy=E,E.src=l,E.listener=y,l.addEventListener)V||(M=X),M===void 0&&(M=!1),l.addEventListener(p.toString(),E,M);else if(l.attachEvent)l.attachEvent(vs(p.toString()),E);else if(l.addListener&&l.removeListener)l.addListener(E);else throw Error("addEventListener and attachEvent are unavailable.");return y}function _s(){function l(y){return p.call(l.src,l.listener,y)}const p=ul;return l}function xo(l,p,y,E,M){if(Array.isArray(p))for(var j=0;j<p.length;j++)xo(l,p[j],y,E,M);else E=m(E)?!!E.capture:!!E,y=Do(y),l&&l[ze]?(l=l.i,j=String(p).toString(),j in l.g&&(p=l.g[j],y=Se(p,y,E,M),y>-1&&(J(p[y]),Array.prototype.splice.call(p,y,1),p.length==0&&(delete l.g[j],l.h--)))):l&&(l=Es(l))&&(p=l.g[p.toString()],l=-1,p&&(l=Se(p,y,E,M)),(y=l>-1?p[l]:null)&&Or(y))}function Or(l){if(typeof l!="number"&&l&&!l.da){var p=l.src;if(p&&p[ze])Ie(p.i,l);else{var y=l.type,E=l.proxy;p.removeEventListener?p.removeEventListener(y,E,l.capture):p.detachEvent?p.detachEvent(vs(y),E):p.addListener&&p.removeListener&&p.removeListener(E),(y=Es(p))?(Ie(y,l),y.h==0&&(y.src=null,p[Be]=null)):J(l)}}}function vs(l){return l in Le?Le[l]:Le[l]="on"+l}function ul(l,p){if(l.da)l=!0;else{p=new fe(p,this);const y=l.listener,E=l.ha||l.src;l.fa&&Or(l),l=y.call(E,p)}return l}function Es(l){return l=l[Be],l instanceof ue?l:null}var Ni="__closure_events_fn_"+(Math.random()*1e9>>>0);function Do(l){return typeof l=="function"?l:(l[Ni]||(l[Ni]=function(p){return l.handleEvent(p)}),l[Ni])}function ct(){D.call(this),this.i=new ue(this),this.M=this,this.G=null}R(ct,D),ct.prototype[ze]=!0,ct.prototype.removeEventListener=function(l,p,y,E){xo(this,l,p,y,E)};function ot(l,p){var y,E=l.G;if(E)for(y=[];E;E=E.G)y.push(E);if(l=l.M,E=p.type||p,typeof p=="string")p=new A(p,l);else if(p instanceof A)p.target=p.target||l;else{var M=p;p=new A(E,l),_e(p,M)}M=!0;let j,X;if(y)for(X=y.length-1;X>=0;X--)j=p.g=y[X],M=vn(j,E,!0,p)&&M;if(j=p.g=l,M=vn(j,E,!0,p)&&M,M=vn(j,E,!1,p)&&M,y)for(X=0;X<y.length;X++)j=p.g=y[X],M=vn(j,E,!1,p)&&M}ct.prototype.N=function(){if(ct.Z.N.call(this),this.i){var l=this.i;for(const p in l.g){const y=l.g[p];for(let E=0;E<y.length;E++)J(y[E]);delete l.g[p],l.h--}}this.G=null},ct.prototype.J=function(l,p,y,E){return this.i.add(String(l),p,!1,y,E)},ct.prototype.K=function(l,p,y,E){return this.i.add(String(l),p,!0,y,E)};function vn(l,p,y,E){if(p=l.i.g[String(p)],!p)return!0;p=p.concat();let M=!0;for(let j=0;j<p.length;++j){const X=p[j];if(X&&!X.da&&X.capture==y){const we=X.listener,at=X.ha||X.src;X.fa&&Ie(l.i,X),M=we.call(at,E)!==!1&&M}}return M&&!E.defaultPrevented}function Vo(l,p){if(typeof l!="function")if(l&&typeof l.handleEvent=="function")l=_(l.handleEvent,l);else throw Error("Invalid listener argument");return Number(p)>2147483647?-1:h.setTimeout(l,p||0)}function Oo(l){l.g=Vo(()=>{l.g=null,l.i&&(l.i=!1,Oo(l))},l.l);const p=l.h;l.h=null,l.m.apply(null,p)}class cl extends D{constructor(p,y){super(),this.m=p,this.l=y,this.h=null,this.i=!1,this.g=null}j(p){this.h=arguments,this.g?this.i=!0:Oo(this)}N(){super.N(),this.g&&(h.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Lr(l){D.call(this),this.h=l,this.g={}}R(Lr,D);var Lo=[];function ws(l){ae(l.g,function(p,y){this.g.hasOwnProperty(y)&&Or(p)},l),l.g={}}Lr.prototype.N=function(){Lr.Z.N.call(this),ws(this)},Lr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Mr=h.JSON.stringify,hl=h.JSON.parse,xi=class{stringify(l){return h.JSON.stringify(l,void 0)}parse(l){return h.JSON.parse(l,void 0)}};function br(){}function dl(){}var Fr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ts(){A.call(this,"d")}R(Ts,A);function Mo(){A.call(this,"c")}R(Mo,A);var En={},Is=null;function Ur(){return Is=Is||new ct}En.Ia="serverreachability";function Ss(l){A.call(this,En.Ia,l)}R(Ss,A);function ir(l){const p=Ur();ot(p,new Ss(p))}En.STAT_EVENT="statevent";function sr(l,p){A.call(this,En.STAT_EVENT,l),this.stat=p}R(sr,A);function it(l){const p=Ur();ot(p,new sr(p,l))}En.Ja="timingevent";function bo(l,p){A.call(this,En.Ja,l),this.size=p}R(bo,A);function jr(l,p){if(typeof l!="function")throw Error("Fn must not be null and must be a function");return h.setTimeout(function(){l()},p)}function zr(){this.g=!0}zr.prototype.ua=function(){this.g=!1};function fl(l,p,y,E,M,j){l.info(function(){if(l.g)if(j){var X="",we=j.split("&");for(let We=0;We<we.length;We++){var at=we[We].split("=");if(at.length>1){const ht=at[0];at=at[1];const nn=ht.split("_");X=nn.length>=2&&nn[1]=="type"?X+(ht+"="+at+"&"):X+(ht+"=redacted&")}}}else X=null;else X=j;return"XMLHTTP REQ ("+E+") [attempt "+M+"]: "+p+`
`+y+`
`+X})}function pl(l,p,y,E,M,j,X){l.info(function(){return"XMLHTTP RESP ("+E+") [ attempt "+M+"]: "+p+`
`+y+`
`+j+" "+X})}function On(l,p,y,E){l.info(function(){return"XMLHTTP TEXT ("+p+"): "+Di(l,y)+(E?" "+E:"")})}function ml(l,p){l.info(function(){return"TIMEOUT: "+p})}zr.prototype.info=function(){};function Di(l,p){if(!l.g)return p;if(!p)return null;try{const j=JSON.parse(p);if(j){for(l=0;l<j.length;l++)if(Array.isArray(j[l])){var y=j[l];if(!(y.length<2)){var E=y[1];if(Array.isArray(E)&&!(E.length<1)){var M=E[0];if(M!="noop"&&M!="stop"&&M!="close")for(let X=1;X<E.length;X++)E[X]=""}}}}return Mr(j)}catch{return p}}var Br={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},$r={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},gl;function or(){}R(or,br),or.prototype.g=function(){return new XMLHttpRequest},gl=new or;function Ln(l){return encodeURIComponent(String(l))}function As(l){var p=1;l=l.split(":");const y=[];for(;p>0&&l.length;)y.push(l.shift()),p--;return l.length&&y.push(l.join(":")),y}function ln(l,p,y,E){this.j=l,this.i=p,this.l=y,this.S=E||1,this.V=new Lr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new yl}function yl(){this.i=null,this.g="",this.h=!1}var _l={},Fo={};function wn(l,p,y){l.M=1,l.A=lr(un(p)),l.u=y,l.R=!0,Uo(l,null)}function Uo(l,p){l.F=Date.now(),Vi(l),l.B=un(l.A);var y=l.B,E=l.S;Array.isArray(E)||(E=[String(E)]),Qo(y.i,"t",E),l.C=0,y=l.j.L,l.h=new yl,l.g=kl(l.j,y?p:null,!l.u),l.P>0&&(l.O=new cl(_(l.Y,l,l.g),l.P)),p=l.V,y=l.g,E=l.ba;var M="readystatechange";Array.isArray(M)||(M&&(Lo[0]=M.toString()),M=Lo);for(let j=0;j<M.length;j++){const X=qe(y,M[j],E||p.handleEvent,!1,p.h||p);if(!X)break;p.g[X.key]=X}p=l.J?O(l.J):{},l.u?(l.v||(l.v="POST"),p["Content-Type"]="application/x-www-form-urlencoded",l.g.ea(l.B,l.v,l.u,p)):(l.v="GET",l.g.ea(l.B,l.v,null,p)),ir(),fl(l.i,l.v,l.B,l.l,l.S,l.u)}ln.prototype.ba=function(l){l=l.target;const p=this.O;p&&Bn(l)==3?p.j():this.Y(l)},ln.prototype.Y=function(l){try{if(l==this.g)e:{const we=Bn(this.g),at=this.g.ya(),We=this.g.ca();if(!(we<3)&&(we!=3||this.g&&(this.h.h||this.g.la()||Rl(this.g)))){this.K||we!=4||at==7||(at==8||We<=0?ir(3):ir(2)),Rs(this);var p=this.g.ca();this.X=p;var y=vl(this);if(this.o=p==200,pl(this.i,this.v,this.B,this.l,this.S,we,p),this.o){if(this.U&&!this.L){t:{if(this.g){var E,M=this.g;if((E=M.g?M.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!T(E)){var j=E;break t}}j=null}if(l=j)On(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ye(this,l);else{this.o=!1,this.m=3,it(12),ar(this),Oi(this);break e}}if(this.R){l=!0;let ht;for(;!this.K&&this.C<y.length;)if(ht=wl(this,y),ht==Fo){we==4&&(this.m=4,it(14),l=!1),On(this.i,this.l,null,"[Incomplete Response]");break}else if(ht==_l){this.m=4,it(15),On(this.i,this.l,y,"[Invalid Chunk]"),l=!1;break}else On(this.i,this.l,ht,null),Ye(this,ht);if(El(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),we!=4||y.length!=0||this.h.h||(this.m=1,it(16),l=!1),this.o=this.o&&l,!l)On(this.i,this.l,y,"[Invalid Chunked Response]"),ar(this),Oi(this);else if(y.length>0&&!this.W){this.W=!0;var X=this.j;X.g==this&&X.aa&&!X.P&&(X.j.info("Great, no buffering proxy detected. Bytes received: "+y.length),$i(X),X.P=!0,it(11))}}else On(this.i,this.l,y,null),Ye(this,y);we==4&&ar(this),this.o&&!this.K&&(we==4?Ms(this.j,this):(this.o=!1,Vi(this)))}else Jo(this.g),p==400&&y.indexOf("Unknown SID")>0?(this.m=3,it(12)):(this.m=0,it(13)),ar(this),Oi(this)}}}catch{}finally{}};function vl(l){if(!El(l))return l.g.la();const p=Rl(l.g);if(p==="")return"";let y="";const E=p.length,M=Bn(l.g)==4;if(!l.h.i){if(typeof TextDecoder>"u")return ar(l),Oi(l),"";l.h.i=new h.TextDecoder}for(let j=0;j<E;j++)l.h.h=!0,y+=l.h.i.decode(p[j],{stream:!(M&&j==E-1)});return p.length=0,l.h.g+=y,l.C=0,l.h.g}function El(l){return l.g?l.v=="GET"&&l.M!=2&&l.j.Aa:!1}function wl(l,p){var y=l.C,E=p.indexOf(`
`,y);return E==-1?Fo:(y=Number(p.substring(y,E)),isNaN(y)?_l:(E+=1,E+y>p.length?Fo:(p=p.slice(E,E+y),l.C=E+y,p)))}ln.prototype.cancel=function(){this.K=!0,ar(this)};function Vi(l){l.T=Date.now()+l.H,jo(l,l.H)}function jo(l,p){if(l.D!=null)throw Error("WatchDog timer not null");l.D=jr(_(l.aa,l),p)}function Rs(l){l.D&&(h.clearTimeout(l.D),l.D=null)}ln.prototype.aa=function(){this.D=null;const l=Date.now();l-this.T>=0?(ml(this.i,this.B),this.M!=2&&(ir(),it(17)),ar(this),this.m=2,Oi(this)):jo(this,this.T-l)};function Oi(l){l.j.I==0||l.K||Ms(l.j,l)}function ar(l){Rs(l);var p=l.O;p&&typeof p.dispose=="function"&&p.dispose(),l.O=null,ws(l.V),l.g&&(p=l.g,l.g=null,p.abort(),p.dispose())}function Ye(l,p){try{var y=l.j;if(y.I!=0&&(y.g==l||Bo(y.h,l))){if(!l.L&&Bo(y.h,l)&&y.I==3){try{var E=y.Ba.g.parse(p)}catch{E=null}if(Array.isArray(E)&&E.length==3){var M=E;if(M[0]==0){e:if(!y.v){if(y.g)if(y.g.F+3e3<l.F)Ls(y),en(y);else break e;Hn(y),it(18)}}else y.xa=M[1],0<y.xa-y.K&&M[2]<37500&&y.F&&y.A==0&&!y.C&&(y.C=jr(_(y.Va,y),6e3));Li(y.h)<=1&&y.ta&&(y.ta=void 0)}else tn(y,11)}else if((l.L||y.g==l)&&Ls(y),!T(p))for(M=y.Ba.g.parse(p),p=0;p<M.length;p++){let We=M[p];const ht=We[0];if(!(ht<=y.K))if(y.K=ht,We=We[1],y.I==2)if(We[0]=="c"){y.M=We[1],y.ba=We[2];const nn=We[3];nn!=null&&(y.ka=nn,y.j.info("VER="+y.ka));const fr=We[4];fr!=null&&(y.za=fr,y.j.info("SVER="+y.za));const qn=We[5];qn!=null&&typeof qn=="number"&&qn>0&&(E=1.5*qn,y.O=E,y.j.info("backChannelRequestTimeoutMs_="+E)),E=y;const Kn=l.g;if(Kn){const Us=Kn.g?Kn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Us){var j=E.h;j.g||Us.indexOf("spdy")==-1&&Us.indexOf("quic")==-1&&Us.indexOf("h2")==-1||(j.j=j.l,j.g=new Set,j.h&&(ks(j,j.h),j.h=null))}if(E.G){const ea=Kn.g?Kn.g.getResponseHeader("X-HTTP-Session-Id"):null;ea&&(E.wa=ea,Ue(E.J,E.G,ea))}}y.I=3,y.l&&y.l.ra(),y.aa&&(y.T=Date.now()-l.F,y.j.info("Handshake RTT: "+y.T+"ms")),E=y;var X=l;if(E.na=Zo(E,E.L?E.ba:null,E.W),X.L){Mi(E.h,X);var we=X,at=E.O;at&&(we.H=at),we.D&&(Rs(we),Vi(we)),E.g=X}else xt(E);y.i.length>0&&dr(y)}else We[0]!="stop"&&We[0]!="close"||tn(y,7);else y.I==3&&(We[0]=="stop"||We[0]=="close"?We[0]=="stop"?tn(y,7):Vs(y):We[0]!="noop"&&y.l&&y.l.qa(We),y.A=0)}}ir(4)}catch{}}var Ac=class{constructor(l,p){this.g=l,this.map=p}};function Cs(l){this.l=l||10,h.PerformanceNavigationTiming?(l=h.performance.getEntriesByType("navigation"),l=l.length>0&&(l[0].nextHopProtocol=="hq"||l[0].nextHopProtocol=="h2")):l=!!(h.chrome&&h.chrome.loadTimes&&h.chrome.loadTimes()&&h.chrome.loadTimes().wasFetchedViaSpdy),this.j=l?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function zo(l){return l.h?!0:l.g?l.g.size>=l.j:!1}function Li(l){return l.h?1:l.g?l.g.size:0}function Bo(l,p){return l.h?l.h==p:l.g?l.g.has(p):!1}function ks(l,p){l.g?l.g.add(p):l.h=p}function Mi(l,p){l.h&&l.h==p?l.h=null:l.g&&l.g.has(p)&&l.g.delete(p)}Cs.prototype.cancel=function(){if(this.i=Jt(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const l of this.g.values())l.cancel();this.g.clear()}};function Jt(l){if(l.h!=null)return l.i.concat(l.h.G);if(l.g!=null&&l.g.size!==0){let p=l.i;for(const y of l.g.values())p=p.concat(y.G);return p}return z(l.i)}var Tl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Xt(l,p){if(l){l=l.split("&");for(let y=0;y<l.length;y++){const E=l[y].indexOf("=");let M,j=null;E>=0?(M=l[y].substring(0,E),j=l[y].substring(E+1)):M=l[y],p(M,j?decodeURIComponent(j.replace(/\+/g," ")):"")}}}function Mn(l){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let p;l instanceof Mn?(this.l=l.l,bi(this,l.j),this.o=l.o,this.g=l.g,bn(this,l.u),this.h=l.h,Wr(this,Yo(l.i)),this.m=l.m):l&&(p=String(l).match(Tl))?(this.l=!1,bi(this,p[1]||"",!0),this.o=Fi(p[2]||""),this.g=Fi(p[3]||"",!0),bn(this,p[4]),this.h=Fi(p[5]||"",!0),Wr(this,p[6]||"",!0),this.m=Fi(p[7]||"")):(this.l=!1,this.i=new xe(null,this.l))}Mn.prototype.toString=function(){const l=[];var p=this.j;p&&l.push(Ui(p,Wo,!0),":");var y=this.g;return(y||p=="file")&&(l.push("//"),(p=this.o)&&l.push(Ui(p,Wo,!0),"@"),l.push(Ln(y).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),y=this.u,y!=null&&l.push(":",String(y))),(y=this.h)&&(this.g&&y.charAt(0)!="/"&&l.push("/"),l.push(Ui(y,y.charAt(0)=="/"?ji:Ho,!0))),(y=this.i.toString())&&l.push("?",y),(y=this.m)&&l.push("#",Ui(y,qo)),l.join("")},Mn.prototype.resolve=function(l){const p=un(this);let y=!!l.j;y?bi(p,l.j):y=!!l.o,y?p.o=l.o:y=!!l.g,y?p.g=l.g:y=l.u!=null;var E=l.h;if(y)bn(p,l.u);else if(y=!!l.h){if(E.charAt(0)!="/")if(this.g&&!this.h)E="/"+E;else{var M=p.h.lastIndexOf("/");M!=-1&&(E=p.h.slice(0,M+1)+E)}if(M=E,M==".."||M==".")E="";else if(M.indexOf("./")!=-1||M.indexOf("/.")!=-1){E=M.lastIndexOf("/",0)==0,M=M.split("/");const j=[];for(let X=0;X<M.length;){const we=M[X++];we=="."?E&&X==M.length&&j.push(""):we==".."?((j.length>1||j.length==1&&j[0]!="")&&j.pop(),E&&X==M.length&&j.push("")):(j.push(we),E=!0)}E=j.join("/")}else E=M}return y?p.h=E:y=l.i.toString()!=="",y?Wr(p,Yo(l.i)):y=!!l.m,y&&(p.m=l.m),p};function un(l){return new Mn(l)}function bi(l,p,y){l.j=y?Fi(p,!0):p,l.j&&(l.j=l.j.replace(/:$/,""))}function bn(l,p){if(p){if(p=Number(p),isNaN(p)||p<0)throw Error("Bad port number "+p);l.u=p}else l.u=null}function Wr(l,p,y){p instanceof xe?(l.i=p,Ns(l.i,l.l)):(y||(p=Ui(p,Rc)),l.i=new xe(p,l.l))}function Ue(l,p,y){l.i.set(p,y)}function lr(l){return Ue(l,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),l}function Fi(l,p){return l?p?decodeURI(l.replace(/%25/g,"%2525")):decodeURIComponent(l):""}function Ui(l,p,y){return typeof l=="string"?(l=encodeURI(l).replace(p,$o),y&&(l=l.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l):null}function $o(l){return l=l.charCodeAt(0),"%"+(l>>4&15).toString(16)+(l&15).toString(16)}var Wo=/[#\/\?@]/g,Ho=/[#\?:]/g,ji=/[#\?]/g,Rc=/[#\?@]/g,qo=/#/g;function xe(l,p){this.h=this.g=null,this.i=l||null,this.j=!!p}function Fn(l){l.g||(l.g=new Map,l.h=0,l.i&&Xt(l.i,function(p,y){l.add(decodeURIComponent(p.replace(/\+/g," ")),y)}))}r=xe.prototype,r.add=function(l,p){Fn(this),this.i=null,l=Un(this,l);let y=this.g.get(l);return y||this.g.set(l,y=[]),y.push(p),this.h+=1,this};function Ko(l,p){Fn(l),p=Un(l,p),l.g.has(p)&&(l.i=null,l.h-=l.g.get(p).length,l.g.delete(p))}function Ps(l,p){return Fn(l),p=Un(l,p),l.g.has(p)}r.forEach=function(l,p){Fn(this),this.g.forEach(function(y,E){y.forEach(function(M){l.call(p,M,E,this)},this)},this)};function Go(l,p){Fn(l);let y=[];if(typeof p=="string")Ps(l,p)&&(y=y.concat(l.g.get(Un(l,p))));else for(l=Array.from(l.g.values()),p=0;p<l.length;p++)y=y.concat(l[p]);return y}r.set=function(l,p){return Fn(this),this.i=null,l=Un(this,l),Ps(this,l)&&(this.h-=this.g.get(l).length),this.g.set(l,[p]),this.h+=1,this},r.get=function(l,p){return l?(l=Go(this,l),l.length>0?String(l[0]):p):p};function Qo(l,p,y){Ko(l,p),y.length>0&&(l.i=null,l.g.set(Un(l,p),z(y)),l.h+=y.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const l=[],p=Array.from(this.g.keys());for(let E=0;E<p.length;E++){var y=p[E];const M=Ln(y);y=Go(this,y);for(let j=0;j<y.length;j++){let X=M;y[j]!==""&&(X+="="+Ln(y[j])),l.push(X)}}return this.i=l.join("&")};function Yo(l){const p=new xe;return p.i=l.i,l.g&&(p.g=new Map(l.g),p.h=l.h),p}function Un(l,p){return p=String(p),l.j&&(p=p.toLowerCase()),p}function Ns(l,p){p&&!l.j&&(Fn(l),l.i=null,l.g.forEach(function(y,E){const M=E.toLowerCase();E!=M&&(Ko(this,E),Qo(this,M,y))},l)),l.j=p}function jn(l,p){const y=new zr;if(h.Image){const E=new Image;E.onload=w(St,y,"TestLoadImage: loaded",!0,p,E),E.onerror=w(St,y,"TestLoadImage: error",!1,p,E),E.onabort=w(St,y,"TestLoadImage: abort",!1,p,E),E.ontimeout=w(St,y,"TestLoadImage: timeout",!1,p,E),h.setTimeout(function(){E.ontimeout&&E.ontimeout()},1e4),E.src=l}else p(!1)}function zn(l,p){const y=new zr,E=new AbortController,M=setTimeout(()=>{E.abort(),St(y,"TestPingServer: timeout",!1,p)},1e4);fetch(l,{signal:E.signal}).then(j=>{clearTimeout(M),j.ok?St(y,"TestPingServer: ok",!0,p):St(y,"TestPingServer: server error",!1,p)}).catch(()=>{clearTimeout(M),St(y,"TestPingServer: error",!1,p)})}function St(l,p,y,E,M){try{M&&(M.onload=null,M.onerror=null,M.onabort=null,M.ontimeout=null),E(y)}catch{}}function zi(){this.g=new xi}function ur(l){this.i=l.Sb||null,this.h=l.ab||!1}R(ur,br),ur.prototype.g=function(){return new Zt(this.i,this.h)};function Zt(l,p){ct.call(this),this.H=l,this.o=p,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}R(Zt,ct),r=Zt.prototype,r.open=function(l,p){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=l,this.D=p,this.readyState=1,Tn(this)},r.send=function(l){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const p={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};l&&(p.body=l),(this.H||h).fetch(new Request(this.D,p)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Hr(this)),this.readyState=0},r.Pa=function(l){if(this.g&&(this.l=l,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=l.headers,this.readyState=2,Tn(this)),this.g&&(this.readyState=3,Tn(this),this.g)))if(this.responseType==="arraybuffer")l.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof h.ReadableStream<"u"&&"body"in l){if(this.j=l.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Il(this)}else l.text().then(this.Oa.bind(this),this.ga.bind(this))};function Il(l){l.j.read().then(l.Ma.bind(l)).catch(l.ga.bind(l))}r.Ma=function(l){if(this.g){if(this.o&&l.value)this.response.push(l.value);else if(!this.o){var p=l.value?l.value:new Uint8Array(0);(p=this.B.decode(p,{stream:!l.done}))&&(this.response=this.responseText+=p)}l.done?Hr(this):Tn(this),this.readyState==3&&Il(this)}},r.Oa=function(l){this.g&&(this.response=this.responseText=l,Hr(this))},r.Na=function(l){this.g&&(this.response=l,Hr(this))},r.ga=function(){this.g&&Hr(this)};function Hr(l){l.readyState=4,l.l=null,l.j=null,l.B=null,Tn(l)}r.setRequestHeader=function(l,p){this.A.append(l,p)},r.getResponseHeader=function(l){return this.h&&this.h.get(l.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const l=[],p=this.h.entries();for(var y=p.next();!y.done;)y=y.value,l.push(y[0]+": "+y[1]),y=p.next();return l.join(`\r
`)};function Tn(l){l.onreadystatechange&&l.onreadystatechange.call(l)}Object.defineProperty(Zt.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(l){this.m=l?"include":"same-origin"}});function Sl(l){let p="";return ae(l,function(y,E){p+=E,p+=":",p+=y,p+=`\r
`}),p}function xs(l,p,y){e:{for(E in y){var E=!1;break e}E=!0}E||(y=Sl(y),typeof l=="string"?y!=null&&Ln(y):Ue(l,p,y))}function Ke(l){ct.call(this),this.headers=new Map,this.L=l||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}R(Ke,ct);var Al=/^https?$/i,Cc=["POST","PUT"];r=Ke.prototype,r.Fa=function(l){this.H=l},r.ea=function(l,p,y,E){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+l);p=p?p.toUpperCase():"GET",this.D=l,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():gl.g(),this.g.onreadystatechange=b(_(this.Ca,this));try{this.B=!0,this.g.open(p,String(l),!0),this.B=!1}catch(j){qr(this,j);return}if(l=y||"",y=new Map(this.headers),E)if(Object.getPrototypeOf(E)===Object.prototype)for(var M in E)y.set(M,E[M]);else if(typeof E.keys=="function"&&typeof E.get=="function")for(const j of E.keys())y.set(j,E.get(j));else throw Error("Unknown input type for opt_headers: "+String(E));E=Array.from(y.keys()).find(j=>j.toLowerCase()=="content-type"),M=h.FormData&&l instanceof h.FormData,!(Array.prototype.indexOf.call(Cc,p,void 0)>=0)||E||M||y.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[j,X]of y)this.g.setRequestHeader(j,X);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(l),this.v=!1}catch(j){qr(this,j)}};function qr(l,p){l.h=!1,l.g&&(l.j=!0,l.g.abort(),l.j=!1),l.l=p,l.o=5,Kr(l),hr(l)}function Kr(l){l.A||(l.A=!0,ot(l,"complete"),ot(l,"error"))}r.abort=function(l){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=l||7,ot(this,"complete"),ot(this,"abort"),hr(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),hr(this,!0)),Ke.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?cr(this):this.Xa())},r.Xa=function(){cr(this)};function cr(l){if(l.h&&typeof u<"u"){if(l.v&&Bn(l)==4)setTimeout(l.Ca.bind(l),0);else if(ot(l,"readystatechange"),Bn(l)==4){l.h=!1;try{const j=l.ca();e:switch(j){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var p=!0;break e;default:p=!1}var y;if(!(y=p)){var E;if(E=j===0){let X=String(l.D).match(Tl)[1]||null;!X&&h.self&&h.self.location&&(X=h.self.location.protocol.slice(0,-1)),E=!Al.test(X?X.toLowerCase():"")}y=E}if(y)ot(l,"complete"),ot(l,"success");else{l.o=6;try{var M=Bn(l)>2?l.g.statusText:""}catch{M=""}l.l=M+" ["+l.ca()+"]",Kr(l)}}finally{hr(l)}}}}function hr(l,p){if(l.g){l.m&&(clearTimeout(l.m),l.m=null);const y=l.g;l.g=null,p||ot(l,"ready");try{y.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function Bn(l){return l.g?l.g.readyState:0}r.ca=function(){try{return Bn(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(l){if(this.g){var p=this.g.responseText;return l&&p.indexOf(l)==0&&(p=p.substring(l.length)),hl(p)}};function Rl(l){try{if(!l.g)return null;if("response"in l.g)return l.g.response;switch(l.F){case"":case"text":return l.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in l.g)return l.g.mozResponseArrayBuffer}return null}catch{return null}}function Jo(l){const p={};l=(l.g&&Bn(l)>=2&&l.g.getAllResponseHeaders()||"").split(`\r
`);for(let E=0;E<l.length;E++){if(T(l[E]))continue;var y=As(l[E]);const M=y[0];if(y=y[1],typeof y!="string")continue;y=y.trim();const j=p[M]||[];p[M]=j,j.push(y)}ee(p,function(E){return E.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function $n(l,p,y){return y&&y.internalChannelParams&&y.internalChannelParams[l]||p}function Ds(l){this.za=0,this.i=[],this.j=new zr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=$n("failFast",!1,l),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=$n("baseRetryDelayMs",5e3,l),this.Za=$n("retryDelaySeedMs",1e4,l),this.Ta=$n("forwardChannelMaxRetries",2,l),this.va=$n("forwardChannelRequestTimeoutMs",2e4,l),this.ma=l&&l.xmlHttpFactory||void 0,this.Ua=l&&l.Rb||void 0,this.Aa=l&&l.useFetchStreams||!1,this.O=void 0,this.L=l&&l.supportsCrossDomainXhr||!1,this.M="",this.h=new Cs(l&&l.concurrentRequestLimit),this.Ba=new zi,this.S=l&&l.fastHandshake||!1,this.R=l&&l.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=l&&l.Pb||!1,l&&l.ua&&this.j.ua(),l&&l.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&l&&l.detectBufferingProxy||!1,this.ia=void 0,l&&l.longPollingTimeout&&l.longPollingTimeout>0&&(this.ia=l.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Ds.prototype,r.ka=8,r.I=1,r.connect=function(l,p,y,E){it(0),this.W=l,this.H=p||{},y&&E!==void 0&&(this.H.OSID=y,this.H.OAID=E),this.F=this.X,this.J=Zo(this,null,this.W),dr(this)};function Vs(l){if(Os(l),l.I==3){var p=l.V++,y=un(l.J);if(Ue(y,"SID",l.M),Ue(y,"RID",p),Ue(y,"TYPE","terminate"),Wn(l,y),p=new ln(l,l.j,p),p.M=2,p.A=lr(un(y)),y=!1,h.navigator&&h.navigator.sendBeacon)try{y=h.navigator.sendBeacon(p.A.toString(),"")}catch{}!y&&h.Image&&(new Image().src=p.A,y=!0),y||(p.g=kl(p.j,null),p.g.ea(p.A)),p.F=Date.now(),Vi(p)}Wi(l)}function en(l){l.g&&($i(l),l.g.cancel(),l.g=null)}function Os(l){en(l),l.v&&(h.clearTimeout(l.v),l.v=null),Ls(l),l.h.cancel(),l.m&&(typeof l.m=="number"&&h.clearTimeout(l.m),l.m=null)}function dr(l){if(!zo(l.h)&&!l.m){l.m=!0;var p=l.Ea;je||S(),De||(je(),De=!0),N.add(p,l),l.D=0}}function Cl(l,p){return Li(l.h)>=l.h.j-(l.m?1:0)?!1:l.m?(l.i=p.G.concat(l.i),!0):l.I==1||l.I==2||l.D>=(l.Sa?0:l.Ta)?!1:(l.m=jr(_(l.Ea,l,p),bs(l,l.D)),l.D++,!0)}r.Ea=function(l){if(this.m)if(this.m=null,this.I==1){if(!l){this.V=Math.floor(Math.random()*1e5),l=this.V++;const M=new ln(this,this.j,l);let j=this.o;if(this.U&&(j?(j=O(j),_e(j,this.U)):j=this.U),this.u!==null||this.R||(M.J=j,j=null),this.S)e:{for(var p=0,y=0;y<this.i.length;y++){t:{var E=this.i[y];if("__data__"in E.map&&(E=E.map.__data__,typeof E=="string")){E=E.length;break t}E=void 0}if(E===void 0)break;if(p+=E,p>4096){p=y;break e}if(p===4096||y===this.i.length-1){p=y+1;break e}}p=1e3}else p=1e3;p=Xo(this,M,p),y=un(this.J),Ue(y,"RID",l),Ue(y,"CVER",22),this.G&&Ue(y,"X-HTTP-Session-Id",this.G),Wn(this,y),j&&(this.R?p="headers="+Ln(Sl(j))+"&"+p:this.u&&xs(y,this.u,j)),ks(this.h,M),this.Ra&&Ue(y,"TYPE","init"),this.S?(Ue(y,"$req",p),Ue(y,"SID","null"),M.U=!0,wn(M,y,null)):wn(M,y,p),this.I=2}}else this.I==3&&(l?Bi(this,l):this.i.length==0||zo(this.h)||Bi(this))};function Bi(l,p){var y;p?y=p.l:y=l.V++;const E=un(l.J);Ue(E,"SID",l.M),Ue(E,"RID",y),Ue(E,"AID",l.K),Wn(l,E),l.u&&l.o&&xs(E,l.u,l.o),y=new ln(l,l.j,y,l.D+1),l.u===null&&(y.J=l.o),p&&(l.i=p.G.concat(l.i)),p=Xo(l,y,1e3),y.H=Math.round(l.va*.5)+Math.round(l.va*.5*Math.random()),ks(l.h,y),wn(y,E,p)}function Wn(l,p){l.H&&ae(l.H,function(y,E){Ue(p,E,y)}),l.l&&ae({},function(y,E){Ue(p,E,y)})}function Xo(l,p,y){y=Math.min(l.i.length,y);const E=l.l?_(l.l.Ka,l.l,l):null;e:{var M=l.i;let we=-1;for(;;){const at=["count="+y];we==-1?y>0?(we=M[0].g,at.push("ofs="+we)):we=0:at.push("ofs="+we);let We=!0;for(let ht=0;ht<y;ht++){var j=M[ht].g;const nn=M[ht].map;if(j-=we,j<0)we=Math.max(0,M[ht].g-100),We=!1;else try{j="req"+j+"_"||"";try{var X=nn instanceof Map?nn:Object.entries(nn);for(const[fr,qn]of X){let Kn=qn;m(qn)&&(Kn=Mr(qn)),at.push(j+fr+"="+encodeURIComponent(Kn))}}catch(fr){throw at.push(j+"type="+encodeURIComponent("_badmap")),fr}}catch{E&&E(nn)}}if(We){X=at.join("&");break e}}X=void 0}return l=l.i.splice(0,y),p.G=l,X}function xt(l){if(!l.g&&!l.v){l.Y=1;var p=l.Da;je||S(),De||(je(),De=!0),N.add(p,l),l.A=0}}function Hn(l){return l.g||l.v||l.A>=3?!1:(l.Y++,l.v=jr(_(l.Da,l),bs(l,l.A)),l.A++,!0)}r.Da=function(){if(this.v=null,Gr(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var l=4*this.T;this.j.info("BP detection timer enabled: "+l),this.B=jr(_(this.Wa,this),l)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,it(10),en(this),Gr(this))};function $i(l){l.B!=null&&(h.clearTimeout(l.B),l.B=null)}function Gr(l){l.g=new ln(l,l.j,"rpc",l.Y),l.u===null&&(l.g.J=l.o),l.g.P=0;var p=un(l.na);Ue(p,"RID","rpc"),Ue(p,"SID",l.M),Ue(p,"AID",l.K),Ue(p,"CI",l.F?"0":"1"),!l.F&&l.ia&&Ue(p,"TO",l.ia),Ue(p,"TYPE","xmlhttp"),Wn(l,p),l.u&&l.o&&xs(p,l.u,l.o),l.O&&(l.g.H=l.O);var y=l.g;l=l.ba,y.M=1,y.A=lr(un(p)),y.u=null,y.R=!0,Uo(y,l)}r.Va=function(){this.C!=null&&(this.C=null,en(this),Hn(this),it(19))};function Ls(l){l.C!=null&&(h.clearTimeout(l.C),l.C=null)}function Ms(l,p){var y=null;if(l.g==p){Ls(l),$i(l),l.g=null;var E=2}else if(Bo(l.h,p))y=p.G,Mi(l.h,p),E=1;else return;if(l.I!=0){if(p.o)if(E==1){y=p.u?p.u.length:0,p=Date.now()-p.F;var M=l.D;E=Ur(),ot(E,new bo(E,y)),dr(l)}else xt(l);else if(M=p.m,M==3||M==0&&p.X>0||!(E==1&&Cl(l,p)||E==2&&Hn(l)))switch(y&&y.length>0&&(p=l.h,p.i=p.i.concat(y)),M){case 1:tn(l,5);break;case 4:tn(l,10);break;case 3:tn(l,6);break;default:tn(l,2)}}}function bs(l,p){let y=l.Qa+Math.floor(Math.random()*l.Za);return l.isActive()||(y*=2),y*p}function tn(l,p){if(l.j.info("Error code "+p),p==2){var y=_(l.bb,l),E=l.Ua;const M=!E;E=new Mn(E||"//www.google.com/images/cleardot.gif"),h.location&&h.location.protocol=="http"||bi(E,"https"),lr(E),M?jn(E.toString(),y):zn(E.toString(),y)}else it(2);l.I=0,l.l&&l.l.pa(p),Wi(l),Os(l)}r.bb=function(l){l?(this.j.info("Successfully pinged google.com"),it(2)):(this.j.info("Failed to ping google.com"),it(1))};function Wi(l){if(l.I=0,l.ja=[],l.l){const p=Jt(l.h);(p.length!=0||l.i.length!=0)&&(Z(l.ja,p),Z(l.ja,l.i),l.h.i.length=0,z(l.i),l.i.length=0),l.l.oa()}}function Zo(l,p,y){var E=y instanceof Mn?un(y):new Mn(y);if(E.g!="")p&&(E.g=p+"."+E.g),bn(E,E.u);else{var M=h.location;E=M.protocol,p=p?p+"."+M.hostname:M.hostname,M=+M.port;const j=new Mn(null);E&&bi(j,E),p&&(j.g=p),M&&bn(j,M),y&&(j.h=y),E=j}return y=l.G,p=l.wa,y&&p&&Ue(E,y,p),Ue(E,"VER",l.ka),Wn(l,E),E}function kl(l,p,y){if(p&&!l.L)throw Error("Can't create secondary domain capable XhrIo object.");return p=l.Aa&&!l.ma?new Ke(new ur({ab:y})):new Ke(l.ma),p.Fa(l.L),p}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Pl(){}r=Pl.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Fs(){}Fs.prototype.g=function(l,p){return new At(l,p)};function At(l,p){ct.call(this),this.g=new Ds(p),this.l=l,this.h=p&&p.messageUrlParams||null,l=p&&p.messageHeaders||null,p&&p.clientProtocolHeaderRequired&&(l?l["X-Client-Protocol"]="webchannel":l={"X-Client-Protocol":"webchannel"}),this.g.o=l,l=p&&p.initMessageHeaders||null,p&&p.messageContentType&&(l?l["X-WebChannel-Content-Type"]=p.messageContentType:l={"X-WebChannel-Content-Type":p.messageContentType}),p&&p.sa&&(l?l["X-WebChannel-Client-Profile"]=p.sa:l={"X-WebChannel-Client-Profile":p.sa}),this.g.U=l,(l=p&&p.Qb)&&!T(l)&&(this.g.u=l),this.A=p&&p.supportsCrossDomainXhr||!1,this.v=p&&p.sendRawJson||!1,(p=p&&p.httpSessionIdParam)&&!T(p)&&(this.g.G=p,l=this.h,l!==null&&p in l&&(l=this.h,p in l&&delete l[p])),this.j=new Qr(this)}R(At,ct),At.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){Vs(this.g)},At.prototype.o=function(l){var p=this.g;if(typeof l=="string"){var y={};y.__data__=l,l=y}else this.v&&(y={},y.__data__=Mr(l),l=y);p.i.push(new Ac(p.Ya++,l)),p.I==3&&dr(p)},At.prototype.N=function(){this.g.l=null,delete this.j,Vs(this.g),delete this.g,At.Z.N.call(this)};function Nl(l){Ts.call(this),l.__headers__&&(this.headers=l.__headers__,this.statusCode=l.__status__,delete l.__headers__,delete l.__status__);var p=l.__sm__;if(p){e:{for(const y in p){l=y;break e}l=void 0}(this.i=l)&&(l=this.i,p=p!==null&&l in p?p[l]:void 0),this.data=p}else this.data=l}R(Nl,Ts);function xl(){Mo.call(this),this.status=1}R(xl,Mo);function Qr(l){this.g=l}R(Qr,Pl),Qr.prototype.ra=function(){ot(this.g,"a")},Qr.prototype.qa=function(l){ot(this.g,new Nl(l))},Qr.prototype.pa=function(l){ot(this.g,new xl)},Qr.prototype.oa=function(){ot(this.g,"b")},Fs.prototype.createWebChannel=Fs.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,A_=function(){return new Fs},S_=function(){return Ur()},I_=En,Td={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Br.NO_ERROR=0,Br.TIMEOUT=8,Br.HTTP_ERROR=6,Mu=Br,$r.COMPLETE="complete",T_=$r,dl.EventType=Fr,Fr.OPEN="a",Fr.CLOSE="b",Fr.ERROR="c",Fr.MESSAGE="d",ct.prototype.listen=ct.prototype.J,Da=dl,Ke.prototype.listenOnce=Ke.prototype.K,Ke.prototype.getLastError=Ke.prototype.Ha,Ke.prototype.getLastErrorCode=Ke.prototype.ya,Ke.prototype.getStatus=Ke.prototype.ca,Ke.prototype.getResponseJson=Ke.prototype.La,Ke.prototype.getResponseText=Ke.prototype.la,Ke.prototype.send=Ke.prototype.ea,Ke.prototype.setWithCredentials=Ke.prototype.Fa,w_=Ke}).apply(typeof Ru<"u"?Ru:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}bt.UNAUTHENTICATED=new bt(null),bt.GOOGLE_CREDENTIALS=new bt("google-credentials-uid"),bt.FIRST_PARTY=new bt("first-party-uid"),bt.MOCK_USER=new bt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ro="12.11.0";function _S(r){Ro=r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cs=new Bd("@firebase/firestore");function oo(){return cs.logLevel}function re(r,...e){if(cs.logLevel<=ke.DEBUG){const t=e.map(tf);cs.debug(`Firestore (${Ro}): ${r}`,...t)}}function xr(r,...e){if(cs.logLevel<=ke.ERROR){const t=e.map(tf);cs.error(`Firestore (${Ro}): ${r}`,...t)}}function hs(r,...e){if(cs.logLevel<=ke.WARN){const t=e.map(tf);cs.warn(`Firestore (${Ro}): ${r}`,...t)}}function tf(r){if(typeof r=="string")return r;try{return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(r,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,R_(r,s,t)}function R_(r,e,t){let s=`FIRESTORE (${Ro}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch{s+=" CONTEXT: "+t}throw xr(s),new Error(s)}function $e(r,e,t,s){let o="Unexpected state";typeof t=="string"?o=t:s=t,r||R_(e,o,s)}function Te(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class ne extends Vr{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class vS{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(bt.UNAUTHENTICATED)))}shutdown(){}}class ES{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class wS{constructor(e){this.t=e,this.currentUser=bt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){$e(this.o===void 0,42304);let s=this.i;const o=g=>this.i!==s?(s=this.i,t(g)):Promise.resolve();let u=new vi;this.o=()=>{this.i++,this.currentUser=this.u(),u.resolve(),u=new vi,e.enqueueRetryable((()=>o(this.currentUser)))};const h=()=>{const g=u;e.enqueueRetryable((async()=>{await g.promise,await o(this.currentUser)}))},m=g=>{re("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=g,this.o&&(this.auth.addAuthTokenListener(this.o),h())};this.t.onInit((g=>m(g))),setTimeout((()=>{if(!this.auth){const g=this.t.getImmediate({optional:!0});g?m(g):(re("FirebaseAuthCredentialsProvider","Auth not yet detected"),u.resolve(),u=new vi)}}),0),h()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((s=>this.i!==e?(re("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?($e(typeof s.accessToken=="string",31837,{l:s}),new C_(s.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return $e(e===null||typeof e=="string",2055,{h:e}),new bt(e)}}class TS{constructor(e,t,s){this.P=e,this.T=t,this.I=s,this.type="FirstParty",this.user=bt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class IS{constructor(e,t,s){this.P=e,this.T=t,this.I=s}getToken(){return Promise.resolve(new TS(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(bt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class kg{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class SS{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,an(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){$e(this.o===void 0,3512);const s=u=>{u.error!=null&&re("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${u.error.message}`);const h=u.token!==this.m;return this.m=u.token,re("FirebaseAppCheckTokenProvider",`Received ${h?"new":"existing"} token.`),h?t(u.token):Promise.resolve()};this.o=u=>{e.enqueueRetryable((()=>s(u)))};const o=u=>{re("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=u,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((u=>o(u))),setTimeout((()=>{if(!this.appCheck){const u=this.V.getImmediate({optional:!0});u?o(u):re("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new kg(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?($e(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new kg(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AS(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<r;s++)t[s]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const o=AS(40);for(let u=0;u<o.length;++u)s.length<20&&o[u]<t&&(s+=e.charAt(o[u]%62))}return s}}function Pe(r,e){return r<e?-1:r>e?1:0}function Id(r,e){const t=Math.min(r.length,e.length);for(let s=0;s<t;s++){const o=r.charAt(s),u=e.charAt(s);if(o!==u)return od(o)===od(u)?Pe(o,u):od(o)?1:-1}return Pe(r.length,e.length)}const RS=55296,CS=57343;function od(r){const e=r.charCodeAt(0);return e>=RS&&e<=CS}function vo(r,e,t){return r.length===e.length&&r.every(((s,o)=>t(s,e[o])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pg="__name__";class Xn{constructor(e,t,s){t===void 0?t=0:t>e.length&&me(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&me(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return Xn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Xn?e.forEach((s=>{t.push(s)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let o=0;o<s;o++){const u=Xn.compareSegments(e.get(o),t.get(o));if(u!==0)return u}return Pe(e.length,t.length)}static compareSegments(e,t){const s=Xn.isNumericId(e),o=Xn.isNumericId(t);return s&&!o?-1:!s&&o?1:s&&o?Xn.extractNumericId(e).compare(Xn.extractNumericId(t)):Id(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return _i.fromString(e.substring(4,e.length-2))}}class Qe extends Xn{construct(e,t,s){return new Qe(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new ne(B.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter((o=>o.length>0)))}return new Qe(t)}static emptyPath(){return new Qe([])}}const kS=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Pt extends Xn{construct(e,t,s){return new Pt(e,t,s)}static isValidIdentifier(e){return kS.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Pt.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Pg}static keyField(){return new Pt([Pg])}static fromServerFormat(e){const t=[];let s="",o=0;const u=()=>{if(s.length===0)throw new ne(B.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let h=!1;for(;o<e.length;){const m=e[o];if(m==="\\"){if(o+1===e.length)throw new ne(B.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const g=e[o+1];if(g!=="\\"&&g!=="."&&g!=="`")throw new ne(B.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=g,o+=2}else m==="`"?(h=!h,o++):m!=="."||h?(s+=m,o++):(u(),o++)}if(u(),h)throw new ne(B.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Pt(t)}static emptyPath(){return new Pt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e){this.path=e}static fromPath(e){return new ce(Qe.fromString(e))}static fromName(e){return new ce(Qe.fromString(e).popFirst(5))}static empty(){return new ce(Qe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Qe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Qe.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ce(new Qe(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k_(r,e,t){if(!t)throw new ne(B.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function PS(r,e,t,s){if(e===!0&&s===!0)throw new ne(B.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Ng(r){if(!ce.isDocumentKey(r))throw new ne(B.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function xg(r){if(ce.isDocumentKey(r))throw new ne(B.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function P_(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function hc(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(s){return s.constructor?s.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":me(12329,{type:typeof r})}function Yu(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new ne(B.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=hc(r);throw new ne(B.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(r,e){const t={typeString:r};return e&&(t.value=e),t}function il(r,e){if(!P_(r))throw new ne(B.INVALID_ARGUMENT,"JSON must be an object");let t;for(const s in e)if(e[s]){const o=e[s].typeString,u="value"in e[s]?{value:e[s].value}:void 0;if(!(s in r)){t=`JSON missing required field: '${s}'`;break}const h=r[s];if(o&&typeof h!==o){t=`JSON field '${s}' must be a ${o}.`;break}if(u!==void 0&&h!==u.value){t=`Expected '${s}' field to equal '${u.value}'`;break}}if(t)throw new ne(B.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dg=-62135596800,Vg=1e6;class Ze{static now(){return Ze.fromMillis(Date.now())}static fromDate(e){return Ze.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*Vg);return new Ze(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new ne(B.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new ne(B.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Dg)throw new ne(B.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new ne(B.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Vg}_compareTo(e){return this.seconds===e.seconds?Pe(this.nanoseconds,e.nanoseconds):Pe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ze._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(il(e,Ze._jsonSchema))return new Ze(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Dg;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ze._jsonSchemaVersion="firestore/timestamp/1.0",Ze._jsonSchema={type:mt("string",Ze._jsonSchemaVersion),seconds:mt("number"),nanoseconds:mt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{static fromTimestamp(e){return new ve(e)}static min(){return new ve(new Ze(0,0))}static max(){return new ve(new Ze(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a=-1;function NS(r,e){const t=r.toTimestamp().seconds,s=r.toTimestamp().nanoseconds+1,o=ve.fromTimestamp(s===1e9?new Ze(t+1,0):new Ze(t,s));return new wi(o,ce.empty(),e)}function xS(r){return new wi(r.readTime,r.key,$a)}class wi{constructor(e,t,s){this.readTime=e,this.documentKey=t,this.largestBatchId=s}static min(){return new wi(ve.min(),ce.empty(),$a)}static max(){return new wi(ve.max(),ce.empty(),$a)}}function DS(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=ce.comparator(r.documentKey,e.documentKey),t!==0?t:Pe(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VS="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class OS{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Co(r){if(r.code!==B.FAILED_PRECONDITION||r.message!==VS)throw r;re("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&me(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new W(((s,o)=>{this.nextCallback=u=>{this.wrapSuccess(e,u).next(s,o)},this.catchCallback=u=>{this.wrapFailure(t,u).next(s,o)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof W?t:W.resolve(t)}catch(t){return W.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):W.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):W.reject(t)}static resolve(e){return new W(((t,s)=>{t(e)}))}static reject(e){return new W(((t,s)=>{s(e)}))}static waitFor(e){return new W(((t,s)=>{let o=0,u=0,h=!1;e.forEach((m=>{++o,m.next((()=>{++u,h&&u===o&&t()}),(g=>s(g)))})),h=!0,u===o&&t()}))}static or(e){let t=W.resolve(!1);for(const s of e)t=t.next((o=>o?W.resolve(o):s()));return t}static forEach(e,t){const s=[];return e.forEach(((o,u)=>{s.push(t.call(this,o,u))})),this.waitFor(s)}static mapArray(e,t){return new W(((s,o)=>{const u=e.length,h=new Array(u);let m=0;for(let g=0;g<u;g++){const _=g;t(e[_]).next((w=>{h[_]=w,++m,m===u&&s(h)}),(w=>o(w)))}}))}static doWhile(e,t){return new W(((s,o)=>{const u=()=>{e()===!0?t().next((()=>{u()}),o):s()};u()}))}}function LS(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ko(r){return r.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=s=>this.ae(s),this.ue=s=>t.writeSequenceNumber(s))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}dc.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rf=-1;function fc(r){return r==null}function Ju(r){return r===0&&1/r==-1/0}function MS(r){return typeof r=="number"&&Number.isInteger(r)&&!Ju(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_="";function bS(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Og(e)),e=FS(r.get(t),e);return Og(e)}function FS(r,e){let t=e;const s=r.length;for(let o=0;o<s;o++){const u=r.charAt(o);switch(u){case"\0":t+="";break;case N_:t+="";break;default:t+=u}}return t}function Og(r){return r+N_+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lg(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function fs(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function x_(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t){this.comparator=e,this.root=t||kt.EMPTY}insert(e,t){return new rt(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,kt.BLACK,null,null))}remove(e){return new rt(this.comparator,this.root.remove(e,this.comparator).copy(null,null,kt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const s=this.comparator(e,t.key);if(s===0)return t.value;s<0?t=t.left:s>0&&(t=t.right)}return null}indexOf(e){let t=0,s=this.root;for(;!s.isEmpty();){const o=this.comparator(e,s.key);if(o===0)return t+s.left.size;o<0?s=s.left:(t+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,s)=>(e(t,s),!1)))}toString(){const e=[];return this.inorderTraversal(((t,s)=>(e.push(`${t}:${s}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Cu(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Cu(this.root,e,this.comparator,!1)}getReverseIterator(){return new Cu(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Cu(this.root,e,this.comparator,!0)}}class Cu{constructor(e,t,s,o){this.isReverse=o,this.nodeStack=[];let u=1;for(;!e.isEmpty();)if(u=t?s(e.key,t):1,t&&o&&(u*=-1),u<0)e=this.isReverse?e.left:e.right;else{if(u===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class kt{constructor(e,t,s,o,u){this.key=e,this.value=t,this.color=s??kt.RED,this.left=o??kt.EMPTY,this.right=u??kt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,s,o,u){return new kt(e??this.key,t??this.value,s??this.color,o??this.left,u??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let o=this;const u=s(e,o.key);return o=u<0?o.copy(null,null,null,o.left.insert(e,t,s),null):u===0?o.copy(null,t,null,null,null):o.copy(null,null,null,null,o.right.insert(e,t,s)),o.fixUp()}removeMin(){if(this.left.isEmpty())return kt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let s,o=this;if(t(e,o.key)<0)o.left.isEmpty()||o.left.isRed()||o.left.left.isRed()||(o=o.moveRedLeft()),o=o.copy(null,null,null,o.left.remove(e,t),null);else{if(o.left.isRed()&&(o=o.rotateRight()),o.right.isEmpty()||o.right.isRed()||o.right.left.isRed()||(o=o.moveRedRight()),t(e,o.key)===0){if(o.right.isEmpty())return kt.EMPTY;s=o.right.min(),o=o.copy(s.key,s.value,null,null,o.right.removeMin())}o=o.copy(null,null,null,null,o.right.remove(e,t))}return o.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,kt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,kt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw me(43730,{key:this.key,value:this.value});if(this.right.isRed())throw me(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw me(27949);return e+(this.isRed()?0:1)}}kt.EMPTY=null,kt.RED=!0,kt.BLACK=!1;kt.EMPTY=new class{constructor(){this.size=0}get key(){throw me(57766)}get value(){throw me(16141)}get color(){throw me(16727)}get left(){throw me(29726)}get right(){throw me(36894)}copy(e,t,s,o,u){return this}insert(e,t,s){return new kt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e){this.comparator=e,this.data=new rt(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,s)=>(e(t),!1)))}forEachInRange(e,t){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const o=s.getNext();if(this.comparator(o.key,e[1])>=0)return;t(o.key)}}forEachWhile(e,t){let s;for(s=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Mg(this.data.getIterator())}getIteratorFrom(e){return new Mg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((s=>{t=t.add(s)})),t}isEqual(e){if(!(e instanceof _t)||this.size!==e.size)return!1;const t=this.data.getIterator(),s=e.data.getIterator();for(;t.hasNext();){const o=t.getNext().key,u=s.getNext().key;if(this.comparator(o,u)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new _t(this.comparator);return t.data=e,t}}class Mg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e){this.fields=e,e.sort(Pt.comparator)}static empty(){return new Nn([])}unionWith(e){let t=new _t(Pt.comparator);for(const s of this.fields)t=t.add(s);for(const s of e)t=t.add(s);return new Nn(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return vo(this.fields,e.fields,((t,s)=>t.isEqual(s)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(o){try{return atob(o)}catch(u){throw typeof DOMException<"u"&&u instanceof DOMException?new D_("Invalid base64 string: "+u):u}})(e);return new Nt(t)}static fromUint8Array(e){const t=(function(o){let u="";for(let h=0;h<o.length;++h)u+=String.fromCharCode(o[h]);return u})(e);return new Nt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const s=new Uint8Array(t.length);for(let o=0;o<t.length;o++)s[o]=t.charCodeAt(o);return s})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Pe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Nt.EMPTY_BYTE_STRING=new Nt("");const US=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ti(r){if($e(!!r,39018),typeof r=="string"){let e=0;const t=US.exec(r);if($e(!!t,46558,{timestamp:r}),t[1]){let o=t[1];o=(o+"000000000").substr(0,9),e=Number(o)}const s=new Date(r);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:ut(r.seconds),nanos:ut(r.nanos)}}function ut(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Ii(r){return typeof r=="string"?Nt.fromBase64String(r):Nt.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V_="server_timestamp",O_="__type__",L_="__previous_value__",M_="__local_write_time__";function sf(r){var t,s;return((s=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[O_])==null?void 0:s.stringValue)===V_}function pc(r){const e=r.mapValue.fields[L_];return sf(e)?pc(e):e}function Wa(r){const e=Ti(r.mapValue.fields[M_].timestampValue);return new Ze(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jS{constructor(e,t,s,o,u,h,m,g,_,w,R){this.databaseId=e,this.appId=t,this.persistenceKey=s,this.host=o,this.ssl=u,this.forceLongPolling=h,this.autoDetectLongPolling=m,this.longPollingOptions=g,this.useFetchStreams=_,this.isUsingEmulator=w,this.apiKey=R}}const Xu="(default)";class Ha{constructor(e,t){this.projectId=e,this.database=t||Xu}static empty(){return new Ha("","")}get isDefaultDatabase(){return this.database===Xu}isEqual(e){return e instanceof Ha&&e.projectId===this.projectId&&e.database===this.database}}function zS(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new ne(B.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ha(r.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b_="__type__",BS="__max__",ku={mapValue:{}},F_="__vector__",Zu="value";function Si(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?sf(r)?4:WS(r)?9007199254740991:$S(r)?10:11:me(28295,{value:r})}function rr(r,e){if(r===e)return!0;const t=Si(r);if(t!==Si(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return Wa(r).isEqual(Wa(e));case 3:return(function(o,u){if(typeof o.timestampValue=="string"&&typeof u.timestampValue=="string"&&o.timestampValue.length===u.timestampValue.length)return o.timestampValue===u.timestampValue;const h=Ti(o.timestampValue),m=Ti(u.timestampValue);return h.seconds===m.seconds&&h.nanos===m.nanos})(r,e);case 5:return r.stringValue===e.stringValue;case 6:return(function(o,u){return Ii(o.bytesValue).isEqual(Ii(u.bytesValue))})(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return(function(o,u){return ut(o.geoPointValue.latitude)===ut(u.geoPointValue.latitude)&&ut(o.geoPointValue.longitude)===ut(u.geoPointValue.longitude)})(r,e);case 2:return(function(o,u){if("integerValue"in o&&"integerValue"in u)return ut(o.integerValue)===ut(u.integerValue);if("doubleValue"in o&&"doubleValue"in u){const h=ut(o.doubleValue),m=ut(u.doubleValue);return h===m?Ju(h)===Ju(m):isNaN(h)&&isNaN(m)}return!1})(r,e);case 9:return vo(r.arrayValue.values||[],e.arrayValue.values||[],rr);case 10:case 11:return(function(o,u){const h=o.mapValue.fields||{},m=u.mapValue.fields||{};if(Lg(h)!==Lg(m))return!1;for(const g in h)if(h.hasOwnProperty(g)&&(m[g]===void 0||!rr(h[g],m[g])))return!1;return!0})(r,e);default:return me(52216,{left:r})}}function qa(r,e){return(r.values||[]).find((t=>rr(t,e)))!==void 0}function Eo(r,e){if(r===e)return 0;const t=Si(r),s=Si(e);if(t!==s)return Pe(t,s);switch(t){case 0:case 9007199254740991:return 0;case 1:return Pe(r.booleanValue,e.booleanValue);case 2:return(function(u,h){const m=ut(u.integerValue||u.doubleValue),g=ut(h.integerValue||h.doubleValue);return m<g?-1:m>g?1:m===g?0:isNaN(m)?isNaN(g)?0:-1:1})(r,e);case 3:return bg(r.timestampValue,e.timestampValue);case 4:return bg(Wa(r),Wa(e));case 5:return Id(r.stringValue,e.stringValue);case 6:return(function(u,h){const m=Ii(u),g=Ii(h);return m.compareTo(g)})(r.bytesValue,e.bytesValue);case 7:return(function(u,h){const m=u.split("/"),g=h.split("/");for(let _=0;_<m.length&&_<g.length;_++){const w=Pe(m[_],g[_]);if(w!==0)return w}return Pe(m.length,g.length)})(r.referenceValue,e.referenceValue);case 8:return(function(u,h){const m=Pe(ut(u.latitude),ut(h.latitude));return m!==0?m:Pe(ut(u.longitude),ut(h.longitude))})(r.geoPointValue,e.geoPointValue);case 9:return Fg(r.arrayValue,e.arrayValue);case 10:return(function(u,h){var b,z,Z,Q;const m=u.fields||{},g=h.fields||{},_=(b=m[Zu])==null?void 0:b.arrayValue,w=(z=g[Zu])==null?void 0:z.arrayValue,R=Pe(((Z=_==null?void 0:_.values)==null?void 0:Z.length)||0,((Q=w==null?void 0:w.values)==null?void 0:Q.length)||0);return R!==0?R:Fg(_,w)})(r.mapValue,e.mapValue);case 11:return(function(u,h){if(u===ku.mapValue&&h===ku.mapValue)return 0;if(u===ku.mapValue)return 1;if(h===ku.mapValue)return-1;const m=u.fields||{},g=Object.keys(m),_=h.fields||{},w=Object.keys(_);g.sort(),w.sort();for(let R=0;R<g.length&&R<w.length;++R){const b=Id(g[R],w[R]);if(b!==0)return b;const z=Eo(m[g[R]],_[w[R]]);if(z!==0)return z}return Pe(g.length,w.length)})(r.mapValue,e.mapValue);default:throw me(23264,{he:t})}}function bg(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return Pe(r,e);const t=Ti(r),s=Ti(e),o=Pe(t.seconds,s.seconds);return o!==0?o:Pe(t.nanos,s.nanos)}function Fg(r,e){const t=r.values||[],s=e.values||[];for(let o=0;o<t.length&&o<s.length;++o){const u=Eo(t[o],s[o]);if(u)return u}return Pe(t.length,s.length)}function wo(r){return Sd(r)}function Sd(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const s=Ti(t);return`time(${s.seconds},${s.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return Ii(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return ce.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let s="[",o=!0;for(const u of t.values||[])o?o=!1:s+=",",s+=Sd(u);return s+"]"})(r.arrayValue):"mapValue"in r?(function(t){const s=Object.keys(t.fields||{}).sort();let o="{",u=!0;for(const h of s)u?u=!1:o+=",",o+=`${h}:${Sd(t.fields[h])}`;return o+"}"})(r.mapValue):me(61005,{value:r})}function bu(r){switch(Si(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=pc(r);return e?16+bu(e):16;case 5:return 2*r.stringValue.length;case 6:return Ii(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(s){return(s.values||[]).reduce(((o,u)=>o+bu(u)),0)})(r.arrayValue);case 10:case 11:return(function(s){let o=0;return fs(s.fields,((u,h)=>{o+=u.length+bu(h)})),o})(r.mapValue);default:throw me(13486,{value:r})}}function Ug(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Ad(r){return!!r&&"integerValue"in r}function of(r){return!!r&&"arrayValue"in r}function jg(r){return!!r&&"nullValue"in r}function zg(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Fu(r){return!!r&&"mapValue"in r}function $S(r){var t,s;return((s=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[b_])==null?void 0:s.stringValue)===F_}function Ma(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return fs(r.mapValue.fields,((t,s)=>e.mapValue.fields[t]=Ma(s))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ma(r.arrayValue.values[t]);return e}return{...r}}function WS(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===BS}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e){this.value=e}static empty(){return new gn({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let s=0;s<e.length-1;++s)if(t=(t.mapValue.fields||{})[e.get(s)],!Fu(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ma(t)}setAll(e){let t=Pt.emptyPath(),s={},o=[];e.forEach(((h,m)=>{if(!t.isImmediateParentOf(m)){const g=this.getFieldsMap(t);this.applyChanges(g,s,o),s={},o=[],t=m.popLast()}h?s[m.lastSegment()]=Ma(h):o.push(m.lastSegment())}));const u=this.getFieldsMap(t);this.applyChanges(u,s,o)}delete(e){const t=this.field(e.popLast());Fu(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return rr(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let s=0;s<e.length;++s){let o=t.mapValue.fields[e.get(s)];Fu(o)&&o.mapValue.fields||(o={mapValue:{fields:{}}},t.mapValue.fields[e.get(s)]=o),t=o}return t.mapValue.fields}applyChanges(e,t,s){fs(t,((o,u)=>e[o]=u));for(const o of s)delete e[o]}clone(){return new gn(Ma(this.value))}}function U_(r){const e=[];return fs(r.fields,((t,s)=>{const o=new Pt([t]);if(Fu(s)){const u=U_(s.mapValue).fields;if(u.length===0)e.push(o);else for(const h of u)e.push(o.child(h))}else e.push(o)})),new Nn(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(e,t,s,o,u,h,m){this.key=e,this.documentType=t,this.version=s,this.readTime=o,this.createTime=u,this.data=h,this.documentState=m}static newInvalidDocument(e){return new Ft(e,0,ve.min(),ve.min(),ve.min(),gn.empty(),0)}static newFoundDocument(e,t,s,o){return new Ft(e,1,t,ve.min(),s,o,0)}static newNoDocument(e,t){return new Ft(e,2,t,ve.min(),ve.min(),gn.empty(),0)}static newUnknownDocument(e,t){return new Ft(e,3,t,ve.min(),ve.min(),gn.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ve.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=gn.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=gn.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ve.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ft&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ft(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(e,t){this.position=e,this.inclusive=t}}function Bg(r,e,t){let s=0;for(let o=0;o<r.position.length;o++){const u=e[o],h=r.position[o];if(u.field.isKeyField()?s=ce.comparator(ce.fromName(h.referenceValue),t.key):s=Eo(h,t.data.field(u.field)),u.dir==="desc"&&(s*=-1),s!==0)break}return s}function $g(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!rr(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e,t="asc"){this.field=e,this.dir=t}}function HS(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j_{}class pt extends j_{constructor(e,t,s){super(),this.field=e,this.op=t,this.value=s}static create(e,t,s){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,s):new KS(e,t,s):t==="array-contains"?new YS(e,s):t==="in"?new JS(e,s):t==="not-in"?new XS(e,s):t==="array-contains-any"?new ZS(e,s):new pt(e,t,s)}static createKeyFieldInFilter(e,t,s){return t==="in"?new GS(e,s):new QS(e,s)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Eo(t,this.value)):t!==null&&Si(this.value)===Si(t)&&this.matchesComparison(Eo(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return me(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Vn extends j_{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Vn(e,t)}matches(e){return z_(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function z_(r){return r.op==="and"}function B_(r){return qS(r)&&z_(r)}function qS(r){for(const e of r.filters)if(e instanceof Vn)return!1;return!0}function Rd(r){if(r instanceof pt)return r.field.canonicalString()+r.op.toString()+wo(r.value);if(B_(r))return r.filters.map((e=>Rd(e))).join(",");{const e=r.filters.map((t=>Rd(t))).join(",");return`${r.op}(${e})`}}function $_(r,e){return r instanceof pt?(function(s,o){return o instanceof pt&&s.op===o.op&&s.field.isEqual(o.field)&&rr(s.value,o.value)})(r,e):r instanceof Vn?(function(s,o){return o instanceof Vn&&s.op===o.op&&s.filters.length===o.filters.length?s.filters.reduce(((u,h,m)=>u&&$_(h,o.filters[m])),!0):!1})(r,e):void me(19439)}function W_(r){return r instanceof pt?(function(t){return`${t.field.canonicalString()} ${t.op} ${wo(t.value)}`})(r):r instanceof Vn?(function(t){return t.op.toString()+" {"+t.getFilters().map(W_).join(" ,")+"}"})(r):"Filter"}class KS extends pt{constructor(e,t,s){super(e,t,s),this.key=ce.fromName(s.referenceValue)}matches(e){const t=ce.comparator(e.key,this.key);return this.matchesComparison(t)}}class GS extends pt{constructor(e,t){super(e,"in",t),this.keys=H_("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class QS extends pt{constructor(e,t){super(e,"not-in",t),this.keys=H_("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function H_(r,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((s=>ce.fromName(s.referenceValue)))}class YS extends pt{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return of(t)&&qa(t.arrayValue,this.value)}}class JS extends pt{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&qa(this.value.arrayValue,t)}}class XS extends pt{constructor(e,t){super(e,"not-in",t)}matches(e){if(qa(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!qa(this.value.arrayValue,t)}}class ZS extends pt{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!of(t)||!t.arrayValue.values)&&t.arrayValue.values.some((s=>qa(this.value.arrayValue,s)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eA{constructor(e,t=null,s=[],o=[],u=null,h=null,m=null){this.path=e,this.collectionGroup=t,this.orderBy=s,this.filters=o,this.limit=u,this.startAt=h,this.endAt=m,this.Te=null}}function Wg(r,e=null,t=[],s=[],o=null,u=null,h=null){return new eA(r,e,t,s,o,u,h)}function af(r){const e=Te(r);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((s=>Rd(s))).join(","),t+="|ob:",t+=e.orderBy.map((s=>(function(u){return u.field.canonicalString()+u.dir})(s))).join(","),fc(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((s=>wo(s))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((s=>wo(s))).join(",")),e.Te=t}return e.Te}function lf(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!HS(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!$_(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!$g(r.startAt,e.startAt)&&$g(r.endAt,e.endAt)}function Cd(r){return ce.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,t=null,s=[],o=[],u=null,h="F",m=null,g=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=o,this.limit=u,this.limitType=h,this.startAt=m,this.endAt=g,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function tA(r,e,t,s,o,u,h,m){return new Po(r,e,t,s,o,u,h,m)}function q_(r){return new Po(r)}function Hg(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function nA(r){return ce.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function K_(r){return r.collectionGroup!==null}function ba(r){const e=Te(r);if(e.Ee===null){e.Ee=[];const t=new Set;for(const u of e.explicitOrderBy)e.Ee.push(u),t.add(u.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(h){let m=new _t(Pt.comparator);return h.filters.forEach((g=>{g.getFlattenedFilters().forEach((_=>{_.isInequality()&&(m=m.add(_.field))}))})),m})(e).forEach((u=>{t.has(u.canonicalString())||u.isKeyField()||e.Ee.push(new Ka(u,s))})),t.has(Pt.keyField().canonicalString())||e.Ee.push(new Ka(Pt.keyField(),s))}return e.Ee}function er(r){const e=Te(r);return e.Ie||(e.Ie=rA(e,ba(r))),e.Ie}function rA(r,e){if(r.limitType==="F")return Wg(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((o=>{const u=o.dir==="desc"?"asc":"desc";return new Ka(o.field,u)}));const t=r.endAt?new ec(r.endAt.position,r.endAt.inclusive):null,s=r.startAt?new ec(r.startAt.position,r.startAt.inclusive):null;return Wg(r.path,r.collectionGroup,e,r.filters,r.limit,t,s)}}function kd(r,e){const t=r.filters.concat([e]);return new Po(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function iA(r,e){const t=r.explicitOrderBy.concat([e]);return new Po(r.path,r.collectionGroup,t,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}function Pd(r,e,t){return new Po(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function mc(r,e){return lf(er(r),er(e))&&r.limitType===e.limitType}function G_(r){return`${af(er(r))}|lt:${r.limitType}`}function ao(r){return`Query(target=${(function(t){let s=t.path.canonicalString();return t.collectionGroup!==null&&(s+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(s+=`, filters: [${t.filters.map((o=>W_(o))).join(", ")}]`),fc(t.limit)||(s+=", limit: "+t.limit),t.orderBy.length>0&&(s+=`, orderBy: [${t.orderBy.map((o=>(function(h){return`${h.field.canonicalString()} (${h.dir})`})(o))).join(", ")}]`),t.startAt&&(s+=", startAt: ",s+=t.startAt.inclusive?"b:":"a:",s+=t.startAt.position.map((o=>wo(o))).join(",")),t.endAt&&(s+=", endAt: ",s+=t.endAt.inclusive?"a:":"b:",s+=t.endAt.position.map((o=>wo(o))).join(",")),`Target(${s})`})(er(r))}; limitType=${r.limitType})`}function gc(r,e){return e.isFoundDocument()&&(function(s,o){const u=o.key.path;return s.collectionGroup!==null?o.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(u):ce.isDocumentKey(s.path)?s.path.isEqual(u):s.path.isImmediateParentOf(u)})(r,e)&&(function(s,o){for(const u of ba(s))if(!u.field.isKeyField()&&o.data.field(u.field)===null)return!1;return!0})(r,e)&&(function(s,o){for(const u of s.filters)if(!u.matches(o))return!1;return!0})(r,e)&&(function(s,o){return!(s.startAt&&!(function(h,m,g){const _=Bg(h,m,g);return h.inclusive?_<=0:_<0})(s.startAt,ba(s),o)||s.endAt&&!(function(h,m,g){const _=Bg(h,m,g);return h.inclusive?_>=0:_>0})(s.endAt,ba(s),o))})(r,e)}function sA(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Q_(r){return(e,t)=>{let s=!1;for(const o of ba(r)){const u=oA(o,e,t);if(u!==0)return u;s=s||o.field.isKeyField()}return 0}}function oA(r,e,t){const s=r.field.isKeyField()?ce.comparator(e.key,t.key):(function(u,h,m){const g=h.data.field(u),_=m.data.field(u);return g!==null&&_!==null?Eo(g,_):me(42886)})(r.field,e,t);switch(r.dir){case"asc":return s;case"desc":return-1*s;default:return me(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s!==void 0){for(const[o,u]of s)if(this.equalsFn(o,e))return u}}has(e){return this.get(e)!==void 0}set(e,t){const s=this.mapKeyFn(e),o=this.inner[s];if(o===void 0)return this.inner[s]=[[e,t]],void this.innerSize++;for(let u=0;u<o.length;u++)if(this.equalsFn(o[u][0],e))return void(o[u]=[e,t]);o.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s===void 0)return!1;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],e))return s.length===1?delete this.inner[t]:s.splice(o,1),this.innerSize--,!0;return!1}forEach(e){fs(this.inner,((t,s)=>{for(const[o,u]of s)e(o,u)}))}isEmpty(){return x_(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aA=new rt(ce.comparator);function Dr(){return aA}const Y_=new rt(ce.comparator);function Va(...r){let e=Y_;for(const t of r)e=e.insert(t.key,t);return e}function J_(r){let e=Y_;return r.forEach(((t,s)=>e=e.insert(t,s.overlayedDocument))),e}function ss(){return Fa()}function X_(){return Fa()}function Fa(){return new ps((r=>r.toString()),((r,e)=>r.isEqual(e)))}const lA=new rt(ce.comparator),uA=new _t(ce.comparator);function Ne(...r){let e=uA;for(const t of r)e=e.add(t);return e}const cA=new _t(Pe);function hA(){return cA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uf(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ju(e)?"-0":e}}function Z_(r){return{integerValue:""+r}}function dA(r,e){return MS(e)?Z_(e):uf(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{constructor(){this._=void 0}}function fA(r,e,t){return r instanceof Ga?(function(o,u){const h={fields:{[O_]:{stringValue:V_},[M_]:{timestampValue:{seconds:o.seconds,nanos:o.nanoseconds}}}};return u&&sf(u)&&(u=pc(u)),u&&(h.fields[L_]=u),{mapValue:h}})(t,e):r instanceof Qa?tv(r,e):r instanceof Ya?nv(r,e):(function(o,u){const h=ev(o,u),m=qg(h)+qg(o.Ae);return Ad(h)&&Ad(o.Ae)?Z_(m):uf(o.serializer,m)})(r,e)}function pA(r,e,t){return r instanceof Qa?tv(r,e):r instanceof Ya?nv(r,e):t}function ev(r,e){return r instanceof tc?(function(s){return Ad(s)||(function(u){return!!u&&"doubleValue"in u})(s)})(e)?e:{integerValue:0}:null}class Ga extends yc{}class Qa extends yc{constructor(e){super(),this.elements=e}}function tv(r,e){const t=rv(e);for(const s of r.elements)t.some((o=>rr(o,s)))||t.push(s);return{arrayValue:{values:t}}}class Ya extends yc{constructor(e){super(),this.elements=e}}function nv(r,e){let t=rv(e);for(const s of r.elements)t=t.filter((o=>!rr(o,s)));return{arrayValue:{values:t}}}class tc extends yc{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function qg(r){return ut(r.integerValue||r.doubleValue)}function rv(r){return of(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mA{constructor(e,t){this.field=e,this.transform=t}}function gA(r,e){return r.field.isEqual(e.field)&&(function(s,o){return s instanceof Qa&&o instanceof Qa||s instanceof Ya&&o instanceof Ya?vo(s.elements,o.elements,rr):s instanceof tc&&o instanceof tc?rr(s.Ae,o.Ae):s instanceof Ga&&o instanceof Ga})(r.transform,e.transform)}class yA{constructor(e,t){this.version=e,this.transformResults=t}}class Cr{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Cr}static exists(e){return new Cr(void 0,e)}static updateTime(e){return new Cr(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Uu(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class _c{}function iv(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new ov(r.key,Cr.none()):new sl(r.key,r.data,Cr.none());{const t=r.data,s=gn.empty();let o=new _t(Pt.comparator);for(let u of e.fields)if(!o.has(u)){let h=t.field(u);h===null&&u.length>1&&(u=u.popLast(),h=t.field(u)),h===null?s.delete(u):s.set(u,h),o=o.add(u)}return new ms(r.key,s,new Nn(o.toArray()),Cr.none())}}function _A(r,e,t){r instanceof sl?(function(o,u,h){const m=o.value.clone(),g=Gg(o.fieldTransforms,u,h.transformResults);m.setAll(g),u.convertToFoundDocument(h.version,m).setHasCommittedMutations()})(r,e,t):r instanceof ms?(function(o,u,h){if(!Uu(o.precondition,u))return void u.convertToUnknownDocument(h.version);const m=Gg(o.fieldTransforms,u,h.transformResults),g=u.data;g.setAll(sv(o)),g.setAll(m),u.convertToFoundDocument(h.version,g).setHasCommittedMutations()})(r,e,t):(function(o,u,h){u.convertToNoDocument(h.version).setHasCommittedMutations()})(0,e,t)}function Ua(r,e,t,s){return r instanceof sl?(function(u,h,m,g){if(!Uu(u.precondition,h))return m;const _=u.value.clone(),w=Qg(u.fieldTransforms,g,h);return _.setAll(w),h.convertToFoundDocument(h.version,_).setHasLocalMutations(),null})(r,e,t,s):r instanceof ms?(function(u,h,m,g){if(!Uu(u.precondition,h))return m;const _=Qg(u.fieldTransforms,g,h),w=h.data;return w.setAll(sv(u)),w.setAll(_),h.convertToFoundDocument(h.version,w).setHasLocalMutations(),m===null?null:m.unionWith(u.fieldMask.fields).unionWith(u.fieldTransforms.map((R=>R.field)))})(r,e,t,s):(function(u,h,m){return Uu(u.precondition,h)?(h.convertToNoDocument(h.version).setHasLocalMutations(),null):m})(r,e,t)}function vA(r,e){let t=null;for(const s of r.fieldTransforms){const o=e.data.field(s.field),u=ev(s.transform,o||null);u!=null&&(t===null&&(t=gn.empty()),t.set(s.field,u))}return t||null}function Kg(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(s,o){return s===void 0&&o===void 0||!(!s||!o)&&vo(s,o,((u,h)=>gA(u,h)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class sl extends _c{constructor(e,t,s,o=[]){super(),this.key=e,this.value=t,this.precondition=s,this.fieldTransforms=o,this.type=0}getFieldMask(){return null}}class ms extends _c{constructor(e,t,s,o,u=[]){super(),this.key=e,this.data=t,this.fieldMask=s,this.precondition=o,this.fieldTransforms=u,this.type=1}getFieldMask(){return this.fieldMask}}function sv(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const s=r.data.field(t);e.set(t,s)}})),e}function Gg(r,e,t){const s=new Map;$e(r.length===t.length,32656,{Ve:t.length,de:r.length});for(let o=0;o<t.length;o++){const u=r[o],h=u.transform,m=e.data.field(u.field);s.set(u.field,pA(h,m,t[o]))}return s}function Qg(r,e,t){const s=new Map;for(const o of r){const u=o.transform,h=t.data.field(o.field);s.set(o.field,fA(u,h,e))}return s}class ov extends _c{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class EA extends _c{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wA{constructor(e,t,s,o){this.batchId=e,this.localWriteTime=t,this.baseMutations=s,this.mutations=o}applyToRemoteDocument(e,t){const s=t.mutationResults;for(let o=0;o<this.mutations.length;o++){const u=this.mutations[o];u.key.isEqual(e.key)&&_A(u,e,s[o])}}applyToLocalView(e,t){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(t=Ua(s,e,t,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(t=Ua(s,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const s=X_();return this.mutations.forEach((o=>{const u=e.get(o.key),h=u.overlayedDocument;let m=this.applyToLocalView(h,u.mutatedFields);m=t.has(o.key)?null:m;const g=iv(h,m);g!==null&&s.set(o.key,g),h.isValidDocument()||h.convertToNoDocument(ve.min())})),s}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Ne())}isEqual(e){return this.batchId===e.batchId&&vo(this.mutations,e.mutations,((t,s)=>Kg(t,s)))&&vo(this.baseMutations,e.baseMutations,((t,s)=>Kg(t,s)))}}class cf{constructor(e,t,s,o){this.batch=e,this.commitVersion=t,this.mutationResults=s,this.docVersions=o}static from(e,t,s){$e(e.mutations.length===s.length,58842,{me:e.mutations.length,fe:s.length});let o=(function(){return lA})();const u=e.mutations;for(let h=0;h<u.length;h++)o=o.insert(u[h].key,s[h].version);return new cf(e,t,s,o)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TA{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IA{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ft,Ve;function SA(r){switch(r){case B.OK:return me(64938);case B.CANCELLED:case B.UNKNOWN:case B.DEADLINE_EXCEEDED:case B.RESOURCE_EXHAUSTED:case B.INTERNAL:case B.UNAVAILABLE:case B.UNAUTHENTICATED:return!1;case B.INVALID_ARGUMENT:case B.NOT_FOUND:case B.ALREADY_EXISTS:case B.PERMISSION_DENIED:case B.FAILED_PRECONDITION:case B.ABORTED:case B.OUT_OF_RANGE:case B.UNIMPLEMENTED:case B.DATA_LOSS:return!0;default:return me(15467,{code:r})}}function av(r){if(r===void 0)return xr("GRPC error has no .code"),B.UNKNOWN;switch(r){case ft.OK:return B.OK;case ft.CANCELLED:return B.CANCELLED;case ft.UNKNOWN:return B.UNKNOWN;case ft.DEADLINE_EXCEEDED:return B.DEADLINE_EXCEEDED;case ft.RESOURCE_EXHAUSTED:return B.RESOURCE_EXHAUSTED;case ft.INTERNAL:return B.INTERNAL;case ft.UNAVAILABLE:return B.UNAVAILABLE;case ft.UNAUTHENTICATED:return B.UNAUTHENTICATED;case ft.INVALID_ARGUMENT:return B.INVALID_ARGUMENT;case ft.NOT_FOUND:return B.NOT_FOUND;case ft.ALREADY_EXISTS:return B.ALREADY_EXISTS;case ft.PERMISSION_DENIED:return B.PERMISSION_DENIED;case ft.FAILED_PRECONDITION:return B.FAILED_PRECONDITION;case ft.ABORTED:return B.ABORTED;case ft.OUT_OF_RANGE:return B.OUT_OF_RANGE;case ft.UNIMPLEMENTED:return B.UNIMPLEMENTED;case ft.DATA_LOSS:return B.DATA_LOSS;default:return me(39323,{code:r})}}(Ve=ft||(ft={}))[Ve.OK=0]="OK",Ve[Ve.CANCELLED=1]="CANCELLED",Ve[Ve.UNKNOWN=2]="UNKNOWN",Ve[Ve.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ve[Ve.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ve[Ve.NOT_FOUND=5]="NOT_FOUND",Ve[Ve.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ve[Ve.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ve[Ve.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ve[Ve.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ve[Ve.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ve[Ve.ABORTED=10]="ABORTED",Ve[Ve.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ve[Ve.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ve[Ve.INTERNAL=13]="INTERNAL",Ve[Ve.UNAVAILABLE=14]="UNAVAILABLE",Ve[Ve.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AA(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RA=new _i([4294967295,4294967295],0);function Yg(r){const e=AA().encode(r),t=new E_;return t.update(e),new Uint8Array(t.digest())}function Jg(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),s=e.getUint32(4,!0),o=e.getUint32(8,!0),u=e.getUint32(12,!0);return[new _i([t,s],0),new _i([o,u],0)]}class hf{constructor(e,t,s){if(this.bitmap=e,this.padding=t,this.hashCount=s,t<0||t>=8)throw new Oa(`Invalid padding: ${t}`);if(s<0)throw new Oa(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new Oa(`Invalid hash count: ${s}`);if(e.length===0&&t!==0)throw new Oa(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=_i.fromNumber(this.ge)}ye(e,t,s){let o=e.add(t.multiply(_i.fromNumber(s)));return o.compare(RA)===1&&(o=new _i([o.getBits(0),o.getBits(1)],0)),o.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Yg(e),[s,o]=Jg(t);for(let u=0;u<this.hashCount;u++){const h=this.ye(s,o,u);if(!this.we(h))return!1}return!0}static create(e,t,s){const o=e%8==0?0:8-e%8,u=new Uint8Array(Math.ceil(e/8)),h=new hf(u,o,t);return s.forEach((m=>h.insert(m))),h}insert(e){if(this.ge===0)return;const t=Yg(e),[s,o]=Jg(t);for(let u=0;u<this.hashCount;u++){const h=this.ye(s,o,u);this.Se(h)}}Se(e){const t=Math.floor(e/8),s=e%8;this.bitmap[t]|=1<<s}}class Oa extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(e,t,s,o,u){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=s,this.documentUpdates=o,this.resolvedLimboDocuments=u}static createSynthesizedRemoteEventForCurrentChange(e,t,s){const o=new Map;return o.set(e,ol.createSynthesizedTargetChangeForCurrentChange(e,t,s)),new vc(ve.min(),o,new rt(Pe),Dr(),Ne())}}class ol{constructor(e,t,s,o,u){this.resumeToken=e,this.current=t,this.addedDocuments=s,this.modifiedDocuments=o,this.removedDocuments=u}static createSynthesizedTargetChangeForCurrentChange(e,t,s){return new ol(s,t,Ne(),Ne(),Ne())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(e,t,s,o){this.be=e,this.removedTargetIds=t,this.key=s,this.De=o}}class lv{constructor(e,t){this.targetId=e,this.Ce=t}}class uv{constructor(e,t,s=Nt.EMPTY_BYTE_STRING,o=null){this.state=e,this.targetIds=t,this.resumeToken=s,this.cause=o}}class Xg{constructor(){this.ve=0,this.Fe=Zg(),this.Me=Nt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Ne(),t=Ne(),s=Ne();return this.Fe.forEach(((o,u)=>{switch(u){case 0:e=e.add(o);break;case 2:t=t.add(o);break;case 1:s=s.add(o);break;default:me(38017,{changeType:u})}})),new ol(this.Me,this.xe,e,t,s)}qe(){this.Oe=!1,this.Fe=Zg()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,$e(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class CA{constructor(e){this.Ge=e,this.ze=new Map,this.je=Dr(),this.Je=Pu(),this.He=Pu(),this.Ze=new rt(Pe)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const s=this.nt(t);switch(e.state){case 0:this.rt(t)&&s.Le(e.resumeToken);break;case 1:s.We(),s.Ne||s.qe(),s.Le(e.resumeToken);break;case 2:s.We(),s.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(s.Qe(),s.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),s.Le(e.resumeToken));break;default:me(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((s,o)=>{this.rt(o)&&t(o)}))}st(e){const t=e.targetId,s=e.Ce.count,o=this.ot(t);if(o){const u=o.target;if(Cd(u))if(s===0){const h=new ce(u.path);this.et(t,h,Ft.newNoDocument(h,ve.min()))}else $e(s===1,20013,{expectedCount:s});else{const h=this._t(t);if(h!==s){const m=this.ut(e),g=m?this.ct(m,e,h):1;if(g!==0){this.it(t);const _=g===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,_)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:s="",padding:o=0},hashCount:u=0}=t;let h,m;try{h=Ii(s).toUint8Array()}catch(g){if(g instanceof D_)return hs("Decoding the base64 bloom filter in existence filter failed ("+g.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw g}try{m=new hf(h,o,u)}catch(g){return hs(g instanceof Oa?"BloomFilter error: ":"Applying bloom filter failed: ",g),null}return m.ge===0?null:m}ct(e,t,s){return t.Ce.count===s-this.Pt(e,t.targetId)?0:2}Pt(e,t){const s=this.Ge.getRemoteKeysForTarget(t);let o=0;return s.forEach((u=>{const h=this.Ge.ht(),m=`projects/${h.projectId}/databases/${h.database}/documents/${u.path.canonicalString()}`;e.mightContain(m)||(this.et(t,u,null),o++)})),o}Tt(e){const t=new Map;this.ze.forEach(((u,h)=>{const m=this.ot(h);if(m){if(u.current&&Cd(m.target)){const g=new ce(m.target.path);this.Et(g).has(h)||this.It(h,g)||this.et(h,g,Ft.newNoDocument(g,e))}u.Be&&(t.set(h,u.ke()),u.qe())}}));let s=Ne();this.He.forEach(((u,h)=>{let m=!0;h.forEachWhile((g=>{const _=this.ot(g);return!_||_.purpose==="TargetPurposeLimboResolution"||(m=!1,!1)})),m&&(s=s.add(u))})),this.je.forEach(((u,h)=>h.setReadTime(e)));const o=new vc(e,t,this.Ze,this.je,s);return this.je=Dr(),this.Je=Pu(),this.He=Pu(),this.Ze=new rt(Pe),o}Ye(e,t){if(!this.rt(e))return;const s=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,s),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,s){if(!this.rt(e))return;const o=this.nt(e);this.It(e,t)?o.Ke(t,1):o.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),s&&(this.je=this.je.insert(t,s))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Xg,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new _t(Pe),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new _t(Pe),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||re("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Xg),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Pu(){return new rt(ce.comparator)}function Zg(){return new rt(ce.comparator)}const kA={asc:"ASCENDING",desc:"DESCENDING"},PA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},NA={and:"AND",or:"OR"};class xA{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Nd(r,e){return r.useProto3Json||fc(e)?e:{value:e}}function nc(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function cv(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function DA(r,e){return nc(r,e.toTimestamp())}function tr(r){return $e(!!r,49232),ve.fromTimestamp((function(t){const s=Ti(t);return new Ze(s.seconds,s.nanos)})(r))}function df(r,e){return xd(r,e).canonicalString()}function xd(r,e){const t=(function(o){return new Qe(["projects",o.projectId,"databases",o.database])})(r).child("documents");return e===void 0?t:t.child(e)}function hv(r){const e=Qe.fromString(r);return $e(gv(e),10190,{key:e.toString()}),e}function Dd(r,e){return df(r.databaseId,e.path)}function ad(r,e){const t=hv(e);if(t.get(1)!==r.databaseId.projectId)throw new ne(B.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new ne(B.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new ce(fv(t))}function dv(r,e){return df(r.databaseId,e)}function VA(r){const e=hv(r);return e.length===4?Qe.emptyPath():fv(e)}function Vd(r){return new Qe(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function fv(r){return $e(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function ey(r,e,t){return{name:Dd(r,e),fields:t.value.mapValue.fields}}function OA(r,e){let t;if("targetChange"in e){e.targetChange;const s=(function(_){return _==="NO_CHANGE"?0:_==="ADD"?1:_==="REMOVE"?2:_==="CURRENT"?3:_==="RESET"?4:me(39313,{state:_})})(e.targetChange.targetChangeType||"NO_CHANGE"),o=e.targetChange.targetIds||[],u=(function(_,w){return _.useProto3Json?($e(w===void 0||typeof w=="string",58123),Nt.fromBase64String(w||"")):($e(w===void 0||w instanceof Buffer||w instanceof Uint8Array,16193),Nt.fromUint8Array(w||new Uint8Array))})(r,e.targetChange.resumeToken),h=e.targetChange.cause,m=h&&(function(_){const w=_.code===void 0?B.UNKNOWN:av(_.code);return new ne(w,_.message||"")})(h);t=new uv(s,o,u,m||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const o=ad(r,s.document.name),u=tr(s.document.updateTime),h=s.document.createTime?tr(s.document.createTime):ve.min(),m=new gn({mapValue:{fields:s.document.fields}}),g=Ft.newFoundDocument(o,u,h,m),_=s.targetIds||[],w=s.removedTargetIds||[];t=new ju(_,w,g.key,g)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const o=ad(r,s.document),u=s.readTime?tr(s.readTime):ve.min(),h=Ft.newNoDocument(o,u),m=s.removedTargetIds||[];t=new ju([],m,h.key,h)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const o=ad(r,s.document),u=s.removedTargetIds||[];t=new ju([],u,o,null)}else{if(!("filter"in e))return me(11601,{Vt:e});{e.filter;const s=e.filter;s.targetId;const{count:o=0,unchangedNames:u}=s,h=new IA(o,u),m=s.targetId;t=new lv(m,h)}}return t}function LA(r,e){let t;if(e instanceof sl)t={update:ey(r,e.key,e.value)};else if(e instanceof ov)t={delete:Dd(r,e.key)};else if(e instanceof ms)t={update:ey(r,e.key,e.data),updateMask:WA(e.fieldMask)};else{if(!(e instanceof EA))return me(16599,{dt:e.type});t={verify:Dd(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((s=>(function(u,h){const m=h.transform;if(m instanceof Ga)return{fieldPath:h.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(m instanceof Qa)return{fieldPath:h.field.canonicalString(),appendMissingElements:{values:m.elements}};if(m instanceof Ya)return{fieldPath:h.field.canonicalString(),removeAllFromArray:{values:m.elements}};if(m instanceof tc)return{fieldPath:h.field.canonicalString(),increment:m.Ae};throw me(20930,{transform:h.transform})})(0,s)))),e.precondition.isNone||(t.currentDocument=(function(o,u){return u.updateTime!==void 0?{updateTime:DA(o,u.updateTime)}:u.exists!==void 0?{exists:u.exists}:me(27497)})(r,e.precondition)),t}function MA(r,e){return r&&r.length>0?($e(e!==void 0,14353),r.map((t=>(function(o,u){let h=o.updateTime?tr(o.updateTime):tr(u);return h.isEqual(ve.min())&&(h=tr(u)),new yA(h,o.transformResults||[])})(t,e)))):[]}function bA(r,e){return{documents:[dv(r,e.path)]}}function FA(r,e){const t={structuredQuery:{}},s=e.path;let o;e.collectionGroup!==null?(o=s,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(o=s.popLast(),t.structuredQuery.from=[{collectionId:s.lastSegment()}]),t.parent=dv(r,o);const u=(function(_){if(_.length!==0)return mv(Vn.create(_,"and"))})(e.filters);u&&(t.structuredQuery.where=u);const h=(function(_){if(_.length!==0)return _.map((w=>(function(b){return{field:lo(b.field),direction:zA(b.dir)}})(w)))})(e.orderBy);h&&(t.structuredQuery.orderBy=h);const m=Nd(r,e.limit);return m!==null&&(t.structuredQuery.limit=m),e.startAt&&(t.structuredQuery.startAt=(function(_){return{before:_.inclusive,values:_.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(_){return{before:!_.inclusive,values:_.position}})(e.endAt)),{ft:t,parent:o}}function UA(r){let e=VA(r.parent);const t=r.structuredQuery,s=t.from?t.from.length:0;let o=null;if(s>0){$e(s===1,65062);const w=t.from[0];w.allDescendants?o=w.collectionId:e=e.child(w.collectionId)}let u=[];t.where&&(u=(function(R){const b=pv(R);return b instanceof Vn&&B_(b)?b.getFilters():[b]})(t.where));let h=[];t.orderBy&&(h=(function(R){return R.map((b=>(function(Z){return new Ka(uo(Z.field),(function(G){switch(G){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(Z.direction))})(b)))})(t.orderBy));let m=null;t.limit&&(m=(function(R){let b;return b=typeof R=="object"?R.value:R,fc(b)?null:b})(t.limit));let g=null;t.startAt&&(g=(function(R){const b=!!R.before,z=R.values||[];return new ec(z,b)})(t.startAt));let _=null;return t.endAt&&(_=(function(R){const b=!R.before,z=R.values||[];return new ec(z,b)})(t.endAt)),tA(e,o,h,u,m,"F",g,_)}function jA(r,e){const t=(function(o){switch(o){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return me(28987,{purpose:o})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function pv(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const s=uo(t.unaryFilter.field);return pt.create(s,"==",{doubleValue:NaN});case"IS_NULL":const o=uo(t.unaryFilter.field);return pt.create(o,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const u=uo(t.unaryFilter.field);return pt.create(u,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const h=uo(t.unaryFilter.field);return pt.create(h,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return me(61313);default:return me(60726)}})(r):r.fieldFilter!==void 0?(function(t){return pt.create(uo(t.fieldFilter.field),(function(o){switch(o){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return me(58110);default:return me(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return Vn.create(t.compositeFilter.filters.map((s=>pv(s))),(function(o){switch(o){case"AND":return"and";case"OR":return"or";default:return me(1026)}})(t.compositeFilter.op))})(r):me(30097,{filter:r})}function zA(r){return kA[r]}function BA(r){return PA[r]}function $A(r){return NA[r]}function lo(r){return{fieldPath:r.canonicalString()}}function uo(r){return Pt.fromServerFormat(r.fieldPath)}function mv(r){return r instanceof pt?(function(t){if(t.op==="=="){if(zg(t.value))return{unaryFilter:{field:lo(t.field),op:"IS_NAN"}};if(jg(t.value))return{unaryFilter:{field:lo(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(zg(t.value))return{unaryFilter:{field:lo(t.field),op:"IS_NOT_NAN"}};if(jg(t.value))return{unaryFilter:{field:lo(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:lo(t.field),op:BA(t.op),value:t.value}}})(r):r instanceof Vn?(function(t){const s=t.getFilters().map((o=>mv(o)));return s.length===1?s[0]:{compositeFilter:{op:$A(t.op),filters:s}}})(r):me(54877,{filter:r})}function WA(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function gv(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function yv(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(e,t,s,o,u=ve.min(),h=ve.min(),m=Nt.EMPTY_BYTE_STRING,g=null){this.target=e,this.targetId=t,this.purpose=s,this.sequenceNumber=o,this.snapshotVersion=u,this.lastLimboFreeSnapshotVersion=h,this.resumeToken=m,this.expectedCount=g}withSequenceNumber(e){return new pi(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new pi(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new pi(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new pi(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HA{constructor(e){this.yt=e}}function qA(r){const e=UA({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Pd(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KA{constructor(){this.bn=new GA}addToCollectionParentIndex(e,t){return this.bn.add(t),W.resolve()}getCollectionParents(e,t){return W.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return W.resolve()}deleteFieldIndex(e,t){return W.resolve()}deleteAllFieldIndexes(e){return W.resolve()}createTargetIndexes(e,t){return W.resolve()}getDocumentsMatchingTarget(e,t){return W.resolve(null)}getIndexType(e,t){return W.resolve(0)}getFieldIndexes(e,t){return W.resolve([])}getNextCollectionGroupToUpdate(e){return W.resolve(null)}getMinOffset(e,t){return W.resolve(wi.min())}getMinOffsetFromCollectionGroup(e,t){return W.resolve(wi.min())}updateCollectionGroup(e,t,s){return W.resolve()}updateIndexEntries(e,t){return W.resolve()}}class GA{constructor(){this.index={}}add(e){const t=e.lastSegment(),s=e.popLast(),o=this.index[t]||new _t(Qe.comparator),u=!o.has(s);return this.index[t]=o.add(s),u}has(e){const t=e.lastSegment(),s=e.popLast(),o=this.index[t];return o&&o.has(s)}getEntries(e){return(this.index[e]||new _t(Qe.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ty={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},_v=41943040;class Yt{static withCacheSize(e){return new Yt(e,Yt.DEFAULT_COLLECTION_PERCENTILE,Yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Yt.DEFAULT_COLLECTION_PERCENTILE=10,Yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Yt.DEFAULT=new Yt(_v,Yt.DEFAULT_COLLECTION_PERCENTILE,Yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Yt.DISABLED=new Yt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new To(0)}static ar(){return new To(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ny="LruGarbageCollector",QA=1048576;function ry([r,e],[t,s]){const o=Pe(r,t);return o===0?Pe(e,s):o}class YA{constructor(e){this.Pr=e,this.buffer=new _t(ry),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const s=this.buffer.last();ry(t,s)<0&&(this.buffer=this.buffer.delete(s).add(t))}}get maxValue(){return this.buffer.last()[0]}}class JA{constructor(e,t,s){this.garbageCollector=e,this.asyncQueue=t,this.localStore=s,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){re(ny,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ko(t)?re(ny,"Ignoring IndexedDB error during garbage collection: ",t):await Co(t)}await this.Ar(3e5)}))}}class XA{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((s=>Math.floor(t/100*s)))}nthSequenceNumber(e,t){if(t===0)return W.resolve(dc.ce);const s=new YA(t);return this.Vr.forEachTarget(e,(o=>s.Ir(o.sequenceNumber))).next((()=>this.Vr.mr(e,(o=>s.Ir(o))))).next((()=>s.maxValue))}removeTargets(e,t,s){return this.Vr.removeTargets(e,t,s)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(re("LruGarbageCollector","Garbage collection skipped; disabled"),W.resolve(ty)):this.getCacheSize(e).next((s=>s<this.params.cacheSizeCollectionThreshold?(re("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ty):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let s,o,u,h,m,g,_;const w=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((R=>(R>this.params.maximumSequenceNumbersToCollect?(re("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${R}`),o=this.params.maximumSequenceNumbersToCollect):o=R,h=Date.now(),this.nthSequenceNumber(e,o)))).next((R=>(s=R,m=Date.now(),this.removeTargets(e,s,t)))).next((R=>(u=R,g=Date.now(),this.removeOrphanedDocuments(e,s)))).next((R=>(_=Date.now(),oo()<=ke.DEBUG&&re("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${h-w}ms
	Determined least recently used ${o} in `+(m-h)+`ms
	Removed ${u} targets in `+(g-m)+`ms
	Removed ${R} documents in `+(_-g)+`ms
Total Duration: ${_-w}ms`),W.resolve({didRun:!0,sequenceNumbersCollected:o,targetsRemoved:u,documentsRemoved:R}))))}}function ZA(r,e){return new XA(r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e1{constructor(){this.changes=new ps((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ft.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const s=this.changes.get(t);return s!==void 0?W.resolve(s):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t1{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n1{constructor(e,t,s,o){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=s,this.indexManager=o}getDocument(e,t){let s=null;return this.documentOverlayCache.getOverlay(e,t).next((o=>(s=o,this.remoteDocumentCache.getEntry(e,t)))).next((o=>(s!==null&&Ua(s.mutation,o,Nn.empty(),Ze.now()),o)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((s=>this.getLocalViewOfDocuments(e,s,Ne()).next((()=>s))))}getLocalViewOfDocuments(e,t,s=Ne()){const o=ss();return this.populateOverlays(e,o,t).next((()=>this.computeViews(e,t,o,s).next((u=>{let h=Va();return u.forEach(((m,g)=>{h=h.insert(m,g.overlayedDocument)})),h}))))}getOverlayedDocuments(e,t){const s=ss();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,Ne())))}populateOverlays(e,t,s){const o=[];return s.forEach((u=>{t.has(u)||o.push(u)})),this.documentOverlayCache.getOverlays(e,o).next((u=>{u.forEach(((h,m)=>{t.set(h,m)}))}))}computeViews(e,t,s,o){let u=Dr();const h=Fa(),m=(function(){return Fa()})();return t.forEach(((g,_)=>{const w=s.get(_.key);o.has(_.key)&&(w===void 0||w.mutation instanceof ms)?u=u.insert(_.key,_):w!==void 0?(h.set(_.key,w.mutation.getFieldMask()),Ua(w.mutation,_,w.mutation.getFieldMask(),Ze.now())):h.set(_.key,Nn.empty())})),this.recalculateAndSaveOverlays(e,u).next((g=>(g.forEach(((_,w)=>h.set(_,w))),t.forEach(((_,w)=>m.set(_,new t1(w,h.get(_)??null)))),m)))}recalculateAndSaveOverlays(e,t){const s=Fa();let o=new rt(((h,m)=>h-m)),u=Ne();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((h=>{for(const m of h)m.keys().forEach((g=>{const _=t.get(g);if(_===null)return;let w=s.get(g)||Nn.empty();w=m.applyToLocalView(_,w),s.set(g,w);const R=(o.get(m.batchId)||Ne()).add(g);o=o.insert(m.batchId,R)}))})).next((()=>{const h=[],m=o.getReverseIterator();for(;m.hasNext();){const g=m.getNext(),_=g.key,w=g.value,R=X_();w.forEach((b=>{if(!u.has(b)){const z=iv(t.get(b),s.get(b));z!==null&&R.set(b,z),u=u.add(b)}})),h.push(this.documentOverlayCache.saveOverlays(e,_,R))}return W.waitFor(h)})).next((()=>s))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((s=>this.recalculateAndSaveOverlays(e,s)))}getDocumentsMatchingQuery(e,t,s,o){return nA(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):K_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,s,o):this.getDocumentsMatchingCollectionQuery(e,t,s,o)}getNextDocuments(e,t,s,o){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,s,o).next((u=>{const h=o-u.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,s.largestBatchId,o-u.size):W.resolve(ss());let m=$a,g=u;return h.next((_=>W.forEach(_,((w,R)=>(m<R.largestBatchId&&(m=R.largestBatchId),u.get(w)?W.resolve():this.remoteDocumentCache.getEntry(e,w).next((b=>{g=g.insert(w,b)}))))).next((()=>this.populateOverlays(e,_,u))).next((()=>this.computeViews(e,g,_,Ne()))).next((w=>({batchId:m,changes:J_(w)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new ce(t)).next((s=>{let o=Va();return s.isFoundDocument()&&(o=o.insert(s.key,s)),o}))}getDocumentsMatchingCollectionGroupQuery(e,t,s,o){const u=t.collectionGroup;let h=Va();return this.indexManager.getCollectionParents(e,u).next((m=>W.forEach(m,(g=>{const _=(function(R,b){return new Po(b,null,R.explicitOrderBy.slice(),R.filters.slice(),R.limit,R.limitType,R.startAt,R.endAt)})(t,g.child(u));return this.getDocumentsMatchingCollectionQuery(e,_,s,o).next((w=>{w.forEach(((R,b)=>{h=h.insert(R,b)}))}))})).next((()=>h))))}getDocumentsMatchingCollectionQuery(e,t,s,o){let u;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,s.largestBatchId).next((h=>(u=h,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,s,u,o)))).next((h=>{u.forEach(((g,_)=>{const w=_.getKey();h.get(w)===null&&(h=h.insert(w,Ft.newInvalidDocument(w)))}));let m=Va();return h.forEach(((g,_)=>{const w=u.get(g);w!==void 0&&Ua(w.mutation,_,Nn.empty(),Ze.now()),gc(t,_)&&(m=m.insert(g,_))})),m}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r1{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return W.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(o){return{id:o.id,version:o.version,createTime:tr(o.createTime)}})(t)),W.resolve()}getNamedQuery(e,t){return W.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(o){return{name:o.name,query:qA(o.bundledQuery),readTime:tr(o.readTime)}})(t)),W.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i1{constructor(){this.overlays=new rt(ce.comparator),this.Lr=new Map}getOverlay(e,t){return W.resolve(this.overlays.get(t))}getOverlays(e,t){const s=ss();return W.forEach(t,(o=>this.getOverlay(e,o).next((u=>{u!==null&&s.set(o,u)})))).next((()=>s))}saveOverlays(e,t,s){return s.forEach(((o,u)=>{this.St(e,t,u)})),W.resolve()}removeOverlaysForBatchId(e,t,s){const o=this.Lr.get(s);return o!==void 0&&(o.forEach((u=>this.overlays=this.overlays.remove(u))),this.Lr.delete(s)),W.resolve()}getOverlaysForCollection(e,t,s){const o=ss(),u=t.length+1,h=new ce(t.child("")),m=this.overlays.getIteratorFrom(h);for(;m.hasNext();){const g=m.getNext().value,_=g.getKey();if(!t.isPrefixOf(_.path))break;_.path.length===u&&g.largestBatchId>s&&o.set(g.getKey(),g)}return W.resolve(o)}getOverlaysForCollectionGroup(e,t,s,o){let u=new rt(((_,w)=>_-w));const h=this.overlays.getIterator();for(;h.hasNext();){const _=h.getNext().value;if(_.getKey().getCollectionGroup()===t&&_.largestBatchId>s){let w=u.get(_.largestBatchId);w===null&&(w=ss(),u=u.insert(_.largestBatchId,w)),w.set(_.getKey(),_)}}const m=ss(),g=u.getIterator();for(;g.hasNext()&&(g.getNext().value.forEach(((_,w)=>m.set(_,w))),!(m.size()>=o)););return W.resolve(m)}St(e,t,s){const o=this.overlays.get(s.key);if(o!==null){const h=this.Lr.get(o.largestBatchId).delete(s.key);this.Lr.set(o.largestBatchId,h)}this.overlays=this.overlays.insert(s.key,new TA(t,s));let u=this.Lr.get(t);u===void 0&&(u=Ne(),this.Lr.set(t,u)),this.Lr.set(t,u.add(s.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s1{constructor(){this.sessionToken=Nt.EMPTY_BYTE_STRING}getSessionToken(e){return W.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,W.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(){this.kr=new _t(Tt.qr),this.Kr=new _t(Tt.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const s=new Tt(e,t);this.kr=this.kr.add(s),this.Kr=this.Kr.add(s)}$r(e,t){e.forEach((s=>this.addReference(s,t)))}removeReference(e,t){this.Wr(new Tt(e,t))}Qr(e,t){e.forEach((s=>this.removeReference(s,t)))}Gr(e){const t=new ce(new Qe([])),s=new Tt(t,e),o=new Tt(t,e+1),u=[];return this.Kr.forEachInRange([s,o],(h=>{this.Wr(h),u.push(h.key)})),u}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new ce(new Qe([])),s=new Tt(t,e),o=new Tt(t,e+1);let u=Ne();return this.Kr.forEachInRange([s,o],(h=>{u=u.add(h.key)})),u}containsKey(e){const t=new Tt(e,0),s=this.kr.firstAfterOrEqual(t);return s!==null&&e.isEqual(s.key)}}class Tt{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return ce.comparator(e.key,t.key)||Pe(e.Jr,t.Jr)}static Ur(e,t){return Pe(e.Jr,t.Jr)||ce.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o1{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new _t(Tt.qr)}checkEmpty(e){return W.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,s,o){const u=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const h=new wA(u,t,s,o);this.mutationQueue.push(h);for(const m of o)this.Hr=this.Hr.add(new Tt(m.key,u)),this.indexManager.addToCollectionParentIndex(e,m.key.path.popLast());return W.resolve(h)}lookupMutationBatch(e,t){return W.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const s=t+1,o=this.Xr(s),u=o<0?0:o;return W.resolve(this.mutationQueue.length>u?this.mutationQueue[u]:null)}getHighestUnacknowledgedBatchId(){return W.resolve(this.mutationQueue.length===0?rf:this.Yn-1)}getAllMutationBatches(e){return W.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const s=new Tt(t,0),o=new Tt(t,Number.POSITIVE_INFINITY),u=[];return this.Hr.forEachInRange([s,o],(h=>{const m=this.Zr(h.Jr);u.push(m)})),W.resolve(u)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new _t(Pe);return t.forEach((o=>{const u=new Tt(o,0),h=new Tt(o,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([u,h],(m=>{s=s.add(m.Jr)}))})),W.resolve(this.Yr(s))}getAllMutationBatchesAffectingQuery(e,t){const s=t.path,o=s.length+1;let u=s;ce.isDocumentKey(u)||(u=u.child(""));const h=new Tt(new ce(u),0);let m=new _t(Pe);return this.Hr.forEachWhile((g=>{const _=g.key.path;return!!s.isPrefixOf(_)&&(_.length===o&&(m=m.add(g.Jr)),!0)}),h),W.resolve(this.Yr(m))}Yr(e){const t=[];return e.forEach((s=>{const o=this.Zr(s);o!==null&&t.push(o)})),t}removeMutationBatch(e,t){$e(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.Hr;return W.forEach(t.mutations,(o=>{const u=new Tt(o.key,t.batchId);return s=s.delete(u),this.referenceDelegate.markPotentiallyOrphaned(e,o.key)})).next((()=>{this.Hr=s}))}nr(e){}containsKey(e,t){const s=new Tt(t,0),o=this.Hr.firstAfterOrEqual(s);return W.resolve(t.isEqual(o&&o.key))}performConsistencyCheck(e){return this.mutationQueue.length,W.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a1{constructor(e){this.ti=e,this.docs=(function(){return new rt(ce.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const s=t.key,o=this.docs.get(s),u=o?o.size:0,h=this.ti(t);return this.docs=this.docs.insert(s,{document:t.mutableCopy(),size:h}),this.size+=h-u,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const s=this.docs.get(t);return W.resolve(s?s.document.mutableCopy():Ft.newInvalidDocument(t))}getEntries(e,t){let s=Dr();return t.forEach((o=>{const u=this.docs.get(o);s=s.insert(o,u?u.document.mutableCopy():Ft.newInvalidDocument(o))})),W.resolve(s)}getDocumentsMatchingQuery(e,t,s,o){let u=Dr();const h=t.path,m=new ce(h.child("__id-9223372036854775808__")),g=this.docs.getIteratorFrom(m);for(;g.hasNext();){const{key:_,value:{document:w}}=g.getNext();if(!h.isPrefixOf(_.path))break;_.path.length>h.length+1||DS(xS(w),s)<=0||(o.has(w.key)||gc(t,w))&&(u=u.insert(w.key,w.mutableCopy()))}return W.resolve(u)}getAllFromCollectionGroup(e,t,s,o){me(9500)}ni(e,t){return W.forEach(this.docs,(s=>t(s)))}newChangeBuffer(e){return new l1(this)}getSize(e){return W.resolve(this.size)}}class l1 extends e1{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((s,o)=>{o.isValidDocument()?t.push(this.Mr.addEntry(e,o)):this.Mr.removeEntry(s)})),W.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u1{constructor(e){this.persistence=e,this.ri=new ps((t=>af(t)),lf),this.lastRemoteSnapshotVersion=ve.min(),this.highestTargetId=0,this.ii=0,this.si=new ff,this.targetCount=0,this.oi=To._r()}forEachTarget(e,t){return this.ri.forEach(((s,o)=>t(o))),W.resolve()}getLastRemoteSnapshotVersion(e){return W.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return W.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),W.resolve(this.highestTargetId)}setTargetsMetadata(e,t,s){return s&&(this.lastRemoteSnapshotVersion=s),t>this.ii&&(this.ii=t),W.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new To(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,W.resolve()}updateTargetData(e,t){return this.lr(t),W.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,W.resolve()}removeTargets(e,t,s){let o=0;const u=[];return this.ri.forEach(((h,m)=>{m.sequenceNumber<=t&&s.get(m.targetId)===null&&(this.ri.delete(h),u.push(this.removeMatchingKeysForTargetId(e,m.targetId)),o++)})),W.waitFor(u).next((()=>o))}getTargetCount(e){return W.resolve(this.targetCount)}getTargetData(e,t){const s=this.ri.get(t)||null;return W.resolve(s)}addMatchingKeys(e,t,s){return this.si.$r(t,s),W.resolve()}removeMatchingKeys(e,t,s){this.si.Qr(t,s);const o=this.persistence.referenceDelegate,u=[];return o&&t.forEach((h=>{u.push(o.markPotentiallyOrphaned(e,h))})),W.waitFor(u)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),W.resolve()}getMatchingKeysForTargetId(e,t){const s=this.si.jr(t);return W.resolve(s)}containsKey(e,t){return W.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv{constructor(e,t){this._i={},this.overlays={},this.ai=new dc(0),this.ui=!1,this.ui=!0,this.ci=new s1,this.referenceDelegate=e(this),this.li=new u1(this),this.indexManager=new KA,this.remoteDocumentCache=(function(o){return new a1(o)})((s=>this.referenceDelegate.hi(s))),this.serializer=new HA(t),this.Pi=new r1(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new i1,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let s=this._i[e.toKey()];return s||(s=new o1(t,this.referenceDelegate),this._i[e.toKey()]=s),s}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,s){re("MemoryPersistence","Starting transaction:",e);const o=new c1(this.ai.next());return this.referenceDelegate.Ti(),s(o).next((u=>this.referenceDelegate.Ei(o).next((()=>u)))).toPromise().then((u=>(o.raiseOnCommittedEvent(),u)))}Ii(e,t){return W.or(Object.values(this._i).map((s=>()=>s.containsKey(e,t))))}}class c1 extends OS{constructor(e){super(),this.currentSequenceNumber=e}}class pf{constructor(e){this.persistence=e,this.Ri=new ff,this.Ai=null}static Vi(e){return new pf(e)}get di(){if(this.Ai)return this.Ai;throw me(60996)}addReference(e,t,s){return this.Ri.addReference(s,t),this.di.delete(s.toString()),W.resolve()}removeReference(e,t,s){return this.Ri.removeReference(s,t),this.di.add(s.toString()),W.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),W.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((o=>this.di.add(o.toString())));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,t.targetId).next((o=>{o.forEach((u=>this.di.add(u.toString())))})).next((()=>s.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return W.forEach(this.di,(s=>{const o=ce.fromPath(s);return this.mi(e,o).next((u=>{u||t.removeEntry(o,ve.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((s=>{s?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return W.or([()=>W.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class rc{constructor(e,t){this.persistence=e,this.fi=new ps((s=>bS(s.path)),((s,o)=>s.isEqual(o))),this.garbageCollector=ZA(this,t)}static Vi(e,t){return new rc(e,t)}Ti(){}Ei(e){return W.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((s=>t.next((o=>s+o))))}pr(e){let t=0;return this.mr(e,(s=>{t++})).next((()=>t))}mr(e,t){return W.forEach(this.fi,((s,o)=>this.wr(e,s,o).next((u=>u?W.resolve():t(o)))))}removeTargets(e,t,s){return this.persistence.getTargetCache().removeTargets(e,t,s)}removeOrphanedDocuments(e,t){let s=0;const o=this.persistence.getRemoteDocumentCache(),u=o.newChangeBuffer();return o.ni(e,(h=>this.wr(e,h,t).next((m=>{m||(s++,u.removeEntry(h,ve.min()))})))).next((()=>u.apply(e))).next((()=>s))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),W.resolve()}removeTarget(e,t){const s=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,s)}addReference(e,t,s){return this.fi.set(s,e.currentSequenceNumber),W.resolve()}removeReference(e,t,s){return this.fi.set(s,e.currentSequenceNumber),W.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),W.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=bu(e.data.value)),t}wr(e,t,s){return W.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const o=this.fi.get(t);return W.resolve(o!==void 0&&o>s)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mf{constructor(e,t,s,o){this.targetId=e,this.fromCache=t,this.Ts=s,this.Es=o}static Is(e,t){let s=Ne(),o=Ne();for(const u of t.docChanges)switch(u.type){case 0:s=s.add(u.doc.key);break;case 1:o=o.add(u.doc.key)}return new mf(e,t.fromCache,s,o)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h1{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d1{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Mw()?8:LS(Ut())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,s,o){const u={result:null};return this.gs(e,t).next((h=>{u.result=h})).next((()=>{if(!u.result)return this.ps(e,t,o,s).next((h=>{u.result=h}))})).next((()=>{if(u.result)return;const h=new h1;return this.ys(e,t,h).next((m=>{if(u.result=m,this.As)return this.ws(e,t,h,m.size)}))})).next((()=>u.result))}ws(e,t,s,o){return s.documentReadCount<this.Vs?(oo()<=ke.DEBUG&&re("QueryEngine","SDK will not create cache indexes for query:",ao(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),W.resolve()):(oo()<=ke.DEBUG&&re("QueryEngine","Query:",ao(t),"scans",s.documentReadCount,"local documents and returns",o,"documents as results."),s.documentReadCount>this.ds*o?(oo()<=ke.DEBUG&&re("QueryEngine","The SDK decides to create cache indexes for query:",ao(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,er(t))):W.resolve())}gs(e,t){if(Hg(t))return W.resolve(null);let s=er(t);return this.indexManager.getIndexType(e,s).next((o=>o===0?null:(t.limit!==null&&o===1&&(t=Pd(t,null,"F"),s=er(t)),this.indexManager.getDocumentsMatchingTarget(e,s).next((u=>{const h=Ne(...u);return this.fs.getDocuments(e,h).next((m=>this.indexManager.getMinOffset(e,s).next((g=>{const _=this.Ss(t,m);return this.bs(t,_,h,g.readTime)?this.gs(e,Pd(t,null,"F")):this.Ds(e,_,t,g)}))))})))))}ps(e,t,s,o){return Hg(t)||o.isEqual(ve.min())?W.resolve(null):this.fs.getDocuments(e,s).next((u=>{const h=this.Ss(t,u);return this.bs(t,h,s,o)?W.resolve(null):(oo()<=ke.DEBUG&&re("QueryEngine","Re-using previous result from %s to execute query: %s",o.toString(),ao(t)),this.Ds(e,h,t,NS(o,$a)).next((m=>m)))}))}Ss(e,t){let s=new _t(Q_(e));return t.forEach(((o,u)=>{gc(e,u)&&(s=s.add(u))})),s}bs(e,t,s,o){if(e.limit===null)return!1;if(s.size!==t.size)return!0;const u=e.limitType==="F"?t.last():t.first();return!!u&&(u.hasPendingWrites||u.version.compareTo(o)>0)}ys(e,t,s){return oo()<=ke.DEBUG&&re("QueryEngine","Using full collection scan to execute query:",ao(t)),this.fs.getDocumentsMatchingQuery(e,t,wi.min(),s)}Ds(e,t,s,o){return this.fs.getDocumentsMatchingQuery(e,s,o).next((u=>(t.forEach((h=>{u=u.insert(h.key,h)})),u)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gf="LocalStore",f1=3e8;class p1{constructor(e,t,s,o){this.persistence=e,this.Cs=t,this.serializer=o,this.vs=new rt(Pe),this.Fs=new ps((u=>af(u)),lf),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(s)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new n1(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function m1(r,e,t,s){return new p1(r,e,t,s)}async function Ev(r,e){const t=Te(r);return await t.persistence.runTransaction("Handle user change","readonly",(s=>{let o;return t.mutationQueue.getAllMutationBatches(s).next((u=>(o=u,t.Os(e),t.mutationQueue.getAllMutationBatches(s)))).next((u=>{const h=[],m=[];let g=Ne();for(const _ of o){h.push(_.batchId);for(const w of _.mutations)g=g.add(w.key)}for(const _ of u){m.push(_.batchId);for(const w of _.mutations)g=g.add(w.key)}return t.localDocuments.getDocuments(s,g).next((_=>({Ns:_,removedBatchIds:h,addedBatchIds:m})))}))}))}function g1(r,e){const t=Te(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(s=>{const o=e.batch.keys(),u=t.xs.newChangeBuffer({trackRemovals:!0});return(function(m,g,_,w){const R=_.batch,b=R.keys();let z=W.resolve();return b.forEach((Z=>{z=z.next((()=>w.getEntry(g,Z))).next((Q=>{const G=_.docVersions.get(Z);$e(G!==null,48541),Q.version.compareTo(G)<0&&(R.applyToRemoteDocument(Q,_),Q.isValidDocument()&&(Q.setReadTime(_.commitVersion),w.addEntry(Q)))}))})),z.next((()=>m.mutationQueue.removeMutationBatch(g,R)))})(t,s,e,u).next((()=>u.apply(s))).next((()=>t.mutationQueue.performConsistencyCheck(s))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(s,o,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,(function(m){let g=Ne();for(let _=0;_<m.mutationResults.length;++_)m.mutationResults[_].transformResults.length>0&&(g=g.add(m.batch.mutations[_].key));return g})(e)))).next((()=>t.localDocuments.getDocuments(s,o)))}))}function wv(r){const e=Te(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function y1(r,e){const t=Te(r),s=e.snapshotVersion;let o=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(u=>{const h=t.xs.newChangeBuffer({trackRemovals:!0});o=t.vs;const m=[];e.targetChanges.forEach(((w,R)=>{const b=o.get(R);if(!b)return;m.push(t.li.removeMatchingKeys(u,w.removedDocuments,R).next((()=>t.li.addMatchingKeys(u,w.addedDocuments,R))));let z=b.withSequenceNumber(u.currentSequenceNumber);e.targetMismatches.get(R)!==null?z=z.withResumeToken(Nt.EMPTY_BYTE_STRING,ve.min()).withLastLimboFreeSnapshotVersion(ve.min()):w.resumeToken.approximateByteSize()>0&&(z=z.withResumeToken(w.resumeToken,s)),o=o.insert(R,z),(function(Q,G,ye){return Q.resumeToken.approximateByteSize()===0||G.snapshotVersion.toMicroseconds()-Q.snapshotVersion.toMicroseconds()>=f1?!0:ye.addedDocuments.size+ye.modifiedDocuments.size+ye.removedDocuments.size>0})(b,z,w)&&m.push(t.li.updateTargetData(u,z))}));let g=Dr(),_=Ne();if(e.documentUpdates.forEach((w=>{e.resolvedLimboDocuments.has(w)&&m.push(t.persistence.referenceDelegate.updateLimboDocument(u,w))})),m.push(_1(u,h,e.documentUpdates).next((w=>{g=w.Bs,_=w.Ls}))),!s.isEqual(ve.min())){const w=t.li.getLastRemoteSnapshotVersion(u).next((R=>t.li.setTargetsMetadata(u,u.currentSequenceNumber,s)));m.push(w)}return W.waitFor(m).next((()=>h.apply(u))).next((()=>t.localDocuments.getLocalViewOfDocuments(u,g,_))).next((()=>g))})).then((u=>(t.vs=o,u)))}function _1(r,e,t){let s=Ne(),o=Ne();return t.forEach((u=>s=s.add(u))),e.getEntries(r,s).next((u=>{let h=Dr();return t.forEach(((m,g)=>{const _=u.get(m);g.isFoundDocument()!==_.isFoundDocument()&&(o=o.add(m)),g.isNoDocument()&&g.version.isEqual(ve.min())?(e.removeEntry(m,g.readTime),h=h.insert(m,g)):!_.isValidDocument()||g.version.compareTo(_.version)>0||g.version.compareTo(_.version)===0&&_.hasPendingWrites?(e.addEntry(g),h=h.insert(m,g)):re(gf,"Ignoring outdated watch update for ",m,". Current version:",_.version," Watch version:",g.version)})),{Bs:h,Ls:o}}))}function v1(r,e){const t=Te(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(s=>(e===void 0&&(e=rf),t.mutationQueue.getNextMutationBatchAfterBatchId(s,e))))}function E1(r,e){const t=Te(r);return t.persistence.runTransaction("Allocate target","readwrite",(s=>{let o;return t.li.getTargetData(s,e).next((u=>u?(o=u,W.resolve(o)):t.li.allocateTargetId(s).next((h=>(o=new pi(e,h,"TargetPurposeListen",s.currentSequenceNumber),t.li.addTargetData(s,o).next((()=>o)))))))})).then((s=>{const o=t.vs.get(s.targetId);return(o===null||s.snapshotVersion.compareTo(o.snapshotVersion)>0)&&(t.vs=t.vs.insert(s.targetId,s),t.Fs.set(e,s.targetId)),s}))}async function Od(r,e,t){const s=Te(r),o=s.vs.get(e),u=t?"readwrite":"readwrite-primary";try{t||await s.persistence.runTransaction("Release target",u,(h=>s.persistence.referenceDelegate.removeTarget(h,o)))}catch(h){if(!ko(h))throw h;re(gf,`Failed to update sequence numbers for target ${e}: ${h}`)}s.vs=s.vs.remove(e),s.Fs.delete(o.target)}function iy(r,e,t){const s=Te(r);let o=ve.min(),u=Ne();return s.persistence.runTransaction("Execute query","readwrite",(h=>(function(g,_,w){const R=Te(g),b=R.Fs.get(w);return b!==void 0?W.resolve(R.vs.get(b)):R.li.getTargetData(_,w)})(s,h,er(e)).next((m=>{if(m)return o=m.lastLimboFreeSnapshotVersion,s.li.getMatchingKeysForTargetId(h,m.targetId).next((g=>{u=g}))})).next((()=>s.Cs.getDocumentsMatchingQuery(h,e,t?o:ve.min(),t?u:Ne()))).next((m=>(w1(s,sA(e),m),{documents:m,ks:u})))))}function w1(r,e,t){let s=r.Ms.get(e)||ve.min();t.forEach(((o,u)=>{u.readTime.compareTo(s)>0&&(s=u.readTime)})),r.Ms.set(e,s)}class sy{constructor(){this.activeTargetIds=hA()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class T1{constructor(){this.vo=new sy,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,s){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,s){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new sy,Promise.resolve()}handleUserChange(e,t,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I1{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oy="ConnectivityMonitor";class ay{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){re(oy,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){re(oy,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Nu=null;function Ld(){return Nu===null?Nu=(function(){return 268435456+Math.round(2147483648*Math.random())})():Nu++,"0x"+Nu.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ld="RestConnection",S1={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class A1{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${s}/databases/${o}`,this.$o=this.databaseId.database===Xu?`project_id=${s}`:`project_id=${s}&database_id=${o}`}Wo(e,t,s,o,u){const h=Ld(),m=this.Qo(e,t.toUriEncodedString());re(ld,`Sending RPC '${e}' ${h}:`,m,s);const g={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(g,o,u);const{host:_}=new URL(m),w=Za(_);return this.zo(e,m,g,s,w).then((R=>(re(ld,`Received RPC '${e}' ${h}: `,R),R)),(R=>{throw hs(ld,`RPC '${e}' ${h} failed with error: `,R,"url: ",m,"request:",s),R}))}jo(e,t,s,o,u,h){return this.Wo(e,t,s,o,u)}Go(e,t,s){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ro})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((o,u)=>e[u]=o)),s&&s.headers.forEach(((o,u)=>e[u]=o))}Qo(e,t){const s=S1[e];let o=`${this.Ko}/v1/${t}:${s}`;return this.databaseInfo.apiKey&&(o=`${o}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),o}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R1{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mt="WebChannelConnection",Ra=(r,e,t)=>{r.listen(e,(s=>{try{t(s)}catch(o){setTimeout((()=>{throw o}),0)}}))};class po extends A1{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!po.c_){const e=S_();Ra(e,I_.STAT_EVENT,(t=>{t.stat===Td.PROXY?re(Mt,"STAT_EVENT: detected buffering proxy"):t.stat===Td.NOPROXY&&re(Mt,"STAT_EVENT: detected no buffering proxy")})),po.c_=!0}}zo(e,t,s,o,u){const h=Ld();return new Promise(((m,g)=>{const _=new w_;_.setWithCredentials(!0),_.listenOnce(T_.COMPLETE,(()=>{try{switch(_.getLastErrorCode()){case Mu.NO_ERROR:const R=_.getResponseJson();re(Mt,`XHR for RPC '${e}' ${h} received:`,JSON.stringify(R)),m(R);break;case Mu.TIMEOUT:re(Mt,`RPC '${e}' ${h} timed out`),g(new ne(B.DEADLINE_EXCEEDED,"Request time out"));break;case Mu.HTTP_ERROR:const b=_.getStatus();if(re(Mt,`RPC '${e}' ${h} failed with status:`,b,"response text:",_.getResponseText()),b>0){let z=_.getResponseJson();Array.isArray(z)&&(z=z[0]);const Z=z==null?void 0:z.error;if(Z&&Z.status&&Z.message){const Q=(function(ye){const Ee=ye.toLowerCase().replace(/_/g,"-");return Object.values(B).indexOf(Ee)>=0?Ee:B.UNKNOWN})(Z.status);g(new ne(Q,Z.message))}else g(new ne(B.UNKNOWN,"Server responded with status "+_.getStatus()))}else g(new ne(B.UNAVAILABLE,"Connection failed."));break;default:me(9055,{l_:e,streamId:h,h_:_.getLastErrorCode(),P_:_.getLastError()})}}finally{re(Mt,`RPC '${e}' ${h} completed.`)}}));const w=JSON.stringify(o);re(Mt,`RPC '${e}' ${h} sending request:`,o),_.send(t,"POST",w,s,15)}))}T_(e,t,s){const o=Ld(),u=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],h=this.createWebChannelTransport(),m={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},g=this.longPollingOptions.timeoutSeconds;g!==void 0&&(m.longPollingTimeout=Math.round(1e3*g)),this.useFetchStreams&&(m.useFetchStreams=!0),this.Go(m.initMessageHeaders,t,s),m.encodeInitMessageHeaders=!0;const _=u.join("");re(Mt,`Creating RPC '${e}' stream ${o}: ${_}`,m);const w=h.createWebChannel(_,m);this.E_(w);let R=!1,b=!1;const z=new R1({Jo:Z=>{b?re(Mt,`Not sending because RPC '${e}' stream ${o} is closed:`,Z):(R||(re(Mt,`Opening RPC '${e}' stream ${o} transport.`),w.open(),R=!0),re(Mt,`RPC '${e}' stream ${o} sending:`,Z),w.send(Z))},Ho:()=>w.close()});return Ra(w,Da.EventType.OPEN,(()=>{b||(re(Mt,`RPC '${e}' stream ${o} transport opened.`),z.i_())})),Ra(w,Da.EventType.CLOSE,(()=>{b||(b=!0,re(Mt,`RPC '${e}' stream ${o} transport closed`),z.o_(),this.I_(w))})),Ra(w,Da.EventType.ERROR,(Z=>{b||(b=!0,hs(Mt,`RPC '${e}' stream ${o} transport errored. Name:`,Z.name,"Message:",Z.message),z.o_(new ne(B.UNAVAILABLE,"The operation could not be completed")))})),Ra(w,Da.EventType.MESSAGE,(Z=>{var Q;if(!b){const G=Z.data[0];$e(!!G,16349);const ye=G,Ee=(ye==null?void 0:ye.error)||((Q=ye[0])==null?void 0:Q.error);if(Ee){re(Mt,`RPC '${e}' stream ${o} received error:`,Ee);const Ce=Ee.status;let Fe=(function(N){const S=ft[N];if(S!==void 0)return av(S)})(Ce),je=Ee.message;Ce==="NOT_FOUND"&&je.includes("database")&&je.includes("does not exist")&&je.includes(this.databaseId.database)&&hs(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Fe===void 0&&(Fe=B.INTERNAL,je="Unknown error status: "+Ce+" with message "+Ee.message),b=!0,z.o_(new ne(Fe,je)),w.close()}else re(Mt,`RPC '${e}' stream ${o} received:`,G),z.__(G)}})),po.u_(),setTimeout((()=>{z.s_()}),0),z}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,s){super.Go(e,t,s),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return A_()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C1(r){return new po(r)}function ud(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ec(r){return new xA(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */po.c_=!1;class Tv{constructor(e,t,s=1e3,o=1.5,u=6e4){this.Ci=e,this.timerId=t,this.R_=s,this.A_=o,this.V_=u,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),s=Math.max(0,Date.now()-this.f_),o=Math.max(0,t-s);o>0&&re("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,o,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ly="PersistentStream";class Iv{constructor(e,t,s,o,u,h,m,g){this.Ci=e,this.S_=s,this.b_=o,this.connection=u,this.authCredentialsProvider=h,this.appCheckCredentialsProvider=m,this.listener=g,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Tv(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===B.RESOURCE_EXHAUSTED?(xr(t.toString()),xr("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===B.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([s,o])=>{this.D_===t&&this.G_(s,o)}),(s=>{e((()=>{const o=new ne(B.UNKNOWN,"Fetching auth token failed: "+s.message);return this.z_(o)}))}))}G_(e,t){const s=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{s((()=>this.listener.Zo()))})),this.stream.Yo((()=>{s((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((o=>{s((()=>this.z_(o)))})),this.stream.onMessage((o=>{s((()=>++this.F_==1?this.J_(o):this.onNext(o)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return re(ly,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(re(ly,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class k1 extends Iv{constructor(e,t,s,o,u,h){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,s,o,h),this.serializer=u}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=OA(this.serializer,e),s=(function(u){if(!("targetChange"in u))return ve.min();const h=u.targetChange;return h.targetIds&&h.targetIds.length?ve.min():h.readTime?tr(h.readTime):ve.min()})(e);return this.listener.H_(t,s)}Z_(e){const t={};t.database=Vd(this.serializer),t.addTarget=(function(u,h){let m;const g=h.target;if(m=Cd(g)?{documents:bA(u,g)}:{query:FA(u,g).ft},m.targetId=h.targetId,h.resumeToken.approximateByteSize()>0){m.resumeToken=cv(u,h.resumeToken);const _=Nd(u,h.expectedCount);_!==null&&(m.expectedCount=_)}else if(h.snapshotVersion.compareTo(ve.min())>0){m.readTime=nc(u,h.snapshotVersion.toTimestamp());const _=Nd(u,h.expectedCount);_!==null&&(m.expectedCount=_)}return m})(this.serializer,e);const s=jA(this.serializer,e);s&&(t.labels=s),this.q_(t)}X_(e){const t={};t.database=Vd(this.serializer),t.removeTarget=e,this.q_(t)}}class P1 extends Iv{constructor(e,t,s,o,u,h){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,s,o,h),this.serializer=u}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return $e(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,$e(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){$e(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=MA(e.writeResults,e.commitTime),s=tr(e.commitTime);return this.listener.na(s,t)}ra(){const e={};e.database=Vd(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((s=>LA(this.serializer,s)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N1{}class x1 extends N1{constructor(e,t,s,o){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=s,this.serializer=o,this.ia=!1}sa(){if(this.ia)throw new ne(B.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,s,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([u,h])=>this.connection.Wo(e,xd(t,s),o,u,h))).catch((u=>{throw u.name==="FirebaseError"?(u.code===B.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new ne(B.UNKNOWN,u.toString())}))}jo(e,t,s,o,u){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([h,m])=>this.connection.jo(e,xd(t,s),o,h,m,u))).catch((h=>{throw h.name==="FirebaseError"?(h.code===B.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),h):new ne(B.UNKNOWN,h.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function D1(r,e,t,s){return new x1(r,e,t,s)}class V1{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(xr(t),this.aa=!1):re("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ds="RemoteStore";class O1{constructor(e,t,s,o,u){this.localStore=e,this.datastore=t,this.asyncQueue=s,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=u,this.Aa.Mo((h=>{s.enqueueAndForget((async()=>{gs(this)&&(re(ds,"Restarting streams for network reachability change."),await(async function(g){const _=Te(g);_.Ia.add(4),await al(_),_.Va.set("Unknown"),_.Ia.delete(4),await wc(_)})(this))}))})),this.Va=new V1(s,o)}}async function wc(r){if(gs(r))for(const e of r.Ra)await e(!0)}async function al(r){for(const e of r.Ra)await e(!1)}function Sv(r,e){const t=Te(r);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),Ef(t)?vf(t):No(t).O_()&&_f(t,e))}function yf(r,e){const t=Te(r),s=No(t);t.Ea.delete(e),s.O_()&&Av(t,e),t.Ea.size===0&&(s.O_()?s.L_():gs(t)&&t.Va.set("Unknown"))}function _f(r,e){if(r.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ve.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}No(r).Z_(e)}function Av(r,e){r.da.$e(e),No(r).X_(e)}function vf(r){r.da=new CA({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),At:e=>r.Ea.get(e)||null,ht:()=>r.datastore.serializer.databaseId}),No(r).start(),r.Va.ua()}function Ef(r){return gs(r)&&!No(r).x_()&&r.Ea.size>0}function gs(r){return Te(r).Ia.size===0}function Rv(r){r.da=void 0}async function L1(r){r.Va.set("Online")}async function M1(r){r.Ea.forEach(((e,t)=>{_f(r,e)}))}async function b1(r,e){Rv(r),Ef(r)?(r.Va.ha(e),vf(r)):r.Va.set("Unknown")}async function F1(r,e,t){if(r.Va.set("Online"),e instanceof uv&&e.state===2&&e.cause)try{await(async function(o,u){const h=u.cause;for(const m of u.targetIds)o.Ea.has(m)&&(await o.remoteSyncer.rejectListen(m,h),o.Ea.delete(m),o.da.removeTarget(m))})(r,e)}catch(s){re(ds,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await ic(r,s)}else if(e instanceof ju?r.da.Xe(e):e instanceof lv?r.da.st(e):r.da.tt(e),!t.isEqual(ve.min()))try{const s=await wv(r.localStore);t.compareTo(s)>=0&&await(function(u,h){const m=u.da.Tt(h);return m.targetChanges.forEach(((g,_)=>{if(g.resumeToken.approximateByteSize()>0){const w=u.Ea.get(_);w&&u.Ea.set(_,w.withResumeToken(g.resumeToken,h))}})),m.targetMismatches.forEach(((g,_)=>{const w=u.Ea.get(g);if(!w)return;u.Ea.set(g,w.withResumeToken(Nt.EMPTY_BYTE_STRING,w.snapshotVersion)),Av(u,g);const R=new pi(w.target,g,_,w.sequenceNumber);_f(u,R)})),u.remoteSyncer.applyRemoteEvent(m)})(r,t)}catch(s){re(ds,"Failed to raise snapshot:",s),await ic(r,s)}}async function ic(r,e,t){if(!ko(e))throw e;r.Ia.add(1),await al(r),r.Va.set("Offline"),t||(t=()=>wv(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{re(ds,"Retrying IndexedDB access"),await t(),r.Ia.delete(1),await wc(r)}))}function Cv(r,e){return e().catch((t=>ic(r,t,e)))}async function Tc(r){const e=Te(r),t=Ai(e);let s=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:rf;for(;U1(e);)try{const o=await v1(e.localStore,s);if(o===null){e.Ta.length===0&&t.L_();break}s=o.batchId,j1(e,o)}catch(o){await ic(e,o)}kv(e)&&Pv(e)}function U1(r){return gs(r)&&r.Ta.length<10}function j1(r,e){r.Ta.push(e);const t=Ai(r);t.O_()&&t.Y_&&t.ea(e.mutations)}function kv(r){return gs(r)&&!Ai(r).x_()&&r.Ta.length>0}function Pv(r){Ai(r).start()}async function z1(r){Ai(r).ra()}async function B1(r){const e=Ai(r);for(const t of r.Ta)e.ea(t.mutations)}async function $1(r,e,t){const s=r.Ta.shift(),o=cf.from(s,e,t);await Cv(r,(()=>r.remoteSyncer.applySuccessfulWrite(o))),await Tc(r)}async function W1(r,e){e&&Ai(r).Y_&&await(async function(s,o){if((function(h){return SA(h)&&h!==B.ABORTED})(o.code)){const u=s.Ta.shift();Ai(s).B_(),await Cv(s,(()=>s.remoteSyncer.rejectFailedWrite(u.batchId,o))),await Tc(s)}})(r,e),kv(r)&&Pv(r)}async function uy(r,e){const t=Te(r);t.asyncQueue.verifyOperationInProgress(),re(ds,"RemoteStore received new credentials");const s=gs(t);t.Ia.add(3),await al(t),s&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await wc(t)}async function H1(r,e){const t=Te(r);e?(t.Ia.delete(2),await wc(t)):e||(t.Ia.add(2),await al(t),t.Va.set("Unknown"))}function No(r){return r.ma||(r.ma=(function(t,s,o){const u=Te(t);return u.sa(),new k1(s,u.connection,u.authCredentials,u.appCheckCredentials,u.serializer,o)})(r.datastore,r.asyncQueue,{Zo:L1.bind(null,r),Yo:M1.bind(null,r),t_:b1.bind(null,r),H_:F1.bind(null,r)}),r.Ra.push((async e=>{e?(r.ma.B_(),Ef(r)?vf(r):r.Va.set("Unknown")):(await r.ma.stop(),Rv(r))}))),r.ma}function Ai(r){return r.fa||(r.fa=(function(t,s,o){const u=Te(t);return u.sa(),new P1(s,u.connection,u.authCredentials,u.appCheckCredentials,u.serializer,o)})(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),Yo:z1.bind(null,r),t_:W1.bind(null,r),ta:B1.bind(null,r),na:$1.bind(null,r)}),r.Ra.push((async e=>{e?(r.fa.B_(),await Tc(r)):(await r.fa.stop(),r.Ta.length>0&&(re(ds,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))}))),r.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(e,t,s,o,u){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=o,this.removalCallback=u,this.deferred=new vi,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((h=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,o,u){const h=Date.now()+s,m=new wf(e,t,h,o,u);return m.start(s),m}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new ne(B.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Tf(r,e){if(xr("AsyncQueue",`${e}: ${r}`),ko(r))return new ne(B.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mo{static emptySet(e){return new mo(e.comparator)}constructor(e){this.comparator=e?(t,s)=>e(t,s)||ce.comparator(t.key,s.key):(t,s)=>ce.comparator(t.key,s.key),this.keyedMap=Va(),this.sortedSet=new rt(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,s)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof mo)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;t.hasNext();){const o=t.getNext().key,u=s.getNext().key;if(!o.isEqual(u))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const s=new mo;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=t,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cy{constructor(){this.ga=new rt(ce.comparator)}track(e){const t=e.doc.key,s=this.ga.get(t);s?e.type!==0&&s.type===3?this.ga=this.ga.insert(t,e):e.type===3&&s.type!==1?this.ga=this.ga.insert(t,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.ga=this.ga.remove(t):e.type===1&&s.type===2?this.ga=this.ga.insert(t,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):me(63341,{Vt:e,pa:s}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,s)=>{e.push(s)})),e}}class Io{constructor(e,t,s,o,u,h,m,g,_){this.query=e,this.docs=t,this.oldDocs=s,this.docChanges=o,this.mutatedKeys=u,this.fromCache=h,this.syncStateChanged=m,this.excludesMetadataChanges=g,this.hasCachedResults=_}static fromInitialDocuments(e,t,s,o,u){const h=[];return t.forEach((m=>{h.push({type:0,doc:m})})),new Io(e,t,mo.emptySet(t),h,s,o,!0,!1,u)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&mc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,s=e.docChanges;if(t.length!==s.length)return!1;for(let o=0;o<t.length;o++)if(t[o].type!==s[o].type||!t[o].doc.isEqual(s[o].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q1{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class K1{constructor(){this.queries=hy(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,s){const o=Te(t),u=o.queries;o.queries=hy(),u.forEach(((h,m)=>{for(const g of m.Sa)g.onError(s)}))})(this,new ne(B.ABORTED,"Firestore shutting down"))}}function hy(){return new ps((r=>G_(r)),mc)}async function G1(r,e){const t=Te(r);let s=3;const o=e.query;let u=t.queries.get(o);u?!u.ba()&&e.Da()&&(s=2):(u=new q1,s=e.Da()?0:1);try{switch(s){case 0:u.wa=await t.onListen(o,!0);break;case 1:u.wa=await t.onListen(o,!1);break;case 2:await t.onFirstRemoteStoreListen(o)}}catch(h){const m=Tf(h,`Initialization of query '${ao(e.query)}' failed`);return void e.onError(m)}t.queries.set(o,u),u.Sa.push(e),e.va(t.onlineState),u.wa&&e.Fa(u.wa)&&If(t)}async function Q1(r,e){const t=Te(r),s=e.query;let o=3;const u=t.queries.get(s);if(u){const h=u.Sa.indexOf(e);h>=0&&(u.Sa.splice(h,1),u.Sa.length===0?o=e.Da()?0:1:!u.ba()&&e.Da()&&(o=2))}switch(o){case 0:return t.queries.delete(s),t.onUnlisten(s,!0);case 1:return t.queries.delete(s),t.onUnlisten(s,!1);case 2:return t.onLastRemoteStoreUnlisten(s);default:return}}function Y1(r,e){const t=Te(r);let s=!1;for(const o of e){const u=o.query,h=t.queries.get(u);if(h){for(const m of h.Sa)m.Fa(o)&&(s=!0);h.wa=o}}s&&If(t)}function J1(r,e,t){const s=Te(r),o=s.queries.get(e);if(o)for(const u of o.Sa)u.onError(t);s.queries.delete(e)}function If(r){r.Ca.forEach((e=>{e.next()}))}var Md,dy;(dy=Md||(Md={})).Ma="default",dy.Cache="cache";class X1{constructor(e,t,s){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=s||{}}Fa(e){if(!this.options.includeMetadataChanges){const s=[];for(const o of e.docChanges)o.type!==3&&s.push(o);e=new Io(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const s=t!=="Offline";return(!this.options.qa||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Io.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Md.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nv{constructor(e){this.key=e}}class xv{constructor(e){this.key=e}}class Z1{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=Ne(),this.mutatedKeys=Ne(),this.eu=Q_(e),this.tu=new mo(this.eu)}get nu(){return this.Za}ru(e,t){const s=t?t.iu:new cy,o=t?t.tu:this.tu;let u=t?t.mutatedKeys:this.mutatedKeys,h=o,m=!1;const g=this.query.limitType==="F"&&o.size===this.query.limit?o.last():null,_=this.query.limitType==="L"&&o.size===this.query.limit?o.first():null;if(e.inorderTraversal(((w,R)=>{const b=o.get(w),z=gc(this.query,R)?R:null,Z=!!b&&this.mutatedKeys.has(b.key),Q=!!z&&(z.hasLocalMutations||this.mutatedKeys.has(z.key)&&z.hasCommittedMutations);let G=!1;b&&z?b.data.isEqual(z.data)?Z!==Q&&(s.track({type:3,doc:z}),G=!0):this.su(b,z)||(s.track({type:2,doc:z}),G=!0,(g&&this.eu(z,g)>0||_&&this.eu(z,_)<0)&&(m=!0)):!b&&z?(s.track({type:0,doc:z}),G=!0):b&&!z&&(s.track({type:1,doc:b}),G=!0,(g||_)&&(m=!0)),G&&(z?(h=h.add(z),u=Q?u.add(w):u.delete(w)):(h=h.delete(w),u=u.delete(w)))})),this.query.limit!==null)for(;h.size>this.query.limit;){const w=this.query.limitType==="F"?h.last():h.first();h=h.delete(w.key),u=u.delete(w.key),s.track({type:1,doc:w})}return{tu:h,iu:s,bs:m,mutatedKeys:u}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,s,o){const u=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const h=e.iu.ya();h.sort(((w,R)=>(function(z,Z){const Q=G=>{switch(G){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return me(20277,{Vt:G})}};return Q(z)-Q(Z)})(w.type,R.type)||this.eu(w.doc,R.doc))),this.ou(s),o=o??!1;const m=t&&!o?this._u():[],g=this.Ya.size===0&&this.current&&!o?1:0,_=g!==this.Xa;return this.Xa=g,h.length!==0||_?{snapshot:new Io(this.query,e.tu,u,h,e.mutatedKeys,g===0,_,!1,!!s&&s.resumeToken.approximateByteSize()>0),au:m}:{au:m}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new cy,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=Ne(),this.tu.forEach((s=>{this.uu(s.key)&&(this.Ya=this.Ya.add(s.key))}));const t=[];return e.forEach((s=>{this.Ya.has(s)||t.push(new xv(s))})),this.Ya.forEach((s=>{e.has(s)||t.push(new Nv(s))})),t}cu(e){this.Za=e.ks,this.Ya=Ne();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Io.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Sf="SyncEngine";class eR{constructor(e,t,s){this.query=e,this.targetId=t,this.view=s}}class tR{constructor(e){this.key=e,this.hu=!1}}class nR{constructor(e,t,s,o,u,h){this.localStore=e,this.remoteStore=t,this.eventManager=s,this.sharedClientState=o,this.currentUser=u,this.maxConcurrentLimboResolutions=h,this.Pu={},this.Tu=new ps((m=>G_(m)),mc),this.Eu=new Map,this.Iu=new Set,this.Ru=new rt(ce.comparator),this.Au=new Map,this.Vu=new ff,this.du={},this.mu=new Map,this.fu=To.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function rR(r,e,t=!0){const s=bv(r);let o;const u=s.Tu.get(e);return u?(s.sharedClientState.addLocalQueryTarget(u.targetId),o=u.view.lu()):o=await Dv(s,e,t,!0),o}async function iR(r,e){const t=bv(r);await Dv(t,e,!0,!1)}async function Dv(r,e,t,s){const o=await E1(r.localStore,er(e)),u=o.targetId,h=r.sharedClientState.addLocalQueryTarget(u,t);let m;return s&&(m=await sR(r,e,u,h==="current",o.resumeToken)),r.isPrimaryClient&&t&&Sv(r.remoteStore,o),m}async function sR(r,e,t,s,o){r.pu=(R,b,z)=>(async function(Q,G,ye,Ee){let Ce=G.view.ru(ye);Ce.bs&&(Ce=await iy(Q.localStore,G.query,!1).then((({documents:N})=>G.view.ru(N,Ce))));const Fe=Ee&&Ee.targetChanges.get(G.targetId),je=Ee&&Ee.targetMismatches.get(G.targetId)!=null,De=G.view.applyChanges(Ce,Q.isPrimaryClient,Fe,je);return py(Q,G.targetId,De.au),De.snapshot})(r,R,b,z);const u=await iy(r.localStore,e,!0),h=new Z1(e,u.ks),m=h.ru(u.documents),g=ol.createSynthesizedTargetChangeForCurrentChange(t,s&&r.onlineState!=="Offline",o),_=h.applyChanges(m,r.isPrimaryClient,g);py(r,t,_.au);const w=new eR(e,t,h);return r.Tu.set(e,w),r.Eu.has(t)?r.Eu.get(t).push(e):r.Eu.set(t,[e]),_.snapshot}async function oR(r,e,t){const s=Te(r),o=s.Tu.get(e),u=s.Eu.get(o.targetId);if(u.length>1)return s.Eu.set(o.targetId,u.filter((h=>!mc(h,e)))),void s.Tu.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(o.targetId),s.sharedClientState.isActiveQueryTarget(o.targetId)||await Od(s.localStore,o.targetId,!1).then((()=>{s.sharedClientState.clearQueryState(o.targetId),t&&yf(s.remoteStore,o.targetId),bd(s,o.targetId)})).catch(Co)):(bd(s,o.targetId),await Od(s.localStore,o.targetId,!0))}async function aR(r,e){const t=Te(r),s=t.Tu.get(e),o=t.Eu.get(s.targetId);t.isPrimaryClient&&o.length===1&&(t.sharedClientState.removeLocalQueryTarget(s.targetId),yf(t.remoteStore,s.targetId))}async function lR(r,e,t){const s=mR(r);try{const o=await(function(h,m){const g=Te(h),_=Ze.now(),w=m.reduce(((z,Z)=>z.add(Z.key)),Ne());let R,b;return g.persistence.runTransaction("Locally write mutations","readwrite",(z=>{let Z=Dr(),Q=Ne();return g.xs.getEntries(z,w).next((G=>{Z=G,Z.forEach(((ye,Ee)=>{Ee.isValidDocument()||(Q=Q.add(ye))}))})).next((()=>g.localDocuments.getOverlayedDocuments(z,Z))).next((G=>{R=G;const ye=[];for(const Ee of m){const Ce=vA(Ee,R.get(Ee.key).overlayedDocument);Ce!=null&&ye.push(new ms(Ee.key,Ce,U_(Ce.value.mapValue),Cr.exists(!0)))}return g.mutationQueue.addMutationBatch(z,_,ye,m)})).next((G=>{b=G;const ye=G.applyToLocalDocumentSet(R,Q);return g.documentOverlayCache.saveOverlays(z,G.batchId,ye)}))})).then((()=>({batchId:b.batchId,changes:J_(R)})))})(s.localStore,e);s.sharedClientState.addPendingMutation(o.batchId),(function(h,m,g){let _=h.du[h.currentUser.toKey()];_||(_=new rt(Pe)),_=_.insert(m,g),h.du[h.currentUser.toKey()]=_})(s,o.batchId,t),await ll(s,o.changes),await Tc(s.remoteStore)}catch(o){const u=Tf(o,"Failed to persist write");t.reject(u)}}async function Vv(r,e){const t=Te(r);try{const s=await y1(t.localStore,e);e.targetChanges.forEach(((o,u)=>{const h=t.Au.get(u);h&&($e(o.addedDocuments.size+o.modifiedDocuments.size+o.removedDocuments.size<=1,22616),o.addedDocuments.size>0?h.hu=!0:o.modifiedDocuments.size>0?$e(h.hu,14607):o.removedDocuments.size>0&&($e(h.hu,42227),h.hu=!1))})),await ll(t,s,e)}catch(s){await Co(s)}}function fy(r,e,t){const s=Te(r);if(s.isPrimaryClient&&t===0||!s.isPrimaryClient&&t===1){const o=[];s.Tu.forEach(((u,h)=>{const m=h.view.va(e);m.snapshot&&o.push(m.snapshot)})),(function(h,m){const g=Te(h);g.onlineState=m;let _=!1;g.queries.forEach(((w,R)=>{for(const b of R.Sa)b.va(m)&&(_=!0)})),_&&If(g)})(s.eventManager,e),o.length&&s.Pu.H_(o),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function uR(r,e,t){const s=Te(r);s.sharedClientState.updateQueryState(e,"rejected",t);const o=s.Au.get(e),u=o&&o.key;if(u){let h=new rt(ce.comparator);h=h.insert(u,Ft.newNoDocument(u,ve.min()));const m=Ne().add(u),g=new vc(ve.min(),new Map,new rt(Pe),h,m);await Vv(s,g),s.Ru=s.Ru.remove(u),s.Au.delete(e),Af(s)}else await Od(s.localStore,e,!1).then((()=>bd(s,e,t))).catch(Co)}async function cR(r,e){const t=Te(r),s=e.batch.batchId;try{const o=await g1(t.localStore,e);Lv(t,s,null),Ov(t,s),t.sharedClientState.updateMutationState(s,"acknowledged"),await ll(t,o)}catch(o){await Co(o)}}async function hR(r,e,t){const s=Te(r);try{const o=await(function(h,m){const g=Te(h);return g.persistence.runTransaction("Reject batch","readwrite-primary",(_=>{let w;return g.mutationQueue.lookupMutationBatch(_,m).next((R=>($e(R!==null,37113),w=R.keys(),g.mutationQueue.removeMutationBatch(_,R)))).next((()=>g.mutationQueue.performConsistencyCheck(_))).next((()=>g.documentOverlayCache.removeOverlaysForBatchId(_,w,m))).next((()=>g.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(_,w))).next((()=>g.localDocuments.getDocuments(_,w)))}))})(s.localStore,e);Lv(s,e,t),Ov(s,e),s.sharedClientState.updateMutationState(e,"rejected",t),await ll(s,o)}catch(o){await Co(o)}}function Ov(r,e){(r.mu.get(e)||[]).forEach((t=>{t.resolve()})),r.mu.delete(e)}function Lv(r,e,t){const s=Te(r);let o=s.du[s.currentUser.toKey()];if(o){const u=o.get(e);u&&(t?u.reject(t):u.resolve(),o=o.remove(e)),s.du[s.currentUser.toKey()]=o}}function bd(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const s of r.Eu.get(e))r.Tu.delete(s),t&&r.Pu.yu(s,t);r.Eu.delete(e),r.isPrimaryClient&&r.Vu.Gr(e).forEach((s=>{r.Vu.containsKey(s)||Mv(r,s)}))}function Mv(r,e){r.Iu.delete(e.path.canonicalString());const t=r.Ru.get(e);t!==null&&(yf(r.remoteStore,t),r.Ru=r.Ru.remove(e),r.Au.delete(t),Af(r))}function py(r,e,t){for(const s of t)s instanceof Nv?(r.Vu.addReference(s.key,e),dR(r,s)):s instanceof xv?(re(Sf,"Document no longer in limbo: "+s.key),r.Vu.removeReference(s.key,e),r.Vu.containsKey(s.key)||Mv(r,s.key)):me(19791,{wu:s})}function dR(r,e){const t=e.key,s=t.path.canonicalString();r.Ru.get(t)||r.Iu.has(s)||(re(Sf,"New document in limbo: "+t),r.Iu.add(s),Af(r))}function Af(r){for(;r.Iu.size>0&&r.Ru.size<r.maxConcurrentLimboResolutions;){const e=r.Iu.values().next().value;r.Iu.delete(e);const t=new ce(Qe.fromString(e)),s=r.fu.next();r.Au.set(s,new tR(t)),r.Ru=r.Ru.insert(t,s),Sv(r.remoteStore,new pi(er(q_(t.path)),s,"TargetPurposeLimboResolution",dc.ce))}}async function ll(r,e,t){const s=Te(r),o=[],u=[],h=[];s.Tu.isEmpty()||(s.Tu.forEach(((m,g)=>{h.push(s.pu(g,e,t).then((_=>{var w;if((_||t)&&s.isPrimaryClient){const R=_?!_.fromCache:(w=t==null?void 0:t.targetChanges.get(g.targetId))==null?void 0:w.current;s.sharedClientState.updateQueryState(g.targetId,R?"current":"not-current")}if(_){o.push(_);const R=mf.Is(g.targetId,_);u.push(R)}})))})),await Promise.all(h),s.Pu.H_(o),await(async function(g,_){const w=Te(g);try{await w.persistence.runTransaction("notifyLocalViewChanges","readwrite",(R=>W.forEach(_,(b=>W.forEach(b.Ts,(z=>w.persistence.referenceDelegate.addReference(R,b.targetId,z))).next((()=>W.forEach(b.Es,(z=>w.persistence.referenceDelegate.removeReference(R,b.targetId,z)))))))))}catch(R){if(!ko(R))throw R;re(gf,"Failed to update sequence numbers: "+R)}for(const R of _){const b=R.targetId;if(!R.fromCache){const z=w.vs.get(b),Z=z.snapshotVersion,Q=z.withLastLimboFreeSnapshotVersion(Z);w.vs=w.vs.insert(b,Q)}}})(s.localStore,u))}async function fR(r,e){const t=Te(r);if(!t.currentUser.isEqual(e)){re(Sf,"User change. New user:",e.toKey());const s=await Ev(t.localStore,e);t.currentUser=e,(function(u,h){u.mu.forEach((m=>{m.forEach((g=>{g.reject(new ne(B.CANCELLED,h))}))})),u.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await ll(t,s.Ns)}}function pR(r,e){const t=Te(r),s=t.Au.get(e);if(s&&s.hu)return Ne().add(s.key);{let o=Ne();const u=t.Eu.get(e);if(!u)return o;for(const h of u){const m=t.Tu.get(h);o=o.unionWith(m.view.nu)}return o}}function bv(r){const e=Te(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Vv.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=pR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=uR.bind(null,e),e.Pu.H_=Y1.bind(null,e.eventManager),e.Pu.yu=J1.bind(null,e.eventManager),e}function mR(r){const e=Te(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=cR.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=hR.bind(null,e),e}class sc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ec(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return m1(this.persistence,new d1,e.initialUser,this.serializer)}Cu(e){return new vv(pf.Vi,this.serializer)}Du(e){return new T1}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}sc.provider={build:()=>new sc};class gR extends sc{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){$e(this.persistence.referenceDelegate instanceof rc,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new JA(s,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Yt.withCacheSize(this.cacheSizeBytes):Yt.DEFAULT;return new vv((s=>rc.Vi(s,t)),this.serializer)}}class Fd{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>fy(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=fR.bind(null,this.syncEngine),await H1(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new K1})()}createDatastore(e){const t=Ec(e.databaseInfo.databaseId),s=C1(e.databaseInfo);return D1(e.authCredentials,e.appCheckCredentials,s,t)}createRemoteStore(e){return(function(s,o,u,h,m){return new O1(s,o,u,h,m)})(this.localStore,this.datastore,e.asyncQueue,(t=>fy(this.syncEngine,t,0)),(function(){return ay.v()?new ay:new I1})())}createSyncEngine(e,t){return(function(o,u,h,m,g,_,w){const R=new nR(o,u,h,m,g,_);return w&&(R.gu=!0),R})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(o){const u=Te(o);re(ds,"RemoteStore shutting down."),u.Ia.add(5),await al(u),u.Aa.shutdown(),u.Va.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Fd.provider={build:()=>new Fd};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yR{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):xr("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ri="FirestoreClient";class _R{constructor(e,t,s,o,u){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=s,this._databaseInfo=o,this.user=bt.UNAUTHENTICATED,this.clientId=nf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=u,this.authCredentials.start(s,(async h=>{re(Ri,"Received user=",h.uid),await this.authCredentialListener(h),this.user=h})),this.appCheckCredentials.start(s,(h=>(re(Ri,"Received new app check token=",h),this.appCheckCredentialListener(h,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new vi;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const s=Tf(t,"Failed to shutdown persistence");e.reject(s)}})),e.promise}}async function cd(r,e){r.asyncQueue.verifyOperationInProgress(),re(Ri,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let s=t.initialUser;r.setCredentialChangeListener((async o=>{s.isEqual(o)||(await Ev(e.localStore,o),s=o)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function my(r,e){r.asyncQueue.verifyOperationInProgress();const t=await vR(r);re(Ri,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((s=>uy(e.remoteStore,s))),r.setAppCheckTokenChangeListener(((s,o)=>uy(e.remoteStore,o))),r._onlineComponents=e}async function vR(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){re(Ri,"Using user provided OfflineComponentProvider");try{await cd(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(o){return o.name==="FirebaseError"?o.code===B.FAILED_PRECONDITION||o.code===B.UNIMPLEMENTED:!(typeof DOMException<"u"&&o instanceof DOMException)||o.code===22||o.code===20||o.code===11})(t))throw t;hs("Error using user provided cache. Falling back to memory cache: "+t),await cd(r,new sc)}}else re(Ri,"Using default OfflineComponentProvider"),await cd(r,new gR(void 0));return r._offlineComponents}async function Fv(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(re(Ri,"Using user provided OnlineComponentProvider"),await my(r,r._uninitializedComponentsProvider._online)):(re(Ri,"Using default OnlineComponentProvider"),await my(r,new Fd))),r._onlineComponents}function ER(r){return Fv(r).then((e=>e.syncEngine))}async function wR(r){const e=await Fv(r),t=e.eventManager;return t.onListen=rR.bind(null,e.syncEngine),t.onUnlisten=oR.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=iR.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=aR.bind(null,e.syncEngine),t}function TR(r,e,t={}){const s=new vi;return r.asyncQueue.enqueueAndForget((async()=>(function(u,h,m,g,_){const w=new yR({next:b=>{w.Nu(),h.enqueueAndForget((()=>Q1(u,R))),b.fromCache&&g.source==="server"?_.reject(new ne(B.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):_.resolve(b)},error:b=>_.reject(b)}),R=new X1(m,w,{includeMetadataChanges:!0,qa:!0});return G1(u,R)})(await wR(r),r.asyncQueue,e,t,s))),s.promise}function IR(r,e){const t=new vi;return r.asyncQueue.enqueueAndForget((async()=>lR(await ER(r),e,t))),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uv(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SR="ComponentProvider",gy=new Map;function AR(r,e,t,s,o){return new jS(r,e,t,o.host,o.ssl,o.experimentalForceLongPolling,o.experimentalAutoDetectLongPolling,Uv(o.experimentalLongPollingOptions),o.useFetchStreams,o.isUsingEmulator,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jv="firestore.googleapis.com",yy=!0;class _y{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new ne(B.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=jv,this.ssl=yy}else this.host=e.host,this.ssl=e.ssl??yy;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=_v;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<QA)throw new ne(B.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}PS("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Uv(e.experimentalLongPollingOptions??{}),(function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new ne(B.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new ne(B.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new ne(B.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(s,o){return s.timeoutSeconds===o.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ic{constructor(e,t,s,o){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=o,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new _y({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new ne(B.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new ne(B.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new _y(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(s){if(!s)return new vS;switch(s.type){case"firstParty":return new IS(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new ne(B.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const s=gy.get(t);s&&(re(SR,"Removing Datastore"),gy.delete(t),s.terminate())})(this),Promise.resolve()}}function RR(r,e,t,s={}){var _;r=Yu(r,Ic);const o=Za(e),u=r._getSettings(),h={...u,emulatorOptions:r._getEmulatorOptions()},m=`${e}:${t}`;o&&Oy(`https://${m}`),u.host!==jv&&u.host!==m&&hs("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const g={...u,host:m,ssl:o,emulatorOptions:s};if(!os(g,h)&&(r._setSettings(g),s.mockUserToken)){let w,R;if(typeof s.mockUserToken=="string")w=s.mockUserToken,R=bt.MOCK_USER;else{w=Pw(s.mockUserToken,(_=r._app)==null?void 0:_.options.projectId);const b=s.mockUserToken.sub||s.mockUserToken.user_id;if(!b)throw new ne(B.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");R=new bt(b)}r._authCredentials=new ES(new C_(w,R))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new ys(this.firestore,e,this._query)}}class It{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ei(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new It(this.firestore,e,this._key)}toJSON(){return{type:It._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(il(t,It._jsonSchema))return new It(e,s||null,new ce(Qe.fromString(t.referencePath)))}}It._jsonSchemaVersion="firestore/documentReference/1.0",It._jsonSchema={type:mt("string",It._jsonSchemaVersion),referencePath:mt("string")};class Ei extends ys{constructor(e,t,s){super(e,t,q_(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new It(this.firestore,null,new ce(e))}withConverter(e){return new Ei(this.firestore,e,this._path)}}function hd(r,e,...t){if(r=$t(r),k_("collection","path",e),r instanceof Ic){const s=Qe.fromString(e,...t);return xg(s),new Ei(r,null,s)}{if(!(r instanceof It||r instanceof Ei))throw new ne(B.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=r._path.child(Qe.fromString(e,...t));return xg(s),new Ei(r.firestore,null,s)}}function CR(r,e,...t){if(r=$t(r),arguments.length===1&&(e=nf.newId()),k_("doc","path",e),r instanceof Ic){const s=Qe.fromString(e,...t);return Ng(s),new It(r,null,new ce(s))}{if(!(r instanceof It||r instanceof Ei))throw new ne(B.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=r._path.child(Qe.fromString(e,...t));return Ng(s),new It(r.firestore,r instanceof Ei?r.converter:null,new ce(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vy="AsyncQueue";class Ey{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Tv(this,"async_queue_retry"),this._c=()=>{const s=ud();s&&re(vy,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=e;const t=ud();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=ud();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new vi;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!ko(e))throw e;re(vy,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((s=>{throw this.nc=s,this.rc=!1,xr("INTERNAL UNHANDLED ERROR: ",wy(s)),s})).then((s=>(this.rc=!1,s))))));return this.ac=t,t}enqueueAfterDelay(e,t,s){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const o=wf.createAndSchedule(this,e,t,s,(u=>this.hc(u)));return this.tc.push(o),o}uc(){this.nc&&me(47125,{Pc:wy(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((t,s)=>t.targetTimeMs-s.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function wy(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}class Rf extends Ic{constructor(e,t,s,o){super(e,t,s,o),this.type="firestore",this._queue=new Ey,this._persistenceKey=(o==null?void 0:o.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ey(e),this._firestoreClient=void 0,await e}}}function kR(r,e){const t=typeof r=="object"?r:Fy(),s=typeof r=="string"?r:Xu,o=Wd(t,"firestore").getImmediate({identifier:s});if(!o._initialized){const u=Cw("firestore");u&&RR(o,...u)}return o}function zv(r){if(r._terminated)throw new ne(B.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||PR(r),r._firestoreClient}function PR(r){var s,o,u,h;const e=r._freezeSettings(),t=AR(r._databaseId,((s=r._app)==null?void 0:s.options.appId)||"",r._persistenceKey,(o=r._app)==null?void 0:o.options.apiKey,e);r._componentsProvider||(u=e.localCache)!=null&&u._offlineComponentProvider&&((h=e.localCache)!=null&&h._onlineComponentProvider)&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new _R(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&(function(g){const _=g==null?void 0:g._online.build();return{_offline:g==null?void 0:g._offline.build(_),_online:_}})(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new yn(Nt.fromBase64String(e))}catch(t){throw new ne(B.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new yn(Nt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:yn._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(il(e,yn._jsonSchema))return yn.fromBase64String(e.bytes)}}yn._jsonSchemaVersion="firestore/bytes/1.0",yn._jsonSchema={type:mt("string",yn._jsonSchemaVersion),bytes:mt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bv{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new ne(B.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Pt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new ne(B.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new ne(B.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Pe(this._lat,e._lat)||Pe(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:nr._jsonSchemaVersion}}static fromJSON(e){if(il(e,nr._jsonSchema))return new nr(e.latitude,e.longitude)}}nr._jsonSchemaVersion="firestore/geoPoint/1.0",nr._jsonSchema={type:mt("string",nr._jsonSchemaVersion),latitude:mt("number"),longitude:mt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(s,o){if(s.length!==o.length)return!1;for(let u=0;u<s.length;++u)if(s[u]!==o[u])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Dn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(il(e,Dn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Dn(e.vectorValues);throw new ne(B.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Dn._jsonSchemaVersion="firestore/vectorValue/1.0",Dn._jsonSchema={type:mt("string",Dn._jsonSchemaVersion),vectorValues:mt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NR=/^__.*__$/;class xR{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return this.fieldMask!==null?new ms(e,this.data,this.fieldMask,t,this.fieldTransforms):new sl(e,this.data,t,this.fieldTransforms)}}function $v(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw me(40011,{dataSource:r})}}class kf{constructor(e,t,s,o,u,h){this.settings=e,this.databaseId=t,this.serializer=s,this.ignoreUndefinedProperties=o,u===void 0&&this.Ac(),this.fieldTransforms=u||[],this.fieldMask=h||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new kf({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var o;const t=(o=this.path)==null?void 0:o.child(e),s=this.i({path:t,arrayElement:!1});return s.mc(e),s}fc(e){var o;const t=(o=this.path)==null?void 0:o.child(e),s=this.i({path:t,arrayElement:!1});return s.Ac(),s}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return oc(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if($v(this.dataSource)&&NR.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class DR{constructor(e,t,s){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=s||Ec(e)}A(e,t,s,o=!1){return new kf({dataSource:e,methodName:t,targetDoc:s,path:Pt.emptyPath(),arrayElement:!1,hasConverter:o},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Wv(r){const e=r._freezeSettings(),t=Ec(r._databaseId);return new DR(r._databaseId,!!e.ignoreUndefinedProperties,t)}function VR(r,e,t,s,o,u={}){const h=r.A(u.merge||u.mergeFields?2:0,e,t,o);Kv("Data must be an object, but it was:",h,s);const m=Hv(s,h);let g,_;if(u.merge)g=new Nn(h.fieldMask),_=h.fieldTransforms;else if(u.mergeFields){const w=[];for(const R of u.mergeFields){const b=Sc(e,R,t);if(!h.contains(b))throw new ne(B.INVALID_ARGUMENT,`Field '${b}' is specified in your field mask but missing from your input data.`);bR(w,b)||w.push(b)}g=new Nn(w),_=h.fieldTransforms.filter((R=>g.covers(R.field)))}else g=null,_=h.fieldTransforms;return new xR(new gn(m),g,_)}class Pf extends Cf{_toFieldTransform(e){return new mA(e.path,new Ga)}isEqual(e){return e instanceof Pf}}function OR(r,e,t,s=!1){return Nf(t,r.A(s?4:3,e))}function Nf(r,e){if(qv(r=$t(r)))return Kv("Unsupported field value:",e,r),Hv(r,e);if(r instanceof Cf)return(function(s,o){if(!$v(o.dataSource))throw o.yc(`${s._methodName}() can only be used with update() and set()`);if(!o.path)throw o.yc(`${s._methodName}() is not currently supported inside arrays`);const u=s._toFieldTransform(o);u&&o.fieldTransforms.push(u)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return(function(s,o){const u=[];let h=0;for(const m of s){let g=Nf(m,o.gc(h));g==null&&(g={nullValue:"NULL_VALUE"}),u.push(g),h++}return{arrayValue:{values:u}}})(r,e)}return(function(s,o){if((s=$t(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return dA(o.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const u=Ze.fromDate(s);return{timestampValue:nc(o.serializer,u)}}if(s instanceof Ze){const u=new Ze(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:nc(o.serializer,u)}}if(s instanceof nr)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof yn)return{bytesValue:cv(o.serializer,s._byteString)};if(s instanceof It){const u=o.databaseId,h=s.firestore._databaseId;if(!h.isEqual(u))throw o.yc(`Document reference is for database ${h.projectId}/${h.database} but should be for database ${u.projectId}/${u.database}`);return{referenceValue:df(s.firestore._databaseId||o.databaseId,s._key.path)}}if(s instanceof Dn)return(function(h,m){const g=h instanceof Dn?h.toArray():h;return{mapValue:{fields:{[b_]:{stringValue:F_},[Zu]:{arrayValue:{values:g.map((w=>{if(typeof w!="number")throw m.yc("VectorValues must only contain numeric values.");return uf(m.serializer,w)}))}}}}}})(s,o);if(yv(s))return s._toProto(o.serializer);throw o.yc(`Unsupported field value: ${hc(s)}`)})(r,e)}function Hv(r,e){const t={};return x_(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):fs(r,((s,o)=>{const u=Nf(o,e.dc(s));u!=null&&(t[s]=u)})),{mapValue:{fields:t}}}function qv(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Ze||r instanceof nr||r instanceof yn||r instanceof It||r instanceof Cf||r instanceof Dn||yv(r))}function Kv(r,e,t){if(!qv(t)||!P_(t)){const s=hc(t);throw s==="an object"?e.yc(r+" a custom object"):e.yc(r+" "+s)}}function Sc(r,e,t){if((e=$t(e))instanceof Bv)return e._internalPath;if(typeof e=="string")return MR(r,e);throw oc("Field path arguments must be of type string or ",r,!1,void 0,t)}const LR=new RegExp("[~\\*/\\[\\]]");function MR(r,e,t){if(e.search(LR)>=0)throw oc(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Bv(...e.split("."))._internalPath}catch{throw oc(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function oc(r,e,t,s,o){const u=s&&!s.isEmpty(),h=o!==void 0;let m=`Function ${e}() called with invalid data`;t&&(m+=" (via `toFirestore()`)"),m+=". ";let g="";return(u||h)&&(g+=" (found",u&&(g+=` in field ${s}`),h&&(g+=` in document ${o}`),g+=")"),new ne(B.INVALID_ARGUMENT,m+r+g)}function bR(r,e){return r.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FR{convertValue(e,t="none"){switch(Si(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ut(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ii(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw me(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const s={};return fs(e,((o,u)=>{s[o]=this.convertValue(u,t)})),s}convertVectorValue(e){var s,o,u;const t=(u=(o=(s=e.fields)==null?void 0:s[Zu].arrayValue)==null?void 0:o.values)==null?void 0:u.map((h=>ut(h.doubleValue)));return new Dn(t)}convertGeoPoint(e){return new nr(ut(e.latitude),ut(e.longitude))}convertArray(e,t){return(e.values||[]).map((s=>this.convertValue(s,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const s=pc(e);return s==null?null:this.convertValue(s,t);case"estimate":return this.convertTimestamp(Wa(e));default:return null}}convertTimestamp(e){const t=Ti(e);return new Ze(t.seconds,t.nanos)}convertDocumentKey(e,t){const s=Qe.fromString(e);$e(gv(s),9688,{name:e});const o=new Ha(s.get(1),s.get(3)),u=new ce(s.popFirst(5));return o.isEqual(t)||xr(`Document ${u} contains a document reference within a different database (${o.projectId}/${o.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),u}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UR extends FR{constructor(e){super(),this.firestore=e}convertBytes(e){return new yn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new It(this.firestore,null,t)}}function Ca(){return new Pf("serverTimestamp")}const Ty="@firebase/firestore",Iy="4.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gv{constructor(e,t,s,o,u){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=o,this._converter=u}get id(){return this._key.path.lastSegment()}get ref(){return new It(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new jR(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Sc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class jR extends Gv{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zR(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new ne(B.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class xf{}class Qv extends xf{}function BR(r,e,...t){let s=[];e instanceof xf&&s.push(e),s=s.concat(t),(function(u){const h=u.filter((g=>g instanceof Vf)).length,m=u.filter((g=>g instanceof Df)).length;if(h>1||h>0&&m>0)throw new ne(B.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(s);for(const o of s)r=o._apply(r);return r}class Df extends Qv{constructor(e,t,s){super(),this._field=e,this._op=t,this._value=s,this.type="where"}static _create(e,t,s){return new Df(e,t,s)}_apply(e){const t=this._parse(e);return Yv(e._query,t),new ys(e.firestore,e.converter,kd(e._query,t))}_parse(e){const t=Wv(e.firestore);return(function(u,h,m,g,_,w,R){let b;if(_.isKeyField()){if(w==="array-contains"||w==="array-contains-any")throw new ne(B.INVALID_ARGUMENT,`Invalid Query. You can't perform '${w}' queries on documentId().`);if(w==="in"||w==="not-in"){Ay(R,w);const Z=[];for(const Q of R)Z.push(Sy(g,u,Q));b={arrayValue:{values:Z}}}else b=Sy(g,u,R)}else w!=="in"&&w!=="not-in"&&w!=="array-contains-any"||Ay(R,w),b=OR(m,h,R,w==="in"||w==="not-in");return pt.create(_,w,b)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class Vf extends xf{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Vf(e,t)}_parse(e){const t=this._queryConstraints.map((s=>s._parse(e))).filter((s=>s.getFilters().length>0));return t.length===1?t[0]:Vn.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(o,u){let h=o;const m=u.getFlattenedFilters();for(const g of m)Yv(h,g),h=kd(h,g)})(e._query,t),new ys(e.firestore,e.converter,kd(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Of extends Qv{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Of(e,t)}_apply(e){const t=(function(o,u,h){if(o.startAt!==null)throw new ne(B.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(o.endAt!==null)throw new ne(B.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ka(u,h)})(e._query,this._field,this._direction);return new ys(e.firestore,e.converter,iA(e._query,t))}}function $R(r,e="asc"){const t=e,s=Sc("orderBy",r);return Of._create(s,t)}function Sy(r,e,t){if(typeof(t=$t(t))=="string"){if(t==="")throw new ne(B.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!K_(e)&&t.indexOf("/")!==-1)throw new ne(B.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const s=e.path.child(Qe.fromString(t));if(!ce.isDocumentKey(s))throw new ne(B.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return Ug(r,new ce(s))}if(t instanceof It)return Ug(r,t._key);throw new ne(B.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${hc(t)}.`)}function Ay(r,e){if(!Array.isArray(r)||r.length===0)throw new ne(B.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Yv(r,e){const t=(function(o,u){for(const h of o)for(const m of h.getFlattenedFilters())if(u.indexOf(m.op)>=0)return m.op;return null})(r.filters,(function(o){switch(o){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new ne(B.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new ne(B.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function WR(r,e,t){let s;return s=r?r.toFirestore(e):e,s}class xu{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class go extends Gv{constructor(e,t,s,o,u,h){super(e,t,s,o,h),this._firestore=e,this._firestoreImpl=e,this.metadata=u}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new zu(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field(Sc("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new ne(B.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=go._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}go._jsonSchemaVersion="firestore/documentSnapshot/1.0",go._jsonSchema={type:mt("string",go._jsonSchemaVersion),bundleSource:mt("string","DocumentSnapshot"),bundleName:mt("string"),bundle:mt("string")};class zu extends go{data(e={}){return super.data(e)}}class yo{constructor(e,t,s,o){this._firestore=e,this._userDataWriter=t,this._snapshot=o,this.metadata=new xu(o.hasPendingWrites,o.fromCache),this.query=s}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((s=>{e.call(t,new zu(this._firestore,this._userDataWriter,s.key,s,new xu(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new ne(B.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(o,u){if(o._snapshot.oldDocs.isEmpty()){let h=0;return o._snapshot.docChanges.map((m=>{const g=new zu(o._firestore,o._userDataWriter,m.doc.key,m.doc,new xu(o._snapshot.mutatedKeys.has(m.doc.key),o._snapshot.fromCache),o.query.converter);return m.doc,{type:"added",doc:g,oldIndex:-1,newIndex:h++}}))}{let h=o._snapshot.oldDocs;return o._snapshot.docChanges.filter((m=>u||m.type!==3)).map((m=>{const g=new zu(o._firestore,o._userDataWriter,m.doc.key,m.doc,new xu(o._snapshot.mutatedKeys.has(m.doc.key),o._snapshot.fromCache),o.query.converter);let _=-1,w=-1;return m.type!==0&&(_=h.indexOf(m.doc.key),h=h.delete(m.doc.key)),m.type!==1&&(h=h.add(m.doc),w=h.indexOf(m.doc.key)),{type:HR(m.type),doc:g,oldIndex:_,newIndex:w}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new ne(B.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=yo._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=nf.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],s=[],o=[];return this.docs.forEach((u=>{u._document!==null&&(t.push(u._document),s.push(this._userDataWriter.convertObjectMap(u._document.data.value.mapValue.fields,"previous")),o.push(u.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function HR(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return me(61501,{type:r})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */yo._jsonSchemaVersion="firestore/querySnapshot/1.0",yo._jsonSchema={type:mt("string",yo._jsonSchemaVersion),bundleSource:mt("string","QuerySnapshot"),bundleName:mt("string"),bundle:mt("string")};function qR(r){r=Yu(r,ys);const e=Yu(r.firestore,Rf),t=zv(e),s=new UR(e);return zR(r._query),TR(t,r._query).then((o=>new yo(e,s,r,o)))}function ka(r,e){const t=Yu(r.firestore,Rf),s=CR(r),o=WR(r.converter,e),u=Wv(r.firestore);return KR(t,[VR(u,"addDoc",s._key,o,r.converter!==null,{}).toMutation(s._key,Cr.exists(!1))]).then((()=>s))}function KR(r,e){const t=zv(r);return IR(t,e)}(function(e,t=!0){_S(So),_o(new as("firestore",((s,{instanceIdentifier:o,options:u})=>{const h=s.getProvider("app").getImmediate(),m=new Rf(new wS(s.getProvider("auth-internal")),new SS(h,s.getProvider("app-check-internal")),zS(h,o),h);return u={useFetchStreams:t,...u},m._setSettings(u),m}),"PUBLIC").setMultipleInstances(!0)),yi(Ty,Iy,e),yi(Ty,Iy,"esm2020")})();const GR={apiKey:"AIzaSyBsOJculacgF-_Ha3UTjAhtf66zY8MQwCg",authDomain:"autonomous-multi-step-ai-agent.firebaseapp.com",projectId:"autonomous-multi-step-ai-agent",storageBucket:"autonomous-multi-step-ai-agent.firebasestorage.app",messagingSenderId:"179717325619",appId:"1:179717325619:web:b0dfdcce2b7106f6763446"},Jv=by(GR),Pa=pS(Jv),QR=new Ir,dd=kR(Jv),Xv=He.createContext(),Zv=()=>He.useContext(Xv),YR=({children:r})=>{const[e,t]=He.useState(null),[s,o]=He.useState(!0);He.useEffect(()=>n0(Pa,R=>{t(R),o(!1)}),[]);const _={user:e,signup:(w,R)=>XI(Pa,w,R),login:(w,R)=>ZI(Pa,w,R),logout:()=>r0(Pa),loginWithGoogle:()=>I0(Pa,QR),loading:s};return P.jsx(Xv.Provider,{value:_,children:!s&&r})};function eE({className:r="w-5 h-5",size:e=20,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("path",{d:"M12 2L2 7l10 5 10-5-10-5z"}),P.jsx("path",{d:"M2 17l10 5 10-5"}),P.jsx("path",{d:"M2 12l10 5 10-5"})]})}function JR({className:r="w-5 h-5",size:e=20,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),P.jsx("circle",{cx:"12",cy:"11",r:"2.5"}),P.jsx("path",{d:"M12 8.5v-1"})]})}function XR({className:r="w-5 h-5",size:e=20,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("path",{d:"M22 2L11 13"}),P.jsx("path",{d:"M22 2l-7 20-4-9-9-4 20-7z"})]})}function ZR({className:r="w-5 h-5",size:e=20,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("circle",{cx:"12",cy:"12",r:"10"}),P.jsx("polygon",{points:"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"})]})}function eC({className:r="w-5 h-5",size:e=20,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),P.jsx("polyline",{points:"14 2 14 8 20 8"}),P.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),P.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),P.jsx("polyline",{points:"10 9 9 9 8 9"})]})}function tC({className:r="w-5 h-5",size:e=20,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}),P.jsx("rect",{x:"9",y:"9",width:"6",height:"6"}),P.jsx("line",{x1:"9",y1:"1",x2:"9",y2:"4"}),P.jsx("line",{x1:"15",y1:"1",x2:"15",y2:"4"}),P.jsx("line",{x1:"9",y1:"20",x2:"9",y2:"23"}),P.jsx("line",{x1:"15",y1:"20",x2:"15",y2:"23"}),P.jsx("line",{x1:"20",y1:"9",x2:"23",y2:"9"}),P.jsx("line",{x1:"20",y1:"14",x2:"23",y2:"14"}),P.jsx("line",{x1:"1",y1:"9",x2:"4",y2:"9"}),P.jsx("line",{x1:"1",y1:"14",x2:"4",y2:"14"})]})}function nC({className:r="w-5 h-5",size:e=20,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("circle",{cx:"12",cy:"12",r:"10"}),P.jsx("polyline",{points:"12 6 12 12 16 14"})]})}function rC({className:r="w-5 h-5",size:e=20,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("rect",{x:"3",y:"11",width:"18",height:"10",rx:"2"}),P.jsx("circle",{cx:"12",cy:"5",r:"2"}),P.jsx("path",{d:"M12 7v4"}),P.jsx("line",{x1:"8",y1:"16",x2:"8",y2:"16"}),P.jsx("line",{x1:"16",y1:"16",x2:"16",y2:"16"})]})}function Ry({className:r="w-5 h-5",size:e=20,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),P.jsx("circle",{cx:"12",cy:"7",r:"4"})]})}function tE({className:r="w-5 h-5",size:e=18,color:t="currentColor"}){return P.jsx("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:P.jsx("polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"})})}function iC({className:r="w-5 h-5",size:e=18,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),P.jsx("polygon",{points:"22 2 15 22 11 13 2 9 22 2"})]})}function sC({className:r="w-5 h-5",size:e=18,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("path",{d:"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"}),P.jsx("path",{d:"M19 10v2a7 7 0 0 1-14 0v-2"}),P.jsx("line",{x1:"12",y1:"19",x2:"12",y2:"23"}),P.jsx("line",{x1:"8",y1:"23",x2:"16",y2:"23"})]})}function oC({className:r="w-5 h-5",size:e=16,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),P.jsx("polyline",{points:"7 10 12 15 17 10"}),P.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}function aC({className:r="w-6 h-6",size:e=22,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),P.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),P.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]})}function lC({className:r="w-6 h-6",size:e=22,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),P.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}function uC({className:r="w-4 h-4",size:e=16,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}),P.jsx("polyline",{points:"16 17 21 12 16 7"}),P.jsx("line",{x1:"21",y1:"12",x2:"9",y2:"12"})]})}function cC({className:r="w-4 h-4",size:e=16,color:t="currentColor"}){return P.jsx("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:P.jsx("polyline",{points:"20 6 9 17 4 12"})})}function hC({className:r="w-4 h-4",size:e=16,color:t="currentColor"}){return P.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:r,children:[P.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),P.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}function Ud({agentKey:r,size:e=18,className:t=""}){switch((r||"").toLowerCase()){case"jarvis":case"supervisor":return P.jsx(eE,{size:e,className:t});case"sentinel":return P.jsx(JR,{size:e,className:t});case"hermes":return P.jsx(XR,{size:e,className:t});case"scout":return P.jsx(ZR,{size:e,className:t});case"scribe":return P.jsx(eC,{size:e,className:t});case"cipher":return P.jsx(tC,{size:e,className:t});case"chronos":return P.jsx(nC,{size:e,className:t});default:return P.jsx(rC,{size:e,className:t})}}const dC=()=>{const[r,e]=He.useState(!0),[t,s]=He.useState(""),[o,u]=He.useState(""),[h,m]=He.useState(""),[g,_]=He.useState(!1),{login:w,signup:R,loginWithGoogle:b}=Zv(),z=async()=>{m(""),_(!0);try{await b()}catch(Q){m(Q.message.replace("Firebase: ",""))}finally{_(!1)}},Z=async Q=>{Q.preventDefault(),m(""),_(!0);try{r?await w(t,o):await R(t,o)}catch(G){m(G.message.replace("Firebase: ",""))}finally{_(!1)}};return P.jsx("div",{className:"app-viewport",children:P.jsx("div",{className:"auth-overlay",children:P.jsxs("div",{className:"auth-card",children:[P.jsxs("div",{className:"auth-header",children:[P.jsx("div",{className:"auth-logo",children:P.jsx(eE,{size:28,color:"#06b6d4"})}),P.jsx("h1",{children:"Autonomous Taskforce"}),P.jsx("p",{children:r?"Sign in to access agent constellation":"Create an account to start"})]}),P.jsxs("form",{className:"auth-form",onSubmit:Z,children:[P.jsxs("div",{className:"form-group",children:[P.jsx("label",{children:"Email Address"}),P.jsx("input",{type:"email",value:t,onChange:Q=>s(Q.target.value),placeholder:"name@domain.com",required:!0})]}),P.jsxs("div",{className:"form-group",children:[P.jsx("label",{children:"Password"}),P.jsx("input",{type:"password",value:o,onChange:Q=>u(Q.target.value),placeholder:"••••••••",required:!0})]}),h&&P.jsx("div",{className:"auth-error",children:h}),P.jsx("button",{type:"submit",className:"auth-submit",disabled:g,children:g?"Authenticating...":r?"Sign In":"Create Account"}),P.jsx("div",{className:"auth-divider",children:P.jsx("span",{children:"or continue with"})}),P.jsxs("button",{type:"button",className:"auth-google",onClick:z,disabled:g,children:[P.jsxs("svg",{className:"google-icon",viewBox:"0 0 24 24",children:[P.jsx("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",fill:"#4285F4"}),P.jsx("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",fill:"#34A853"}),P.jsx("path",{d:"M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z",fill:"#FBBC05"}),P.jsx("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",fill:"#EA4335"})]}),"Google"]})]}),P.jsx("div",{className:"auth-footer",children:P.jsx("button",{className:"auth-toggle",onClick:()=>e(!r),children:r?"Don't have an account? Sign up":"Already have an account? Sign in"})})]})})})},fC=()=>{const[r,e]=He.useState(!1),[t,s]=He.useState(""),[o,u]=He.useState(null),h=He.useRef(null);He.useEffect(()=>{const _=window.SpeechRecognition||window.webkitSpeechRecognition;if(_&&!h.current){const w=new _;w.continuous=!0,w.interimResults=!0,w.lang="en-US",w.onresult=R=>{let b="";for(let z=R.resultIndex;z<R.results.length;z++)b+=R.results[z][0].transcript;s(b)},w.onerror=R=>{u(R.error),e(!1)},w.onend=()=>{e(!1)},h.current=w}},[]);const m=He.useCallback(()=>{if(!h.current){u("Speech recognition not supported or not initialized.");return}s(""),u(null),e(!0);try{h.current.start()}catch(_){console.error("Recognition start error:",_),e(!1)}},[]),g=He.useCallback(()=>{h.current&&(h.current.stop(),e(!1))},[]);return{isListening:r,transcript:t,startListening:m,stopListening:g,error:o,isSupported:!!(window.SpeechRecognition||window.webkitSpeechRecognition)}},kr={jarvis:{name:"JARVIS",title:"Supreme Orchestrator",color:"#06b6d4",pitch:.95,rate:.95,iconKey:"jarvis",gender:"male",accentKeywords:["uk","great britain","george","christopher","david","male"]},sentinel:{name:"SENTINEL",title:"System Guardian",color:"#f43f5e",pitch:.82,rate:.9,iconKey:"sentinel",gender:"male",accentKeywords:["mark","ryan","steffan","male"]},hermes:{name:"HERMES",title:"Communications",color:"#f59e0b",pitch:1.05,rate:1.05,iconKey:"hermes",gender:"female",accentKeywords:["sonia","jenny","aria","zira","female","natural"]},scout:{name:"SCOUT",title:"Web Recon",color:"#10b981",pitch:1.12,rate:1.1,iconKey:"scout",gender:"male",accentKeywords:["guy","eric","australia","au","male"]},scribe:{name:"SCRIBE",title:"Master Archivist",color:"#a855f7",pitch:.98,rate:.95,iconKey:"scribe",gender:"female",accentKeywords:["libby","hazel","susan","female","uk"]},cipher:{name:"CIPHER",title:"Math & Logic Core",color:"#3b82f6",pitch:.88,rate:1.15,iconKey:"cipher",gender:"male",accentKeywords:["roger","james","canada","male"]},chronos:{name:"CHRONOS",title:"Temporal Planner",color:"#eab308",pitch:1.02,rate:1,iconKey:"chronos",gender:"female",accentKeywords:["catherine","clara","female","natural"]}};let Tr=[];function pC(){"speechSynthesis"in window&&(Tr=window.speechSynthesis.getVoices(),window.speechSynthesis.onvoiceschanged!==void 0&&(window.speechSynthesis.onvoiceschanged=()=>{Tr=window.speechSynthesis.getVoices()}))}pC();function mC(r){if((!Tr||Tr.length===0)&&"speechSynthesis"in window&&(Tr=window.speechSynthesis.getVoices()),!Tr||Tr.length===0)return null;const e=Tr.filter(m=>m.lang&&m.lang.startsWith("en")),t=e.length>0?e:Tr,s=kr[r]||kr.jarvis,o=s.accentKeywords||[];for(const m of o){const g=t.find(_=>_.name.toLowerCase().includes(m));if(g)return g}if(s.gender==="female"){const m=t.find(g=>g.name.toLowerCase().includes("female")||g.name.toLowerCase().includes("zira")||g.name.toLowerCase().includes("jenny"));if(m)return m}else{const m=t.find(g=>g.name.toLowerCase().includes("male")||g.name.toLowerCase().includes("david")||g.name.toLowerCase().includes("george")||g.name.toLowerCase().includes("mark"));if(m)return m}const h=Object.keys(kr).indexOf(r);return h>=0&&t.length>0?t[h%t.length]:t[0]}function jd(r,e="jarvis",t,s){if(!("speechSynthesis"in window)){t&&t(),setTimeout(()=>{s&&s()},2e3);return}window.speechSynthesis.cancel();const o=kr[e]||kr.jarvis,u=new SpeechSynthesisUtterance(r);u.pitch=o.pitch,u.rate=o.rate;const h=mC(e);h&&(u.voice=h),t&&(u.onstart=t),s&&(u.onend=s),u.onerror=()=>{s&&s()},window.speechSynthesis.speak(u)}function gC(r,e,t){if(!r||r.length===0){t&&t();return}let s=0;function o(){if(s>=r.length){e&&e(null),t&&t();return}const u=r[s];s++,e&&e(u.agent),jd(u.text,u.agent,null,()=>{setTimeout(o,500)})}o()}function yC({activeAgent:r,isAssembling:e,onTriggerAssemble:t,onSelectAgent:s}){const o=["jarvis","sentinel","hermes","scout","scribe","cipher","chronos"];return P.jsxs("div",{className:"assemble-container",children:[P.jsxs("div",{className:"assemble-top-bar",children:[P.jsxs("div",{className:"assemble-brand",children:[P.jsx("span",{className:"assemble-badge",children:"TASKFORCE"}),P.jsx("span",{className:"assemble-sub",children:"AI Agent Constellation"})]}),P.jsxs("button",{className:`assemble-btn ${e?"assembling":""}`,onClick:t,disabled:e,title:"Trigger Synchronous Multi-Agent Voice Briefing",children:[P.jsx(tE,{size:14,className:"assemble-btn-icon"}),P.jsx("span",{children:e?"Briefing Active...":"Assemble Protocol"})]})]}),P.jsx("div",{className:"assemble-roster",children:o.map(u=>{const h=kr[u],m=r===u;return P.jsxs("button",{type:"button",className:`agent-node ${m?"active-speaking":""}`,style:{"--agent-color":h.color},onClick:()=>s(u),title:`${h.name} — ${h.title} (Click for status)`,children:[P.jsxs("div",{className:"node-avatar-wrapper",children:[P.jsx("div",{className:"node-ring"}),P.jsx("div",{className:"node-avatar",children:P.jsx(Ud,{agentKey:u,size:16})}),m&&P.jsxs("div",{className:"audio-wave-container",children:[P.jsx("span",{className:"wave-bar"}),P.jsx("span",{className:"wave-bar"}),P.jsx("span",{className:"wave-bar"})]})]}),P.jsxs("div",{className:"node-meta",children:[P.jsx("span",{className:"node-name",children:h.name}),P.jsx("span",{className:"node-role",children:h.title})]})]},u)})})]})}function _C(){const{user:r,logout:e}=Zv(),[t,s]=He.useState([{role:"agent",content:"System initialized. I am JARVIS, master supervisor of the Autonomous Taskforce. Enter your objective below or trigger Assemble Protocol for a full status briefing.",node:"supervisor"}]),[o,u]=He.useState(""),[h,m]=He.useState(!1),[g,_]=He.useState(null),[w,R]=He.useState(null),[b,z]=He.useState(!1),[Z,Q]=He.useState(!1),G=He.useRef(null),{isListening:ye,transcript:Ee,startListening:Ce,stopListening:Fe,isSupported:je}=fC();He.useEffect(()=>{Ee&&u(Ee)},[Ee]);const De=["jarvis","sentinel","hermes","scout","scribe","cipher","chronos"];He.useEffect(()=>{if(!r)return;(async()=>{try{const V=BR(hd(dd,"users",r.uid,"activities"),$R("timestamp","asc")),T=await qR(V);if(T.empty)s([{role:"agent",content:"System initialized. I am JARVIS, master supervisor of the Autonomous Taskforce. Enter your objective below or trigger Assemble Protocol for a full status briefing.",node:"supervisor"}]);else{const fe=T.docs.map(ze=>({...ze.data(),id:ze.id}));s(fe)}}catch(V){console.error("Failed to load history:",V)}})()},[r]);const N=()=>{var A;(A=G.current)==null||A.scrollIntoView({behavior:"smooth"})};He.useEffect(()=>{N()},[t,h,b]);const S=async()=>{if(!b){z(!0),_("supervisor"),R("jarvis");try{const fe=(await(await fetch("http://localhost:8000/api/assemble",{method:"POST",headers:{"Content-Type":"application/json"}})).json()).briefing||[],ze={role:"agent",node:"supervisor",content:"[TASKFORCE PROTOCOL ACTIVATED] Multi-agent briefing in progress...",timestamp:new Date};s(Oe=>[...Oe,ze]),fe.forEach(Oe=>{const Ae={role:"agent",node:Oe.agent,content:`[${Oe.name.toUpperCase()} - ${Oe.title}]: ${Oe.text}`,timestamp:new Date};s(J=>[...J,Ae]),r&&ka(hd(dd,"users",r.uid,"activities"),{...Ae,timestamp:Ca()}).catch(()=>{})}),gC(fe,Oe=>{R(Oe),_(Oe||"supervisor")},()=>{R(null),z(!1)})}catch(A){console.error("Assemble failed:",A),z(!1),R(null)}}},C=A=>{const V=kr[A];if(!V)return;R(A);const T=`${V.name} reporting. All systems operational in the ${V.title} sub-system.`;jd(T,A,null,()=>R(null)),window.innerWidth<768&&Q(!1)},D=async()=>{if(!o.trim()||h||!r)return;if(/^(assemble|agents assemble|status report|brief me|morning brief)/i.test(o.trim())){u(""),S();return}const A={role:"user",content:o,timestamp:new Date,node:null};s(T=>[...T,A]),u(""),m(!0),_("supervisor");const V=hd(dd,"users",r.uid,"activities");try{ka(V,{...A,timestamp:Ca()}).catch(()=>{});const fe=await fetch("http://localhost:8000/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:t.concat(A).map(ae=>({role:ae.role,content:ae.content})),userId:r.uid})});if(!fe.ok)throw new Error(`API returned status ${fe.status}`);const ze=fe.body.getReader(),Oe=new TextDecoder("utf-8");let Ae=!1,J="";for(;!Ae;){const{value:ae,done:ee}=await ze.read();if(ee){Ae=!0;break}J+=Oe.decode(ae,{stream:!0});const O=J.split(`
`);J=O.pop()||"";for(const $ of O)if($.startsWith("data: ")){const _e=$.slice(6);if(!_e.trim())continue;try{const ue=JSON.parse(_e);if(ue.done){Ae=!0;break}else if(ue.error){const Ie={role:"error",content:`Error: ${ue.error}`,node:"system",timestamp:new Date};s(Se=>[...Se,Ie]),ka(V,{...Ie,timestamp:Ca()}).catch(()=>{})}else{const Ie={role:"agent",content:ue.content,node:ue.node,timestamp:new Date};s(Se=>[...Se,Ie]),_(ue.node),ue.content&&typeof ue.content=="string"&&ue.content.length<200&&!ue.content.includes("{")&&jd(ue.content,ue.node||"jarvis"),ka(V,{...Ie,timestamp:Ca()}).catch(()=>{})}}catch(ue){console.error("[SSE Parse Error]",ue)}}}}catch(T){const fe={role:"error",content:`Error: ${T.message}`,node:"system",timestamp:new Date};s(ze=>[...ze,fe]),ka(V,{...fe,timestamp:Ca()}).catch(()=>{})}finally{m(!1),_(null)}};return r?P.jsxs("div",{className:"app-viewport",children:[P.jsxs("header",{className:"mobile-header",children:[P.jsx("button",{className:"menu-toggle-btn",onClick:()=>Q(!Z),"aria-label":"Toggle navigation",children:Z?P.jsx(lC,{size:20}):P.jsx(aC,{size:20})}),P.jsx("div",{className:"mobile-header-title",children:P.jsx("span",{className:"app-title",children:"Autonomous Taskforce"})}),P.jsx("button",{className:"mobile-assemble-btn",onClick:S,disabled:b,title:"Agents Assemble",children:P.jsx(tE,{size:16})})]}),Z&&P.jsx("div",{className:"sidebar-backdrop",onClick:()=>Q(!1)}),P.jsxs("div",{className:"layout",children:[P.jsxs("aside",{className:`sidebar ${Z?"sidebar-open":""}`,children:[P.jsxs("div",{className:"sidebar-header",children:[P.jsxs("div",{className:"user-profile",children:[P.jsx("div",{className:"user-avatar",children:r.email?r.email[0].toUpperCase():P.jsx(Ry,{size:16})}),P.jsxs("div",{className:"user-info",children:[P.jsx("span",{className:"user-email",title:r.email,children:r.email}),P.jsxs("button",{onClick:e,className:"logout-btn",children:[P.jsx(uC,{size:12}),P.jsx("span",{children:"Disconnect"})]})]})]}),P.jsxs("div",{className:"sys-status",children:[P.jsx("div",{className:"status-dot"}),P.jsx("span",{children:"Taskforce Online"})]})]}),P.jsxs("div",{className:"sidebar-section",children:[P.jsx("div",{className:"section-title",children:P.jsx("span",{children:"Constellation Units"})}),P.jsx("div",{className:"node-list",children:De.map(A=>{const V=kr[A]||{name:A.toUpperCase(),title:"Unit",color:"#06b6d4"},T=g===A||w===A;return P.jsxs("button",{type:"button",className:`node-item ${T?"active-node":""}`,onClick:()=>C(A),style:{"--node-color":V.color},children:[P.jsx("div",{className:"node-icon-wrapper",children:P.jsx(Ud,{agentKey:A,size:15})}),P.jsxs("div",{className:"node-details",children:[P.jsx("span",{className:"node-name",children:V.name}),P.jsx("span",{className:"node-desc",children:V.title})]}),T&&P.jsx("div",{className:"pulse-indicator"})]},A)})})]})]}),P.jsxs("main",{className:"chat-container",children:[P.jsx(yC,{activeAgent:w,isAssembling:b,onTriggerAssemble:S,onSelectAgent:C}),P.jsxs("div",{className:"chat-history",children:[t.map((A,V)=>{const T=A.content&&typeof A.content=="string"&&A.content.includes("[REVIEW_REQUIRED]");let fe=T?A.content.replace("[REVIEW_REQUIRED]","").trim():A.content;fe&&typeof fe=="string"&&(fe=fe.replace(/<!--\s*<PLAN_DATA>[\s\S]*?<\/PLAN_DATA>\s*-->/g,"").trim());const ze=fe&&typeof fe=="string"&&fe.match(/\[DOWNLOAD:(.+?)\]/),Oe=ze?ze[1]:null;Oe&&(fe=fe.replace(/\[DOWNLOAD:.+?\]/,"").trim());const Ae=kr[A.node]||null,J=A.role==="user",ae=A.role==="error",ee=J?"You":Ae?`${Ae.name}`:A.node?A.node.toUpperCase():"System",O=!J&&Ae?Ae.title:null;return P.jsxs("div",{className:`chat-bubble ${J?"user-bubble":ae?"error-bubble":"agent-bubble"}`,style:Ae?{"--bubble-accent":Ae.color}:{},children:[P.jsxs("div",{className:"bubble-header",children:[P.jsx("div",{className:"bubble-avatar",children:J?P.jsx(Ry,{size:14}):P.jsx(Ud,{agentKey:A.node||"supervisor",size:14})}),P.jsx("span",{className:"bubble-label",children:ee}),O&&P.jsx("span",{className:"bubble-title",children:O})]}),P.jsx("div",{className:"bubble-content",children:fe}),Oe&&P.jsx("div",{className:"bubble-actions",children:P.jsxs("a",{href:`http://localhost:8000/api/download/${Oe}`,download:!0,className:"download-btn",target:"_blank",rel:"noreferrer",children:[P.jsx(oC,{size:14}),P.jsxs("span",{children:["Download ",Oe]})]})}),T&&!h&&P.jsxs("div",{className:"approval-actions",children:[P.jsxs("button",{className:"btn-approve",onClick:()=>{u("approve"),setTimeout(()=>{const $=document.getElementById("btn-send-command");$&&$.click()},50)},children:[P.jsx(cC,{size:14}),P.jsx("span",{children:"Approve Plan"})]}),P.jsxs("button",{className:"btn-reject",onClick:()=>{u("reject"),setTimeout(()=>{const $=document.getElementById("btn-send-command");$&&$.click()},50)},children:[P.jsx(hC,{size:14}),P.jsx("span",{children:"Reject"})]})]})]},A.id||V)}),P.jsx("div",{ref:G})]}),P.jsxs("div",{className:"chat-input-area",children:[P.jsx("div",{className:"input-wrapper",children:P.jsx("input",{type:"text",value:o,onChange:A=>u(A.target.value),onKeyDown:A=>A.key==="Enter"&&D(),placeholder:ye?"Listening to voice input...":"Enter objective or instruction...",disabled:h||b})}),je&&P.jsx("button",{type:"button",className:`mic-btn ${ye?"listening":""}`,onClick:ye?Fe:Ce,title:ye?"Stop listening":"Voice input","aria-label":"Voice input",children:P.jsx(sC,{size:18})}),P.jsxs("button",{id:"btn-send-command",className:"send-btn",onClick:D,disabled:h||!o.trim()||b,"aria-label":"Send command",children:[P.jsx(iC,{size:16}),P.jsx("span",{className:"send-btn-text",children:h?"Running...":"Execute"})]})]})]})]})]}):P.jsx(dC,{})}function vC(){return P.jsx(YR,{children:P.jsx(_C,{})})}_w.createRoot(document.getElementById("root")).render(P.jsx(hw.StrictMode,{children:P.jsx(vC,{})}));
