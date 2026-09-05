// Base de datos especializada en productos de mantenimiento industrial, soldadura y herramientas
const productos = [
    // Consumibles y Soldadura (Basado en las imágenes de los cilindros de gas y soplete)
    { 
        nombre: "Soplete de Inicio Activo Bernzomatic TS4000", 
        categoria: "Consumos y Soldadura", 
        subcategoria: "Sopletes y Gas", 
        rating: "⭐ 4.6 / 5 (6.5k)", 
        desc: "Encendido instantáneo, flama de alta turbulencia para soldadura fuerte y reparaciones rápidas.", 
        imagen: "Soplete Bernzomatic TS4000" 
    },
    { 
        nombre: "Cilindro de Gas Propano Bernzomatic (Paquete de 6)", 
        categoria: "Consumos y Soldadura", 
        subcategoria: "Sopletes y Gas", 
        rating: "⭐ 4.6 / 5 (6.5k)", 
        desc: "Combustible portátil y versátil para antorchas, fontanería y trabajos de campo.", 
        imagen: "Gas Propano Bernzomatic 6pk" 
    },
    { 
        nombre: "Varillas de Soldadura de Plata para Cobre", 
        categoria: "Consumos y Soldadura", 
        subcategoria: "Soldadura", 
        rating: "⭐ 4.8 / 5 (1.2k)", 
        desc: "Ideal para uniones herméticas en tuberías de refrigeración y sistemas de aire acondicionado.", 
        imagen: "Varillas de Soldadura" 
    },

    // Lubricación y Químicos (Basado en la grasa roja de las imágenes)
    { 
        nombre: "Grasa Roja Ultra Resistente AtomLube (Pack 10)", 
        categoria: "Lubricación y Químicos", 
        subcategoria: "Lubricantes y Grasas", 
        rating: "⭐ 4.7 / 5 (2.6k)", 
        desc: "Lubricante impermeable de alta temperatura para superficies metálicas y rodamientos pesados.", 
        imagen: "Grasa Roja Industrial 10pz" 
    },
    { 
        nombre: "Lubricante Multiusos en Spray Penetrante", 
        categoria: "Lubricación y Químicos", 
        subcategoria: "Aerosoles y Limpiadores", 
        rating: "⭐ 4.9 / 5 (8.4k)", 
        desc: "Desflores pernos oxidados al instante, desplaza la humedad y previene la corrosión.", 
        imagen: "Spray Flojatornillos" 
    },

    // Instrumentos de Medición y Diagnóstico
    { 
        nombre: "Multímetro Digital de Pinza True RMS", 
        categoria: "Medición y Diagnóstico", 
        subcategoria: "Electricidad", 
        rating: "⭐ 4.8 / 5 (3.1k)", 
        desc: "Mide corriente AC/DC, voltaje y continuidad de forma segura en tableros eléctricos.", 
        imagen: "Multímetro de Pinza" 
    },
    { 
        nombre: "Termómetro Infrarrojo Láser Industrial", 
        categoria: "Medición y Diagnóstico", 
        subcategoria: "Temperatura", 
        rating: "⭐ 4.7 / 5 (1.9k)", 
        desc: "Lectura rápida de temperatura sin contacto para motores, tableros y maquinaria.", 
        imagen: "Termómetro Infrarrojo" 
    },

    // Herramientas y Equipo
    { 
        nombre: "Juego de Desarmadores Dieléctricos 1000V", 
        categoria: "Herramientas y Equipo", 
        subcategoria: "Herramienta Manual", 
        rating: "⭐ 4.9 / 5 (4.2k)", 
        desc: "Barras aisladas certificadas para trabajos eléctricos con total seguridad.", 
        imagen: "Desarmadores Aislados" 
    },
    { 
        nombre: "Flexómetro de Uso Rudo 8 Metros con Imán", 
        categoria: "Herramientas y Equipo", 
        subcategoria: "Medición Manual", 
        rating: "⭐ 4.8 / 5 (2.5k)", 
        desc: "Cinta ancha reforzada con gancho magnético doble para mediciones precisas en solitario.", 
        imagen: "Flexómetro Profesional" 
    },

    // Seguridad Industrial
    { 
        nombre: "Lámpara Frontal Recargable LED 1000 Lúmenes", 
        categoria: "Seguridad Industrial", 
        subcategoria: "Iluminación de Trabajo", 
        rating: "⭐ 4.8 / 5 (3.8k)", 
        desc: "Manos libres con base magnética y luz de alta potencia para espacios confinados y oscuros.", 
        imagen: "Lámpara de Cabeza LED" 
    },
    { 
        nombre: "Guantes Anticorte Nivel 5 con Nitrilo", 
        categoria: "Seguridad Industrial", 
        subcategoria: "Protección Personal", 
        rating: "⭐ 4.7 / 5 (5.1k)", 
        desc: "Máxima destreza y agarre firme en superficies aceitosas protegiendo contra abrasiones.", 
        imagen: "Guantes Anticorte Nitrilo" 
    }
];

// Subcategorías asociadas para el segundo nivel de filtros de mantenimiento
const subcategoriasPorCategoria = {
    "Herramientas y Equipo": ["Herramienta Manual", "Medición Manual"],
    "Consumos y Soldadura": ["Sopletes y Gas", "Soldadura"],
    "Lubricación y Químicos": ["Lubricantes y Grasas", "Aerosoles y Limpiadores"],
    "Medición y Diagnóstico": ["Electricidad", "Temperatura"],
    "Seguridad Industrial": ["Iluminación de Trabajo", "Protección Personal"]
};

let categoriaActual = 'todos';
let subcategoriaActual = 'todos';

// Inicializar la página mostrando todos los productos técnicos
window.onload = function() {
    mostrarProductos(productos);
};

// Función para seleccionar categoría principal
function seleccionarCategoria(cat, elemento) {
    categoriaActual = cat;
    subcategoriaActual = 'todos';

    // Marcar botón activo en el menú principal
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    elemento.classList.add('active');

    // Generar la barra de subcategorías dinámicamente
    const subContainer = document.getElementById('subcategoriesContainer');
    subContainer.innerHTML = '';

    if (cat !== 'todos' && subcategoriasPorCategoria[cat]) {
        let btnTodas = document.createElement('button');
        btnTodas.className = 'sub-btn active';
        btnTodas.innerText = '✨ Todas';
        btnTodas.onclick = () => filtrarPorSubcategoria('todos', btnTodas);
        subContainer.appendChild(btnTodas);

        subcategoriasPorCategoria[cat].forEach(sub => {
            let btn = document.createElement('button');
            btn.className = 'sub-btn';
            btn.innerText = sub;
            btn.onclick = () => filtrarPorSubcategoria(sub, btn);
            subContainer.appendChild(btn);
        });
    }

    aplicarFiltros();
}

// Función para filtrar por subcategoría específica
function filtrarPorSubcategoria(sub, elemento) {
    subcategoriaActual = sub;
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
    elemento.classList.add('active');
    aplicarFiltros();
}

// Motor de búsqueda en tiempo real
function filtrarProductos() {
    aplicarFiltros();
}

// Lógica central de filtros y buscador
function aplicarFiltros() {
    let textoBusqueda = document.getElementById('searchInput').value.toLowerCase();

    let filtrados = productos.filter(p => {
        let coincideCategoria = (categoriaActual === 'todos' || p.categoria === categoriaActual);
        let coincideSubcategoria = (subcategoriaActual === 'todos' || p.subcategoria === subcategoriaActual);
        let coincideTexto = p.nombre.toLowerCase().includes(textoBusqueda) || p.desc.toLowerCase().includes(textoBusqueda) || p.subcategoria.toLowerCase().includes(textoBusqueda);

        return coincideCategoria && coincideSubcategoria && coincideTexto;
    });

    mostrarProductos(filtrados);
}

// Pintar las tarjetas de productos técnicos en pantalla
function mostrarProductos(lista) {
    let grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    if (lista.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 40px;">No se encontraron herramientas o consumibles con ese criterio.</p>`;
        return;
    }

    lista.forEach(p => {
        let card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div>
                <span class="product-category-tag">${p.subcategoria}</span>
                <div class="product-img">[ ${p.imagen} ]</div>
                <h3 class="product-name">${p.nombre}</h3>
                <div class="product-rating">${p.rating}</div>
                <p class="product-desc">${p.desc}</p>
            </div>
            <a href="https://www.amazon.com" target="_blank" class="amazon-btn">Ver en Amazon</a>
        `;
        grid.appendChild(card);
    });
}