export const submitLead = async ({
  name,
  email,
  phone,
  source = "Website",
  message = "",
  honeypot = "",
}) => {
  const pageNames = {
    "/": "Home",
    "/about": "About",
    "/services": "Services",
    "/programs": "Programs",
    "/gallery": "Gallery",
    "/blogs": "Blogs",
    "/contact": "Contact Us",
  };
  const rawPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  const pageName = pageNames[rawPath] || rawPath;

  try {
    const response = await fetch("/api/submit-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, source, message, honeypot, pageName }),
    });

    const result = await response.json();

    return {
      success: result.success,
      message:
        result.message ||
        (result.success
          ? "Lead submitted successfully!"
          : "Please try again later."),
    };
  } catch (error) {
    return {
      success: false,
      message: "Please try again later.",
    };
  }
};
