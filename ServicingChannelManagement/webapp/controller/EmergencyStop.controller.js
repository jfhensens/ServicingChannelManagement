sap.ui.define([
    "be/infrabel/sap/mobile/scm/controller/Detail"
], function (DetailController) {
    "use strict";

    var Controller = DetailController.extend("be.infrabel.sap.mobile.scm.controller.EmergencyStop", {
        constructor: function () {
            DetailController.prototype.constructor.apply(this, arguments);
        }
    });

    Controller.prototype.onInit = function () {
        DetailController.prototype.onInit.apply(this, arguments);
    };

    return Controller;
});