package com.wildlumina.app.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.wildlumina.app.entity.Detection;
import com.wildlumina.app.entity.User;
import com.wildlumina.app.repository.DetectionRepository;
import com.wildlumina.app.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class MonitoringControllerTest {

    @Mock
    private DetectionRepository detectionRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private MonitoringController monitoringController;

    @Test
    void getMonitoringStatusReturnsConfiguredMonitoringSnapshot() {
        Detection detection = new Detection();
        detection.setId(1L);
        detection.setImageName("IMG_20260810_084512_014.jpg");
        detection.setDetectionTime("2026-08-10T08:45:12Z");
        detection.setPredictions("{\"animalName\":\"Bengal Tiger\",\"confidence\":0.964}\n");
        detection.setImagePath("/assets/images/tiger_detection.png");

        when(detectionRepository.findTopByOrderByIdDesc()).thenReturn(Optional.of(detection));
        when(detectionRepository.count()).thenReturn(89L);

        Map<String, Object> status = monitoringController.getMonitoringStatus();

        assertEquals("ACTIVE", status.get("folderMonitoring"));
        assertEquals("WildLumina-YOLOv8x-v2.1", status.get("modelName"));
        assertEquals("Bengal Tiger", status.get("lastDetectedAnimal"));
        assertEquals(89, status.get("detectionsToday"));
    }

    @Test
    void getAdminDashboardUsesDatabaseCountsInsteadOfStaticFallbacks() {
        User officer = new User();
        officer.setRole("FOREST_OFFICER");

        User researcher = new User();
        researcher.setRole("RESEARCHER");

        User admin = new User();
        admin.setRole("SYSTEM_ADMIN");

        when(userRepository.findAll()).thenReturn(List.of(officer, researcher, admin, officer));
        when(detectionRepository.count()).thenReturn(42L);

        Map<String, Object> dashboard = monitoringController.getAdminDashboard();

        assertEquals(4, dashboard.get("totalUsers"));
        assertEquals(2, dashboard.get("forestOfficers"));
        assertEquals(1, dashboard.get("researchers"));
        assertEquals(42, dashboard.get("totalDetections"));
    }
}
