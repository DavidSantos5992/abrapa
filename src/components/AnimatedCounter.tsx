import { useCounterAnimation } from "@/hooks/useCounterAnimation";

interface AnimatedCounterProps {
  value: string;
  label: string;
  index: number;
}

const AnimatedCounter = ({ value, label, index }: AnimatedCounterProps) => {
  // Extrair o número da string (ex: "3.000+" -> 3000)
  const extractNumber = (str: string): number => {
    const cleaned = str.replace(/[^\d]/g, "");
    return parseInt(cleaned, 10) || 0;
  };

  // Extrair sufixo (ex: "3.000+" -> "+")
  const extractSuffix = (str: string): string => {
    return str.replace(/[\d.,]/g, "");
  };

  // Formatar número com pontos (ex: 3000 -> "3.000")
  const formatNumber = (num: number): string => {
    return num.toLocaleString("pt-BR");
  };

  const targetNumber = extractNumber(value);
  const suffix = extractSuffix(value);

  const { count, elementRef } = useCounterAnimation({
    end: targetNumber,
    duration: 2000 + (index * 200), // Delay progressivo
    start: 0,
  });

  return (
    <div
      ref={elementRef}
      className="text-center animate-scale-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
        {/\d/.test(value) ? <>{formatNumber(count)}{suffix}</> : value}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-medium">
        {label}
      </div>
    </div>
  );
};

export default AnimatedCounter;
