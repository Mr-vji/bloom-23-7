import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";

function interpolateColor(color1, color2, factor) {
   const result = [];
   for (let i = 0; i < 3; i++) {
      result[i] = Math.round(color1[i] + factor * (color2[i] - color1[i]));
   }
   result[3] =
      color1[3] !== undefined && color2[3] !== undefined
         ? color1[3] + factor * (color2[3] - color1[3])
         : 1;
   return `rgba(${result[0]}, ${result[1]}, ${result[2]}, ${result[3]})`;
}

function parseRGBA(rgbaString) {
   const parts = rgbaString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/);
   if (!parts) return [0, 0, 0, 1];
   return [
      parseInt(parts[1]),
      parseInt(parts[2]),
      parseInt(parts[3]),
      parts[4] ? parseFloat(parts[4]) : 1,
   ];
}

export function BackgroundChanger() {
   const scroll = useScroll();

   const startDeg = 180;
   const endDeg = 0;

   const startColor1 = parseRGBA("rgba(45, 53, 142, 1)");
   const endColor1 = parseRGBA("rgba(255, 255, 255, 1)"); // This is white for the initial interpolation

   const commonColor2 = "rgba(117, 167, 218, 1)";
   const pureWhite = "rgb(255, 255, 255)"; // Pure white color

   // Define the specific gradient for the end of page 2 / start of page 3
   const transitionGradientStartColor1 = parseRGBA("rgba(117, 167, 218, 1)");
   const transitionGradientEndColor1 = parseRGBA("rgba(255, 255, 255, 1)");

   useFrame(() => {
      const scrollOffset = scroll.offset;
      let newBackground;

      // Page 1 and part of Page 2 (0 to 0.45, for example, to allow fade to start before 0.5)
      if (scrollOffset < 0.45) {
         const progress = Math.min(1, Math.max(0, scrollOffset * (1 / 0.45))); // Scale progress to 0-1 over this segment
         const currentDeg = startDeg + progress * (endDeg - startDeg);
         const currentColor1 = interpolateColor(startColor1, endColor1, progress);
         newBackground = `linear-gradient(${currentDeg}deg, ${currentColor1} 0%, ${commonColor2} 83%)`;
      }
      // Transition from the gradient to pure white (e.g., from 0.45 to 0.55)
      else if (scrollOffset >= 0.45 && scrollOffset < 0.55) {
         // Calculate progress for the fade section (0 to 1 over this small range)
         const fadeProgress = Math.min(1, Math.max(0, (scrollOffset - 0.45) / 0.1)); // 0.1 is the duration of the fade (0.55 - 0.45)

         // Interpolate the colors of the *specific* gradient to fade from
         const interpolatedFadeStartColor = interpolateColor(startColor1, endColor1, 1); // This is effectively endColor1 (white)
         const interpolatedFadeEndColor = parseRGBA(pureWhite); // Pure white

         // Interpolate the colors for the gradient part of the fade
         // This is the starting point of the gradient when the fade begins
         const transitionCurrentColor1 = interpolateColor(
            transitionGradientStartColor1,
            transitionGradientEndColor1,
            fadeProgress
         );

         // Interpolate the colors for the gradient's second color stop.
         // We want to fade the original commonColor2 into pureWhite
         const commonColor2Parsed = parseRGBA(commonColor2);
         const interpolatedCommonColor2 = interpolateColor(
            commonColor2Parsed,
            parseRGBA(pureWhite),
            fadeProgress
         );

         // Create a gradient that transitions its colors to pure white
         newBackground = `linear-gradient(180deg, ${interpolateColor(
            transitionGradientStartColor1,
            parseRGBA(pureWhite),
            fadeProgress
         )} 0%, ${interpolateColor(
            transitionGradientEndColor1,
            parseRGBA(pureWhite),
            fadeProgress
         )} 83%)`;
      } else {
         newBackground = pureWhite;
      }

      document.body.style.background = newBackground;
   });

   useEffect(() => {
      // Initial background for the first page
      document.body.style.background = `linear-gradient(${startDeg}deg, rgba(45, 53, 142, 1) 0%, rgba(117, 167, 218, 1) 83%)`;
   }, []);

   return null;
}
