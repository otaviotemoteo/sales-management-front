package com.sales.management.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateCustomerRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be at most 100 characters")
    private String name;

    @NotBlank(message = "Phone is required")
    @Size(max = 20, message = "Phone must be at most 20 characters")
    private String phone;

    @Email(message = "Email must be valid")
    @Size(max = 100, message = "Email must be at most 100 characters")
    private String email;

    @Size(max = 500, message = "Address must be at most 500 characters")
    private String address;
}
