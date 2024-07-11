export default function fullscreenHandler(documentElement: any) {
  if (document.fullscreenElement) document.exitFullscreen();
  else if (documentElement.requestFullscreen) {
    documentElement.requestFullscreen();
  } else if (documentElement.webkitRequestFullscreen) {
    /* Safari */
    documentElement.webkitRequestFullscreen();
  } else if (documentElement.msRequestFullscreen) {
    /* IE11 */
    documentElement.msRequestFullscreen();
  }
}
