package com.chiku.ems.mapper;

import com.chiku.ems.dto.EmployeeDto;
import com.chiku.ems.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getName(),
                employee.getEmail(),
                employee.getPhone(),
                employee.getDepartment().getId()
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto){
         Employee employee = new Employee();
         employee.setId(employeeDto.getId());
         employee.setName(employeeDto.getName());
         employee.setEmail(employeeDto.getEmail());
         employee.setPhone(employeeDto.getPhone());
         return employee;
    }
}