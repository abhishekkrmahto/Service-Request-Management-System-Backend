package com.serviceManagement.repository;

import com.serviceManagement.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserModel,Long> {
    @Query("select U from UserModel U where U.email=:email and U.password=:password and U.role=:role")
    UserModel validateCredentials(@Param("email") String email,
                                  @Param("password") String password,@Param("role") String role);

    @Query("select U from UserModel U where U.email=:email")
    UserModel checkByEmail(@Param("email") String email);

    @Query("select U from UserModel U where U.email=:email")
    UserModel findByEmail(@Param("email") String email);
}
