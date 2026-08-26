package com.sales.management.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {

    @Size(max = 100, message = "Name must be at most 100 characters")
    private String name;

    @Email(message = "Invalid email")
    @Size(max = 100, message = "Email must be at most 100 characters")
    private String email;

    private Boolean active;

    @Pattern(regexp = "^\\+?[0-9 ()\\-]{8,20}$", message = "Invalid phone number")
    private String phone;

    @Pattern(regexp = "^[0-9]{11}$", message = "CPF must contain 11 digits")
    private String cpf;

    @Size(max = 100, message = "City must be at most 100 characters")
    private String city;

    @Pattern(regexp = "^[A-Z]{2}$", message = "Estado deve ser a sigla de 2 letras (ex: SP)")
    private String state;

    @Size(max = 1000, message = "Bio must be at most 1000 characters")
    private String bio;

    @Size(max = 500, message = "Avatar URL must be at most 500 characters")
    private String avatarUrl;
}