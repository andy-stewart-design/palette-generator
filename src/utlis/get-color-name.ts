export async function getColorName(hex: string) {
  const baseURL = "https://www.thecolorapi.com/id?hex=";

  try {
    const response = await fetch(baseURL + hex.replace("#", ""));
    if (response.status === 400) throw new Error("Invalid hex code");
    const data = await response.json();
    return data.name.value;
  } catch (error) {
    console.error(error);
  }
}
