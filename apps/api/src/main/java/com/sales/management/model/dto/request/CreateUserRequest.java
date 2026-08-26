package com.sales.management.model.dto.request;

import com.sales.management.model.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be at most 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    @Size(max = 100, message = "Email must be at most 100 characters")
    private String email;

    // Optional: sellers are created without a password and set it on first access.
    private String password;

    @NotNull(message = "Role is required")
    private UserRole role;
}