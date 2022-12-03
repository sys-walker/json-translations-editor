/* Scripts binded to the Translator Editor */
document.querySelector('#darkmode-button').onclick = function (e) {
  let nativeElement = document.getElementById('darkmode-button');
  darkmode.toggleDarkMode();
  switchDarkmodeText(nativeElement);
};
