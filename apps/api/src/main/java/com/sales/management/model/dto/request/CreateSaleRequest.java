package com.sales.management.model.dto.request;

import com.sales.management.model.enums.PaymentMethod;
import com.sales.management.model.enums.PaymentStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateSaleRequest {

    @NotNull(message = "Customer is required")
    private Long customerId;

    @NotEmpty(message = "Deve haver pelo menos um item")
    @Valid
    private List<SaleItemRequest> items;

    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;

    @NotNull(message = "Payment status is required")
    private PaymentStatus paymentStatus;

    private BigDecimal discount;

    private String notes;
}