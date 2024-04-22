/*global QUnit*/

sap.ui.define([
	"ui5staffingapp/controller/ProjectOverview.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ProjectOverview Controller");

	QUnit.test("I should test the ProjectOverview controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
