import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

// Icons and images
import { CartIcon } from "@/components/AppIcons";

// Components
import SliderInput from "./sliderInput";
import TwoWayToggleSwitch from "../common/TwoWayToggleSwitch";

// Auth / API logic
import { addCredits, cancelSubscription } from "@/libs/api/auth";

// Importamos la configuración central
import { useSubscription } from "@/libs/hooks/useSubscription";
import { Transaction } from "@/libs/definitions";

interface SubscriptionTabProps {
  transactions: Transaction[];
}

function SubscriptionTab({ transactions = [] }: SubscriptionTabProps) {
  const [currentApplications, setCurrentApplications] = useState(300);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isCancellingSubscription, setIsCancellingSubscription] = useState(false);
  // Añadimos un estado para rastrear las transacciones ya procesadas
  const [processedTransactions, setProcessedTransactions] = useState<Set<string>>(new Set());

  const {
    sliderValue,
    setSliderValue,
    paymentPlan,
    setPaymentPlan,
    isLoading,
    values,
    calculateTotal,
    getPricePerApplication,
    handlePurchase,
  } = useSubscription();

  const totals = calculateTotal(currentApplications);
  const searchParams = useSearchParams();

  // Determinar si hay un plan activo basado en las transacciones
  const activeSubscription = transactions.find(
    tx => tx.transaction_type === 'plan_purchase' && tx.is_subscription_active === true
  );

  // Obtener el valor del plan activo (si existe)
  const activePlanValue = activeSubscription ? parseInt(activeSubscription.amount) : null;

  // Manejador para cancelar la suscripción
  const handleCancelSubscription = async () => {
    if (!activeSubscription || !activeSubscription.subscription_id) {
      toast.error("No active subscription found to cancel");
      return;
    }

    // Confirmación antes de cancelar
    if (!window.confirm("Are you sure you want to cancel your subscription? This action cannot be undone.")) {
      return;
    }

    setIsCancellingSubscription(true);

    try {
      const result = await cancelSubscription(activeSubscription.subscription_id);

      if (result.success) {
        toast.success("Your subscription has been successfully cancelled");
        // Recargar la página para actualizar los datos
        window.location.reload();
      } else {
        toast.error(result.error || "Failed to cancel subscription. Please try again later.");
      }
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsCancellingSubscription(false);
    }
  };

  // Check Stripe checkout result
  useEffect(() => {
    const success = searchParams.get("success");
    const credits = searchParams.get("credits");
    const sessionId = searchParams.get("session_id");

    // Evitar procesar si no hay parámetros o si ya se está procesando
    if (!success || !credits || !sessionId || isProcessingPayment) {
      return;
    }

    // Verificar si esta transacción ya fue procesada para evitar duplicados
    if (processedTransactions.has(sessionId)) {
      // Ya procesamos esta transacción, solo limpiamos la URL
      cleanUrlParams();
      return;
    }

    setIsProcessingPayment(true);

    if (success === "true") {
      const creditsAmount = parseInt(credits);

      // Registrar esta transacción como procesada
      setProcessedTransactions(prev => new Set(prev).add(sessionId));

      // Nuevo código: obtener el Transaction ID antes de añadir créditos
      fetch(`/api/stripe/get-transaction-id?session_id=${sessionId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to get transaction ID");
          }
          return response.json();
        })
        .then(data => {
          const referenceId = data.subscriptionId || data.paymentIntentId || sessionId;

          return addCredits(
            creditsAmount,
            referenceId,
            `Added ${creditsAmount} applications via Stripe (${referenceId.startsWith("sub_") ? "Subscription" : "Payment"}: ${referenceId})`
          );
        })
        .then(() => {
          setCurrentApplications((prev) => prev + creditsAmount);
          toast.success(
            `Payment successful! ${creditsAmount} applications have been added to your account.`,
            { id: `payment-success-${sessionId}` } // ID único para el toast
          );
        })
        .catch((error) => {
          console.error("Failed to process payment completion:", error);
          toast.error(
            "Payment was successful, but we couldn't update your balance. Please contact support.",
            { id: `payment-error-${sessionId}` } // ID único para el toast
          );
        })
        .finally(() => {
          cleanUrlParams();
          setTimeout(() => {
            setIsProcessingPayment(false);
          }, 1000);
        });
    } else if (success === "false") {
      toast.error("Payment process was cancelled or could not be completed.",
        { id: "payment-cancelled" });
      cleanUrlParams();
      setIsProcessingPayment(false);
    }
  }, [isProcessingPayment, processedTransactions, searchParams]);

  // Clean URL params - mejorado para ser más robusto
  const cleanUrlParams = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const fromSearch = url.searchParams.get("from") === "search";
      const returnUrl = localStorage.getItem('creditsPurchaseReturnUrl');

      url.searchParams.delete("success");
      url.searchParams.delete("credits");
      url.searchParams.delete("session_id");

      window.history.replaceState({}, document.title, url.pathname);
      if (fromSearch && returnUrl) {
        // Clear the stored URL
        localStorage.removeItem('creditsPurchaseReturnUrl');
        // Redirect to the original search page
        window.location.href = returnUrl;
      } else {
        // Usar replace state directamente para evitar problemas con router.replace
        window.history.replaceState({}, document.title, url.pathname);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl flex flex-col gap-6">
      {/* Toggle row */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <TwoWayToggleSwitch value={paymentPlan} onChange={setPaymentPlan} />
        {paymentPlan === "monthly" && (
          <div className="pill bg-green-100 text-green-700 font-semibold px-3 py-1 border border-green-300 shadow-sm animate-pulse">
            Save 20% Instantly!
          </div>
        )}
      </div>

      {/* Main box: Title, Slider, Price & Purchase */}
      <div className="border border-my-neutral-3 rounded-lg p-5 flex flex-col gap-4">
        {/* Title */}
        <h2 className="font-montserrat text-xl font-semibold text-black">
          Job Application Credits
        </h2>

        {/* Slider */}
        <div className="relative pb-6">
          <SliderInput
            values={values}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
          />
          {/* "Current plan" label basado en el plan activo del usuario */}
          {activeSubscription && values[sliderValue].value === activePlanValue?.toString() && (
            <div className="text-primary-deep-purple text-sm font-semibold absolute left-0 right-0 bottom-2 text-center">
              Current plan
            </div>
          )}
        </div>

        {/* Row: left -> credit equivalency, right -> price & purchase */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2">
          {/* Left: 1 Credit = ... */}
          <div className="text-my-neutral-5 text-sm font-jura leading-5">
            1 Credit = €{getPricePerApplication()} <br />
            1 Credit = 1 Job Application
          </div>

          {/* Right: Price & Purchase */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="font-montserrat text-sm text-my-neutral-5">
              {(sliderValue === 4
                ? (sliderValue + 1) * 100 * 2
                : sliderValue === 3
                  ? (sliderValue + 1) * 100 + 100
                  : (sliderValue + 1) * 100)} applications
              {paymentPlan === "monthly" && " / month"}
            </p>
            <p className="font-montserrat text-2xl font-bold text-black mr-2">
              {paymentPlan === "monthly"
                ? `€${totals.price} / month`
                : `€${totals.price}`}
            </p>
            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className="flex items-center gap-2 bg-secondary rounded-xl px-5 py-2 font-jura font-semibold disabled:opacity-70"
            >
              {isLoading ? "Processing..." : paymentPlan === "monthly" ? "Purchase" : "One-time payment"}
              <CartIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Mostrar información de suscripción activa solo si existe y estamos en plan mensual */}
      {activeSubscription && paymentPlan === "monthly" && (
        <div className="border border-my-neutral-3 rounded-lg p-5 flex flex-col gap-4">
          <h3 className="font-montserrat text-xl font-semibold text-black">
            Active Subscription
          </h3>

          <div className="flex items-center gap-2">
            <p className="font-jura text-base font-semibold text-black">
              Plan:
            </p>
            <p className="font-jura text-base text-black">
              {parseInt(activeSubscription.amount)} credits monthly
            </p>
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600">
              Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            <p className="font-jura text-base font-semibold text-black">
              Next Renewal:
            </p>
            <p className="font-jura text-base text-black">
              {(() => {
                // Calcular la fecha de renovación (un mes después de la creación)
                const creationDate = new Date(activeSubscription.created_at);
                const renewalDate = new Date(creationDate);
                renewalDate.setMonth(renewalDate.getMonth() + 1);

                // Formatear la fecha para mostrarla
                return renewalDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });
              })()}
            </p>
          </div>

          {/* Contenedor para nota y botón, con el botón alineado a la derecha */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-2">
            <p className="text-xs text-my-neutral-5 md:w-2/3">
              You will still have access until the end of your current billing period.
            </p>

            {/* Botón para cancelar la suscripción - ahora en la esquina inferior derecha */}
            <button
              onClick={handleCancelSubscription}
              disabled={isCancellingSubscription}
              className="
                mt-3 md:mt-0
                px-4 py-2
                text-sm font-jura font-semibold
                border border-red-500
                text-red-500
                rounded-lg
                transition-colors duration-200
                hover:bg-red-500 hover:text-white
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isCancellingSubscription ? "Cancelling..." : "Cancel Subscription"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscriptionTab;
