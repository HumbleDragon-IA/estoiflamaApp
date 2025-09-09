"use client";

function ActionButton({ children, type, onClick, isSubmit, isPending }) {
  const primary = "bg-green-700  shadow-green-900";
  const secondary = "bg-stone-400 shadow-red-900";
  const cancel = "bg-red-400";

  const classes = `${
    type === "primary"
      ? primary
      : type === "secondary"
      ? secondary
      : type === "cancel"
      ? cancel
      : ""
  } text-sm sm:text-md md:text-xl lg:text-xl p-2 rounded-full shadow-md hover:cursor-pointer`;

  function handleAction(e) {
    e.preventDefault();
    onClick?.(); // por si no viene definido
  }

  if (isSubmit) {
    return (
      <button type="submit" disabled={isPending} className={classes}>
        {children}
      </button>
    );
  }

  return (
    <button type="button" onClick={handleAction} className={classes}>
      {children}
    </button>
  );
}

export default ActionButton;
