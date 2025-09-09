"use client";
export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Algo Salió mal: </h1>
      <p className="text-lg">{error.message}</p>

      <button
        onClick={reset}
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 rounded-full hover:cursor-pointer text-lg bg-stone-400"
      >
        Intentalo nuevamente
      </button>
    </main>
  );
}
