import type { Booking } from "./types";

// Builds a one-page PDF receipt in the browser; jsPDF is loaded only when a guest asks for one.
export async function downloadInvoice(b: Booking, guestEmail: string) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const left = 56;
  let y = 70;
  doc.setFont("times", "bold").setFontSize(26).text("StudioSpace", left, y);
  doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(110).text("Booking receipt", left, (y += 18));
  doc.setTextColor(0);
  doc.setDrawColor(200).line(left, (y += 18), 540, y);

  const row = (label: string, value: string) => {
    doc.setFont("helvetica", "bold").setFontSize(10).text(label, left, (y += 24));
    doc.setFont("helvetica", "normal").text(value, 200, y);
  };
  row("Reference", b._id.slice(-8).toUpperCase());
  row("Status", b.status);
  row("Guest", `${b.userName} (${guestEmail})`);
  row("Studio", b.studioTitle);
  row("Location", b.studioLocation);
  row("Date", b.date);
  row("Time", `${b.startTime} to ${b.endTime} (${b.hours} ${b.hours === 1 ? "hour" : "hours"})`);
  doc.line(left, (y += 22), 540, y);
  row("Rate", `$${b.hourlyRate.toFixed(2)} per hour`);
  row("Studio fee", `$${b.total.toFixed(2)}`);
  row("Security deposit (refundable)", `$${b.securityDeposit.toFixed(2)}`);
  doc.setFont("helvetica", "bold").setFontSize(12).text("Total due", left, (y += 34));
  doc.text(`$${(b.total + b.securityDeposit).toFixed(2)}`, 200, y);
  doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(110).text("Thank you for booking with StudioSpace. The security deposit is returned after the session if the space is left as found.", left, (y += 46), { maxWidth: 480 });
  doc.save(`studiospace-receipt-${b._id.slice(-6)}.pdf`);
}
