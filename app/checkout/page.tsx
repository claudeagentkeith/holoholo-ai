import { SectionTitle } from "@/components/section-title";

export default function CheckoutPage() {
  return (
    <div className="page-shell">
      <div className="card p-6">
        <SectionTitle
          eyebrow="Deposit checkout"
          title="Stripe deposit sessions are launched via the intake flow"
          description="This route is reserved for future embedded checkout or post-checkout UX. For now, the landing page starts the deposit flow and redirects to Stripe."
        />
      </div>
    </div>
  );
}
