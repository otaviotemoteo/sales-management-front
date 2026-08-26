package com.sales.management.util;

public class Constants {
    
    // JWT
    public static final String JWT_HEADER = "Authorization";
    public static final String JWT_PREFIX = "Bearer ";
    
    // Roles
    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_SELLER = "SELLER";
    
    // Messages
    public static final String USER_NOT_FOUND = "User not found";
    public static final String PRODUCT_NOT_FOUND = "Product not found";
    public static final String CUSTOMER_NOT_FOUND = "Customer not found";
    public static final String SALE_NOT_FOUND = "Sale not found";
    public static final String EMAIL_ALREADY_EXISTS = "Email already registered";
    public static final String CPF_ALREADY_EXISTS = "CPF already registered";
    public static final String INVALID_CREDENTIALS = "Invalid email or password";
    public static final String INVALID_CURRENT_PASSWORD = "Senha atual incorreta";
    public static final String UNAUTHORIZED_ACCESS = "Unauthorized";
    public static final String NOT_A_SELLER = "This user is not a seller";
    
    // Validation
    public static final int MIN_PASSWORD_LENGTH = 6;
    public static final int MAX_NAME_LENGTH = 100;
    public static final int MAX_EMAIL_LENGTH = 100;
    
    private Constants() {
        // Private constructor to prevent instantiation
    }
}