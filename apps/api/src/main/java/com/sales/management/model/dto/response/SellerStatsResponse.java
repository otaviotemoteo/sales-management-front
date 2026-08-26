package com.sales.management.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SellerStatsResponse {
    private Long totalSales;
    private BigDecimal totalRevenue;
    private Long totalCustomers;
    private BigDecimal averageTicket;

    // No hand-written constructor: with the placeholder rating field gone, the
    // four remaining fields make @AllArgsConstructor generate exactly the same
    // signature, and having both is a compile error.
}
