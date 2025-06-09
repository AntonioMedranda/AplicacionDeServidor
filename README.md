# Arquitectura Limpia - Todo API

Implementación de una API REST con arquitectura limpia que soporta múltiples tipos de datasource:
- **Prisma** (PostgreSQL)
- **TypeORM** (PostgreSQL)
- **Memory** (Arreglos de objetos literales en memoria)

## Características

### Arquitectura Limpia
- **Domain Layer**: Entidades, casos de uso, repositorios e interfaces
- **Infrastructure Layer**: Implementaciones de datasources y repositorios
- **Presentation Layer**: Controladores y rutas

### Datasources Disponibles
1. **Prisma**: Base de datos PostgreSQL con ORM Prisma
2. **TypeORM**: Base de datos PostgreSQL con TypeORM
3. **Memory**: Almacenamiento en memoria con arreglos de objetos literales

## Configuración y Desarrollo

### ⚡ Inicio Rápido - Sin Base de Datos (Recomendado para desarrollo)

```bash
# Instalar dependencias
npm install

# Ejecutar con datasource de memoria (NO requiere base de datos)
npm run dev:memory
```

¡Eso es todo! La aplicación funcionará completamente en memoria sin necesidad de Docker ni PostgreSQL.

### 🗄️ Con Base de Datos (Prisma/TypeORM)

#### Opción 1: Prisma
```bash
# 1. Crear archivo .env basado en .env.template
# 2. Configurar DATASOURCE_TYPE=PRISMA en .env
# 3. Ejecutar Docker
docker compose up -d
# 4. Migrar base de datos
npm run prisma:migrate:prod
# 5. Ejecutar aplicación
npm run dev:prisma
```

#### Opción 2: TypeORM
```bash
# 1. Crear archivo .env basado en .env.template
# 2. Configurar DATASOURCE_TYPE=TYPEORM en .env
# 3. Ejecutar Docker
docker compose up -d
# 4. Ejecutar aplicación
npm run dev:typeorm
```

## Scripts Disponibles

### Desarrollo
- `npm run dev` - Modo desarrollo (detecta DATASOURCE_TYPE automáticamente, por defecto: MEMORY)
- `npm run dev:memory` - Desarrollo con datasource de memoria
- `npm run dev:prisma` - Desarrollo con Prisma 
- `npm run dev:typeorm` - Desarrollo con TypeORM

### Producción
- `npm run start:memory` - Producción con datasource de memoria
- `npm run start:prisma` - Producción con Prisma
- `npm run start:typeorm` - Producción con TypeORM

## Variables de Entorno

Crea un archivo `.env` con las siguientes variables:

```bash
# Puerto de la aplicación
PORT=3000

# Tipo de datasource (MEMORY | PRISMA | TYPEORM)
# Default: MEMORY
DATASOURCE_TYPE=MEMORY

# Solo requerido para PRISMA/TYPEORM
POSTGRES_URL=postgresql://postgres:123456@localhost:5432/TodoDB

# Solo para Docker
POSTGRES_USER=postgres
POSTGRES_DB=TodoDB
POSTGRES_PASSWORD=123456
```

## API Endpoints

### Endpoints Unificados
- Base URL: `/api/todos`
- **Funciona con cualquier datasource** configurado
- Operaciones CRUD estándar

### Endpoints Específicos de Memoria
- Base URL: `/api/todos-memory`
- Operaciones CRUD + funcionalidades adicionales de gestión de datos
- **Siempre usa datasource de memoria**, independiente de la configuración

Para más detalles sobre los endpoints de memoria, consulta [MEMORY_DATASOURCE.md](./MEMORY_DATASOURCE.md)

## Casos de Uso

### 🧠 Memory Datasource (Recomendado para inicio)
- ✅ **Desarrollo rápido** sin configuración de base de datos
- ✅ **Testing** y prototipos instantáneos
- ✅ **Demos** y presentaciones
- ✅ **Aprendizaje** de arquitectura limpia
- ✅ **CI/CD** sin dependencias externas

### 🗄️ Prisma/TypeORM
- ✅ Aplicaciones en producción
- ✅ Persistencia de datos
- ✅ Aplicaciones multi-usuario
- ✅ Transacciones complejas

## Detección Automática de Datasource

La aplicación detecta automáticamente qué datasource usar:

1. **Variable de entorno `DATASOURCE_TYPE`** (prioridad alta)
2. **Script npm específico** (ej: `npm run dev:memory`)
3. **Por defecto**: MEMORY (si no se especifica nada)

### Logs de Inicio
La aplicación muestra claramente qué datasource está usando:

```bash
🔧 Starting application with datasource: MEMORY
🧠 Using memory datasource - no database initialization required
💾 Data will be stored in memory arrays and lost on restart
🔗 Available endpoints: /api/todos-memory
🎯 Datasource configured: MEMORY
```

## Testing

Puedes usar el archivo `memory-datasource.http` para probar la funcionalidad con tu cliente HTTP favorito (REST Client, Postman, etc.)

## Ventajas de esta Arquitectura

1. **🔄 Intercambiable**: Cambia entre datasources sin modificar código de negocio
2. **🚀 Inicio inmediato**: Funciona sin configuración con datasource de memoria
3. **🧪 Testing**: Ideal para pruebas sin dependencias externas
4. **📚 Educativo**: Perfecto para aprender arquitectura limpia
5. **🔧 Flexible**: Cada datasource para su caso de uso específico

## Documentación Adicional

- [Memory Datasource Guide](./MEMORY_DATASOURCE.md) - Guía completa del datasource de memoria
- [memory-datasource.http](./memory-datasource.http) - Ejemplos de peticiones HTTP

## Aplicación sobre defensas de trabajos de titulación

La primera imagen muestra un listado de defensas de trabajos de titulación.

![I1](./clean/public/assets/images/I1.jpg)

La segunda imagen es el detalle que presenta una defensa así como el enlace con los estudiantes que participarán en la misma.

![I2](./clean/public/assets/images/I2.jpg)

En la tercera imagen visualizamos los detalles que se consideran por cada uno de quienes sustentarán.

![I3](./clean/public/assets/images/I3.jpg)

En la cuarta imagen se muestra el mecanismo de asignación para estas defensas. (revisar las 2 últimas imágenes)

![I4](./clean/public/assets/images/I4.jpg)

En la quinta y sexta imagen podemos ver la configuración de las aulas y horarios disponibles para las defensas.

![I5](./clean/public/assets/images/I5.jpg)
![I6](./clean/public/assets/images/I5.jpg)

Considerar todas las relaciones no explicitas que muestren las imágenes pero que consoliden su diseño.



## Definición del Dominio - Módulo Entrega

Después de analizar las imágenes que muestran un proceso de defensas organizadas con participantes, aulas y horarios, adaptamos ese escenario para nuestro módulo de entrega. En este módulo tenemos varias entidades que nos ayudan a manejar las entregas de forma organizada y clara.

---

### Cliente
- **Descripción:** Es la persona o entidad que va a recibir la entrega. Es importante tener su información para poder hacer la entrega correctamente.
- **Por qué está en el dominio:** Sin el cliente no sabemos a quién entregar, por eso es fundamental.
- **Atributos:**
  - `id` (identificador único)
  - `nombre`
  - `correo`
  - `teléfono`

---

### Dirección
- **Descripción:** Es el lugar donde se hará la entrega, puede ser la casa, oficina o cualquier sitio definido para la entrega.
- **Por qué está en el dominio:** Necesitamos saber dónde entregar, así evitamos confusiones y retrasos.
- **Atributos:**
  - `id`
  - `calle`
  - `número`
  - `ciudad`
  - `código postal`
  - `idCliente` para relacionar la dirección con un cliente

---

### Transportista
- **Descripción:** Es la persona o empresa que se encarga de hacer la entrega.
- **Por qué está en el dominio:** Sin el transportista no se puede hacer la entrega, es quien realiza la acción.
- **Atributos:**
  - `id`
  - `nombre`
  - `empresa`
  - `contacto`

---

### Entrega
- **Descripción:** Es el evento que representa la acción de entregar productos a un cliente en una dirección y horario específico.
- **Por qué está en el dominio:** Centraliza toda la información necesaria para que la entrega se realice de forma correcta.
- **Atributos:**
  - `id`
  - `idCliente`
  - `idTransportista`
  - `fechaHora`
  - `estado`
  - `idDireccion`

---

### ProductoEntregado
- **Descripción:** Son los productos que se entregan en cada evento de entrega.
- **Por qué está en el dominio:** Necesitamos saber qué productos se entregaron y en qué cantidad.
- **Atributos:**
  - `id`
  - `idEntrega`
  - `nombreProducto`
  - `cantidad`
  - `descripción`

---

### ConfirmaciónEntrega
- **Descripción:** Es el registro que confirma que la entrega se realizó correctamente.
- **Por qué está en el dominio:** Para tener evidencia de que la entrega fue hecha y recibida.
- **Atributos:**
  - `id`
  - `idEntrega`
  - `fechaConfirmacion`
  - `firmaDigital`

---

## Relaciones entre las entidades

- Un cliente puede tener varias direcciones.
- Un transportista puede hacer muchas entregas.
- Cada entrega está relacionada con un solo cliente, un solo transportista y una sola dirección.
- Una entrega puede incluir varios productos entregados.
- Cada entrega tiene una confirmación que asegura que se realizó correctamente.

---

## Relación con las imágenes del contexto

| Elemento de las imágenes | Equivalente en nuestro módulo |
|-------------------------|-------------------------------|
| Defensa                 | Entrega                       |
| Estudiantes que defienden| Cliente                       |
| Aula                   | Dirección                     |
| Horario de la defensa  | Fecha y hora de la entrega    |
| Asignación de defensa  | Asignación de transportista y horario |
| Detalles de sustentante | Producto entregado            |
| Confirmación de defensa | Confirmación de entrega       |

---

Esta es la base para empezar a construir el sistema de entregas con un modelo claro y coherente que facilita el desarrollo y mantenimiento del proyecto.



## Diseño de Capas del Módulo Entrega

Para organizar nuestro proyecto y hacerlo más fácil de entender y mantener, hemos separado el código en tres capas principales:

---

### 1. Capa de Entidades (Modelos)

- Aquí definimos las estructuras de datos que representan a nuestras entidades (Cliente, Dirección, Transportista, Entrega, ProductoEntregado y ConfirmaciónEntrega).
- Cada entidad tiene sus atributos y relaciones.
- Esta capa solo se encarga de almacenar la información que usamos en el sistema, sin lógica de negocio.

---

### 2. Capa de Servicios (Lógica de negocio)

- En esta capa se implementa la lógica para manejar las operaciones del sistema, por ejemplo:
  - Crear una nueva entrega.
  - Validar que la dirección exista para un cliente.
  - Asignar un transportista a una entrega.
  - Cambiar el estado de una entrega.
- Esta capa recibe peticiones desde la capa de presentación y procesa la información para cumplir con las reglas del negocio.
- La capa de servicios no sabe nada de cómo llegan los datos ni cómo se muestran, solo se concentra en la lógica.

---

### 3. Capa de Presentación (Controladores o Routers)

- Es la capa que recibe las solicitudes externas (como las peticiones HTTP de la API REST).
- Aquí definimos las rutas, por ejemplo: 
  - `GET /entregas` para obtener la lista de entregas.
  - `POST /entregas` para crear una nueva entrega.
- Los controladores llaman a la capa de servicios para hacer la lógica necesaria.
- Finalmente, devuelven la respuesta al cliente que hizo la petición.

---

## Flujo de datos entre capas

1. El cliente (por ejemplo, una app o frontend) hace una petición HTTP a la capa de presentación.
2. La capa de presentación recibe la petición y la envía a la capa de servicios.
3. La capa de servicios procesa la información, consulta o actualiza los datos en las entidades.
4. La capa de servicios devuelve el resultado a la capa de presentación.
5. La capa de presentación envía la respuesta al cliente.

---

Este diseño ayuda a mantener el código organizado, facilita el trabajo en equipo y hace que el sistema sea más fácil de probar y mantener.





