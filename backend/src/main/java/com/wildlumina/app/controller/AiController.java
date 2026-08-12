package com.wildlumina.app.controller;

import com.wildlumina.app.dto.PredictionResponse;
import com.wildlumina.app.entity.Detection;
import com.wildlumina.app.repository.DetectionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private static final String UPLOAD_DIR = "datasets/incoming_images/";
    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'").withZone(ZoneId.of("UTC"));

    private final DetectionRepository detectionRepository;

    public AiController(DetectionRepository detectionRepository) {
        this.detectionRepository = detectionRepository;
    }

    @PostMapping("/predict")
    public ResponseEntity<PredictionResponse> predict(@RequestParam("image") MultipartFile image) throws IOException {
        long start = System.currentTimeMillis();

        // Save uploaded image to incoming_images folder
        String savedPath = saveImage(image);

        // Mock prediction — replace with Python AI service call when ready
        String species = "Elephant";
        double confidence = 97.8;
        String status = "Detected";
        String model = "YOLOv8";

        double processingTime = (System.currentTimeMillis() - start) / 1000.0;
        String now = FORMATTER.format(Instant.now());

        // Persist to DB
        Detection detection = new Detection(
                image.getOriginalFilename(),
                now,
                "{\"animalName\":\"" + species + "\",\"confidence\":" + confidence + "}",
                savedPath
        );
        detection.setSpecies(species);
        detection.setConfidence(confidence);
        detection.setProcessingTime(processingTime);
        detection.setModel(model);
        detection.setDetectionStatus(status);
        Detection saved = detectionRepository.save(detection);

        // Build response
        PredictionResponse response = new PredictionResponse();
        response.setId(saved.getId());
        response.setSpecies(species);
        response.setConfidence(confidence);
        response.setStatus(status);
        response.setProcessingTime(processingTime);
        response.setModel(model);
        response.setImageUrl(savedPath);
        response.setDetectionImageUrl(savedPath);
        response.setImageName(image.getOriginalFilename());
        response.setDetectedAt(now);

        return ResponseEntity.ok(response);
    }

    private String saveImage(MultipartFile image) throws IOException {
        File dir = new File(UPLOAD_DIR);
        if (!dir.exists()) dir.mkdirs();

        String filename = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path path = Paths.get(UPLOAD_DIR + filename);
        Files.write(path, image.getBytes());
        return UPLOAD_DIR + filename;
    }
}
