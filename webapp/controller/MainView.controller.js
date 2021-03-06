sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.kpmg.exercise5.controller.MainView", {
		onInit: function () {

		},
		oDataCall: function (oEvent) {
			// call oData service's function based on which button is clicked.
			debugger;
			var myModel = this.getView().getModel("userModel");
			// CREATE******************
			if ('Create' == oEvent.oSource.mProperties.text) {
				var obj = {};
				obj.Id = this.getView().byId("uniqueid").getValue();
				obj.Name = this.getView().byId("nameid").getValue();
				obj.Email = this.getView().byId("emailid").getValue();
				obj.Mobile = this.getView().byId("mobid").getValue();
				myModel.create('/userdataSet', obj, {
					success: function (oData, oResponse) {

					},
					error: function (err, oResponse) {
				
					}
				});
			}
			// READ******************
			else if ('Read' == oEvent.oSource.mProperties.text) {
				debugger;
				var readurl = "/userdataSet('" + this.getView().byId("uniqueid").getValue() + "')";
				var tab = this.getView().byId("userdatatable");
				myModel.read(readurl, {
					success: function (oData, oResponse) {
						debugger;
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results
						});
						tab.setModel(userdata);
						debugger;
						var i = 0;
						tab.bindAggregation("items", {
							path: "userdata>/Result",
							template: new sap.m.ColumnListItem({
								cells: [new sap.ui.commons.TextView({
									text: "{userdata>Id}",
									design: "H5",
									semanticColor: "Default"
								}), new sap.ui.commons.TextView({
									text: "{userdata>Name}",
									design: "H5",
									semanticColor: "Positive"
								}), new sap.ui.commons.TextView({
									text: "{userdata>Email}",
									design: "H5",
									semanticColor: "Positive"
								}), new sap.ui.commons.TextView({
									text: "{userdata>Mobile}",
									design: "H5",
									semanticColor: "Positive"
								}), ]
							})
						});
					},
					error: function (err) {
						debugger;
					}
				});
			}
			// UPDATE******************
			if ('Update' == oEvent.oSource.mProperties.text) {
				var updateobj = {};
				updateobj.Id = this.getView().byId("uniqueid").getValue();
				updateobj.Name = this.getView().byId("nameid").getValue();
				updateobj.Email = this.getView().byId("emailid").getValue();
				updateobj.Mobile = this.getView().byId("mobid").getValue();
				var updateurl = "/userdataSet(Id='" + this.getView().byId("uniqueid").getValue() + "')";
				
				myModel.update(updateurl, updateobj, {
					success: function (oData, oResponse) {
						alert("Record Updated Successfully...");
					},
					error: function (err, oResponse) {
							
					}
				});
			}
			// DELETE******************
			if ('Delete' == oEvent.oSource.mProperties.text) {
				var delurl = "/userdataSet(Id='" + this.getView().byId("uniqueid").getValue() + "')";
				myModel.remove(delurl, {
					success: function (oData, oResponse) {

					},
					error: function (err, oResponse) {
					
					}
				});
			}
		}
	});
});