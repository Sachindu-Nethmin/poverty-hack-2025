
import { useState } from "react";

export type AdminUserFormData = {
  firstName: string;
  lastName: string;
  nic: string;                 // Sri Lankan NIC (9 digits + V/X or 12 digits)
  contactNumber: string;       // e.g., 07XXXXXXXX
  email: string;
  address: string;
  profession: string;
  hospitalName: string;
  workIdFile: File | null;     // uploaded staff/work ID
};

type Props = {
  onSubmit?: (data: AdminUserFormData) => Promise<void> | void;
};

const nicRegex = /^(?:\d{9}[vVxX]|\d{12})$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(?:0|\+94)?7\d{8}$/; // common SL mobile formats

export default function AdminUserRegistrationForm({ onSubmit }: Props) {
  const [form, setForm] = useState<AdminUserFormData>({
    firstName: "",
    lastName: "",
    nic: "",
    contactNumber: "",
    email: "",
    address: "",
    profession: "",
    hospitalName: "",
    workIdFile: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof AdminUserFormData>(key: K, value: AdminUserFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!nicRegex.test(form.nic.trim())) e.nic = "Enter a valid NIC (9 digits + V/X or 12 digits).";
    if (!phoneRegex.test(form.contactNumber.trim()))
      e.contactNumber = "Enter a valid Sri Lankan mobile number (07XXXXXXXX or +947XXXXXXXX).";
    if (!emailRegex.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (!form.address.trim()) e.address = "Address is required.";
    if (!form.profession.trim()) e.profession = "Profession is required.";
    if (!form.hospitalName.trim()) e.hospitalName = "Hospital name is required.";
    if (!form.workIdFile) e.workIdFile = "Upload your staff/work ID.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(form);
      } else {
        // Demo: remove when hooking to backend
        console.log("Admin user payload:", form);
        alert("Submitted! (Check console for payload)");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-6 bg-white border rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Register New Admin User</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="e.g., Induma"
          />
          {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="e.g., Withanage"
          />
          {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
        </div>

        {/* NIC */}
        <div>
          <label className="block text-sm font-medium">NIC No</label>
          <input
            value={form.nic}
            onChange={(e) => update("nic", e.target.value.trim())}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="e.g., 200012345678 or 123456789V"
          />
          {errors.nic && <p className="text-xs text-red-600 mt-1">{errors.nic}</p>}
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium">Contact Number</label>
          <input
            inputMode="tel"
            value={form.contactNumber}
            onChange={(e) => update("contactNumber", e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="07XXXXXXXX"
          />
          {errors.contactNumber && <p className="text-xs text-red-600 mt-1">{errors.contactNumber}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="name@example.com"
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        {/* Profession */}
        <div>
          <label className="block text-sm font-medium">Profession</label>
          <input
            value={form.profession}
            onChange={(e) => update("profession", e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="e.g., Medical Officer"
          />
          {errors.profession && <p className="text-xs text-red-600 mt-1">{errors.profession}</p>}
        </div>

        {/* Hospital */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Hospital Name</label>
          <input
            value={form.hospitalName}
            onChange={(e) => update("hospitalName", e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="e.g., Chilaw General Hospital"
          />
          {errors.hospitalName && <p className="text-xs text-red-600 mt-1">{errors.hospitalName}</p>}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Personal Address</label>
          <textarea
            rows={3}
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="Street, City, District, Postal code"
          />
          {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
        </div>

        {/* Work ID Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Upload Work ID</label>
          <div className="mt-1 flex items-center gap-3">
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => update("workIdFile", e.target.files?.[0] ?? null)}
              className="text-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:text-white file:px-3 file:py-2 hover:file:bg-gray-800"
            />
            {form.workIdFile && (
              <span className="text-xs text-gray-600 truncate">{form.workIdFile.name}</span>
            )}
          </div>
          {errors.workIdFile && <p className="text-xs text-red-600 mt-1">{errors.workIdFile}</p>}
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-md bg-emerald-600 text-white px-6 py-3 font-semibold hover:bg-emerald-700 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}