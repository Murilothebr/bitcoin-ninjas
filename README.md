# Bitcoin Ninjas

Bitcoin Ninjas connects consumers with businesses, stores, service providers, and charities that accept Bitcoin payments, making it easy to find services and products within the Bitcoin ecosystem.

## Purpose

Bitcoin Ninjas aims to bridge the gap between Bitcoin enthusiasts and businesses willing to accept Bitcoin as payment. It empowers consumers to find places that accept Bitcoin, driving adoption and creating a dynamic Bitcoin-based marketplace.

## Target Audience

- **Bitcoin Users**: People already using or interested in using Bitcoin for transactions.
- **Businesses and Service Providers**: Companies and freelancers seeking to attract customers who prefer Bitcoin payments.

## Key Features

- **Search and Discover**: Find businesses, stores, and service providers accepting Bitcoin.
- **Category and Location Filters**: Refine searches by product/service category and location.
- **Ratings and Reviews**: Share and read feedback on businesses and services.
- **Discount Notifications**: Get alerts for special offers and discounts for Bitcoin users.
- **Interactive Map**: Locate Bitcoin-accepting businesses nearby.

## Technology Stack

- **Frontend**: [Expo](https://expo.dev/)
- **Backend**: .NET API
- **Database**: Firebase
- **Authentication**: Firebase
- **Maps**: Google Maps API

## Estimated Development Time

An MVP could be ready in **3 to 6 months**.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js
- .NET SDK
- MongoDB

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/bitcoin-ninjas.git
   ```
2. Install NPM packages:
   ```bash
   cd bitcoin-ninjas
   npm install
   ```
3. Set up environment variables for Firebase and Google Maps API keys.

4. Run the project:
   ```bash
   npm start
   ```

## Sprint Planning

This section outlines the sprint schedule leading up to the app’s completion. Each sprint focuses on developing specific features to ensure steady progress towards key project milestones.

## Sprint Planning

This section outlines the sprint schedule leading up to the app’s completion. Each sprint focuses on developing specific features to ensure steady progress toward key project milestones.

### Sprint Schedule

| Sprint       | Duration    | Goal                                         | Details                                                                                                                                                                                                                          |
| ------------ | ----------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sprint 1** | Weeks 1-2   | **Project Setup & Basic Structure**          | - Set up Expo project <br> - Define folder structure <br> - Install necessary dependencies (Firebase, Google Maps API, etc.)                                                                                                     |
| **Sprint 2** | Weeks 3-5   | **Checkpoint 2: Routing & Screen Skeletons** | - Create and style main screens: Home, Search, Map, Notifications, Profile <br> - Implement routing/navigation <br> - Allow navigation between screens with placeholder/fake data                                                |
| **Sprint 3** | Weeks 6-8   | **Firebase Integration**                     | - Set up Firebase for authentication, real-time database, and data storage <br> - Define Firebase database structure for storing businesses, user profiles, and reviews <br> - Test Firebase connection and basic data retrieval |
| **Sprint 4** | Weeks 9-11  | **Checkpoint 3: Feature Integration**        | - Connect frontend with Firebase backend <br> - Implement key features: search functionality, interactive map, filtering, and user authentication <br> - Ensure data is stored and retrieved from Firebase                       |
| **Sprint 5** | Weeks 12-14 | **Rating System & Notifications**            | - Develop and integrate rating system for businesses <br> - Implement notifications for Bitcoin-related discounts and offers                                                                                                     |
| **Sprint 6** | Weeks 15-16 | **Checkpoint 4: Final Delivery**             | - Finalize and test all features <br> - Refine UI/UX based on feedback <br> - Prepare and export APK for deployment                                                                                                              |

# Modelagem do banco:

## Coleções e Estruturas

### 1. Usuários (`users`)

Guarda informações dos usuários que utilizam o app para procurar serviços e locais que aceitam Bitcoin.

**Estrutura:**

- `users` (coleção)
  - `userId` (documento, identificador único do usuário)
    - `name`: string
    - `email`: string
    - `phone`: string (opcional)
    - `createdAt`: timestamp
    - `preferences`: array (categorias de interesse do usuário, ex: ["comida", "tecnologia"])
    - `favoriteStores`: array (referências a `stores` favoritos do usuário)
    - `favoriteProviders`: array (referências a `service_providers` favoritos do usuário)
    - `location`: geopoint (localização aproximada do usuário)

### 2. Lojas (`stores`)

Guarda informações das lojas que aceitam Bitcoin.

**Estrutura:**

- `stores` (coleção)
  - `storeId` (documento, identificador único da loja)
    - `name`: string
    - `description`: string
    - `location`: geopoint (coordenadas da loja)
    - `categories`: array (ex: ["alimentos", "vestuário"])
    - `contactInfo`: map
      - `phone`: string
      - `email`: string
      - `website`: string
    - `rating`: number (avaliação média dos usuários)
    - `reviews` (subcoleção)
      - `reviewId`: (documento)
        - `userId`: reference (referência ao usuário que fez a avaliação)
        - `rating`: number
        - `comment`: string
        - `createdAt`: timestamp
    - `promotions`: array (ofertas e descontos exclusivos para pagamento em Bitcoin)

### 3. Locais (`locations`)

Registra os locais e pontos de interesse onde o Bitcoin é aceito.

**Estrutura:**

- `locations` (coleção)
  - `locationId` (documento, identificador único do local)
    - `name`: string
    - `address`: string
    - `geopoint`: geopoint (coordenadas exatas do local)
    - `description`: string
    - `type`: string (tipo de local, ex: "parque", "museu", "monumento")
    - `categories`: array (ex: ["turismo", "educação"])
    - `nearbyStores`: array (referências para `stores` próximos)

### 4. Prestadores de Serviços (`service_providers`)

Armazena informações sobre prestadores de serviços individuais ou empresas que aceitam pagamentos em Bitcoin.

**Estrutura:**

- `service_providers` (coleção)
  - `providerId` (documento, identificador único do prestador de serviço)
    - `name`: string
    - `serviceType`: string (tipo de serviço, ex: "eletricista", "encanador")
    - `description`: string
    - `location`: geopoint (localização do prestador de serviço)
    - `contactInfo`: map
      - `phone`: string
      - `email`: string
    - `rating`: number (avaliação média dos usuários)
    - `reviews` (subcoleção)
      - `reviewId`: (documento)
        - `userId`: reference (referência ao usuário que fez a avaliação)
        - `rating`: number
        - `comment`: string
        - `createdAt`: timestamp
    - `availability`: map
      - `startTime`: timestamp
      - `endTime`: timestamp

# PR 01

## Como o projeto ja tem o codigo que eu comecei, com template do expo, eu só vou mudar o README, ok professor?

# PR 02

# Meu projeto já tem outros pacotes e algumas configuraçoes, ste-by-step de como rodar, então acho que ja se aplica.

