sap.ui.define([], function() {
    'use strict';
    return {
        abapDate: function (dateStr) {   
            if (!(typeof(dateStr) == "string")) {
                return dateStr;
            }

            var dateParts = dateStr.split("-");
            var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            
            return date;
        }    
    }
});