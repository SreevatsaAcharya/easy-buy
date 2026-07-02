type PriceTagProps = {
  price: number;
  sale?: boolean;
  size?: "sm" | "lg";
  onPaper?: boolean;
  className?: string;
};

export default function PriceTag({
  price,
  sale = false,
  size = "sm",
  onPaper = false,
  className = "",
}: PriceTagProps) {
  const classes = [
    "price-tag",
    sale && "price-tag--sale",
    size === "lg" && "price-tag--lg",
    onPaper && "price-tag--on-paper",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>${price.toFixed(2)}</span>;
}
