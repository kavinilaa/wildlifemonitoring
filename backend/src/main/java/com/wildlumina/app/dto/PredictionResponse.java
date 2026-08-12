package com.wildlumina.app.dto;

public class PredictionResponse {

    private Long id;
    private String species;
    private double confidence;
    private String status;
    private double processingTime;
    private String model;
    private String imageUrl;
    private String detectionImageUrl;
    private String imageName;
    private String detectedAt;

    public PredictionResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }

    public double getConfidence() { return confidence; }
    public void setConfidence(double confidence) { this.confidence = confidence; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public double getProcessingTime() { return processingTime; }
    public void setProcessingTime(double processingTime) { this.processingTime = processingTime; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDetectionImageUrl() { return detectionImageUrl; }
    public void setDetectionImageUrl(String detectionImageUrl) { this.detectionImageUrl = detectionImageUrl; }

    public String getImageName() { return imageName; }
    public void setImageName(String imageName) { this.imageName = imageName; }

    public String getDetectedAt() { return detectedAt; }
    public void setDetectedAt(String detectedAt) { this.detectedAt = detectedAt; }
}
