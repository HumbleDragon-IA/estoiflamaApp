function ActionButton({ children, action, type }) {
  const primary = "bg-green-700  shadow-green-900";
  const secondary = "bg-stone-400 shadow-red-900";
  const cancel = "bg-red-400";
  return (
    <button
      onClick={action}
      className={`${
        type === "primary"
          ? primary
          : type === "secondary"
          ? secondary
          : type === "cancel"
          ? cancel
          : ""
      } text-sm p-2 rounded-full shadow-md`}
    >
      {children}
    </button>
  );
}

export default ActionButton;
