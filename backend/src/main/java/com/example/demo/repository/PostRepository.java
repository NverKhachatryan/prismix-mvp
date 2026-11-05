package com.example.demo.repository;

import com.yourname.prismix.model.SocialPost; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<SocialPost, Long> {
    
    
}