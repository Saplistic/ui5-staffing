sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/gantt/misc/Utility",
	"sap/gantt/simple/Relationship",
	"sap/ui/core/Core"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("ui5staffingapp.controller.ProjectOverview", {
            onInit: function () {},

            onShapeResize: function(oEvent) {
                var oShape = oEvent.getParameter("shape");
                var aNewTime = oEvent.getParameter("newTime");
                var sBindingPath = oShape.getBindingContext("projectAssignment").getPath();

                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" });

                oShape.getBindingContext("projectAssignment").setProperty(sBindingPath + "/DateStarted", dateFormat.format(aNewTime[0]));
                oShape.getBindingContext("projectAssignment").setProperty(sBindingPath + "/DateEnded", dateFormat.format(aNewTime[1]));
            },
        });
    });
