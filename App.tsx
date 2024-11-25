import React, { useState } from 'react';

interface Producto {
  id: number;
  nombre: string;
  cantidadDisponible: number;
  precio: number;
}

interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

const productosIniciales: Producto[] = [
  { id: 1, nombre: 'Tornillos', cantidadDisponible: 100, precio: 10 },
  { id: 2, nombre: 'Clavos', cantidadDisponible: 200, precio: 5 },
  { id: 3, nombre: 'Martillos', cantidadDisponible: 50, precio: 20 },
  { id: 4, nombre: 'Llaves', cantidadDisponible: 30, precio: 15 },
  { id: 5, nombre: 'Taladros', cantidadDisponible: 25, precio: 25 },
  { id: 6, nombre: 'Brocas', cantidadDisponible: 150, precio: 10 },
  { id: 7, nombre: 'Cintas métricas', cantidadDisponible: 40, precio: 12 },
  { id: 8, nombre: 'Alicates', cantidadDisponible: 35, precio: 18 },
  { id: 9, nombre: 'Destornilladores', cantidadDisponible: 60, precio: 8 },
  { id: 10, nombre: 'Llaves ajustables', cantidadDisponible: 20, precio: 22 },
  { id: 11, nombre: 'Cerraduras', cantidadDisponible: 50, precio: 30 },
  { id: 12, nombre: 'Bisagras', cantidadDisponible: 100, precio: 5 },
  { id: 13, nombre: 'Tubos de PVC', cantidadDisponible: 75, precio: 15 },
  { id: 14, nombre: 'Codos de PVC', cantidadDisponible: 60, precio: 10 },
  { id: 15, nombre: 'Tuberías galvanizadas', cantidadDisponible: 50, precio: 50 },
  { id: 16, nombre: 'Llaves de paso', cantidadDisponible: 40, precio: 20 },
  { id: 17, nombre: 'Cemento de contacto', cantidadDisponible: 30, precio: 18 },
  { id: 18, nombre: 'Pintura blanca', cantidadDisponible: 40, precio: 50 },
  { id: 19, nombre: 'Rodillos para pintar', cantidadDisponible: 60, precio: 12 },
  { id: 20, nombre: 'Brochas', cantidadDisponible: 80, precio: 8 },
  { id: 21, nombre: 'Papel lija', cantidadDisponible: 120, precio: 3 },
  { id: 22, nombre: 'Sargentos o prensas', cantidadDisponible: 25, precio: 25 },
  { id: 23, nombre: 'Cinta aislante', cantidadDisponible: 100, precio: 7 },
  { id: 24, nombre: 'Cinta de teflón', cantidadDisponible: 80, precio: 4 },
  { id: 25, nombre: 'Cinta de embalaje', cantidadDisponible: 90, precio: 6 },
  { id: 26, nombre: 'Taladros percutores', cantidadDisponible: 15, precio: 60 },
  { id: 27, nombre: 'Sierra caladora', cantidadDisponible: 10, precio: 80 },
  { id: 28, nombre: 'Sierra circular', cantidadDisponible: 10, precio: 100 },
  { id: 29, nombre: 'Esmeriladora angular', cantidadDisponible: 12, precio: 85 },
  { id: 30, nombre: 'Nivel de burbuja', cantidadDisponible: 50, precio: 15 },
  { id: 31, nombre: 'Guantes de trabajo', cantidadDisponible: 120, precio: 10 },
  { id: 32, nombre: 'Máscaras de protección', cantidadDisponible: 70, precio: 12 },
  { id: 33, nombre: 'Lentes de seguridad', cantidadDisponible: 50, precio: 15 },
  { id: 34, nombre: 'Cascos de seguridad', cantidadDisponible: 30, precio: 35 },
  { id: 35, nombre: 'Andamios', cantidadDisponible: 5, precio: 500 },
  { id: 36, nombre: 'Carretillas', cantidadDisponible: 15, precio: 100 },
  { id: 37, nombre: 'Clavadoras', cantidadDisponible: 20, precio: 150 },
  { id: 38, nombre: 'Pistolas de calor', cantidadDisponible: 10, precio: 45 },
  { id: 39, nombre: 'Compresores de aire', cantidadDisponible: 5, precio: 300 },
  { id: 40, nombre: 'Mangueras', cantidadDisponible: 50, precio: 20 },
  { id: 41, nombre: 'Bombas de agua', cantidadDisponible: 8, precio: 250 },
  { id: 42, nombre: 'Alambres', cantidadDisponible: 200, precio: 5 },
  { id: 43, nombre: 'Cadenas', cantidadDisponible: 100, precio: 10 },
  { id: 44, nombre: 'Aceite lubricante', cantidadDisponible: 30, precio: 15 },
  { id: 45, nombre: 'Spray antioxidante', cantidadDisponible: 20, precio: 18 },
];


const CarritoCompras = () => {
  const [productos, setProductos] = useState(productosIniciales);
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [usuario, setUsuario] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const handleAgregarAlCarrito = (producto: Producto) => {
    const itemEnCarrito = carrito.find((item) => item.producto.id === producto.id);
    if (itemEnCarrito) {
      setCarrito(
        carrito.map((item) => {
          if (item.producto.id === producto.id) {
            return { ...item, cantidad: item.cantidad + 1 };
          }
          return item;
        })
      );
    } else {
      setCarrito([...carrito, { producto, cantidad: 1 }]);
    }
  };

  const handleEliminarDelCarrito = (producto: Producto) => {
    setCarrito(carrito.filter((item) => item.producto.id !== producto.id));
  };

  const handleRealizarCompra = () => {
    if (usuario) {
      setProductos(
        productos.map((producto) => {
          const itemEnCarrito = carrito.find((item) => item.producto.id === producto.id);
          if (itemEnCarrito) {
            return { ...producto, cantidadDisponible: producto.cantidadDisponible - itemEnCarrito.cantidad };
          }
          return producto;
        })
      );
      setCarrito([]);
      setUsuario('');
    }
  };

  const productosFiltrados = productos.filter((producto) => producto.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Productos</h2>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar productos"
          />
          <ul>
            {productosFiltrados.map((producto) => (
              <li key={producto.id} className="mb-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAgregarAlCarrito(producto)}
                >
                  {producto.nombre} ({producto.cantidadDisponible} disponibles) - ${producto.precio}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Carrito</h2>
          <ul>
            {carrito.map((item) => (
              <li key={item.producto.id} className="mb-2">
                <p>
                  {item.producto.nombre} x {item.cantidad} - ${item.producto.precio * item.cantidad}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => handleEliminarDelCarrito(item.producto)}
                  >
                    Eliminar
                  </button>
                </p>
              </li>
            ))}
          </ul>
          <p className="text-lg font-bold mb-2">Total: ${carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0)}</p>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usuario">
                Usuario:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleRealizarCompra}
            >
              Realizar Compra
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarritoCompras;