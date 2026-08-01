import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function AdminBackButton() {
  const navigate = useNavigate();

  function handleClick() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate({ to: "/", replace: false });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Go back"
      className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground backdrop-blur transition hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back</span>
    </button>
  );
}
