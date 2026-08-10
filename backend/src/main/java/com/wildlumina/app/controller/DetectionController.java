package com.wildlumina.app.controller;

import com.wildlumina.app.dto.DetectionDto;
import com.wildlumina.app.entity.Detection;
import com.wildlumina.app.service.DetectionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/detections")
public class DetectionController {

    private final DetectionService detectionService;

    public DetectionController(DetectionService detectionService) {
        this.detectionService = detectionService;
    }

    @PostMapping
    public ResponseEntity<Detection> receiveDetection(@RequestBody DetectionDto dto) {
        Detection saved = detectionService.saveDetection(dto);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
}
