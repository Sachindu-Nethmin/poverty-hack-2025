# Ministry Dashboard Dummy Data Setup

## Overview
Created comprehensive dummy data for the Ministry Dashboard to display realistic hospital equipment requests during development and testing.

## Files Created/Modified

### 1. New File: `src/data/ministryDummyData.ts`
- **Purpose**: Contains 15 realistic hospital equipment requests across Sri Lanka
- **Data Structure**: Array of `HospitalNeedRequest` objects
- **Coverage**: 
  - Multiple districts (Colombo, Kandy, Galle, Jaffna, etc.)
  - Various equipment types (MRI Scanner, Ventilators, Dialysis Machines, etc.)
  - Different urgency levels (critical, high, medium, low)
  - Mixed statuses (pending, approved, denied)

### 2. Modified: `src/components/MinistryDashboard.tsx`
- **Changes**:
  - Imported `ministryDummyRequests` from the new data file
  - Updated `loadRequests()` function to use dummy data when localStorage is empty
  - Automatically populates localStorage with dummy data on first load
  - Maintains backward compatibility with existing localStorage data

## Dummy Data Summary

### Statistics:
- **Total Requests**: 15
- **Pending**: 8
- **Approved**: 6
- **Denied**: 1

### By Urgency:
- **Critical**: 5 (MRI Scanner, Ventilators, Defibrillators, Oxygen Concentrators, Neonatal Incubators)
- **High**: 4 (Dialysis Machines, Patient Monitors, Ultrasound, Infusion Pumps, Operating Tables)
- **Medium**: 5 (X-Ray Machine, Surgical Lights, Laboratory Analyzer, Sterilization Equipment)
- **Low**: 1 (ECG Machine)

### By District Coverage:
- Colombo, Kandy, Galle, Jaffna, Anuradhapura, Kurunegala, Batticaloa
- Ratnapura, Badulla, Matara, Trincomalee, Polonnaruwa, Ampara, Puttalam, Kalutara

### Equipment Categories:
- **Diagnostic Equipment**: MRI Scanner, X-Ray Machine, Ultrasound, ECG
- **Life Support**: Ventilators, Oxygen Concentrators
- **Treatment Equipment**: Dialysis Machines, Infusion Pumps
- **Emergency Equipment**: Defibrillators
- **Surgical Equipment**: Surgical Lights, Sterilization Equipment, Operating Tables
- **Monitoring Equipment**: Patient Monitors
- **Pediatric Equipment**: Neonatal Incubators
- **Laboratory Equipment**: Laboratory Analyzer

## Key Features

### Realistic Data Points:
1. **Proper Date Objects**: All dates use `new Date()` constructor
2. **Complete Hospital Information**: Names, districts, contact emails
3. **Detailed Justifications**: Each request includes realistic reasons
4. **Varied Cost Ranges**: LKR 900K to LKR 45M
5. **Quantity Variations**: 1 to 20 units per request
6. **Expected Beneficiaries**: 120 to 500 patients per request

### Dashboard Integration:
- Auto-loads on first visit to Ministry Dashboard
- Persists in localStorage for consistent experience
- Works seamlessly with existing chart/analytics components
- Enables full testing of filter functionality

## Usage

### First Time Load:
1. Login as a government admin
2. Navigate to Ministry Dashboard
3. Dummy data automatically loads if no existing data
4. Data is saved to localStorage

### Subsequent Loads:
- Data persists in localStorage
- Dashboard uses stored data
- Can be cleared via browser DevTools if needed

### Testing Filters:
- Click "All" to see all 15 requests
- Click "Pending" to see 8 pending requests
- Click "Approved" to see 6 approved requests
- Click "Denied" to see 1 denied request

### Testing Analytics:
- **Top Hospitals Chart**: Shows distribution across 15 hospitals
- **Urgency Chart**: Displays critical (5), high (4), medium (5), low (1)
- **Stats Cards**: Real-time counts update based on dummy data

## Data Maintenance

### To Reset Data:
```javascript
// In browser console
localStorage.removeItem('hospitalRequests');
// Refresh page to reload dummy data
```

### To Add More Data:
1. Edit `src/data/ministryDummyData.ts`
2. Add new objects following the existing structure
3. Ensure all required fields are present
4. Use `new Date()` for date fields

### Field Requirements:
- `id`: Unique string identifier
- `hospitalName`: Full hospital name
- `hospitalDistrict`: District name
- `equipmentName`: Equipment description
- `equipmentCategory`: Category type
- `quantity`: Number of units
- `estimatedCost`: Cost in LKR
- `urgency`: 'critical' | 'high' | 'medium' | 'low'
- `reason`: Detailed justification
- `description`: Brief description
- `expectedBeneficiaries`: Number of patients
- `status`: 'pending' | 'approved' | 'denied'
- `submittedAt`: Date object
- `submittedBy`: User ID
- `submitterName`: Full name
- `submitterEmail`: Email address
- `submitterRole`: 'hospital' | 'local_user'

## Benefits

✅ **Immediate Testing**: Dashboard shows realistic data without manual entry
✅ **Development Speed**: No need to create test data repeatedly
✅ **UI/UX Validation**: Test all dashboard features with varied data
✅ **Analytics Testing**: Charts and graphs display properly with diverse data
✅ **Filter Testing**: All filter options have representative data
✅ **Realistic Scenarios**: Based on actual Sri Lankan hospitals and equipment needs

## Next Steps

1. ✅ Dummy data created and integrated
2. ✅ Dashboard loads data automatically
3. ✅ Charts and analytics functional
4. 🔄 Test all filter combinations
5. 🔄 Verify request detail pages work with dummy data
6. 🔄 Test approve/deny functionality with dummy requests

## Notes

- Dummy data uses realistic Sri Lankan hospital names and locations
- Cost estimates are based on approximate medical equipment prices
- Email addresses follow pattern: `department@hospital.health.gov.lk`
- Urgency levels reflect realistic medical equipment priorities
- Dates span from October 5-18, 2025 for variety
