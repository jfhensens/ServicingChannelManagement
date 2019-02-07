/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','./library','sap/ui/Device','./CalendarLegendRenderer',"sap/base/Log","sap/ui/thirdparty/jquery"],function(C,l,D,a,L,q){"use strict";var b=l.CalendarDayType;var S=l.StandardCalendarLegendItem;var c=C.extend("sap.ui.unified.CalendarLegend",{metadata:{library:"sap.ui.unified",properties:{standardItems:{type:"string[]",group:"Misc",defaultValue:['Today','Selected','WorkingDay','NonWorkingDay']},columnWidth:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'120px'}},aggregations:{items:{type:"sap.ui.unified.CalendarLegendItem",multiple:true,singularName:"item"},_standardItems:{type:"sap.ui.unified.CalendarLegendItem",multiple:true,visibility:"hidden"}},designtime:"sap/ui/unified/designtime/CalendarLegend.designtime"},constructor:function(i,s){C.prototype.constructor.apply(this,arguments);if(typeof i!=="string"){s=i;}if(!s||(s&&!s.standardItems)){this._addStandardItems(this.getStandardItems());}}});c.prototype.setStandardItems=function(v){var i;if(v&&v.length===1&&v[0]===""){v=[];}if(v&&v.length){v=this.validateProperty("standardItems",v);for(i=0;i<v.length;i++){if(!S[v[i]]){throw new Error("Invalid value '"+v[i]+"'. Property standardItems must contain values from sap.ui.unified.StandardCalendarLegendItem.");}}}this.setProperty("standardItems",v);this._addStandardItems(this.getStandardItems(),true);return this;};c.prototype._addStandardItems=function(s,r){var i,d=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified"),I=this.getId();if(r){this.destroyAggregation("_standardItems");}for(i=0;i<s.length;i++){var o=new sap.ui.unified.CalendarLegendItem(I+"-"+s[i],{text:d.getText(c._Standard_Items_TextKeys[s[i]])});this.addAggregation("_standardItems",o);}};c._Standard_Items_TextKeys={"Today":"LEGEND_TODAY","Selected":"LEGEND_SELECTED","WorkingDay":"LEGEND_NORMAL_DAY","NonWorkingDay":"LEGEND_NON_WORKING_DAY"};c.prototype._getItemType=function(i,I){var t=i.getType(),n,f;if(t&&t!==b.None){return t;}f=this._getUnusedItemTypes(I);n=I.filter(function(d){return!d.getType()||d.getType()===b.None;}).indexOf(i);if(n<0){L.error('Legend item is not in the legend',this);return t;}if(f[n]){t=f[n];}else{t="Type"+(Object.keys(b).length+n-f.length-1);}return t;};c.prototype._getItemByType=function(t){var I,d=this.getItems(),i;for(i=0;i<d.length;i++){if(this._getItemType(d[i],d)===t){I=d[i];break;}}return I;};c.prototype._getUnusedItemTypes=function(I){var f=q.extend({},b),t,i;delete f[b.None];delete f[b.NonWorking];for(i=0;i<I.length;i++){t=I[i].getType();if(f[t]){delete f[t];}}return Object.keys(f);};return c;});
