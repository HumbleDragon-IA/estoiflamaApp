import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default async function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-xl font-semibold">
        Logueate para acceder a la aplicacion
      </h2>
      <SignInButton />
    </div>
  );
}
