package com.wildlumina.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(new AntPathRequestMatcher("/api/auth/**")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/api/detections/**")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/api/users/**")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/api/monitoring/**")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/api/dashboard/**")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/api/model/**")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/api/ai/**")).permitAll()
                .anyRequest().permitAll()
            )
            .httpBasic(httpBasic -> httpBasic.disable())
            .formLogin(formLogin -> formLogin.disable())
            .logout(logout -> logout.disable());

        return http.build();
    }
}
