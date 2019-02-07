/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/library','sap/ui/core/Control','sap/ui/model/type/Date','sap/ui/model/odata/type/ODataType','sap/ui/core/format/DateFormat','./TimePickerSlidersRenderer','./TimePickerSlider','./VisibleItem','sap/ui/core/LocaleData','sap/ui/Device','sap/ui/core/Locale','./TimePickerSlidersRenderer',"sap/ui/thirdparty/jquery"],function(c,C,S,O,D,a,T,V,L,b,d,e,q){"use strict";var f=1,g=c.CalendarType;var h=C.extend("sap.m.TimePickerSliders",{metadata:{library:"sap.m",properties:{localeId:{type:"string",group:"Data"},displayFormat:{name:"displayFormat",type:"string",group:"Appearance"},labelText:{name:"labelText",type:"string"},minutesStep:{type:"int",group:"Misc",defaultValue:f},secondsStep:{type:"int",group:"Misc",defaultValue:f},width:{type:"sap.ui.core.CSSSize",group:"Appearance"},height:{type:"sap.ui.core.CSSSize",group:"Appearance"},value:{type:"string",group:"Data",defaultValue:null},valueFormat:{type:"string",group:"Data",defaultValue:null},support2400:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{_columns:{type:"sap.m.TimePickerSlider",multiple:true,visibility:"hidden"}},events:{change:{parameters:{value:{type:"string"}}}}}});h.prototype.init=function(){var l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale(),o=L.getInstance(l),p=o.getDayPeriods("abbreviated"),i=o.getTimePattern("medium");this._fnLayoutChanged=q.proxy(this._onOrientationChanged,this);b.resize.attachHandler(this._fnLayoutChanged);this._sAM=p[0];this._sPM=p[1];this._onSliderExpanded=this._onSliderExpanded.bind(this);this._onSliderCollapsed=this._onSliderCollapsed.bind(this);this.setDisplayFormat(i);this._setTimeValues();this._iMinutes;this._iSeconds;};h.prototype.exit=function(){this.$().off(!!b.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel);b.resize.detachHandler(this._fnOrientationChanged);};h.prototype.onAfterRendering=function(){this.$().off(!!b.browser.firefox?"DOMMouseScroll":"mousewheel",this._onmousewheel);this.$().on(!!b.browser.firefox?"DOMMouseScroll":"mousewheel",q.proxy(this._onmousewheel,this));this.$().on('selectstart',F);if(!b.browser.msie&&this._getShouldOpenSliderAfterRendering()){if(b.system.desktop){this._getFirstSlider().setIsExpanded(true);}}};h.prototype.setLocaleId=function(l){var o,p;l=this.validateProperty("localeId",l);this.setProperty("localeId",l,true);if(l){o=new d(l);p=L.getInstance(o).getDayPeriods("abbreviated");this._sAM=p[0];this._sPM=p[1];this._destroyColumns();this._setupLists();}return this;};h.prototype.setSupport2400=function(i){this.setProperty("support2400",i,true);this._destroyColumns();this._setupLists();return this;};h.prototype.setDisplayFormat=function(i){this.setProperty("displayFormat",i,true);this._destroyColumns();this._setupLists();return this;};h.prototype.setLabelText=function(l){var $;this.setProperty("labelText",l,true);if(!b.system.desktop){$=q(this.getDomRef("label"));if($){$.html(l);}}return this;};h.prototype.setMinutesStep=function(v){v=Math.max(f,v||f);this.setProperty("minutesStep",v,true);this._destroyColumns();this._setupLists();return this;};h.prototype.setSecondsStep=function(v){v=Math.max(f,v||f);this.setProperty("secondsStep",v,true);this._destroyColumns();this._setupLists();return this;};h.prototype.setWidth=function(w){this.setProperty("width",w,true);this.$().css("width",w);return this;};h.prototype.setHeight=function(H){this.setProperty("height",H,true);this.$().css("height",H);return this;};h.prototype.setValue=function(v){var H=this._getHoursSlider(),i=this._getValueFormatPattern(),I=i.indexOf("HH"),j=i.indexOf("H"),k=H&&H.getSelectedValue()==="24",l=h._isHoursValue24(v,I,j);if(k&&this._isFormatSupport24()&&!l){v=h._replaceZeroHoursWith24(v,I,j);}v=this.validateProperty("value",v);this.setProperty("value",v,true);var o;if(v){o=this._parseValue(l?h._replace24HoursWithZero(v,I,j):v);}if(o){this._setTimeValues(o,l);}return this;};h.prototype.getTimeValues=function(){var H=this._getHoursSlider(),m=this._getMinutesSlider(),o=this._getSecondsSlider(),i=this._getFormatSlider(),j=null,A=null,k=new Date();if(H){j=parseInt(H.getSelectedValue());}if(i){A=i.getSelectedValue();}if(A==="am"&&j===12){j=0;}else if(A==="pm"&&j!==12){j+=12;}if(j!==null){k.setHours(j.toString());}if(m){k.setMinutes(m.getSelectedValue());}if(o){k.setSeconds(o.getSelectedValue());}return k;};h.prototype.collapseAll=function(){var i=this.getAggregation("_columns");if(i){for(var I=0;I<i.length;I++){if(i[I].getIsExpanded()){i[I].setIsExpanded(false);}}}return this;};h.prototype.openFirstSlider=function(){var o=this._getFirstSlider();o.setIsExpanded(true);o.focus();return this;};h.prototype._setTimeValues=function(o,H){var i=this._getHoursSlider(),m=this._getMinutesSlider(),j=this._getSecondsSlider(),k=this._getFormatSlider(),l,A=null;o=o||new Date();if(o&&q.type(o)!=="date"){throw new Error("Date must be a JavaScript date object; "+this);}if(!H){var v=this._formatValue(o,true);this.setProperty("value",v,true);l=o.getHours();}else{l=24;}if(k){A=l>=12?"pm":"am";l=(l>12)?l-12:l;l=(l===0?12:l);}i&&i.setSelectedValue(l.toString());m&&m._updateStepAndValue(o.getMinutes(),this.getMinutesStep());j&&j._updateStepAndValue(o.getSeconds(),this.getSecondsStep());k&&k.setSelectedValue(A);if(H){this._disableSlider(m);m&&m.setSelectedValue("0");this._disableSlider(j);j&&j.setSelectedValue("0");}else{this._enableSlider(m);this._enableSlider(j);}};h.prototype._updateSlidersValues=function(){var i=this.getAggregation("_columns");if(i){for(var I=0;I<i.length;I++){i[I]._updateScroll();}}};h.prototype.onsaphome=function(E){var n=this._getFirstSlider(),o=this._getCurrentSlider();if(o&&document.activeElement===o.getDomRef()&&this._isSliderEnabled(n)){n.focus();}};h.prototype.onsapend=function(E){var n=this._getLastSlider(),o=this._getCurrentSlider();if(o&&document.activeElement===o.getDomRef()&&this._isSliderEnabled(n)){n.focus();}};h.prototype.onsapleft=function(E){var n,o=this._getCurrentSlider(),i=-1,N=-1,j=this.getAggregation("_columns");if(o&&document.activeElement===o.getDomRef()){i=j.indexOf(o);N=i>0?i-1:j.length-1;n=j[N];if(this._isSliderEnabled(n)){n.focus();}}};h.prototype.onsapright=function(E){var n,o=this._getCurrentSlider(),i=-1,N=-1,j=this.getAggregation("_columns");if(o&&document.activeElement===o.getDomRef()){i=j.indexOf(o);N=i<j.length-1?i+1:0;n=j[N];if(this._isSliderEnabled(n)){n.focus();}}};h.prototype._onmousewheel=function(E){var i=this._getCurrentSlider();if(i){i._onmousewheel(E);}};h.prototype._onOrientationChanged=function(){var j=this.getAggregation("_columns");if(!j){return;}for(var i=0;i<j.length;i++){if(j[i].getIsExpanded()){j[i]._updateSelectionFrameLayout();}}};h.prototype._generatePickerListValues=function(i,t,j,l){var v=[],k;for(var I=i;I<=t;I+=1){if(I<10&&l){k="0"+I.toString();}else{k=I.toString();}var o=new V({key:I.toString(),text:k});if(I%j!==0){o.setVisible(false);}v.push(o);}return v;};h.prototype._checkStyle=function(p){return(p==="short"||p==="medium"||p==="long"||p==="full");};h.prototype._getDisplayFormatPattern=function(){var p=this.getDisplayFormat();if(this._checkStyle(p)){p=this._getLocaleBasedPattern(p);}return p;};h.prototype._getValueFormatPattern=function(){var p=this._getBoundValueTypePattern()||this.getValueFormat()||"medium";if(this._checkStyle(p)){p=this._getLocaleBasedPattern(p);}return p;};h.prototype._getLocaleBasedPattern=function(p){return L.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()).getTimePattern(p);};h.prototype._destroyColumns=function(){var i=this.getAggregation("_columns");if(i){this.destroyAggregation("_columns");}};h.prototype._setupLists=function(){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m"),l=r.getText("TIMEPICKER_LBL_HOURS"),i=r.getText("TIMEPICKER_LBL_MINUTES"),j=r.getText("TIMEPICKER_LBL_SECONDS"),k=r.getText("TIMEPICKER_LBL_AMPM"),m=this.getMinutesStep(),n=this.getSecondsStep(),o=this._getDisplayFormatPattern();if(o===undefined){return;}var H=false,p=false,t,u;if(o.indexOf("HH")!==-1){H=true;t=0;u=this.getSupport2400()?24:23;p=true;}else if(o.indexOf("H")!==-1){H=true;t=0;u=this.getSupport2400()?24:23;}else if(o.indexOf("hh")!==-1){H=true;t=1;u=12;p=true;}else if(o.indexOf("h")!==-1){H=true;t=1;u=12;}if(H){this.addAggregation("_columns",new T(this.getId()+"-listHours",{items:this._generatePickerListValues(t,u,1,p),expanded:this._onSliderExpanded,collapsed:this._onSliderCollapsed,label:l}).attachEvent("_selectedValueChange",this._handleHoursChange,this));}if(o.indexOf("m")!==-1){var v=this._generatePickerListValues(0,59,m,true);this.addAggregation("_columns",new T(this.getId()+"-listMins",{items:v,expanded:this._onSliderExpanded,collapsed:this._onSliderCollapsed,label:i}));}if(o.indexOf("s")!==-1){var v=this._generatePickerListValues(0,59,n,true);this.addAggregation("_columns",new T(this.getId()+"-listSecs",{items:v,expanded:this._onSliderExpanded,collapsed:this._onSliderCollapsed,label:j}));}if(o.indexOf("a")!==-1){this.addAggregation("_columns",new T(this.getId()+"-listFormat",{items:[{key:"am",text:this._sAM},{key:"pm",text:this._sPM}],expanded:this._onSliderExpanded,collapsed:this._onSliderCollapsed,label:k,isCyclic:false}).addStyleClass("sapMTimePickerSliderShort"));}var w,x=this.getValue();if(x){w=this._parseValue(x);}if(w){this._setTimeValues(w);}};h.prototype._getCurrentSlider=function(){var j=this.getAggregation("_columns");if(j){for(var i=0;i<j.length;i++){if(j[i].getIsExpanded()){return j[i];}}}return null;};h.prototype._getHoursSlider=function(){return sap.ui.getCore().byId(this.getId()+"-listHours")||null;};h.prototype._getMinutesSlider=function(){return sap.ui.getCore().byId(this.getId()+"-listMins")||null;};h.prototype._getSecondsSlider=function(){return sap.ui.getCore().byId(this.getId()+"-listSecs")||null;};h.prototype._getFormatSlider=function(){return sap.ui.getCore().byId(this.getId()+"-listFormat")||null;};h.prototype._getFirstSlider=function(){return this.getAggregation("_columns")[0]||null;};h.prototype._getLastSlider=function(){var i=this.getAggregation("_columns");return i[i.length-1]||null;};h.prototype._parseValue=function(v){return this._getFormatter().parse(v);};h.prototype._isSliderEnabled=function(o){return o._getEnabled();};h.prototype._getFormatter=function(){var p=this._getBoundValueTypePattern(),r=false,B=this.getBinding("value"),i;if(B&&B.oType&&B.oType.oOutputFormat){r=!!B.oType.oOutputFormat.oFormatOptions.relative;i=B.oType.oOutputFormat.oFormatOptions.calendarType;}if(!p){p=this.getValueFormat()||"medium";i=g.Gregorian;}if(!i){i=sap.ui.getCore().getConfiguration().getCalendarType();}return this._getFormatterInstance(p,r,i);};h.prototype._getBoundValueTypePattern=function(){var B=this.getBinding("value"),o=B&&B.getType&&B.getType();if(o instanceof S){return o.getOutputPattern();}if(o instanceof O&&o.oFormat){return o.oFormat.oFormatOptions.pattern;}return undefined;};h.prototype._getFormatterInstance=function(p,r,i,j){var o;if(this._checkStyle(p)){o=this._getFormatInstance({style:p,strictParsing:true,relative:r,calendarType:i});}else{o=this._getFormatInstance({pattern:p,strictParsing:true,relative:r,calendarType:i});}return o;};h.prototype._getFormatInstance=function(A,i){return D.getTimeInstance(A);};h.prototype._formatValue=function(o){if(o){return this._getFormatter().format(o);}return"";};h.prototype._onSliderExpanded=function(E){var j=this.getAggregation("_columns");for(var i=0;i<j.length;i++){if(j[i]!==E.oSource&&j[i].getIsExpanded()){j[i].setIsExpanded(false);}}};h.prototype._onSliderCollapsed=function(E){var o=this.getTimeValues();this.setValue(this._formatValue(o,true));this.fireChange({value:this.getValue()});};h.prototype._getShouldOpenSliderAfterRendering=function(){return this._shouldOpenSliderAfterRendering;};h.prototype._setShouldOpenSliderAfterRendering=function(i){this._shouldOpenSliderAfterRendering=i;return this;};h.prototype._isFormatSupport24=function(){var i=this._getDisplayFormatPattern();return i.indexOf("HH")!==-1||i.indexOf("H")!==-1;};h.prototype._disableSlider=function(o){if(o){o._setEnabled(false);}return this;};h.prototype._enableSlider=function(o){if(o){o._setEnabled(true);}return this;};h.prototype._handleHoursChange=function(E){var v=E.getParameter("value"),m=this._getMinutesSlider(),o=this._getSecondsSlider();if(this.getSupport2400()){if(v==="24"){if(m&&m._getEnabled()){this._iMinutes=m.getSelectedValue();this._disableSlider(m);m.setSelectedValue("0");}if(o&&o._getEnabled()){this._iSeconds=o.getSelectedValue();this._disableSlider(o);o.setSelectedValue("0");}}else{if(m&&!m._getEnabled()){this._enableSlider(m);m.setSelectedValue(this._iMinutes);}if(o&&!o._getEnabled()){this._enableSlider(o);o.setSelectedValue(this._iSeconds);}}}};h._replaceZeroHoursWith24=function(v,i,I){var H=2,j=i;if(i===-1){H=1;j=I;}return v.substr(0,j)+"24"+v.substr(j+H);};h._replace24HoursWithZero=function(v,i,I){var H=2,j=i;if(i===-1){H=1;j=I;}return v.substr(0,j)+s(0,H)+v.substr(j+2);};h._isHoursValue24=function(v,i,I){if(i===-1&&I===-1){return false;}var j=i;if(i===-1){j=I;}return v.substr(j,2)==="24";};function s(j,k){var r="";for(var i=0;i<k;i++){r+=j;}return r;}function F(){return false;}return h;});
