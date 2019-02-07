/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','./View','./JSViewRenderer','sap/base/util/merge','sap/ui/base/ManagedObject','sap/ui/core/library','sap/base/Log'],function(q,V,J,m,M,l,L){"use strict";var a=V.extend("sap.ui.core.mvc.JSView",{metadata:{library:"sap.ui.core"}});var r={};a.asyncSupport=true;var b=l.mvc.ViewType;a.create=function(o){var p=m({},o);for(var O in p){if(O==='definition'||O==='preprocessors'){delete p[O];L.warning("JSView.create does not support the options definition or preprocessor!");}}p.type=b.JS;return V.create(p);};sap.ui.jsview=function(i,c,A){var f=function(s){L[s]("Do not use deprecated view factory functions."+"Use the static create function on the specific view module instead: [XML|JS|HTML|JSON]View.create().","sap.ui.view",null,function(){return{type:"sap.ui.view",name:i||(c&&c.name)};});};if(c&&c.async){f("info");}else{f("warning");}return v.apply(this,arguments);};function v(i,c,A){var s={},o;if(c&&typeof(c)=="string"){s.viewName=c;if(typeof arguments[2]=="boolean"){s.async=A;}else if(typeof arguments[2]=="object"){s.controller=arguments[2];s.async=!!arguments[3];}o=new a(i,s);return o;}else if(c&&typeof(c)=="object"){r[i]=c;sap.ui.loader._.declareModule(i.replace(/\./g,"/")+".view.js");L.info("For defining views use JSView.extend instead.");}else if(arguments.length==1&&typeof i=="string"||arguments.length==2&&typeof arguments[0]=="string"&&typeof arguments[1]=="boolean"){s.viewName=arguments[0];s.async=!!arguments[1];o=s.id?new a(s.id,s):new a(s);return o;}else{throw new Error("Wrong arguments ('"+i+"', '"+c+"')! Either call sap.ui.jsview([sId,] sViewName) to instantiate a View or sap.ui.jsview(sViewName, oViewImpl) to define a View type.");}}a.prototype.initViewSettings=function(s){var p;if(!r[s.viewName]){var c=s.viewName.replace(/\./g,"/")+".view";if(s.async){p=new Promise(function(d){sap.ui.require([c],d);});}else{sap.ui.requireSync(c);}}if(s.async){return Promise.resolve(p).then(function(){q.extend(this,r[s.viewName]);}.bind(this));}q.extend(this,r[s.viewName]);};a.prototype.onControllerConnected=function(c){M.runWithPreprocessors(function(){this.applySettings({content:this.createContent(c)});},{id:this.getAutoPrefixId()?this.createId.bind(this):undefined,settings:this._fnSettingsPreprocessor},this);};a.prototype.getAutoPrefixId=function(){return false;};return a;});
