# Entrega Final - Programación Backend I

**Curso:** Desarrollo Avanzado de Backend  
**Comisión:** 77525  
**Alumna:** María Pía Zaniboni  
**LinkedIn:** [https://www.linkedin.com/in/pia-zaniboni/](https://www.linkedin.com/in/pia-zaniboni/)

---

## 🎯 Objetivos de la entrega final

- Utilizar **MongoDB** como sistema de persistencia principal.  
- Definir y profesionalizar todos los endpoints para gestionar **productos** y **carritos**.  
- Implementar filtros, paginación y ordenamientos en consultas.  
- Optimizar la gestión de carritos aplicando los últimos conceptos vistos en el curso.  

---

## 🚀 Instalación y ejecución

1. Clonar este repositorio:
   ```bash
   git clone https://github.com/PiaZaniboni/comision-77525-maria-pia-zaniboni
   cd comision-77525-maria-pia-zaniboni
   ```

2. Instalar dependencias:
   ```bash
   npm i
   ```

3. Levantar la aplicación:
   ```bash
   npm run dev
   ```

---

## 📚 Endpoints disponibles

### **/products**
| Método | Ruta                        | Descripción |
|--------|-----------------------------|-------------|
| GET    | `/api/products`            | Obtiene todos los productos. Soporta query params: `limit`, `page`, `query`, `sort`. |
| GET    | `/api/products/:pid`       | Obtiene un producto por su ID. |
| POST   | `/api/products`            | Crea un producto nuevo. |
| PUT    | `/api/products/:pid`       | Actualiza un producto por su ID. |
| DELETE | `/api/products/:pid`       | Elimina un producto por su ID. |

### **/carts**
| Método | Ruta                                   | Descripción |
|--------|----------------------------------------|-------------|
| POST   | `/api/carts`                          | Crea un carrito nuevo (vacío). |
| GET    | `/api/carts/:cid`                     | Obtiene los productos de un carrito (populate). |
| POST   | `/api/carts/:cid/product/:pid`        | Agrega un producto al carrito. Si ya existe, incrementa la cantidad. |
| PUT    | `/api/carts/:cid`                     | Reemplaza todos los productos del carrito. |
| PUT    | `/api/carts/:cid/products/:pid`       | Actualiza cantidad de un producto específico. |
| DELETE | `/api/carts/:cid/products/:pid`       | Elimina un producto específico del carrito. |
| DELETE | `/api/carts/:cid`                     | Vacía todo el carrito. |

---


## 🖼️ Capturas de la Entrega Final

- **/products**  
  - Visualización de productos con **paginación**.  
  - Cada producto puede:  
    - Llevar a `/products/:pid` para ver detalle completo.  
    - Agregarse al carrito directamente con un botón.  
![Products View](./assets/products.png)

- **/carts/:cid**  
  - Vista de un carrito específico con productos listados y detallados.  
![Carts View](./assets/carts.png)

### Vista Home
Muestra todos los productos agregados hasta el momento:  
![Home View](./assets/home.png)

### Vista RealTimeProducts
Lista de productos que se actualiza automáticamente en tiempo real:  
![RealTimeProducts View](./assets/realtime.png)
