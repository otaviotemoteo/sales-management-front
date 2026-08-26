package com.sales.management.model.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SaleItemRequest {

    @NotNull(message = "Product is required")
    private Long productId;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantidade deve ser pelo menos 1")
    private Integer quantity;

    @NotNull(message = "Unit price is required")
    @Min(value = 0, message = "Price must be positive")
    private BigDecimal unitPrice;
}