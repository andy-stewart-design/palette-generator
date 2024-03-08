export async function generateSVG(hexColors: string[]) {
  const chipWidth = 112;
  const chipHeight = 136;
  const chipPadding = 8;

  const svgPadding = 8;
  const svgWidth =
    hexColors.length * chipWidth + (hexColors.length + 1) * svgPadding;
  const svgHeight = chipHeight + svgPadding * 2;

  const swatchSize = 96;

  const textSize = 10;
  const borderRadius = 4;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", `${svgWidth}px`);
  svg.setAttribute("height", `${svgHeight}px`);

  hexColors.forEach((color: string, index: number) => {
    const group: SVGElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );

    const chipOffsetX = index * (chipWidth + svgPadding) + svgPadding;
    const chip: SVGRectElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    chip.setAttribute("x", chipOffsetX.toString());
    chip.setAttribute("y", svgPadding.toString());
    chip.setAttribute("width", chipWidth.toString());
    chip.setAttribute("height", chipHeight.toString());
    chip.setAttribute("fill", "white");
    chip.setAttribute("rx", borderRadius.toString());
    chip.setAttribute("ry", borderRadius.toString());

    const rectOffsetX =
      index * chipWidth + index * svgPadding + (svgPadding + chipPadding);
    const rect: SVGRectElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    rect.setAttribute("x", rectOffsetX.toString());
    rect.setAttribute("y", (svgPadding + chipPadding).toString());
    rect.setAttribute("width", swatchSize.toString());
    rect.setAttribute("height", swatchSize.toString());
    rect.setAttribute("fill", color);

    const textOffsetY =
      textSize + svgPadding + chipPadding + swatchSize + chipPadding;
    const text: SVGTextElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    text.setAttribute("x", rectOffsetX.toString());
    text.setAttribute("y", textOffsetY.toString());
    text.setAttribute("fill", "#000");
    text.setAttribute("font-size", textSize.toString());
    text.setAttribute("font-weight", "600");
    text.textContent = color;

    group.appendChild(chip);
    group.appendChild(rect);
    group.appendChild(text);

    svg.appendChild(group);
  });

  const svgString: string = new XMLSerializer().serializeToString(svg);

  try {
    await navigator.clipboard.writeText(svgString);
    console.log("SVG copied to clipboard successfully!");
  } catch (err) {
    console.error("Failed to copy SVG to clipboard:", err);
  }
}
