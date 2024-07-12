export default function getPosition({left, top}: {
  top: number;
  left: number;
}) {  
  return {
        top: (top + window.scrollY - 55) + "px",
        left: (left + window.scrollX ) + "px",
      }
}
