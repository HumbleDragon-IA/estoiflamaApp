"use server";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/impresiones",
  });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createImpresionAction(formData) {}
