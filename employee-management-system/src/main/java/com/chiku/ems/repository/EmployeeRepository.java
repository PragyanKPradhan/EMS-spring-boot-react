package com.chiku.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chiku.ems.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
