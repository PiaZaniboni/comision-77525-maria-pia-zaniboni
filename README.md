# Entregas - Programación Backend I

**Curso:** Desarrollo Avanzado de Backend  
**Comisión:** 77525  
**Alumna:** María Pía Zaniboni  
**LinkedIn:** [https://www.linkedin.com/in/pia-zaniboni/](https://www.linkedin.com/in/pia-zaniboni/)

---

## 📂 Contenido del repositorio

Este repositorio contiene las entregas correspondientes al curso **Programación Backend I: Desarrollo Avanzado de Backend**.

- **Entrega N° 1** → Manejo de productos y carritos con persistencia en archivos.  
  Carpeta: [`/entrega_1`](./entrega_1)

- **Entrega N° 2** → Configuración de **Websockets** y **Handlebars**.  
  Carpeta: [`/entrega_2`](./entrega_2)

---

## 📌 Descripción de las entregas

### 🔹 Entrega N° 1
Implementación de un backend que permite gestionar productos y carritos con persistencia en archivos JSON.  
Incluye endpoints REST en Express para realizar operaciones CRUD.

### 🔹 Entrega N° 2
Configuración del servidor para trabajar con **Handlebars** y **WebSockets** mediante `socket.io`.  
Se incluyen las siguientes vistas:

- **`home.handlebars`** → muestra todos los productos agregados hasta el momento.  
- **`realTimeProducts.handlebars`** → lista de productos en **tiempo real**, la cual se actualiza automáticamente al **crear** o **eliminar** un producto.  

---

## 🚀 Instalación y ejecución

1. Clonar este repositorio:
   ```bash
   git clone https://github.com/PiaZaniboni/comision-77525-maria-pia-zaniboni
   cd comision-77525-maria-pia-zaniboni
   ```

2. Entrar a la carpeta de la entrega que quieras ejecutar (ejemplo: `entrega_2`):
   ```bash
   cd entrega_2
   ```

3. Instalar dependencias:
   ```bash
   npm i
   ```

4. Levantar la aplicación:
   ```bash
   npm run dev
   ```

---

## 🖼️ Capturas de la Entrega N° 2

### Vista Home
Muestra todos los productos agregados hasta el momento:  
![Home View](./assets/home.png)

### Vista RealTimeProducts
Lista de productos que se actualiza automáticamente en tiempo real:  
![RealTimeProducts View](./assets/realtime.png)