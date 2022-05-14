$(document).ready(function() {

	$("#alertSuccess").hide();
	$("#alertError").hide();

});

function validateItemForm() {
	// CODE
	if ($("#customerName").val() == "") {
		return "Insert Customer Name.";
	}

	// PRICE-------------------------------
	if ($("#customerAddress").val() == "") {
		return "Insert Customer Address.";
	}
	if ($("#complainDate").val() == "") {
		return "Insert Customer Complain Date.";
	}
	if ($("#issue").val().trim() == "") {
		return "Insert Customer issue.";
	}
	if ($("#status").val().trim() == "") {
		return "Insert Customer status.";
	}
	if ($("#remark").val() == "") {
		return "Insert Customer remark.";
	}

	return true;

}

//Save Func
function onComplainSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidCustomerIDSave").val("");
	$("#formBill")[0].reset();
}


// Save Btn
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------  
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------  
	var status = validateItemForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------  
	var type = ($("#hidCustomerIDSave").val() == "") ? "POST" : "PUT";

	$.ajax(
		{
			url: "ComplainServlet",
			type: type,
			data: $("#formBill").serialize(),
			dataType: "text",
			complete: function(response, status) {
				onComplainSaveComplete(response.responseText, status);
			}
		});
});


// UPDATE CLICK
$(document).on("click", ".btnUpdate", function(event) {
	$("#hidCustomerIDSave").val($(this).closest("tr").find('#hidCustomerIDUpdate').val());
	$("#customerName").val($(this).closest("tr").find('td:eq(0)').text());
	$("#customerAddress").val($(this).closest("tr").find('td:eq(1)').text());
	$("#complainDate").val($(this).closest("tr").find('td:eq(2)').text());
	$("#issue").val($(this).closest("tr").find('td:eq(3)').text());
	$("#status").val($(this).closest("tr").find('td:eq(4)').text());
	$("#remarks").val($(this).closest("tr").find('td:eq(5)').text());
});


//Delete Func
function onItemDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}


// DELETE Click
$(document).on("click", ".btnRemove", function(event) {
	$.ajax(
		{
			url: "ComplainServlet",
			type: "DELETE",
			data: "complainID=" + $(this).data("customid"),
			dataType: "text",
			complete: function(response, status) {
				onItemDeleteComplete(response.responseText, status);
			}
		});
});
