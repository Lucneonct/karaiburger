const base = import.meta.env.BASE_URL
const img = (path) => `${base}img/${path}`

export const categories = [
  { id: 'especial', name: 'Edición Especial', icon: '🔥', color: '#DCC58A' },
  { id: 'hamburguesas', name: 'Hamburguesas', icon: '🍔', color: '#d62828' },
  { id: 'sliders', name: 'Sliders', icon: '🧒', color: '#ff9f1c' },
  { id: 'acompañamientos', name: 'Acompañamientos', icon: '🍟', color: '#2f9e44' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤', color: '#1971c2' },
  { id: 'extras', name: 'Extras', icon: '➕', color: '#7c3aed' },
]

export const menuItems = [
  // EDICIÓN ESPECIAL
  {
    id: 'honey-mustard',
    category: 'especial',
    name: 'Honey Mustard Crispy',
    image: img('edicion-especial.png'),
    badge: 'Edición Limitada',
    variants: [
      {
        id: 'honey-simple',
        name: 'Simple',
        price: 8500,
        description: 'Medallón 130gr, pan parmesano, 2 cheddar, honey mustard, cebolla crispy',
      },
      {
        id: 'honey-doble',
        name: 'Doble',
        price: 11300,
        description: '2 medallones 100gr, 3 cheddar, cebolla crispy',
      },
    ],
  },

  // HAMBURGUESAS
  {
    id: 'cheeseburger',
    category: 'hamburguesas',
    name: 'Cheeseburger',
    image: img('cheeseburger.png'),
    variants: [
      { id: 'cheese-simple', name: 'Simple', price: 7300, description: 'Medallón 130gr, 2 cheddar' },
      { id: 'cheese-doble', name: 'Doble', price: 10500, description: '2 medallones 100gr, 3 cheddar' },
      { id: 'cheese-triple', name: 'Triple', price: 13500, description: '3 medallones 90gr, 4 cheddar' },
    ],
  },
  {
    id: 'bacon-cheeseburger',
    category: 'hamburguesas',
    name: 'Bacon Cheeseburger',
    image: img('bacon.png'),
    variants: [
      { id: 'bacon-simple', name: 'Simple', price: 9100, description: 'Medallón 130gr, 2 cheddar, panceta' },
      { id: 'bacon-doble', name: 'Doble', price: 12200, description: '2 medallones 100gr, 3 cheddar, panceta' },
    ],
  },
  {
    id: 'cuarto-libra',
    category: 'hamburguesas',
    name: 'Cuarto de Libra',
    image: img('cuarto-libra.png'),
    variants: [
      { id: 'cuarto-simple', name: 'Simple', price: 7500, description: 'Medallón 115gr, 2 cheddar, cebolla, pepinillos, ketchup, mostaza' },
      { id: 'cuarto-doble', name: 'Doble', price: 12100, description: '2 medallones 115gr, 2 cheddar, cebolla, pepinillos, ketchup, mostaza' },
    ],
  },
  {
    id: 'american',
    category: 'hamburguesas',
    name: 'American Burger',
    image: img('american.png'),
    badge: 'La más pedida ⭐',
    variants: [
      { id: 'american-simple', name: 'Simple', price: 8300, description: 'Medallón 130gr, 2 cheddar, lechuga, tomate, cebolla morada, salsa Karaí' },
      { id: 'american-doble', name: 'Doble', price: 11300, description: '2 medallones 100gr, 3 cheddar, lechuga, tomate, cebolla morada, salsa Karaí' },
    ],
  },
  {
    id: 'big-karai',
    category: 'hamburguesas',
    name: 'Big Karaí',
    image: img('big-karai.png'),
    variants: [
      { id: 'big-karai-unico', name: 'Único', price: 11000, description: '2 medallones 100gr, 2 cheddar, lechuga, cebolla, pepinillos, salsa Karaí' },
    ],
  },
  {
    id: 'fried-onion',
    category: 'hamburguesas',
    name: 'Fried Onion',
    image: img('fried-onion.png'),
    variants: [
      { id: 'fried-unico', name: 'Único', price: 10100, description: '2 medallones 90gr, 3 cheddar, smash onion' },
    ],
  },
  {
    id: 'chicken-burger',
    category: 'hamburguesas',
    name: 'Chicken Burger',
    image: img('chickenburger.png'),
    variants: [
      { id: 'chicken-simple', name: 'Simple', price: 7100, description: 'Medallón de pollo, 2 cheddar, lechuga, mayonesa' },
      { id: 'chicken-doble', name: 'Doble', price: 9200, description: '2 medallones de pollo, 4 cheddar, lechuga, mayonesa' },
    ],
  },
  {
    id: 'vegetariana',
    category: 'hamburguesas',
    name: 'Vegetariana',
    image: img('veg.png'),
    badge: 'Veggie 🌱',
    variants: [
      { id: 'veg-simple', name: 'Simple', price: 7000, description: 'Medallón de lenteja/zanahoria/girasol, 2 cheddar, lechuga, tomate, cebolla morada, salsa Karaí' },
      { id: 'veg-doble', name: 'Doble', price: 9000, description: '2 medallones, 3 cheddar, lechuga, tomate, cebolla morada, salsa Karaí' },
    ],
  },

  // SLIDERS
  {
    id: 'slider-cheese',
    category: 'sliders',
    name: 'Cheese Slider',
    image: img('cheese-slider.png'),
    variants: [{ id: 'slider-cheese-u', name: 'Único', price: 5800, description: 'Medallón 100gr, cheddar' }],
  },
  {
    id: 'slider-cuarto',
    category: 'sliders',
    name: 'Cuarto Slider',
    image: img('cuarto-slider.png'),
    variants: [{ id: 'slider-cuarto-u', name: 'Único', price: 6200, description: 'Medallón, cheddar, cebolla, pepinillos' }],
  },
  {
    id: 'slider-fried',
    category: 'sliders',
    name: 'Fried Onion Slider',
    image: img('fried-slider.png'),
    variants: [{ id: 'slider-fried-u', name: 'Único', price: 6000, description: 'Medallón, cheddar, smash onion' }],
  },
  {
    id: 'slider-american',
    category: 'sliders',
    name: 'American Slider',
    image: img('american-slider.png'),
    variants: [{ id: 'slider-american-u', name: 'Único', price: 6400, description: 'Medallón, cheddar, lechuga, tomate' }],
  },
  {
    id: 'slider-karai',
    category: 'sliders',
    name: 'Karaí Slider',
    image: img('karai-slider.png'),
    variants: [{ id: 'slider-karai-u', name: 'Único', price: 6400, description: 'Medallón, cheddar, lechuga, pepinillos' }],
  },

  // ACOMPAÑAMIENTOS
  {
    id: 'papas-fritas',
    category: 'acompañamientos',
    name: 'Papas Fritas',
    image: img('papas.png'),
    variants: [{ id: 'papas-u', name: 'Porción', price: 2800, description: 'Papas fritas clásicas' }],
  },
  {
    id: 'papas-cheddar',
    category: 'acompañamientos',
    name: 'Papas Cheddar',
    image: img('papas-cheddar.png'),
    variants: [{ id: 'papas-cheddar-u', name: 'Porción', price: 5000, description: 'Papas fritas con cheddar' }],
  },
  {
    id: 'papas-panceta',
    category: 'acompañamientos',
    name: 'Papas Cheddar & Panceta',
    image: img('papas-panceta.png'),
    variants: [{ id: 'papas-panceta-u', name: 'Porción', price: 6200, description: 'Papas fritas con cheddar y panceta' }],
  },
  {
    id: 'nuggets',
    category: 'acompañamientos',
    name: 'Nuggets x8',
    image: img('nuggets.png'),
    variants: [{ id: 'nuggets-u', name: 'Porción', price: 6000, description: '8 nuggets de pollo' }],
  },
  {
    id: 'tostado-karai',
    category: 'acompañamientos',
    name: 'Tostado Karaí',
    image: img('tostado-karai.png'),
    variants: [{ id: 'tostado-u', name: 'Único', price: 7200, description: 'Tostado especial Karaí' }],
  },

  // BEBIDAS
  {
    id: 'gaseosa-1.5',
    category: 'bebidas',
    name: 'Gaseosa 1.5L',
    image: img('bebidas.png'),
    variants: [{ id: 'gaseosa-15', name: '1.5L', price: 4500, description: 'Coca, Fanta o Sprite' }],
    flavors: ['Coca-Cola', 'Fanta', 'Sprite'],
  },
  {
    id: 'gaseosa-1l',
    category: 'bebidas',
    name: 'Gaseosa 1L',
    image: img('bebidas.png'),
    variants: [{ id: 'gaseosa-1', name: '1L', price: 3500, description: 'Consumo en el local' }],
    flavors: ['Coca-Cola', 'Fanta', 'Sprite'],
  },
  {
    id: 'lata',
    category: 'bebidas',
    name: 'Lata',
    image: img('bebidas.png'),
    variants: [{ id: 'lata-u', name: 'Lata', price: 2200, description: '354ml' }],
    flavors: ['Coca-Cola', 'Fanta', 'Sprite', 'Guaraná'],
  },
  {
    id: 'coca-vidrio',
    category: 'bebidas',
    name: 'Coca-Cola Vidrio',
    image: img('bebidas.png'),
    variants: [{ id: 'coca-vidrio-u', name: '350ml', price: 2000, description: 'Consumo en el local' }],
  },
  {
    id: 'levite',
    category: 'bebidas',
    name: 'Levité',
    image: img('bebidas.png'),
    variants: [{ id: 'levite-u', name: '500ml', price: 2000, description: 'Levité 500ml' }],
  },
  {
    id: 'agua',
    category: 'bebidas',
    name: 'Agua Mineral',
    image: img('bebidas.png'),
    variants: [{ id: 'agua-u', name: 'Botella', price: 1300, description: 'Agua mineral' }],
  },
  {
    id: 'jugo-naranja',
    category: 'bebidas',
    name: 'Jugo Naranja Citric',
    image: img('bebidas.png'),
    variants: [{ id: 'jugo-u', name: '300ml', price: 2200, description: 'Consumo en el local' }],
  },
  {
    id: 'cerveza',
    category: 'bebidas',
    name: 'Cerveza Lata',
    image: img('bebidas.png'),
    variants: [{ id: 'cerveza-u', name: '350ml', price: 2500, description: 'Heineken o Corona' }],
    flavors: ['Heineken', 'Corona'],
  },

  // EXTRAS
  {
    id: 'salsa-cheddar',
    category: 'extras',
    name: 'Salsa Cheddar',
    variants: [{ id: 'salsa-cheddar-u', name: 'Porción', price: 800, description: 'Salsa cheddar extra' }],
  },
  {
    id: 'salsa-karai-bbq',
    category: 'extras',
    name: 'Salsa Karaí o BBQ',
    variants: [{ id: 'salsa-karai-u', name: 'Porción', price: 800, description: 'Salsa Karaí o BBQ' }],
    flavors: ['Salsa Karaí', 'BBQ'],
  },
  {
    id: 'doble-queso',
    category: 'extras',
    name: 'Doble Queso',
    variants: [{ id: 'doble-queso-u', name: 'Extra', price: 800, description: 'Queso cheddar adicional' }],
  },
  {
    id: 'panceta-extra',
    category: 'extras',
    name: 'Panceta Extra',
    variants: [{ id: 'panceta-extra-u', name: 'Extra', price: 1700, description: 'Porción extra de panceta' }],
  },
  {
    id: 'medallon-extra',
    category: 'extras',
    name: 'Medallón con Queso Extra',
    variants: [{ id: 'medallon-extra-u', name: 'Extra', price: 3200, description: 'Medallón adicional con queso' }],
  },
  {
    id: 'huevo-frito',
    category: 'extras',
    name: 'Huevo Frito',
    variants: [{ id: 'huevo-u', name: 'Extra', price: 600, description: 'Huevo frito' }],
  },
]

export const comboDiscount = 1500

export const paymentMethods = [
  { id: 'efectivo', name: 'Efectivo', icon: '💵', note: 'El descuento se aplicará luego de enviar el pedido' },
  { id: 'transferencia', name: 'Transferencia', icon: '🏦', note: 'Alias: karai.burger / karai.hamburguesas' },
  { id: 'tarjeta', name: 'Tarjeta', icon: '💳' },
  { id: 'qr', name: 'QR Pago', icon: '📱' },
]
