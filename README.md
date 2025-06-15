# Health_care_blood_bank_management_system
# 🩸 Health Care Blood Bank Management System API
 
A full-stack health care platform focused on efficient blood bank management, built with **.NET 8 (Backend)** and **Angular (Frontend)**. The system supports donor registration, blood request processing, inventory tracking, and admin dashboards.
 
---
 
## 👥 Team Members and Roles
 
| Email                                | Name                      | Roles                                |
|-------------------------------------|---------------------------|--------------------------------------|
| 2023lm70039@wilp.bits-pilani.ac.in  | Vishal Kumar Gupta        | Project Manager, Tester              |
| 2023lm70037@wilp.bits-pilani.ac.in  | Marathe Gauri Kailas      | User Researcher, Programmer          |
| 2023lm70040@wilp.bits-pilani.ac.in  | Khan Md. Yaseen           | Technical Analyst, Programmer        |
| 2023lm70038@wilp.bits-pilani.ac.in  | Reyazuddin Shakina        | User Researcher, Technical Analyst   |
| 2023lm70041@wilp.bits-pilani.ac.in  | Ashwin Kumar G            | Programmer, Tester                   |
| —                                   | Sri Lakshmanan M          | Contributor                          |
 
---
 
## 🚀 Modules Overview
 
- **Authentication and Authorization** – Secure login with role-based access (Admin, Donor, Hospital).
- **Donor Management** – Register and manage blood donors and history.
- **Blood Request Management** – Hospitals can raise requests for specific blood groups.
- **Inventory Tracking** – Real-time tracking of blood unit availability.
- **Donation Appointments** – Schedule and manage donor appointments.
- **Notification System** – Email/SMS alerts for appointments, low inventory, approvals.
- **Reporting and Analytics** – View donor statistics, blood group availability, request trends.
- **User Roles and Access Control** – Controlled actions for Admin, Hospital, and Donors.
- **Feedback and Support** – Donors and hospitals can raise feedback or issues.
 
---
 
## 🔄 Module Workflows
 
### 1. Authentication
- Role-based login: Admin, Hospital, Donor.
- JWT-based token security.
 
### 2. Donor Management
- Donor registration.
- Health eligibility check and donation history tracking.
 
### 3. Blood Request Handling
- Hospitals submit requests.
- Admins approve or reject.
- Status tracking for each request.
 
### 4. Blood Inventory
- Tracks units by blood group and expiry date.
- Alerts on low stock.
 
### 5. Appointment Scheduling
- Donors book slots.
- Admin can reschedule or confirm.
 
### 6. Notifications
- Auto-notifications via email/SMS (optional) for appointment reminders or request updates.
 
### 7. Reports
- Admin dashboard with:
  - Blood group statistics
  - Request trends
  - Donor activity
 
---
 
## 🗃️ Database Design
 
### Main Tables and Relationships
 
- **Users**: `UserId`, `Username`, `Email`, `PasswordHash`, `Role`, `IsActive`
- **Donors**: `DonorId`, `UserId`, `BloodGroup`, `DOB`, `LastDonationDate`, `EligibilityStatus`
- **Requests**: `RequestId`, `HospitalId`, `BloodGroup`, `Quantity`, `Status`, `RequestedAt`
- **Hospitals**: `HospitalId`, `UserId`, `Name`, `Address`, `Contact`
- **Inventory**: `InventoryId`, `BloodGroup`, `UnitsAvailable`, `LastUpdated`
- **Appointments**: `AppointmentId`, `DonorId`, `Date`, `Status`
- **Notifications**: `NotificationId`, `UserId`, `Message`, `SentAt`
- **Feedback**: `FeedbackId`, `UserId`, `Message`, `CreatedAt`
 
---
 
## 🧩 File Structure
 
### 🔙 Backend (.NET 8 Web API)
 
- **Authentication**:
  - `AuthController.cs`, `JwtService.cs`, `RoleMiddleware.cs`
- **Donor Management**:
  - `DonorController.cs`, `DonorService.cs`
  - Models: `Donor.cs`
- **Requests**:
  - `RequestController.cs`, `RequestService.cs`
- **Inventory**:
  - `InventoryController.cs`, `InventoryService.cs`
- **Appointments**:
  - `AppointmentController.cs`, `AppointmentService.cs`
- **User Management**:
  - `UserController.cs`, `UserService.cs`
- **Reporting**:
  - `ReportController.cs`, `ReportService.cs`
- **Notifications**:
  - `NotificationController.cs`, `EmailService.cs`
- **Feedback**:
  - `FeedbackController.cs`, `FeedbackService.cs`
 
---
 
### 🌐 Frontend (Angular)
 
- **Auth**: `login.component.ts`, `register.component.ts`, `auth.service.ts`
- **Donor**: `donor-profile.component.ts`, `donor-history.component.ts`
- **Requests**: `request-blood.component.ts`, `view-requests.component.ts`
- **Inventory**: `inventory-dashboard.component.ts`
- **Appointments**: `appointment-scheduler.component.ts`
- **User Management**: `user-list.component.ts`
- **Reports**: `report.component.ts`
- **Notifications**: `notification-list.component.ts`
- **Feedback**: `feedback-form.component.ts`
 
---
 
## 📝 Summary
 
- **Backend**: 25+ service and controller files
- **Frontend**: ~20 components and services
- **Database**: 10+ core tables with proper relationships
 
---
 
## 🔐 Technologies Used
 
- **Backend**: ASP.NET Core 8, Entity Framework Core, JWT Auth
- **Frontend**: Angular 16+, RxJS, Angular Material
- **Database**: SQL Server / PostgreSQL (configurable)
- **DevOps**: Docker, Swagger UI, Postman for testing
 
---
 
## 🏁 How to Run
 
### Backend
```bash
cd backend/
dotnet restore
dotnet run
 
