sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/core/format/DateFormat"
], function (BaseObject, DateFormat) {
    "use strict";

    var Formatter = BaseObject.extend("be.infrabel.sap.mobile.workmanager.apps.myTest.TimeConfirmation.model.Formatter", {
        constructor: function () {
            BaseObject.prototype.constructor.apply(this, arguments);
        }
    });

    Formatter.prototype.formatDate = function (sDate) {
        if (sDate) {
            var oDate = new Date(sDate);

            var sPattern = "dd/MM/YYYY, HH:mm:ss";

            return DateFormat.getDateTimeInstance({
                pattern: sPattern
            }).format(oDate);
        }
    };

    return Formatter;
});