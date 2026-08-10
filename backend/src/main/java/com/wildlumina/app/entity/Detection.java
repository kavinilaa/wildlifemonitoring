package com.wildlumina.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "detections")
public class Detection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageName;

    private String detectionTime;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String predictions;

    private String imagePath;

    public Detection() {
    }

    public Detection(String imageName, String detectionTime, String predictions, String imagePath) {
        this.imageName = imageName;
        this.detectionTime = detectionTime;
        this.predictions = predictions;
        this.imagePath = imagePath;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getPredictions() {
        return predictions;
    }

    public void setPredictions(String predictions) {
        this.predictions = predictions;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
