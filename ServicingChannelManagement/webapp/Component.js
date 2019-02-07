sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/f/FlexibleColumnLayoutSemanticHelper"
], function (BaseUIComponent, JSONModel, FCLSemanticHelper) {
    "use strict";

    var Component = BaseUIComponent.extend("be.infrabel.sap.mobile.scm.Component", {
        metadata: {
            manifest: "json"
        }
    });

    // Initializes the Component instance after creation.
    Component.prototype.init = function () {
        BaseUIComponent.prototype.init.apply(this, arguments);

        this.setModel(new JSONModel(), "fcl");

        this.setModel(new JSONModel(), "action");

        this.setModel(new JSONModel(), "user");

        // Returns the reference to the router instance which has been created by the UIComponent.
        // Attaches the router to the hash changer.
        this._oRouter = this.getRouter().initialize();

        Windows.System.User.findAllAsync(Windows.System.UserType.localUser, Windows.System.UserAuthenticationStatus.locallyAuthenticated)
            .done(function (aUsers) {
                if (aUsers.length > 0) {
                    aUsers[0].getPropertyAsync(Windows.System.KnownUserProperties.domainName)
                        .done(function (sDomainName) {
                            this.getModel("user").setProperty("/domainName", sDomainName);
                        }.bind(this));
                }
            }.bind(this));
    };

    Component.prototype.getFCLSemanticHelper = function () {
        // getRootControl() gets the instance of the root view.
        var oFlexibleColumnLayout = this.getRootControl().byId("fcl");

        var oUriParameters = jQuery.sap.getUriParameters();

        var oSettings = {
            // Determines whether a single-column or a 2-column layout will be suggested for logical level 0.
            initialColumnsCount: oUriParameters.get("initial"),
            // Determines the maximum number of columns that will be displayed side by side.
            maxColumnsCount: oUriParameters.get("max"),
            // Determines what two-column layout type will be suggested by default
            defaultTwoColumnLayout: sap.f.LayoutType.TwoColumnsMidExpanded,
            // Determines what three-column layout type will be suggested by default
            defaultThreeColumnLayoutType: sap.f.LayoutType.ThreeColumnsEndExpanded
        };

        return FCLSemanticHelper.getInstanceFor(oFlexibleColumnLayout, oSettings);
    };

    return Component;
});