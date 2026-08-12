package com.wildlumina.app.controller;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wildlumina.app.entity.Detection;
import com.wildlumina.app.entity.User;
import com.wildlumina.app.repository.DetectionRepository;
import com.wildlumina.app.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class MonitoringController {

    private final DetectionRepository detectionRepository;
    private final UserRepository userRepository;

    public MonitoringController(DetectionRepository detectionRepository, UserRepository userRepository) {
        this.detectionRepository = detectionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/monitoring/status")
    public Map<String, Object> getMonitoringStatus() {
        Detection latest = detectionRepository.findTopByOrderByIdDesc().orElse(null);
        long totalDetections = detectionRepository.count();

        Map<String, Object> status = new LinkedHashMap<>();
        status.put("folderMonitoring", "ACTIVE");
        status.put("aiModelStatus", "LOADED");
        status.put("modelName", "WildLumina-YOLOv8x-v2.1");
        status.put("incomingFolderPath", "datasets/incoming_images/");
        status.put("lastProcessedImage", latest != null && latest.getImageName() != null ? latest.getImageName() : "");
        status.put("lastDetectedAnimal", extractAnimalName(latest));
        status.put("lastConfidence", latest != null ? extractConfidence(latest) : 0.0);
        status.put("lastDetectionTime", latest != null && latest.getDetectionTime() != null ? latest.getDetectionTime() : "");
        status.put("imagesProcessedToday", totalDetections > 0 ? Math.toIntExact(totalDetections) : 0);
        status.put("detectionsToday", totalDetections > 0 ? Math.toIntExact(totalDetections) : 0);
        return status;
    }

    @PostMapping("/monitoring/toggle")
    public Map<String, Object> toggleMonitoring(@RequestBody Map<String, Boolean> payload) {
        Boolean active = payload != null ? payload.get("active") : Boolean.TRUE;
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("folderMonitoring", Boolean.TRUE.equals(active) ? "ACTIVE" : "PAUSED");
        data.put("aiModelStatus", "LOADED");
        data.put("modelName", "WildLumina-YOLOv8x-v2.1");
        data.put("incomingFolderPath", "datasets/incoming_images/");
        data.put("imagesProcessedToday", detectionRepository.count() > 0 ? Math.toIntExact(detectionRepository.count()) : 0);
        data.put("detectionsToday", detectionRepository.count() > 0 ? Math.toIntExact(detectionRepository.count()) : 0);
        return data;
    }

    @GetMapping("/dashboard/officer")
    public Map<String, Object> getOfficerDashboard() {
        long detectionCount = detectionRepository.count();
        Map<String, Object> response = new HashMap<>();
        response.put("imagesProcessedToday", detectionCount > 0 ? Math.toIntExact(detectionCount) : 0);
        response.put("detectionsToday", detectionCount > 0 ? Math.toIntExact(detectionCount) : 0);
        response.put("activeAlerts", 0);
        response.put("rareSpeciesDetections", 0);
        response.put("monitoringStatus", "ACTIVE");
        response.put("latestDetection", latestDetectionPayload());
        response.put("recentDetections", latestDetectionPayload() != null ? List.of(latestDetectionPayload()) : List.of());
        return response;
    }

    @GetMapping("/dashboard/admin")
    public Map<String, Object> getAdminDashboard() {
        List<User> users = userRepository.findAll();
        long totalUsers = users.size();
        long forestOfficers = users.stream().filter(u -> "FOREST_OFFICER".equalsIgnoreCase(u.getRole())).count();
        long researchers = users.stream().filter(u -> "RESEARCHER".equalsIgnoreCase(u.getRole())).count();
        long totalDetections = detectionRepository.count();

        Map<String, Object> response = new HashMap<>();
        response.put("totalUsers", Math.toIntExact(totalUsers));
        response.put("forestOfficers", Math.toIntExact(forestOfficers));
        response.put("researchers", Math.toIntExact(researchers));
        response.put("imagesProcessed", Math.toIntExact(totalDetections));
        response.put("totalDetections", Math.toIntExact(totalDetections));
        response.put("activeAlerts", 0);
        response.put("aiModelStatus", "LOADED");
        response.put("folderMonitoringStatus", "ACTIVE");
        response.put("speciesDistribution", List.of(
            Map.of("name", "Wildlife", "count", Math.toIntExact(totalDetections), "fill", "#2E7D32")
        ));
        response.put("dailyDetections", List.of(
            Map.of("date", "Today", "detections", Math.toIntExact(totalDetections), "images", Math.toIntExact(totalDetections))
        ));
        response.put("systemActivity", List.of(
            Map.of("time", "Now", "cpu", 25, "memory", 40, "storage", 52)
        ));
        return response;
    }

    @GetMapping("/dashboard/researcher")
    public Map<String, Object> getResearcherDashboard() {
        long totalDetections = detectionRepository.count();
        Map<String, Object> response = new HashMap<>();
        response.put("trainingImages", Math.toIntExact(totalDetections > 0 ? totalDetections : 0));
        response.put("validationImages", 0);
        response.put("testingImages", 0);
        response.put("numberOfClasses", 1);
        response.put("currentModel", "WildLumina-YOLOv8x-v2.1");
        response.put("precision", 0.0);
        response.put("recall", 0.0);
        response.put("mAP50", 0.0);
        response.put("mAP50_95", 0.0);
        response.put("epochMetrics", List.of());
        response.put("classPerformance", List.of());
        return response;
    }

    @GetMapping("/model/status")
    public Map<String, Object> getModelStatus() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("modelName", "WildLumina-YOLOv8x-v2.1");
        response.put("status", "LOADED");
        response.put("version", "v2.1");
        response.put("lastUpdated", "2026-08-10T08:45:12Z");
        return response;
    }

    private Map<String, Object> latestDetectionPayload() {
        Detection latest = detectionRepository.findTopByOrderByIdDesc().orElse(null);
        if (latest == null) {
            return null;
        }

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("id", latest.getId());
        payload.put("animalName", extractAnimalName(latest));
        payload.put("confidence", extractConfidence(latest));
        payload.put("detectionTime", latest.getDetectionTime() != null ? latest.getDetectionTime() : "");
        payload.put("location", "");
        payload.put("status", "CONFIRMED");
        payload.put("imageUrl", latest.getImagePath() != null ? latest.getImagePath() : "");
        payload.put("bbox", Map.of("x", 0, "y", 0, "width", 0, "height", 0));
        payload.put("speciesCategory", "");
        payload.put("conservationStatus", "");
        payload.put("rareSpecies", false);
        payload.put("sensorId", "");
        return payload;
    }

    private String extractAnimalName(Detection detection) {
        if (detection == null) return "";
        String predictions = detection.getPredictions();
        if (predictions == null || predictions.isBlank()) return "";
        String value = predictions;
        int index = value.indexOf("animalName");
        if (index >= 0) {
            int firstQuote = value.indexOf('"', index + 11);
            int secondQuote = value.indexOf('"', firstQuote + 1);
            if (firstQuote >= 0 && secondQuote > firstQuote) {
                String animal = value.substring(firstQuote + 1, secondQuote);
                if (!animal.isBlank()) return animal;
            }
        }
        return "";
    }

    private Double extractConfidence(Detection detection) {
        if (detection == null) return 0.0;
        String predictions = detection.getPredictions();
        if (predictions == null || predictions.isBlank()) return 0.0;
        int index = predictions.indexOf("confidence");
        if (index >= 0) {
            int colonIndex = predictions.indexOf(':', index);
            if (colonIndex >= 0) {
                String raw = predictions.substring(colonIndex + 1).trim();
                String numeric = raw.replaceAll("[^0-9.\\-]", "");
                if (!numeric.isBlank()) {
                    try {
                        return Double.parseDouble(numeric);
                    } catch (NumberFormatException ignored) {
                    }
                }
            }
        }
        return 0.0;
    }
}
