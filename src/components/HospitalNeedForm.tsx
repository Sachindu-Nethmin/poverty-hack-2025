import { useRef, useState } from "react";

type ProofFile = { file: File; id: string };

export default function HospitalNeedForm() {
  // Form state
  const [approvalFile, setApprovalFile] = useState<File | null>(null);
  const [needTitle, setNeedTitle] = useState("");
  const [date, setDate] = useState<string>("");
  const [hospitalName, setHospitalName] = useState("");
  const [unitPrice, setUnitPrice] = useState<string>("");
  const [qty, setQty] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [description, setDescription] = useState("");
  const [officerName, setOfficerName] = useState("");
  const [officerEmail, setOfficerEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [proofFiles, setProofFiles] = useState<ProofFile[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const dropRef = useRef<HTMLDivElement | null>(null);

  // Auto-compute total when unit price or qty changes (if total empty)
  const computeTotalIfPossible = (np?: string, nq?: string) => {
    const price = Number((np ?? unitPrice).replace(/,/g, ""));
    const quantity = Number((nq ?? qty).replace(/,/g, ""));
    if (Number.isFinite(price) && Number.isFinite(quantity) && price > 0 && quantity > 0) {
      setTotalPrice(String(Math.round(price * quantity)));
    }
  };

  const onFilesSelected = (files: FileList | null) => {
    if (!files) return;
    const list: ProofFile[] = [];
    for (const f of Array.from(files)) list.push({ file: f, id: crypto.randomUUID() });
    setProofFiles((p) => [...p, ...list]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFilesSelected(e.dataTransfer.files);
    dropRef.current?.classList.remove("ring-2", "ring-emerald-500");
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dropRef.current?.classList.add("ring-2", "ring-emerald-500");
  };
  const handleDragLeave = () => {
    dropRef.current?.classList.remove("ring-2", "ring-emerald-500");
  };

  const resetForm = () => {
    setApprovalFile(null);
    setNeedTitle("");
    setDate("");
    setHospitalName("");
    setUnitPrice("");
    setQty("");
    setTotalPrice("");
    setDescription("");
    setOfficerName("");
    setOfficerEmail("");
    setTelephone("");
    setProofFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // simple validation
    if (!needTitle || !hospitalName || !unitPrice || !qty || !totalPrice) {
      alert("Please fill Hospital requirement, Hospital name, Price, Quantity and Total.");
      return;
    }
    setSubmitting(true);

    // TODO: replace with your API call / Supabase insert
    const payload = {
      approvalFileName: approvalFile?.name ?? null,
      needTitle,
      date,
      hospitalName,
      unitPrice: Number(unitPrice),
      quantity: Number(qty),
      totalPrice: Number(totalPrice),
      description,
      officerName,
      officerEmail,
      telephone,
      proofs: proofFiles.map((p) => p.file.name),
    };
    console.log("Submitting:", payload);

    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    alert("Request submitted! (See console for payload)");
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Title row (keep minimal since header may be outside the component) */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold">Submit New Hospital Need</h1>
        <p className="text-sm text-gray-600">Authorized hospital officers only.</p>
      </div>

      {/* Top two-column groups */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Certified Approval */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Upload the Image
          </label>
          <div className="flex items-center gap-3">
            <input
              id="approval"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setApprovalFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:text-white file:px-3 file:py-2 hover:file:bg-gray-800"
            />
            {approvalFile && <span className="text-xs text-gray-600 truncate">{approvalFile.name}</span>}
          </div>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Add the Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Requirement & Hospital */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Add the hospital requirement</label>
          <input
            value={needTitle}
            onChange={(e) => setNeedTitle(e.target.value)}
            placeholder="Type here add hospital requirement"
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Add the hospital Name</label>
          <input
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            placeholder="Type here add hospital Name"
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
      </div>

      {/* Price/Qty/Total */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Add the Price of the Equipment (LKR)</label>
          <input
            inputMode="numeric"
            value={unitPrice}
            onChange={(e) => {
              const v = e.target.value.replace(/[^\d]/g, "");
              setUnitPrice(v);
              computeTotalIfPossible(v, undefined);
            }}
            placeholder="Add the Price of the Equipment"
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Quantity of the Equipments</label>
          <input
            inputMode="numeric"
            value={qty}
            onChange={(e) => {
              const v = e.target.value.replace(/[^\d]/g, "");
              setQty(v);
              computeTotalIfPossible(undefined, v);
            }}
            placeholder="Quantity"
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Set the Total Price of the Equipment (LKR)</label>
          <input
            inputMode="numeric"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="Set the Total Price of the Equipment"
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
      </div>

      {/* Description & Proofs */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Add the Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={7}
            placeholder="Type your Description Here"
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Proof documents */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Upload the Proof Documents</label>
          <div
            ref={dropRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className="border-2 border-dashed rounded-xl p-6 text-center text-sm text-gray-600"
          >
            <div className="space-y-2">
          <label className="block text-sm font-medium">
            Upload the Image
          </label>
          <div className="flex items-center gap-3">
            <input
              id="approval"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setApprovalFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:text-white file:px-3 file:py-2 hover:file:bg-gray-800"
            />
            {approvalFile && <span className="text-xs text-gray-600 truncate">{approvalFile.name}</span>}
          </div>
        </div>
            {/* <p className="mb-3">Click or drag file to this area to upload</p>
            <input
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => onFilesSelected(e.target.files)}
              className="mx-auto block text-sm"
            /> */}
          </div>

          {/* Selected proofs */}
          {proofFiles.length > 0 && (
            <ul className="mt-3 space-y-2 text-sm">
              {proofFiles.map((p) => (
                <li key={p.id} className="flex items-center justify-between rounded-md border px-3 py-2">
                  <span className="truncate">{p.file.name}</span>
                  <button
                    type="button"
                    className="text-red-600 hover:underline"
                    onClick={() => setProofFiles((prev) => prev.filter((x) => x.id !== p.id))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Officer contacts */}
      <div className="space-y-4">
        <h2 className="font-semibold">Contact Details of the Officer</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Add the Name of the Officer</label>
            <input
              value={officerName}
              onChange={(e) => setOfficerName(e.target.value)}
              placeholder="Type the name Here"
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Add the Email of the Officer</label>
            <input
              type="email"
              value={officerEmail}
              onChange={(e) => setOfficerEmail(e.target.value)}
              placeholder="Type the Email Here"
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Telephone Number</label>
            <input
              inputMode="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="Type the Telephone Number Here"
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
        <button
          type="button"
          onClick={resetForm}
          className="px-6 py-3 rounded-md border bg-gray-100 text-gray-800 hover:bg-gray-200"
        >
          Cancel Request
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Send Request"}
        </button>
      </div>
    </form>
  );
}