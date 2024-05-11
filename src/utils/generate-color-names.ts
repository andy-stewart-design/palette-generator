import { type Okhsl, formatHex } from 'culori';

export function generateColorNames(n: number) {
  // Calculate the count for primary and secondary numbers based on the input.
  // If n is less than or equal to 9, use n for primary numbers and 0 for secondary.
  // If n is greater than 9, primary numbers are capped at 9, and secondary numbers are calculated by subtracting 9 from n.
  const primaryNumberCount = n <= 9 ? n : 9;
  const secondaryNumberCount = n <= 9 ? 0 : n - 9;

  // Generate primary and secondary numbers using dedicated functions.
  const primaryNumbers = generateIncrementArray(primaryNumberCount);
  const secondaryNumbers = generateHalfIncrementArray(secondaryNumberCount);

  // Combine the primary and secondary numbers into one array.
  const numbersArray = [...primaryNumbers, ...secondaryNumbers];

  // Check if the total numbers generated match the expected input.
  // If not, throw an error indicating the discrepancy.
  if (numbersArray.length !== n) {
    throw new Error(
      `The amount of numbers generated (${numbersArray.length}) is not equal to the expected number of numbers (${n})`
    );
  }

  // Map each number in the array to be 100 times its value (useful for CSS variables).
  const numbers = numbersArray.map((num) => num * 100);

  // Return the array of numbers sorted in ascending order.
  return numbers.sort((a, b) => a - b);
}

// Generates an array of evenly spaced whole numbers starting from 1, up to a maximum of 9.
function generateIncrementArray(n: number) {
  // Validate the input to ensure it falls within the accepted range.
  if (n < 3 || n > 9) {
    throw new Error(
      `The generateIncrementArray function only accepts numbers between 3 and 9. Instead, it received ${n}.`
    );
  }

  // Initialize the result array and calculate the step between each number.
  const result = [];
  const step = (9 - 1) / (n - 1);

  // Fill the result array with numbers based on the calculated step.
  for (let i = 0; i < n; i++) {
    const value = 1 + i * step;
    result.push(Math.round(value));
  }

  // Return the result array containing the generated numbers.
  return result;
}

// Generates an array of numbers starting at 0.5, with increments potentially up to 9.5, based on input n.
function generateHalfIncrementArray(n: number) {
  // Return an empty array immediately if n is 0.
  if (n === 0) return [];

  // Validate the input to ensure it is within the accepted range.
  if (n < 0 || n > 10) {
    throw new Error(
      `The generateHalfIncrementArray function only accepts numbers between 1 and 10. Instead, it received ${n}.`
    );
  }

  // Start the array with 0.5, which is always included.
  let array = [0.5];

  // If only one number is requested, return the array as is.
  if (n === 1) return array;

  // For more than one number, ensure 9.5 is also included.
  if (n > 1) array.push(9.5);

  // Dynamically fill the array with values between 0.5 and 9.5, adjusting based on the total count.
  for (let i = 1; i < n - 1; i++) {
    // Calculate position and value for insertion, handling the distribution symmetrically from both ends.
    if (i < n / 2) {
      array.splice(i, 0, 0.5 + i);
    } else {
      array.splice(i, 0, 9.5 - (n - (i + 1)));
    }
  }

  // Ensure the array contains the correct number of elements by trimming if necessary.
  return array.slice(0, n);
}

type GeneratePrimitiveCSSVariablesProps = {
  type: 'primitive';
  colors: {
    raw: Okhsl[];
    hex: string[];
    intergerName: number[];
  };
};

type GenerateSemanticCSSVariablesProps = {
  type: 'semantic';
  color: {
    hex: string;
    raw: Okhsl;
    intergerName: number;
    name: string;
  };
};

type GenerateCSSVariablesProps =
  | GeneratePrimitiveCSSVariablesProps
  | GenerateSemanticCSSVariablesProps;

export function generateCSSVariables(props: GenerateCSSVariablesProps) {
  if (props.type === 'semantic') {
    const { color } = props;

    const { l } = color.raw;
    const h = color.raw.h ?? 0;
    const mode = 'okhsl';

    const primary = formatHex({ mode, h, s: 0.95, l: 0.475 });
    const primaryLight = formatHex({ mode, h, s: 0.9, l: 0.95 });
    const primaryLighter = formatHex({ mode, h, s: 0.9, l: 0.85 });
    const primaryDark = formatHex({ mode, h, s: 0.9, l: 0.12 });
    const primaryDarker = formatHex({ mode, h, s: 0.9, l: 0.2 });
    const primaryDesaturated = formatHex({ mode, h, s: 0, l });
    const codeHighlight2 = formatHex({ mode, h: h + 45, s: 0.95, l: 0.5 });
    const codeHighlight3 = formatHex({ mode, h: h - 45, s: 0.95, l: 0.5 });

    return {
      '--color-primary': primary,
      '--color-primary-light': primaryLight,
      '--color-primary-lighter': primaryLighter,
      '--color-primary-dark': primaryDark,
      '--color-primary-darker': primaryDarker,
      '--color-primary-desaturated': primaryDesaturated,
      '--code-highlight-1': primary,
      '--code-highlight-2': codeHighlight2,
      '--code-highlight-3': codeHighlight3,
    };
  } else {
    const { colors } = props;

    const variables = colors.hex.reduce((acc, color, index) => {
      const key = `--color-primary-${colors.intergerName[index]}`;
      const style = { [key]: color };
      return { ...acc, ...style };
    }, {});

    return variables as Record<string, string>;
  }
}
