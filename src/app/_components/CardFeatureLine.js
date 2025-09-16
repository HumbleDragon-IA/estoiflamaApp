function CardFeatureLine({ label, children }) {
  return (
    <h2 className="capitalize">
      <span className="font-bold text-lg">{label}: </span>
      {children}
    </h2>
  );
}

export default CardFeatureLine;
