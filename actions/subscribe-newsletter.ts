"use server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function subscribeNewsletter(_: unknown, formData: FormData) {
  const email = formData.get("email")?.toString().trim();

  if (!email || !isValidEmail(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  // Mock request
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    message: "Successfully subscribed!",
  };
}
