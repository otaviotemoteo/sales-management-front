package com.sales.management.controller;

import com.sales.management.model.dto.request.ChangePasswordRequest;
import com.sales.management.model.dto.request.CreateUserRequest;
import com.sales.management.model.dto.request.SetPasswordRequest;
import com.sales.management.model.dto.request.UpdateUserRequest;
import com.sales.management.model.dto.response.SellerStatsResponse;
import com.sales.management.model.dto.response.UserResponse;
import com.sales.management.model.entity.User;
import com.sales.management.model.enums.UserRole;
import com.sales.management.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User management")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    private final UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a user (admin only)")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody CreateUserRequest request) {
        return new ResponseEntity<>(userService.createUser(request), HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List all users (admin only)")
    public ResponseEntity<Page<UserResponse>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction
    ) {
        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return ResponseEntity.ok(userService.getAllUsers(pageable));
    }

    @GetMapping("/me")
    @Operation(summary = "Get the authenticated user's profile")
    public ResponseEntity<UserResponse> getOwnProfile(@AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(userService.getOwnProfile(currentUser));
    }

    @PatchMapping("/me")
    @Operation(summary = "Update the authenticated user's profile")
    public ResponseEntity<UserResponse> updateOwnProfile(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody UpdateUserRequest request
    ) {
        return ResponseEntity.ok(userService.updateOwnProfile(currentUser, request));
    }

    @PatchMapping("/me/password")
    @Operation(summary = "Change your own password")
    public ResponseEntity<Void> changeOwnPassword(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody ChangePasswordRequest request
    ) {
        userService.changeOwnPassword(currentUser, request);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/me/set-password")
    @Operation(summary = "Set the password on first access")
    public ResponseEntity<Void> setOwnPassword(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody SetPasswordRequest request
    ) {
        userService.setOwnPassword(currentUser, request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a user by id")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a user (admin only)")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request
    ) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Deactivate a user (admin only)")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/reactivate")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Reactivate a user (admin only)")
    public ResponseEntity<UserResponse> reactivateUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.reactivateUser(id));
    }

    @GetMapping("/role/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "List users by role (admin only)")
    public ResponseEntity<Page<UserResponse>> getUsersByRole(
            @PathVariable UserRole role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(userService.getUsersByRole(role, pageable));
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Search users by name or email (admin only)")
    public ResponseEntity<Page<UserResponse>> searchUsers(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(userService.searchUsers(query, pageable));
    }

    @GetMapping("/{id}/stats")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Aggregated metrics for one seller (admin only)")
    public ResponseEntity<SellerStatsResponse> getSellerStats(
            @PathVariable Long id,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        return ResponseEntity.ok(userService.getSellerStats(id, startDate, endDate));
    }
}