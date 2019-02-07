/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','./FormattedTextAnchorGenerator','./FormattedTextRenderer',"sap/base/Log","sap/base/security/URLWhitelist","sap/base/security/sanitizeHTML"],function(l,C,F,a,L,U,s){"use strict";var b=l.LinkConversion;var c=C.extend("sap.m.FormattedText",{metadata:{library:"sap.m",properties:{htmlText:{type:"string",group:"Misc",defaultValue:""},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},convertLinksToAnchorTags:{type:"sap.m.LinkConversion",group:"Behavior",defaultValue:b.None},convertedLinksDefaultTarget:{type:"string",group:"Behavior",defaultValue:"_blank"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null}}}});var _={ATTRIBS:{'style':1,'class':1,'a::href':1,'a::target':1},ELEMENTS:{'a':{cssClass:'sapMLnk'},'abbr':1,'blockquote':1,'br':1,'cite':1,'code':1,'em':1,'h1':{cssClass:'sapMTitle sapMTitleStyleH1'},'h2':{cssClass:'sapMTitle sapMTitleStyleH2'},'h3':{cssClass:'sapMTitle sapMTitleStyleH3'},'h4':{cssClass:'sapMTitle sapMTitleStyleH4'},'h5':{cssClass:'sapMTitle sapMTitleStyleH5'},'h6':{cssClass:'sapMTitle sapMTitleStyleH6'},'p':1,'pre':1,'strong':1,'span':1,'u':1,'dl':1,'dt':1,'dd':1,'ol':1,'ul':1,'li':1}},d={ATTRIBS:{'a::href':1,'a::target':1},ELEMENTS:{'a':{cssClass:'sapMLnk'},'em':1,'strong':1,'u':1}};c.prototype._renderingRules=_;c.prototype.init=function(){};function S(t,f){var w;var g,v,h=t==="a";var j=this._renderingRules.ELEMENTS[t].cssClass||"";for(var i=0;i<f.length;i+=2){g=f[i];v=f[i+1];if(!this._renderingRules.ATTRIBS[g]&&!this._renderingRules.ATTRIBS[t+"::"+g]){w='FormattedText: <'+t+'> with attribute ['+g+'="'+v+'"] is not allowed';L.warning(w,this);f[i+1]=null;continue;}if(g=="href"){if(!U.validate(v)){L.warning("FormattedText: incorrect href attribute:"+v,this);f[i+1]="#";h=false;}}if(g=="target"){h=false;}if(j&&g.toLowerCase()=="class"){f[i+1]=j+" "+v;j="";}}if(h){f.push("target");f.push("_blank");}if(j){f.push("class");f.push(j);}return f;}function p(t,f){if(this._renderingRules.ELEMENTS[t]){return S.call(this,t,f);}else{var w='<'+t+'> is not allowed';L.warning(w,this);}}function e(t){return s(t,{tagPolicy:p.bind(this),uriRewriter:function(u){if(U.validate(u)){return u;}}});}function o(E){var n=window.open();n.opener=null;n.location=E.currentTarget.href;E.preventDefault();}c.prototype.onAfterRendering=function(){this.$().find('a[target="_blank"]').on("click",o);};c.prototype._getDisplayHtml=function(){var t=this.getHtmlText(),A=this.getConvertLinksToAnchorTags();if(A===l.LinkConversion.None){return t;}t=F.generateAnchors(t,A,this.getConvertedLinksDefaultTarget());return e.call(this,t);};c.prototype.setHtmlText=function(t){return this.setProperty("htmlText",e.call(this,t));};c.prototype._setUseLimitedRenderingRules=function(f){this._renderingRules=f?d:_;};return c;});
