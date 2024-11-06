import { InstructionsSectionProps } from "@/types";

export default function InstructionsList({
  instructions,
}: InstructionsSectionProps) {
  const formatInstructions = (instructions: string) => {
    return instructions
      .split(".")
      .filter((step) => step.trim() !== "")
      .map((step) => step.trim());
  };

  if (!instructions) {
    return (
      <div className="mb-8">
        <h2 className="text-[24px] font-bold mb-4">Instructions:</h2>
        <p>No instructions available for this recipe.</p>
      </div>
    );
  }

  const steps = formatInstructions(instructions);

  return (
    <div className="mb-8">
      <h2 className="text-[24px] font-bold mb-4">Instructions:</h2>
      <ol className="list-decimal list-inside space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="text-[18px]">
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
