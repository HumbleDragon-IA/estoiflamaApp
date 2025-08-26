import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="py-3 hover:cursor-pointer hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-1 font-semibold text-primary-200 w-full">
        <span>Sign out</span>
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
      </button>
    </form>
  );
}

export default SignOutButton;
