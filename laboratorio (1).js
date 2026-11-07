
// Función para convertir segundos a formato m:ss
function formatoTiempo(segundos) {
    if (typeof segundos !== "number" || segundos < 0) {
        throw new Error("La duración debe ser un número entero positivo.");
    }
    const minutos = Math.floor(segundos / 60);
    const restoSegundos = segundos % 60;
    return `${minutos}:${restoSegundos.toString().padStart(2, "0")}`;
}

// Tipo Cancion
class Cancion {
    constructor(titulo, artista, duracion) {
        if (!titulo || !artista || typeof duracion !== "number") {
            throw new Error("Datos inválidos para la canción.");
        }
        this.titulo = titulo;
        this.artista = artista;
        this.duracion = duracion; // en segundos
    }

    formato() {
        return `${this.titulo} - ${this.artista} (${formatoTiempo(this.duracion)})`;
    }
}

// Tipo Accion
class Accion {
    constructor(tipo, cancion, posicion) {
        if (tipo !== "agregar" && tipo !== "eliminar") {
            throw new Error("Tipo de acción inválido.");
        }
        if (!(cancion instanceof Cancion)) {
            throw new Error("La acción debe incluir una canción válida.");
        }
        if (typeof posicion !== "number" || posicion < 0) {
            throw new Error("Posición inválida.");
        }
        this.tipo = tipo;
        this.cancion = cancion;
        this.posicion = posicion;
    }
}

// Tipo Album
class Album {
    constructor(titulo, anio, canciones) {
        if (!titulo || typeof anio !== "number" || !Array.isArray(canciones)) {
            throw new Error("Datos inválidos para el álbum.");
        }
        if (canciones.length !== 4) {
            throw new Error("El álbum debe tener exactamente 4 canciones.");
        }
        this.titulo = titulo;
        this.anio = anio;
        this.canciones = canciones;
    }

    cantidad() {
        return this.canciones.length;
    }

    duracionTotal() {
        return this.canciones.reduce((total, c) => total + c.duracion, 0);
    }
}

// Programa principal
try {
    // Crear canciones
    const c1 = new Cancion("Tu Fidelidad", "Marcos Witt", 160);
    const c2 = new Cancion("Hazme Vivir", "Thalles Roberto", 272);
    const c3 = new Cancion("Tu Amor Por Mi", "Marcos Witt", 113);
    const c4 = new Cancion("Rey de Reyes", "Marcos Barrientos", 202);

    // Crear álbum
    const album = new Album("Viaje Musical", 2024, [c1, c2, c3, c4]);

    // Mostrar información del álbum
    console.log(`${album.titulo} (${album.anio}) - ${album.cantidad()} canciones`);
    album.canciones.forEach((cancion, index) => {
        console.log(`${index + 1}. ${cancion.formato()}`);
    });
    console.log(`Duración del álbum: ${formatoTiempo(album.duracionTotal())}`);

} catch (error) {
    console.error("Error:", error.message);
}

class PilaEstatica {
    #elementos; // arreglo interno
    #tope;      // índice del próximo espacio libre
    #capacidad; // tamaño máximo

    constructor(capacidad) {
        if (typeof capacidad !== "number" || capacidad <= 0) {
            throw new Error("La capacidad debe ser un número entero positivo.");
        }
        this.#capacidad = capacidad;
        this.#elementos = new Array(capacidad); // arreglo fijo
        this.#tope = 0; // inicialmente vacío
    }

    // Agregar elemento en el tope
    push(elemento) {
        if (this.tamaño() >= this.#capacidad) {
            throw new Error("Pila llena: no cabe otro elemento");
        }
        this.#elementos[this.#tope] = elemento;
        this.#tope++;
    }

    // Quitar y devolver el elemento del tope
    pop() {
        if (this.estaVacia()) {
            throw new Error("Pila vacía: no hay nada que sacar");
        }
        this.#tope--;
        const elemento = this.#elementos[this.#tope];
        this.#elementos[this.#tope] = undefined; // limpiar referencia
        return elemento;
    }

    // Ver el elemento del tope sin quitarlo
    peek() {
        if (this.estaVacia()) {
            return undefined;
        }
        return this.#elementos[this.#tope - 1];
    }

    // Verificar si está vacía
    estaVacia() {
        return this.#tope === 0;
    }

    // Cantidad de elementos actuales
    tamaño() {
        return this.#tope;
    }

    // Capacidad máxima
    capacidad() {
        return this.#capacidad;
    }
}

try {
    const pila = new PilaEstatica(3);

    console.log("Capacidad:", pila.capacidad()); // 3
    console.log("Está vacía:", pila.estaVacia()); // true

    pila.push("Tu Fidelidad");
    pila.push("Hazme Vivir");
    pila.push("Tu Amor Por Mi");

    console.log("Peek:", pila.peek()); // Tu Amor Por Mi
    console.log("Tamaño:", pila.tamaño()); // 3

    // Intentar agregar más de la capacidad
    try {
        pila.push("Rey de Reyes");
    } catch (e) {
        console.error(e.message); // Pila llena: no cabe otro elemento
    }

    console.log("Pop:", pila.pop()); // Tu Amor Por Mi
    console.log("Pop:", pila.pop()); // Hazme Vivir
    console.log("Pop:", pila.pop()); // Tu Fidelidad

    // Intentar sacar de pila vacía
    try {
        pila.pop();
    } catch (e) {
        console.error(e.message); // Pila vacía: no hay nada que sacar
    }

    console.log("Peek en vacía:", pila.peek()); // undefined

} catch (error) {
    console.error("Error:", error.message);
}

