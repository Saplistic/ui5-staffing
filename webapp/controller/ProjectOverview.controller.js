sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
	"sap/gantt/misc/Utility",
	"sap/gantt/simple/Relationship",
	"sap/ui/core/Core"
],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
function (Controller, JSONModel, formatter) {
    "use strict";

    return Controller.extend("ui5staffingapp.controller.ProjectOverview", {
        formatter: formatter,
        onInit: function () {
            var oModel = this.getOwnerComponent().getModel("staffingData");
            var oListBinding = oModel.bindList("/Projects", undefined, undefined, undefined, {
                $expand: "_ProjectAssignments($expand=_WorkPeriods,_Person)"
            });
            oListBinding.getContexts();

            var that = this;
            oListBinding.attachEventOnce("change", function (oEvent) {
                var aContexts = oListBinding.getContexts(), oData = {
                    Projects:aContexts.map(oContext => oContext.getObject())
                };
                
                var oModel = new JSONModel(oData);
                that.getView().setModel(oModel, "GanttProjectData");
                // console.log(oData.Projects);
            });
        },

        onShapeResize: function(oEvent) {}

    });
});
