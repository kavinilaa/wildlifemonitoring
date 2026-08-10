package com.wildlumina.app.service;

import com.wildlumina.app.dto.DetectionDto;
import com.wildlumina.app.entity.Detection;
import com.wildlumina.app.repository.DetectionRepository;
import org.springframework.stereotype.Service;

@Service
public class DetectionService {

    private final DetectionRepository detectionRepository;

    public DetectionService(DetectionRepository detectionRepository) {
        this.detectionRepository = detectionRepository;
    }

    public Detection saveDetection(DetectionDto dto) {
        Detection detection = new Detection(
                dto.getImageName(),
                dto.getDetectionTime(),
                dto.getDetections() != null ? dto.getDetections().toString() : null,
                dto.getImagePath()
        );
        return detectionRepository.save(detection);
    }
}
