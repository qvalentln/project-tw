
/*ceva json ajax nebunie*/

async function getName() {
    try {
        // fetch
        const response = await fetch('stats.json');
        
        // convert response -> js object
        const data = await response.json();
        
        
        alert(`cel mai mult ${data.materie} - qvalentin`);
    } catch (error) {
        console.error("nu am putut citi JSON:", error);
    }
}


getName();



//Swift. Smart. Seamlessly Adaptive. Like a Chameleon.
//const textArray = ["Swift.","Smart.", "Seamlessly Adaptive.", "Like a chameleon"];

/*  ANIMATED TYPEWRITING IMPLEMENTATION */
document.addEventListener("DOMContentLoaded", () => {
  //const words = ["Swift.", "Smart.", "Seamlessly Adaptive.", "Like a chameleon."];
  const words= ["Swift Intelligence.", "Seamless Adaptation.", "Like a chameleon."]
  const target = document.querySelector("#title h1 span");
  
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIdx % words.length];
    
    // update Text
    target.textContent = isDeleting 
      ? currentWord.substring(0, charIdx - 1) 
      : currentWord.substring(0, charIdx + 1);

    charIdx = isDeleting ? charIdx - 1 : charIdx + 1;

    // TIMING LOGIC
    let baseSpeed = isDeleting ? 10: 30;
    
    // randomly fluctuates speed by up to 80ms
    let typeSpeed = baseSpeed + (Math.random() * 80);

    if (!isDeleting && charIdx === currentWord.length) {
      // pause when the word is fully typed
      typeSpeed = 2000; 
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      // pause briefly before starting the next word
      isDeleting = false;
      wordIdx++;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
});



/*DARK/LIGHT MODE IMPLEMENTATION*/

function updateUI(theme, btn, img) {
    // update the data attribute on <html>
    document.documentElement.setAttribute("data-theme", theme);
    
    // update the button text
    //btn.innerText = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;

    // update the image source based on the theme
    if (img) {
        img.src = theme === 'dark' ? 'images/darkmode.gif' : 'images/lightmode.gif';
    }
}

const button = document.querySelector("[data-theme-toggle]");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
const demoImg = document.getElementById('app-demo-ss');

// determine start theme
let currentTheme = localStorage.getItem("theme") || (systemDark.matches ? "dark" : "light");

// initial setup (pass demoImg here)
updateUI(currentTheme, button, demoImg);

// click logic
button.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", currentTheme);
    
    // update UI (Pass demoImg here)
    updateUI(currentTheme, button, demoImg);
});