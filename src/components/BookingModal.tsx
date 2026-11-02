"use client";

import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { Studio } from "@/lib/types";
import Modal from "./Modal";

const HOURS = Array.from({ length: 25 }, (_, i) => `${String(i).padStart(2, "0")}:00`).slice(0, 24);

export default function BookingModal({ studio, open, onClose, onBooked }: { studio: Studio; open: boolean; onClose: () => void; onBooked: () => void }) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState("");
  const [start, setStart] = useState("10:00");
  const [end, setEnd] = useState("12:00");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const hours = Math.max(0, Number(end.slice(0, 2)) - Number(start.slice(0, 2)));
  const total = hours * studio.hourlyRate;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!date) return setError("Please pick a date.");
    if (hours <= 0) return setError("End time must be after the start time.");
    setBusy(true);
    try {
      await api("/bookings", { method: "POST", body: { studioId: studio._id, date, startTime: start, endTime: end } });
      toast.success("Booking request sent. The host will confirm it soon.");
      onBooked();
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Booking failed.";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Book this workspace">
      <form onSubmit={submit} className="space-y-4" noValidate>
        <p className="text-sm text-muted">{studio.title} · ${studio.hourlyRate} / hr</p>
        <div>
          <label htmlFor="b-date" className="label">Date</label>
          <input id="b-date" type="date" min={today} className="field" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="b-start" className="label">Start</label>
            <select id="b-start" className="field" value={start} onChange={(e) => setStart(e.target.value)}>
              {HOURS.map((h) => <option key={h}>{h}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="b-end" className="label">End</label>
            <select id="b-end" className="field" value={end} onChange={(e) => setEnd(e.target.value)}>
              {[...HOURS.slice(1), "24:00"].map((h) => <option key={h}>{h}</option>)}
            </select>
          </div>
        </div>
        <dl className="space-y-1.5 rounded-xl bg-surface2 p-4 text-sm">
          <div className="flex justify-between"><dt className="text-muted">{hours} {hours === 1 ? "hour" : "hours"} × ${studio.hourlyRate}</dt><dd className="font-bold">${total}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Refundable security deposit</dt><dd className="font-bold">${studio.securityDeposit}</dd></div>
        </dl>
        {error && <p role="alert" className="rounded-xl border border-[#b42318]/40 bg-[#b42318]/10 px-3.5 py-2.5 text-sm font-semibold text-[#b42318] dark:text-[#ff8f84]">{error}</p>}
        <div className="flex justify-end gap-3 pt-1">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? "Sending…" : "Request booking"}</button>
        </div>
      </form>
    </Modal>
  );
}
