export default function getPosition({left, top}: {
  top: number;
  left: number;
}) {  
  return {
        top: (top + window.scrollY -45) + "px",
        left: (left + window.scrollX - 5) + "px",
      }
}
