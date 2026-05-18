package com.serviceManagement.repository;

import com.serviceManagement.models.ServiceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceModel,Long> {
    @Query("SELECT s FROM ServiceModel s WHERE s.userEmail = :email")
    List<ServiceModel> getServicesByEmail(@Param("email") String email);
}
