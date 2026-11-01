// Runs in <head> before paint so a saved light/dark choice never flashes the
// other theme. Kept out of ThemeToggle ('use client') so server code can import it.
export const themeInitScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;
