package com.chiku.ems.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.chiku.ems.dto.EmployeeDto;
import com.chiku.ems.entity.Department;
import com.chiku.ems.entity.Employee;
import com.chiku.ems.exception.ResourceNotFoundException;
import com.chiku.ems.mapper.EmployeeMapper;
import com.chiku.ems.repository.DepartmentRepository;
import com.chiku.ems.repository.EmployeeRepository;
import com.chiku.ems.service.EmployeeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private EmployeeRepository employeeRepository;

	private DepartmentRepository departmentRepository;

	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {

		Employee employee = EmployeeMapper.mapToEmployee(employeeDto);

		Department department = departmentRepository.findById(employeeDto.getDepartmentId())
				.orElseThrow(() -> new ResourceNotFoundException(
						"Department is not exists with id: " + employeeDto.getDepartmentId()));

		employee.setDepartment(department);

		Employee savedEmployee = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(savedEmployee);
	}

	@Override
	public EmployeeDto getEmployeeById(Long employeeId) {
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException("Employee is not exists with given id : " + employeeId));

		return EmployeeMapper.mapToEmployeeDto(employee);
	}

	@Override
	public List<EmployeeDto> getAllEmployees() {
		List<Employee> employees = employeeRepository.findAll();
		return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
				.collect(Collectors.toList());
	}

	@Override
	public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

		Employee employee = employeeRepository.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException("Employee is not exists with given id: " + employeeId));

		employee.setName(updatedEmployee.getName());
		employee.setPhone(updatedEmployee.getPhone());
		employee.setEmail(updatedEmployee.getEmail());

		Department department = departmentRepository.findById(updatedEmployee.getDepartmentId())
				.orElseThrow(() -> new ResourceNotFoundException(
						"Department is not exists with id: " + updatedEmployee.getDepartmentId()));

		employee.setDepartment(department);

		Employee updatedEmployeeObj = employeeRepository.save(employee);

		return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
	}

	@Override
	public void deleteEmployee(Long employeeId) {

		Employee employee = employeeRepository.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException("Employee is not exists with given id: " + employeeId));

		employeeRepository.deleteById(employeeId);
	}
}
