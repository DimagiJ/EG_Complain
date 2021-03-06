package com;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/ComplainServlet")
public class ComplainAPI extends HttpServlet{
	
	
	private static final long serialVersionUID = -8821173037461710172L;
	Complain compObj = new Complain();

	public ComplainAPI() {
		super();
		// TODO Auto-generated constructor stub
	}

	// INSERT
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String output = compObj.insertComplain(request.getParameter("customerName"),
				request.getParameter("customerAddress"), request.getParameter("complainDate"), request.getParameter("issue"),request.getParameter("status"),request.getParameter("remarks"));
		response.getWriter().write(output);
	}

	// UPDATE
	public void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map<String, String> paras = getParasMap(request);
		String output = compObj.updateComplain(paras.get("hidCustomerIDSave").toString(),paras.get("customerName").toString(), paras.get("customerAddress").toString(),
				paras.get("complainDate").toString(), paras.get("issue").toString(), paras.get("status").toString(),
				paras.get("remarks").toString());
		response.getWriter().write(output);
	}

	public void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		Map<String, String> paras = getParasMap(request);
		String output = compObj.deleteComplain(paras.get("complainID").toString());
		response.getWriter().write(output);
	}

	public static Map<String, String> getParasMap(HttpServletRequest request) {
		Map<String, String> map = new HashMap<String, String>();
		try {
			Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
			String queryString = scanner.hasNext() ? scanner.useDelimiter("\\A").next() : "";
			scanner.close();
			String[] params = queryString.split("&");
			for (String param : params) {
				String[] p = param.split("=");
				map.put(p[0], p[1]);
			}
		} catch (Exception e) {
		}
		return map;
	}

	
}

