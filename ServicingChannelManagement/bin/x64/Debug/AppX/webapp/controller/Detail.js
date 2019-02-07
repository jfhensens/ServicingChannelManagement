sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "be/infrabel/sap/mobile/scm/model/Formatter"
], function (BaseController, UIComponent, Formatter) {
    "use strict";

    var Controller = BaseController.extend("be.infrabel.sap.mobile.scm.controller.Detail", {
        constructor: function () {
            this.formatter = new Formatter();
        }
    });

    // This method is called upon initialization of the View.
    // It is only called once per View instance.
    Controller.prototype.onInit = function () {
        this._oRouter = UIComponent.getRouterFor(this);

        this._oUIState = this.getOwnerComponent().getModel("fcl");

        this._oAction = this.getOwnerComponent().getModel("action");
    };

    Controller.prototype.handleSwitchToFullScreenMode = function (oControlEvent) {
        var sRouteName = this._oAction.getProperty("/actionId");

        var sNextLayout = this._oUIState.getProperty("/actionButtonsInfo/midColumn/fullScreen");

        this._oRouter.navTo(sRouteName, {
            layout: sNextLayout
        });
    };

    Controller.prototype.handleExitFullScreenMode = function (oControlEvent) {
        var sRouteName = this._oAction.getProperty("/actionId");

        var sNextLayout = this._oUIState.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");

        this._oRouter.navTo(sRouteName, {
            layout: sNextLayout
        });
    };

    Controller.prototype.handleCloseColumn = function (oControlEvent) {
        var sNextLayout = this._oUIState.getProperty("/actionButtonsInfo/midColumn/closeColumn");

        this._oRouter.navTo("home", {
            layout: sNextLayout
        });
    };

    return Controller;
});