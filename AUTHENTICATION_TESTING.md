# 🔍 Authentication Testing Guide

## Testing the Login Flow

### Demo Accounts

1. **Health Ministry Admin**
   - Email: `admin@health.gov.lk`
   - Password: `admin123`
   - Should redirect to: `/dashboard/ministry`

2. **Hospital User**
   - Email: `hospital@cgh.lk`
   - Password: `hospital123`
   - Should redirect to: `/dashboard/hospital`

3. **Local User / Donor**
   - Email: `user@example.com`
   - Password: `user123`
   - Should redirect to: `/` (homepage)

---

## Troubleshooting Login Issues

### If you get "Invalid email or password":

1. **Check the URL**: Make sure you're at `http://localhost:5176/auth` (or your dev server URL)

2. **Clear Browser Cache**:
   ```
   - Press F12 to open DevTools
   - Go to Application tab
   - Click "Clear storage" → "Clear site data"
   - Refresh the page
   ```

3. **Check localStorage**:
   ```javascript
   // Open browser console (F12) and run:
   localStorage.clear()
   location.reload()
   ```

4. **Verify the form is submitting**:
   - Open DevTools → Console tab
   - Look for any error messages
   - Check Network tab for API calls

---

## Step-by-Step Test

### Test 1: Admin Login
```
1. Navigate to http://localhost:5176/auth
2. Make sure "Sign In" tab is selected (not "Sign Up")
3. Click on "Health Ministry Officer" role (blue card on left)
4. Enter email: admin@health.gov.lk
5. Enter password: admin123
6. Click "Sign In"
7. Should redirect to /dashboard/ministry
8. You should see the blue ministry dashboard with analytics
```

### Test 2: Hospital Login
```
1. If logged in, click Logout
2. Back at /auth page
3. Click on "Hospital User" role (green card)
4. Enter email: hospital@cgh.lk
5. Enter password: hospital123
6. Click "Sign In"
7. Should redirect to /dashboard/hospital
8. You should see hospital dashboard with "Request Need" button
```

### Test 3: Complete Workflow
```
1. Login as hospital user (hospital@cgh.lk / hospital123)
2. Click "Request Need" button
3. Fill out the form:
   - Equipment: Ventilator Machine
   - Category: Medical Equipment
   - Quantity: 5
   - Estimated Cost: 5000000
   - Urgency: Critical
   - Expected Beneficiaries: 500
   - Reason: ICU shortage during emergency
4. Submit form
5. Go to dashboard → see request with "Pending" status
6. Logout
7. Login as admin (admin@health.gov.lk / admin123)
8. See the pending request in ministry dashboard
9. Click "View Request"
10. Click "Approve" with note: "Approved for immediate procurement"
11. Go to homepage (/) 
12. See the approved request in DonationGrid with green "Ministry Approved" banner
```

---

## Common Issues

### Issue: Page stays on /auth after login
**Solution**: Check browser console for navigation errors. The navigate() function should work after successful login.

### Issue: "Invalid email or password" with correct credentials
**Solution**: 
1. Check if AuthContext is properly wrapped in main.tsx
2. Verify MOCK_USERS array in AuthContext.tsx has the correct credentials
3. Clear localStorage and try again

### Issue: Redirects to wrong dashboard
**Solution**: Make sure you selected the correct role on the left panel before entering credentials.

### Issue: Can't see approved requests in DonationGrid
**Solution**: 
1. Make sure the request was actually approved (check localStorage)
2. Navigate to homepage (/) not /auth
3. Refresh the page to reload approved requests

---

## Debug Commands (Browser Console)

### Check current user:
```javascript
JSON.parse(localStorage.getItem('user'))
```

### Check all hospital requests:
```javascript
JSON.parse(localStorage.getItem('hospitalRequests'))
```

### Check approved requests only:
```javascript
JSON.parse(localStorage.getItem('hospitalRequests')).filter(r => r.status === 'approved')
```

### Manually create a test request:
```javascript
const testRequest = {
  id: 'test-' + Date.now(),
  submittedBy: '2',
  submitterName: 'Dr. Test',
  submitterEmail: 'hospital@cgh.lk',
  submitterRole: 'hospital',
  hospitalName: 'Test Hospital',
  hospitalDistrict: 'Colombo',
  equipmentName: 'Test Equipment',
  equipmentCategory: 'Medical',
  quantity: 1,
  estimatedCost: 100000,
  urgency: 'high',
  description: 'Test description',
  reason: 'Test reason',
  expectedBeneficiaries: 100,
  status: 'approved',
  submittedAt: new Date(),
  reviewedAt: new Date(),
  reviewedBy: 'Admin',
  adminNotes: 'Test approval'
};

const requests = JSON.parse(localStorage.getItem('hospitalRequests') || '[]');
requests.push(testRequest);
localStorage.setItem('hospitalRequests', JSON.stringify(requests));
location.reload();
```

---

## Expected Behavior

### After Login:
- ✅ User data stored in localStorage
- ✅ Navigate to role-specific dashboard
- ✅ Header shows username and logout button
- ✅ Role-specific action button appears

### Ministry Dashboard:
- ✅ See bar charts with analytics
- ✅ Stats cards show correct counts
- ✅ Request tiles display pending requests
- ✅ "View Request" button works

### Hospital Dashboard:
- ✅ See your submitted requests
- ✅ Filter by status works
- ✅ "Request Need" button navigates to form
- ✅ Approval/denial notes display correctly

### Public Homepage:
- ✅ Approved requests show in DonationGrid
- ✅ Green "Ministry Approved" banner visible
- ✅ Urgency badges display
- ✅ Beneficiary count shows
- ✅ "Donate Now" button works

---

## Contact Developer
If issues persist, check:
1. Browser console for JavaScript errors
2. Network tab for failed API calls (shouldn't be any - it's all localStorage)
3. React DevTools to inspect component state

The authentication system is fully functional and tested. The most common issue is browser cache - clearing it usually resolves login problems.
