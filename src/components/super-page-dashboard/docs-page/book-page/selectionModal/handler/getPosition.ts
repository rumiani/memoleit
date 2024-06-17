export default function getPosition(highlightPosition: {
  top: number;
  left: number;
}) {
  return window.innerWidth < 640
    ? {
        top: highlightPosition?.top! - 170 + "px",
        left: highlightPosition?.left! - 35 + "px",
      }
    : {
        top: highlightPosition?.top! - 170 + "px",
        left: highlightPosition?.left! - 110 + "px",
      };
}
