"use client";

import Modal from "./Modal";

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  busy?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({ open, title, message, confirmLabel, busy, danger = true, onConfirm, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-[0.95rem] leading-relaxed text-muted">{message}</p>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button type="button" className="btn btn-ghost" onClick={onClose} disabled={busy}>
          Keep it
        </button>
        <button type="button" className={`btn ${danger ? "btn-danger" : "btn-primary"}`} onClick={onConfirm} disabled={busy}>
          {busy ? "Working…" : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
