
const display = document.querySelector("#pantalla");
const buttons = document.querySelectorAll(".tecla");


buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const btnValue = btn.textContent; 

    
    if (btnValue === "AC") {
      display.value = ""; 
    }
   
    else if (btnValue === "←") {
      display.value = display.value.slice(0, -1); 
    }
   
    else if (btnValue === "=") {
      try {
       
       
        let expressionToEvaluate = "";

      
        for (let i = 0; i < display.value.length; i++) {
          const char = display.value[i];
          if (
            (char >= "0" && char <= "9") ||
            ["+", "-", "*", "/"].includes(char)
          ) {
            expressionToEvaluate += char; 
          }
        }

        
        let result = new Function("return " + expressionToEvaluate)(); 

        
        if (Math.abs(result) >= 1000) {
          display.value = new Intl.NumberFormat("es-ES", {
            maximumFractionDigits: 10, /
            useGrouping: true, 
          }).format(result); 
        }
        
        else if (Number.isInteger(result)) {
          display.value = result.toString(); 
        }
        
        else {
          display.value = result.toFixed(10);
        }
      } catch (error) {
        
        display.value = "Error";
      }
    }
  
    else {
    
      if (btnValue === ".") {
        
        const lastCharacter = display.value.charAt(display.value.length - 1);

      
        if (
          lastCharacter === "." ||
          ["+", "-", "*", "/"].includes(lastCharacter)
        ) {
          return; 
        }
      }

      
      if (btnValue >= "0" && btnValue <= "9") {
       
        const currentValue = display.value; 
        let numericValue = ""; 

        
        for (let i = 0; i < currentValue.length; i++) {
          const char = currentValue[i];
          if (char >= "0" && char <= "9") {
            numericValue += char; 
          }
        }

        
        if (
          numericValue.length === 10 &&
          currentValue.length !== 0 &&
          !["+", "-", "*", "/"].includes(currentValue[currentValue.length - 1])
        ) {
          display.value += "."; 
        }
      }

      
      display.value += btnValue;
    }
  });
});
