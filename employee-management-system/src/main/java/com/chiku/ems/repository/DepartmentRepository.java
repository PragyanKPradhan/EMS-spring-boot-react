package com.chiku.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chiku.ems.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

}
