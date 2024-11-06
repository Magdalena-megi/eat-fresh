import { InstructionsSectionProps } from "@/types";

export default function InstructionsSection({
  instructions,
}: InstructionsSectionProps) {
  return (
    <section className="mt-4">
      <h2 className="text-lg font-medium mb-2">Instructions</h2>
      <p className="text-base leading-relaxed">
        {instructions || "No instructions available."}
      </p>
    </section>
  );
}
