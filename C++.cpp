#include <iostream>
#include <string>
#include <stdexcept>
using namespace std;

class PilaEstatica {
private:
    string* elementos;
    int tope;
    int capacidadMaxima;

public:
    // Constructor
    PilaEstatica(int capacidad) {
        if (capacidad <= 0) {
            throw invalid_argument("La capacidad debe ser un entero positivo.");
        }

        capacidadMaxima = capacidad;
        elementos = new string[capacidad];
        tope = 0;
    }

    // Destructor
    ~PilaEstatica() {
        delete[] elementos;
    }

    // Agregar elemento en el tope
    void push(string elemento) {
        if (tamaño() >= capacidadMaxima) {
            throw overflow_error("Pila llena: no cabe otro elemento");
        }

        elementos[tope] = elemento;
        tope++;
    }

    // Quitar y devolver el elemento del tope
    string pop() {
        if (estaVacia()) {
            throw underflow_error("Pila vacia: no hay nada que sacar");
        }

        tope--;
        string elemento = elementos[tope];
        elementos[tope] = "";
        return elemento;
    }

    // Ver el elemento del tope sin quitarlo
    string peek() {
        if (estaVacia()) {
            return "";
        }

        return elementos[tope - 1];
    }

    // Verificar si esta vacia
    bool estaVacia() {
        return tope == 0;
    }

    // Cantidad de elementos actuales
    int tamaño() {
        return tope;
    }

    // Capacidad maxima
    int capacidad() {
        return capacidadMaxima;
    }
};

// Ejemplo de uso
int main() {
    try {
        PilaEstatica pila(3);

        cout << "Capacidad: " << pila.capacidad() << endl;
        cout << "Esta vacia: " << boolalpha << pila.estaVacia() << endl;

        pila.push("Tu Fidelidad");
        pila.push("Hazme Vivir");
        pila.push("Tu Amor Por Mi");

        cout << "Peek: " << pila.peek() << endl;
        cout << "Tamaño: " << pila.tamaño() << endl;

        // Intentar agregar mas de la capacidad
        try {
            pila.push("Rey de Reyes");
        }
        catch (const exception& e) {
            cout << e.what() << endl;
        }

        // Sacar elementos
        cout << "Pop: " << pila.pop() << endl;
        cout << "Pop: " << pila.pop() << endl;
        cout << "Pop: " << pila.pop() << endl;

        // Intentar sacar de una pila vacia
        try {
            pila.pop();
        }
        catch (const exception& e) {
            cout << e.what() << endl;
        }

        cout << "Peek en vacia: " << pila.peek() << endl;

    }
    catch (const exception& e) {
        cout << "Error: " << e.what() << endl;
    }

    return 0;
}