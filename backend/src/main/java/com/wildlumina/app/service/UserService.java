package com.wildlumina.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wildlumina.app.dto.LoginRequest;
import com.wildlumina.app.dto.RegisterRequest;
import com.wildlumina.app.dto.UserDto;
import com.wildlumina.app.entity.User;
import com.wildlumina.app.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserDto registerUser(RegisterRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        String loginId = generateLoginId(request.getRole());
        while (userRepository.findByLoginId(loginId).isPresent()) {
            loginId = generateLoginId(request.getRole());
        }

        User user = new User();
        user.setRole(request.getRole());
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(request.getPassword());
        user.setForestZone(request.getForestZone());
        user.setForestRange(request.getForestRange());
        user.setStationName(request.getStationName());
        user.setOrganization(request.getOrganization());
        user.setDepartment(request.getDepartment());
        user.setOfficeName(request.getOfficeName());
        user.setStatus("ACTIVE");
        user.setLoginId(loginId);

        User saved = userRepository.save(user);
        return toDto(saved);
    }

    public UserDto login(LoginRequest request) {
        Optional<User> optionalUser = userRepository.findByLoginId(request.getLoginId());
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("Invalid Login ID or password");
        }
        User user = optionalUser.get();
        if (!user.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Invalid Login ID or password");
        }
        return toDto(user);
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public UserDto createUser(RegisterRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        String loginId = generateLoginId(request.getRole());
        while (userRepository.findByLoginId(loginId).isPresent()) {
            loginId = generateLoginId(request.getRole());
        }

        User user = new User();
        user.setRole(request.getRole());
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(request.getPassword());
        user.setForestZone(request.getForestZone());
        user.setForestRange(request.getForestRange());
        user.setStationName(request.getStationName());
        user.setOrganization(request.getOrganization());
        user.setDepartment(request.getDepartment());
        user.setOfficeName(request.getOfficeName());
        user.setStatus("ACTIVE");
        user.setLoginId(loginId);

        return toDto(userRepository.save(user));
    }

    public UserDto getUserById(Long id) {
        return userRepository.findById(id).map(this::toDto).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @Transactional
    public UserDto updateUserStatus(Long id, String status) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setStatus(status);
        return toDto(userRepository.save(user));
    }

    private String generateLoginId(String role) {
        String prefix;
        switch (role) {
            case "SYSTEM_ADMIN":
                prefix = "ADMIN";
                break;
            case "RESEARCHER":
                prefix = "RES";
                break;
            default:
                prefix = "FO";
        }
        int suffix = 1000 + (int) (Math.random() * 9000);
        return prefix + suffix;
    }

    private UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setLoginId(user.getLoginId());
        dto.setRole(user.getRole());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setForestZone(user.getForestZone());
        dto.setForestRange(user.getForestRange());
        dto.setStationName(user.getStationName());
        dto.setOrganization(user.getOrganization());
        dto.setDepartment(user.getDepartment());
        dto.setOfficeName(user.getOfficeName());
        dto.setStatus(user.getStatus());
        return dto;
    }
}
