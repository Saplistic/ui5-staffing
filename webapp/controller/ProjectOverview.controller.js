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

        getODataPath: function(oContext) {
            var sODataPath = "/WorkPeriods(Id=" + oContext.Id + ",ProjectAssignmentId=" + oContext.ProjectAssignmentId + ",ProjectId=" + oContext.ProjectId + ",IsActiveEntity=true)";
            return sODataPath;
        },
        

        onShapeResize: function(oEvent) {
            var oShape = oEvent.getParameter("shape");
            var aNewTime = oEvent.getParameter("newTime");
            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" });
            
            var oStaffingDataModel = this.getView().getModel("staffingData");
            var sBindingPath = oShape.getBindingContext("GanttProjectData").getPath();
            var oObject = this.getView().getModel("GanttProjectData").getProperty(sBindingPath);
            var oBinding = oStaffingDataModel.bindContext(this.getODataPath(oObject));

            oBinding.getBoundContext().setProperty("DateStarted", dateFormat.format(aNewTime[0]));
            oBinding.getBoundContext().setProperty("DateEnded", dateFormat.format(aNewTime[1]));
            
            // console.log(oBinding.getObject()); 

            //TODO only update frontend (code below) after update is successful
            var oDataModel = this.getView().byId("ganttTable").getModel("GanttProjectData");

            oDataModel.setProperty(sBindingPath + "/DateStarted", dateFormat.format(aNewTime[0]), false);
            oDataModel.setProperty(sBindingPath + "/DateEnded", dateFormat.format(aNewTime[1]), false);
        }
        
    });
});
