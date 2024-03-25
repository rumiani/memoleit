export const fullScreen = ()=>{
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
}
export const exitFullScreen = () =>{
  if (document.fullscreenElement)
    document.exitFullscreen();
}