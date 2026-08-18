export async function sendFonnteMessage(targetNumber: string, message: string) {
  const fonnteToken = process.env.FONNTE_TOKEN;
  
  if (!fonnteToken) {
    console.error("[Fonnte] Error: FONNTE_TOKEN is not defined in .env");
    return false;
  }

  try {
    const response = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        "Authorization": fonnteToken,
      },
      body: new URLSearchParams({
        target: targetNumber,
        message: message,
        countryCode: "62", // Default Indonesia
      }),
    });

    const data = await response.json();
    
    if (data.status) {
      console.log(`[Fonnte] Success sending message to ${targetNumber}`);
      return true;
    } else {
      console.error(`[Fonnte] API Error: ${data.reason}`);
      return false;
    }
  } catch (error) {
    console.error("[Fonnte] Network or Fetch Error:", error);
    return false;
  }
}
