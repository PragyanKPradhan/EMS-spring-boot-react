package com.chiku.ems.service;

import java.util.List;

import com.chiku.ems.dto.EmployeeDto;

public interface EmployeeService {
	EmployeeDto createEmployee(EmployeeDto employeeDto);

	EmployeeDto getEmployeeById(Long employeeId);

	List<EmployeeDto> getAllEmployees();

	EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);

	void deleteEmployee(Long employeeId);
}
