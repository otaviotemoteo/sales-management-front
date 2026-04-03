# End-to-End Testing Session Guide

> **Prerequisites**: Backend running at `localhost:8080`, frontend at `localhost:3000`
> **First-time setup**: Create an ADMIN account directly via API (see Setup section below)

---

## Setup: Create First Admin Account

The public registration page (`/registrar`) always creates **SELLER** accounts.
You need to create the first admin manually:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Admin", "email": "admin@test.com", "password": "Admin@123", "role": "ADMIN"}'
```

Save the returned token — or just log in via the frontend after creating.

---

## 1. Auth Flow

### 1.1 Register (Seller)
- [ ] Go to `/registrar`
- [ ] Fill name, email, password, confirm password
- [ ] Submit — should redirect to `/vendedor/dashboard`
- [ ] Verify cookie `auth-token` is set (DevTools > Application > Cookies)
- **Check**: Validation errors show for empty/invalid fields
- **Check**: Server error shows if email already taken

### 1.2 Login (Seller)
- [ ] Go to `/login`
- [ ] Login with the seller account created above
- [ ] Should redirect to `/vendedor/dashboard`

### 1.3 Login (Admin)
- [ ] Go to `/login`
- [ ] Login with `admin@test.com` / `Admin@123`
- [ ] Should redirect to `/admin/dashboard`

### 1.4 Logout
- [ ] Click logout in sidebar
- [ ] Should redirect to `/login`
- [ ] Trying to access `/vendedor/dashboard` should redirect back to login

---

## 2. Seller Flow

### 2.1 Dashboard (`/vendedor/dashboard`)
- [ ] Stats cards show real data (total sales, revenue, customers count)
- [ ] Sales trend chart renders with data
- [ ] Top products list populates
- [ ] Recent sales list shows actual sales
- [ ] "Nova Venda" quick action opens the new sale dialog
- **Known gap**: `totalCustomers` may show real count — verify it matches actual customer count

### 2.2 New Sale (`/vendedor/vendas` > Nova Venda)
- [ ] Click "Nova Venda" button
- [ ] **Customer search**: Type a name, verify dropdown shows matching customers from API
- [ ] **Product search**: Type a product name, verify dropdown shows matching products
- [ ] Add multiple products to cart
- [ ] Adjust quantities (should respect stock limits)
- [ ] Remove an item from cart
- [ ] Select payment method (Dinheiro/PIX/Debito/Credito)
- [ ] Toggle payment status (Pendente/Pago)
- [ ] Add discount
- [ ] Add notes
- [ ] Verify subtotal and total calculations are correct
- [ ] Submit — should call `POST /api/sales` and close dialog
- [ ] Verify the new sale appears in the sales list
- **Check**: Cannot submit with empty cart
- **Check**: Cannot submit without selecting a customer

### 2.3 Sales List (`/vendedor/vendas`)
- [ ] Sales load and display in cards
- [ ] Search by customer name or sale ID works
- [ ] Status filter tabs work (Todas/Concluidas/Pendentes/Canceladas)
- [ ] Tab counts match actual filtered results
- [ ] Click a sale card — details modal opens with SaleReceipt
- [ ] Three-dot menu > Cancel sale — confirm it calls DELETE and updates the list
- **Check**: Network tab shows `GET /api/sales/my-sales` on load

### 2.4 Customers (`/vendedor/clientes`)
- [ ] Customer list loads from API
- [ ] Search filters customers
- [ ] "Novo Cliente" button opens form dialog
- [ ] Fill form (name required, email/phone/address optional) and submit
- [ ] New customer appears in the list
- [ ] Click "Ver detalhes" on a customer card
- [ ] Customer details modal shows info
- [ ] Sales history section loads (calls `/api/sales/customer/{id}/statement`)
- **Check**: Network tab shows `GET /api/customers` on load

### 2.5 Performance (`/vendedor/desempenho`)
- [ ] Period selector (Dia/Semana/Mes/Ano) changes data
- [ ] Stats overview shows sales count, revenue, average ticket
- [ ] Sales chart renders trend data
- [ ] Payment methods chart shows distribution
- [ ] Top products list populates
- **Known gap**: `totalCustomers` shows 0 (hardcoded — not available from dashboard API)
- **Known gap**: Product `growth` always shows 0% (API doesn't return growth data)

### 2.6 Profile (`/vendedor/perfil`)
- [ ] Profile stats show total sales, revenue from dashboard API
- [ ] Avatar card shows name and email
- [ ] Profile form has name pre-filled
- [ ] Edit name and save — should call `PUT /api/users/{id}`
- [ ] Toast "Perfil atualizado com sucesso!" appears
- [ ] Change Password form is disabled with "Em breve" message
- [ ] Account Actions > Deactivate Account — confirmation dialog, then deactivates + logout
- [ ] Account Actions > Delete Account — type "deletar minha conta" to confirm, then deletes + logout
- **Known gap**: Phone, CPF, city, state, bio fields are empty (API doesn't support these fields)
- **Known gap**: `averageRating` always 0 (no rating system in backend)

---

## 3. Admin Flow

### 3.1 Dashboard (`/admin/dashboard`)
- [ ] Stats cards show real counts (total sales, revenue, customers, sellers, products)
- [ ] Sales overview chart renders
- [ ] Top products list populates
- [ ] Recent sales list shows actual data
- [ ] Pending payments list shows sales where `paymentStatus === 'PENDING'`
- **Check**: Customer/seller/product counts come from API pagination `totalElements`

### 3.2 Sales Management (`/admin/vendas`)
- [ ] Sales table loads all sales (not just own)
- [ ] Search by customer name or sale ID
- [ ] Filter by seller dropdown (populated from users API)
- [ ] Filter by status
- [ ] Stats cards (total sales, revenue, pending value, completion rate, payment breakdown)
- [ ] Click edit icon — Sale Edit Dialog opens
- [ ] Edit amount and status, save — calls `PUT /api/sales/{id}`
- [ ] Toast "Venda atualizada com sucesso!" appears
- [ ] View detail — Sale Detail Modal opens with full info
- [ ] Status change via dropdown in table row works
- **Check**: Network shows `GET /api/sales` (all sales) and `GET /api/users/role/SELLER`

### 3.3 Products (`/admin/produtos`)
- [ ] Products list loads from API
- [ ] Search/filter works
- [ ] "Novo Produto" — create form works, calls `POST /api/products`
- [ ] Edit product — form pre-fills, save calls `PUT /api/products/{id}`
- [ ] Deactivate product — calls `DELETE /api/products/{id}`
- **Check**: Categories filter populates from `GET /api/products/categories`

### 3.4 Sellers (`/admin/vendedores`)
- [ ] Sellers list loads (filtered by role=SELLER)
- [ ] Search by name/email
- [ ] "Novo Vendedor" — form creates seller with default password `VendaFlow@123`
- [ ] Edit seller — name/email update via `PUT /api/users/{id}`
- [ ] Toggle active/inactive — calls DELETE (deactivate) or PATCH reactivate
- [ ] View details modal opens
- **Known gap**: Seller stats (totalSales, totalRevenue, etc.) all show 0 — no per-seller stats endpoint
- **Known gap**: Seller `phone` always empty (not in UserResponse)
- **Known gap**: Seller `rating` always 0

### 3.5 Reports (`/admin/relatorios`)
- [ ] Page loads with sales data
- [ ] Stats cards show aggregated data
- [ ] Charts render
- **Known gap**: Export button is disabled (no export endpoint)
- **Known gap**: Period filter dropdown is cosmetic only (doesn't filter data)

---

## 4. Known Gaps & Limitations Summary

These are limitations of the current backend API, NOT frontend bugs:

| Area | Issue | Root Cause |
|------|-------|------------|
| Change Password | Form disabled "Em breve" | No backend endpoint |
| Profile fields | Phone, CPF, city, state, bio empty | Not in UserResponse API |
| Ratings | Always 0 everywhere | No rating system in backend |
| Seller stats (admin) | All zeros on seller cards | No per-seller dashboard endpoint |
| Product growth % | Always 0% | API doesn't return growth metrics |
| totalCustomers (performance) | Shows 0 | Dashboard API doesn't include customer count |
| Reports export | Button disabled | No export endpoint |
| Reports period filter | Dropdown does nothing | Filter not connected to data |
| Default seller password | Always `VendaFlow@123` | Admin creation doesn't prompt for password |

---

## 5. What to Watch in DevTools

### Network Tab
- All API calls should go to `/api/*` (Next.js proxy routes), NOT directly to `localhost:8080`
- Auth requests should include `auth-token` cookie automatically
- Check for 401 responses — should trigger redirect to login
- Check for proper error handling (toast messages on failures)

### Console
- No React key warnings
- No unhandled promise rejections
- No hydration mismatches

### Common Failure Modes
- **Empty lists after login**: Token not being sent — check cookie settings
- **CORS errors**: Should not happen (Next.js proxies all requests)
- **"Erro no servidor" toast**: Backend returned non-2xx — check Network tab for details
- **Infinite loading spinner**: API call hanging — check if backend is running
- **"Sessão expirada" redirect**: Token expired or invalid — re-login
