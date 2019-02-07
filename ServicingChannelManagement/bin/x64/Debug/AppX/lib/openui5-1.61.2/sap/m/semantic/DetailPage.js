/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/semantic/ShareMenuPage","sap/m/semantic/SemanticConfiguration","sap/m/semantic/SemanticPageRenderer","sap/m/library"],function(S,a,b,l){"use strict";var c=l.semantic.SemanticRuleSetType;var D=S.extend("sap.m.semantic.DetailPage",{metadata:{library:"sap.m",aggregations:{addAction:{type:"sap.m.semantic.AddAction",multiple:false},mainAction:{type:"sap.m.semantic.MainAction",multiple:false},positiveAction:{type:"sap.m.semantic.PositiveAction",multiple:false},negativeAction:{type:"sap.m.semantic.NegativeAction",multiple:false},forwardAction:{type:"sap.m.semantic.ForwardAction",multiple:false},editAction:{type:"sap.m.semantic.EditAction",multiple:false},saveAction:{type:"sap.m.semantic.SaveAction",multiple:false},deleteAction:{type:"sap.m.semantic.DeleteAction",multiple:false},cancelAction:{type:"sap.m.semantic.CancelAction",multiple:false},flagAction:{type:"sap.m.semantic.FlagAction",multiple:false},favoriteAction:{type:"sap.m.semantic.FavoriteAction",multiple:false},openInAction:{type:"sap.m.semantic.OpenInAction",multiple:false},discussInJamAction:{type:"sap.m.semantic.DiscussInJamAction",multiple:false},shareInJamAction:{type:"sap.m.semantic.ShareInJamAction",multiple:false},sendEmailAction:{type:"sap.m.semantic.SendEmailAction",multiple:false},sendMessageAction:{type:"sap.m.semantic.SendMessageAction",multiple:false},printAction:{type:"sap.m.semantic.PrintAction",multiple:false},messagesIndicator:{type:"sap.m.semantic.MessagesIndicator",multiple:false},saveAsTileAction:{type:"sap.m.Button",multiple:false},pagingAction:{type:"sap.m.PagingButton",multiple:false},draftIndicator:{type:"sap.m.DraftIndicator",multiple:false}},dnd:{draggable:false,droppable:true},designtime:"sap/m/designtime/semantic/DetailPage.designtime"},renderer:b.render});D.prototype.init=function(){S.prototype.init.call(this);this._getPage().getLandmarkInfo().setRootLabel(sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("SEMANTIC_DETAIL_PAGE_TITLE"));};D.prototype.setAggregation=function(A,o,s){if((A==="saveAsTileAction")||(A==="pagingAction")||(A==="draftIndicator")){var p='_'+A;if(o){this._addToInnerAggregation(o,a.getPositionInPage(A),a.getSequenceOrderIndex(A),s);this[p]=o;}else{if(this[p]){this._removeFromInnerAggregation(this[p],a.getPositionInPage(A),s);this[p]=null;}}return this;}return S.prototype.setAggregation.call(this,A,o,s);};D.prototype.getAggregation=function(A,o,s){if((A==="saveAsTileAction")||(A==="pagingAction")||(A==="draftIndicator")){return this['_'+A];}return S.prototype.getAggregation.call(this,A,o,s);};D.prototype.destroyAggregation=function(A,s){if((A==="saveAsTileAction")||(A==="pagingAction")||(A==="draftIndicator")){var p='_'+A;if(this[p]){this._removeFromInnerAggregation(this[p],a.getPositionInPage(A),s);this[p].destroy();this[p]=null;}return this;}return S.prototype.destroyAggregation.call(this,A,s);};D.prototype.getSemanticRuleSet=function(){return c.Classic;};return D;});
