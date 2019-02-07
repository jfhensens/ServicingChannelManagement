sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (BaseController, UIComponent) {
    "use strict";

    var Controller = BaseController.extend("be.infrabel.sap.mobile.scm.controller.Master", {
    });

    // This method is called upon initialization of the View.
    // It is only called once per View instance.
    Controller.prototype.onInit = function () {
        this._oRouter = UIComponent.getRouterFor(this);
    };

    Controller.prototype.closeApp = function (oControlEvent) {
        window.close();
    };

    Controller.prototype.onToolSelected = function (oControlEvent) {
        var oActionListItem = oControlEvent.getParameter("listItem");

        var sActionId = this.getView().getLocalId(oActionListItem.getId());

        this._oRouter.navTo(sActionId, {
            layout: sap.f.LayoutType.TwoColumnsMidExpanded
        });


    };

    return Controller;
});