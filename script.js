// Obtener el elemento de la pantalla y los botones
const display = document.querySelector("#pantalla");
const buttons = document.querySelectorAll(".tecla");

// Función para manejar los clics en los botones
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const btnValue = btn.textContent; // Obtener el valor del botón presionado

    // Si el botón es "AC" (limpiar pantalla), vaciar la pantalla
    if (btnValue === "AC") {
      display.value = ""; // Limpiar la pantalla
    }
    // Si el botón es "←" (borrar último carácter), eliminar el último carácter
    else if (btnValue === "←") {
      display.value = display.value.slice(0, -1); // Eliminar el último carácter
    }
    // Si el botón es "=", evaluar la expresión matemática
    else if (btnValue === "=") {
      try {
       
        // Limpiar la expresión eliminando los puntos de separadores de miles
        let expressionToEvaluate = "";

        // Recorrer cada carácter de la cadena y agregarlo solo si es un número o un operador
        for (let i = 0; i < display.value.length; i++) {
          const char = display.value[i];
          if (
            (char >= "0" && char <= "9") ||
            ["+", "-", "*", "/"].includes(char)
          ) {
            expressionToEvaluate += char; // Agregar número u operador a la expresión limpia
          }
        }

        // Evaluamos la expresión matemática con números sin puntos
        let result = new Function("return " + expressionToEvaluate)(); // Evaluar la expresión de forma segura

        // Si el resultado es un número mayor o igual a 1000, formatear con separadores de miles
        if (Math.abs(result) >= 1000) {
          display.value = new Intl.NumberFormat("es-ES", {
            maximumFractionDigits: 10, // Limitar a 3 decimales
            useGrouping: true, // Usar separadores de miles
          }).format(result); // Formatear el número con puntos como separadores de miles
        }
        // Si el resultado es un número entero (sin decimales)
        else if (Number.isInteger(result)) {
          display.value = result.toString(); // Mostrar el número entero
        }
        // Si el resultado es un número decimal, redondear a 3 decimales
        else {
          display.value = result.toFixed(10); // Redondear a 3 decimales
        }
      } catch (error) {
        // Si ocurre un error (como una operación incorrecta), mostrar "Error"
        display.value = "Error";
      }
    }
    // Si el valor del botón es un número o un punto decimal
    else {
      // Verificar si es un punto decimal
      if (btnValue === ".") {
        // Obtener el último número ingresado en la expresión
        const lastCharacter = display.value.charAt(display.value.length - 1);

        // Verificar si el último carácter es un punto decimal o un operador
        if (
          lastCharacter === "." ||
          ["+", "-", "*", "/"].includes(lastCharacter)
        ) {
          return; // Si es un punto o un operador, no agregar otro punto
        }
      }

      // Si el botón es un número, agregamos el valor a la pantalla
      if (btnValue >= "0" && btnValue <= "9") {
        // Verificamos si el número ingresado tiene 4 dígitos y agregamos un punto para el separador de miles
        const currentValue = display.value; // Obtener el valor actual de la pantalla
        let numericValue = ""; // Aquí vamos a guardar solo los números

        // Recorremos el valor de la pantalla para eliminar cualquier carácter que no sea un número
        for (let i = 0; i < currentValue.length; i++) {
          const char = currentValue[i];
          if (char >= "0" && char <= "9") {
            numericValue += char; // Solo agregar números
          }
        }

        // Verificar si el número tiene 3 dígitos y agregar un punto para el separador de miles
        if (
          numericValue.length === 10 &&
          currentValue.length !== 0 &&
          !["+", "-", "*", "/"].includes(currentValue[currentValue.length - 1])
        ) {
          display.value += "."; // Si el número tiene 3 dígitos, agregar un separador de miles
        }
      }

      // Agregar el valor del botón presionado a la pantalla
      display.value += btnValue;
    }
  });
});
