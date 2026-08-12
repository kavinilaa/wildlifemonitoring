package com.wildlumina.app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wildlumina.app.entity.Detection;
import com.wildlumina.app.repository.DetectionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.time.Instant;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ModelControllerTest {

    @Mock
    private DetectionRepository detectionRepository;

    @Test
    void predictReturnsPredictionSummaryWhenUploadIsValid() throws Exception {
        ModelController controller = new ModelController(detectionRepository, new ObjectMapper());
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "elephant.jpg",
                "image/jpeg",
                new byte[] {1, 2, 3, 4}
        );

        when(detectionRepository.save(any(Detection.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Map<String, Object> response = controller.predict(file);

        assertNotNull(response);
        assertEquals("elephant.jpg", response.get("imageName"));
        assertEquals("WildLumina-YOLOv8x-v2.1", response.get("modelUsed"));
    }
}
