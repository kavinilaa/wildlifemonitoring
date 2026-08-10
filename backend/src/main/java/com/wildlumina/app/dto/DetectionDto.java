package com.wildlumina.app.dto;

import java.util.List;
import java.util.Map;

public class DetectionDto {

    private String imageName;
    private String detectionTime;
    private List<Map<String, Object>> detections;
    private String imagePath;

    public DetectionDto() {
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getDetectionTime() {
        return detectionTime;
    }

    public void setDetectionTime(String detectionTime) {
        this.detectionTime = detectionTime;
    }

    public List<Map<String, Object>> getDetections() {
        return detections;
    }

    public void setDetections(List<Map<String, Object>> detections) {
        this.detections = detections;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
