package com.wildlumina.app.repository;

import com.wildlumina.app.entity.Detection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetectionRepository extends JpaRepository<Detection, Long> {
}
