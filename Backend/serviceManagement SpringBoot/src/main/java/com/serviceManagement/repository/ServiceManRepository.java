package com.serviceManagement.repository;

import com.serviceManagement.models.ServiceManModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceManRepository extends JpaRepository<ServiceManModel,Long> {

}
