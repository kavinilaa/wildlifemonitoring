package com.wildlumina.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wildlumina.app.entity.Detection;

@Repository
public interface DetectionRepository extends JpaRepository<Detection, Long> {
    Optional<Detection> findTopByOrderByIdDesc();
    List<Detection> findAllByOrderByIdDesc();
}
