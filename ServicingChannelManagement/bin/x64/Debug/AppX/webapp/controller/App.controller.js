sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (BaseController, UIComponent) {
    "use strict";

    var Controller = BaseController.extend("be.infrabel.sap.mobile.scm.controller.App", {
    });

    // This method is called upon initialization of the View.
    // It is only called once per View instance.
    Controller.prototype.onInit = function () {
        this._oUIState = this.getOwnerComponent().getModel("fcl");

        this._oAction = this.getOwnerComponent().getModel("action");

        this._oRouter = UIComponent.getRouterFor(this);

        // The 'beforeRouteMatched' event is fired before the corresponding target is loaded and placed.
        this._oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);

        // The 'routeMatched' event is fired, when the current URL hash matches the pattern of a route in this router.
        this._oRouter.attachRouteMatched(this.onRouteMatched, this);
    };

    Controller.prototype.onExit = function () {
        this._oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);

        this._oRouter.detachRouteMatched(this.onRouteMatched, this);
    };

    Controller.prototype.onBeforeRouteMatched = function (oEvent) {
        var sLayout = oEvent.getParameters().arguments.layout;

        if (!sLayout) {
            //Returns an object, describing the state that the control will have 
            //after navigating to a different view level: initial (master only)
            var oNextUIState = this.getOwnerComponent().getFCLSemanticHelper().getNextUIState(0);

            sLayout = oNextUIState.layout;
        }

        if (sLayout) {
            this._oUIState.setProperty("/layout", sLayout);
        }
    };

    Controller.prototype.onRouteMatched = function (oEvent) {
        // The name of the route
        var sRouteName = oEvent.getParameter("name");

        // A key-value pair object which contains the arguments defined in the route resolved 
        // with the corresponding information from the current URL hash.
        var oArguments = oEvent.getParameter("arguments");

        this._oAction.setProperty("/actionId", sRouteName);

        this._updateUIElements();
    };

    // Fired when there is a change in the layout property 
    // or in the maximum number of columns that can be displayed at once.
    Controller.prototype.onStateChange = function (oControlEvent) {
        // Indicates whether the layout changed as a result of the user clicking a layout arrow.
        var bIsNavigationArrow = oControlEvent.getParameter("isNavigationArrow");

        // The value of the layout property.
        var sLayout = oControlEvent.getParameter("layout");

        // The name of the current route.
        var sRouteName = this._oAction.getProperty("/actionId");

        this._updateUIElements();

        // Replace the URL with the new layout if a navigation arrow was used
        if (bIsNavigationArrow) {
            this._oRouter.navTo(sRouteName, {
                layout: sLayout
            }, true);
        }
    };

    Controller.prototype._updateUIElements = function () {
        // Returns an object, describing the current state of the control and the expected action buttons for each column.
        var oCurrentUIState = this.getOwnerComponent().getFCLSemanticHelper().getCurrentUIState();

        this._oUIState.setData(oCurrentUIState);
    };

    return Controller;
});