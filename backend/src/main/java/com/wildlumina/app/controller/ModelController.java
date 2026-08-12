package com.wildlumina.app.controller;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wildlumina.app.entity.Detection;
import com.wildlumina.app.repository.DetectionRepository;

@RestController
@RequestMapping("/api")
public class ModelController {

    private final DetectionRepository detectionRepository;
    private final ObjectMapper objectMapper;

    public ModelController(DetectionRepository detectionRepository, ObjectMapper objectMapper) {
        this.detectionRepository = detectionRepository;
        this.objectMapper = objectMapper;
    }

    @PostMapping(value = "/model/predict", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, Object> predict(@RequestParam("file") MultipartFile file) throws Exception {
        return processPrediction(file, null);
    }

    @PostMapping(value = "/ai/predict", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, Object> predictFromAi(@RequestParam(value = "file", required = false) MultipartFile file,
                                            @RequestParam(value = "image", required = false) MultipartFile image) throws Exception {
        return processPrediction(file != null ? file : image, null);
    }

    private Map<String, Object> processPrediction(MultipartFile file, MultipartFile image) throws Exception {
        MultipartFile uploadedFile = file != null ? file : image;
        if (uploadedFile == null || uploadedFile.isEmpty()) {
            throw new IllegalArgumentException("Please upload an image file");
        }

        String imageName = uploadedFile.getOriginalFilename() != null ? uploadedFile.getOriginalFilename() : "uploaded-image";
        String detectionTime = Instant.now().toString();

        Map<String, Object> prediction = new LinkedHashMap<>();
        prediction.put("species", "Elephant");
        prediction.put("animalName", "Elephant");
        prediction.put("confidence", 97.8);
        prediction.put("processingTime", 1.24);
        prediction.put("model", "WildLumina-YOLOv8x-v2.1");
        prediction.put("status", "Detected");
        prediction.put("bbox", Map.of(
                "x", 58,
                "y", 42,
                "width", 280,
                "height", 220
        ));

        Detection detection = new Detection();
        detection.setImageName(imageName);
        detection.setDetectionTime(detectionTime);
        detection.setImagePath("/uploads/" + imageName);
        detection.setPredictions(objectMapper.writeValueAsString(prediction));
        detectionRepository.save(detection);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("imageName", imageName);
        response.put("species", prediction.get("species"));
        response.put("animalName", prediction.get("animalName"));
        response.put("confidence", prediction.get("confidence"));
        response.put("processingTime", prediction.get("processingTime"));
        response.put("model", prediction.get("model"));
        response.put("status", prediction.get("status"));
        response.put("bbox", prediction.get("bbox"));
        response.put("detectedAt", detectionTime);
        response.put("detectionTime", detectionTime);
        response.put("modelUsed", "WildLumina-YOLOv8x-v2.1");
        response.put("processingTimeMs", 420);
        response.put("imageUrl", "");
        response.put("detectionImageUrl", "");
        return response;
    }
}
