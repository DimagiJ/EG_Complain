<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@page import="com.Complain"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Complain details</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.4.1.min.js"></script>
<script src="Components/main.js"></script>
</head>
<body>

	<div class="container">
		<div class="card">
			<div class="card-header bg-info text-light d-flex align-items-center">
				<h1>Complain Details</h1>
			</div>
			<div class="card-body">
				<form id="formBill" name="formBill" method="post" action="Complain.jsp">
					Customer Name: <input id="customerName" name="customerName" type="text"
						class="form-control form-control-sm"> <br>Customer Address: <input
						id="customerAddress" name="customerAddress" type="text"
						class="form-control form-control-sm"> <br>Complain Date: <input
						id="complainDate" name="complainDate" type="date"
						class="form-control form-control-sm"> <br> Issue : <input
						id="issue" name="issue" type="text"
						class="form-control form-control-sm"><br> Status
					: <input id="status" name="status" type="text"
						class="form-control form-control-sm"> <br> Remarks
					: <input id="remarks" name="remarks" type="text"
						class="form-control form-control-sm"> <br>
					<div class="text-right">
						<input id="btnSave" name="btnSave" type="button" value="SAVE"
							class="btn btn-primary"> <input type="hidden"
							id="hidCustomerIDSave" name="hidCustomerIDSave" value="">
					</div>
				</form>
				<div id="alertSuccess" class="alert alert-success" style="margin-top: 15px"></div>
				<div id="alertError" class="alert alert-danger" style="margin-top: 15px"></div>
				<div id="divItemsGrid" class="table-responsive">
				<%
					Complain compObj = new Complain();
					out.print(compObj.readComplains());
					%>
				</div>
			</div>

		</div>
	</div>
</body>
</html>