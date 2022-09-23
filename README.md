# API Pizzaria

## Implementação de Api para um sistema de Pizzaria 🏫 

### *Endpoints*

#### **Listas pizzas**

##### `GET` `/pizzas`

Essa é a rota que será chamada para obter a lista das pizzas cadastrados.  

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta possuirá um objeto com uma lista contendo todos os pizzas cadastrados, com as suas propriedades, conforme exemplo abaixo.

##### **Exemplo de requisição**

```javascript
// GET /pizzas
// Sem conteúdo no corpo (body) da requisição
```

##### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    [
        {
            "id": 1,
            "name": "Margherita",
            "price": 500
        },
        {
            "id": 2,
            "name": "Bufala",
            "price": 600
        }
    ]
}
```
---

#### **Cadastrar cliente**

##### `POST` `/customers`

Essa é a rota que será utilizada para cadastrar um novo cliente no sistema.

-   **Requisição**   
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   name;
    -   email;
    -   password

-   **Resposta**  
    Em caso de **sucesso**, será enviado no corpo (body) da resposta o conteúdo do cliente cadastrado, incluindo seu respectivo `id`.

##### **Exemplo de requisição**

```javascript
// POST /customers
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

##### **Exemplos de resposta**

```javascript
// HTTP Status 201
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

---

#### **Login do usuário**

##### `POST` `/login`

Essa é a rota que permite o cliente cadastrado realizar o login no sistema.

-   **Requisição**
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   email;
    -   password

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta terá um objeto com a propriedade **token** que terá como valor o token de autenticação gerado e uma propriedade **cliente** que terá as informações do cliente autenticado. 

##### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

##### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "cliente": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```
---

#### **ATENÇÃO**:
> Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, exigirão o token de autenticação do cliente logado, devendo ser passado no header no formato Bearer Token.

> As propriedades **price**, **total_item** e **total** estão em centavos, portanto para converter em Real deve-se dividir por 100.
---

#### **Listar clientes**

##### `GET` `/customers`

Essa é a rota que será chamada para obter a lista dos clientes cadastrados.  

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.
    

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta possuirá um objeto com uma lista contendo todos os clientes cadastrados, com as suas propriedades, conforme exemplo abaixo.

##### **Exemplo de requisição**

```javascript
// GET /customers
// Sem conteúdo no corpo (body) da requisição
```

##### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    [
        {
            "id": 2,
            "name": "Arnaud Rodrigues",
            "email": "arnaud.rodrigues@email.com"
        },
        {
            "id": 3,
            "name": "Pedro Luis",
            "email": "pedro.luis@email"
        }
    ]
}
```
---

#### **Detalhar cliente**

##### `GET` `/customers/:id`

Essa é a rota que será chamada para obter os dados do perfil do cliente logado e autenticado.  

-   **Requisição**  
    Deverá ser enviado o ID do cliente no parâmetro de rota do endpoint.  
    Não deverá possuir conteúdo no corpo da requisição.
    

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta possuirá um objeto que representa o cliente encontrado, com as suas propriedades, conforme exemplo abaixo.

##### **Exemplo de requisição**

```javascript
// GET /customers/1
// Sem conteúdo no corpo (body) da requisição
```

##### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```
---

#### **Atualizar cliente**

##### `PUT` `/customers/:id`

Essa é a rota que será chamada quando se quiser realizar alterações no perfil do cliente logado e autenticado.

-   **Requisição**   
    Deverá ser enviado o ID do cliente no parâmetro de rota do endpoint.
    O corpo (body) deverá possuir um objeto com pelo menos uma das seguintes propriedades (respeitando estes nomes):

    -   name;
    -   email;
    -   password

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta possuirá um objeto que representa o cliente atualizado, com as suas propriedades, conforme exemplo abaixo.


##### **Exemplo de requisição**

```javascript
// PUT /customers/1
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321dqn"
}
```

##### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "id": 1,
    "nome": "José Silva de Abreu",
    "email": "jose_silva_abreu@email.com"
}
```
---

#### **Excluir cliente**

##### `DELETE` `/customers/:id`

Essa é a rota que será chamada quando se quiser excluir um dos clientes cadastrados. 

-   **Requisição**  
    Deverá ser enviado o ID do cliente no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

-   **Resposta**  
    Em caso de **sucesso**, será enviada mensagem de sucesso na resposta.

##### **Exemplo de requisição**

```javascript
// DELETE /customers/2
// Sem conteúdo no corpo (body) da requisição
```

##### **Exemplos de resposta**

```javascript
// HTTP Status 200
"Cliente excluído com sucesso."
```
---

#### **Cadastrar pedido**

##### `POST` `/orders`

Essa é a rota que será utilizada para cadastrar um novo pedido no sistema.

-   **Requisição**   
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   customers_id;
    -   items:
        -   pizzas_id;
        -   quantity

-   **Resposta**  
    Em caso de **sucesso**, será enviado no corpo (body) da resposta o conteúdo do pedido cadastrado, incluindo seu respectivo `id`.

##### **Exemplo de requisição**

```javascript
// POST /orders
{
    "customers_id": 10,
    "items": [
        {
            "pizzas_id": 5,
            "quantity": 1
        },
        {
            "pizzas_id": 2,
            "quantity": 3
        }
    ]
}
```

##### **Exemplos de resposta**

```javascript
// HTTP Status 201
{
    "order_id": 3,
    "customer_name": "João das Neves",
    "pizzas": [
        {
            "pizzas_id": 5,
            "name": "Diavola",
            "price": 750,
            "quantity": 1,
            "orders_id": 3,
            "item_id": 5,
            "total_item": 750
        },
        {
            "pizzas_id": 2,
            "name": "Bufala",
            "price": 600,
            "quantity": 3,
            "orders_id": 3,
            "item_id": 6,
            "total_item": 1800
        }
    ],
    "total": 2550
}
```
---

#### **Listar pedidos**

##### `GET` `/orders`

Essa é a rota que será chamada para obter a lista dos pedidos cadastrados.  

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta possuirá um objeto com uma lista contendo todos os pedidos cadastrados, com as suas propriedades, conforme exemplo abaixo.

##### **Exemplo de requisição**

```javascript
// GET /orders
// Sem conteúdo no corpo (body) da requisição
```

##### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    [
        {
            "id_order": 2,
            "name": "Ederaldo Gentil",
            "items": [
                {
                    "id_item": 3,
                    "name": "Bufala",
                    "price": 600,
                    "quantity": 3,
                    "total_item": 1800
                },
                {
                    "id_item": 4,
                    "name": "Pizza Bianca",
                    "price": 830,
                    "quantity": 1,
                    "total_item": 830
                }
            ],
            "total": 2630
        },
        {
            "id_order": 3,
            "name": "João das Neves",
            "items": [
                {
                    "id_item": 5,
                    "name": "Diavola",
                    "price": 750,
                    "quantity": 1,
                    "total_item": 750
                },
                {
                    "id_item": 6,
                    "name": "Bufala",
                    "price": 600,
                    "quantity": 3,
                    "total_item": 1800
                }
            ],
            "total": 2550
        }
    ]
}
```
---

#### **Detalhar pedido**

##### `GET` `/orders/:id`

Essa é a rota que será chamada para obter os dados de um pedido.  

-   **Requisição**  
    Deverá ser enviado o ID do pedido no parâmetro de rota do endpoint.  
    Não deverá possuir conteúdo no corpo da requisição.
    
-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta possuirá um objeto que representa o pedido encontrado, com as suas propriedades, conforme exemplo abaixo.

##### **Exemplo de requisição**

```javascript
// GET /orders/1
// Sem conteúdo no corpo (body) da requisição
```

##### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "orders_id": 3,
    "name": "João das Neves",
    "items": [
        {
            "id_item": 5,
            "name": "Diavola",
            "price": 750,
            "quantity": 1,
            "total_item": 750
        },
        {
            "id_item": 6,
            "name": "Bufala",
            "price": 600,
            "quantity": 3,
            "total_item": 1800
        }
    ],
    "total": 2550
}
```
---

#### **Atualizar pedido**

##### `PUT` `/orders/:id`

Essa é a rota que será chamada quando se quiser realizar alterações no pedido.

-   **Requisição**   
    Deverá ser enviado o ID do pedido no parâmetro de rota do endpoint.
    O corpo (body) deverá possuir um objeto com pelo menos uma das seguintes propriedades (respeitando estes nomes):

    -   items:
        -   id;
        -   pizzas_id;
        -   quantity

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta possuirá um objeto que representa o pedido atualizado, com as suas propriedades, conforme exemplo abaixo.


##### **Exemplo de requisição**

```javascript
// PUT /orders/1
{
    "items": [
        {
            "id": 3,
            "pizzas_id": 5,
            "quantity": 1
        },
        {
            "id": 4,
            "pizzas_id": 2,
            "quantity": 3
        }
    ]
}
```

##### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "orders_id": 2,
    "name": "Silva",
    "items": [
        {
        "pizzas_id": 5,
        "name": "Diavola",
        "price": 750,
        "quantity": 4,
        "id": 3,
        "orders_id": 2,
        "total_item": 3000
        },
        {
        "pizzas_id": 3,
        "name": "Romana",
        "price": 575,
        "quantity": 2,
        "id": 4,
        "orders_id": 2,
        "total_item": 1150
        }
    ],
    "total": 4150
}
```
---

#### **Excluir pedido**

##### `DELETE` `/orders/:id`

Essa é a rota que será chamada quando se quiser excluir um dos pedidos cadastrados. 

-   **Requisição**  
    Deverá ser enviado o ID do pedido no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

-   **Resposta**  
    Em caso de **sucesso**, será enviada mensagem de sucesso na resposta.

##### **Exemplo de requisição**

```javascript
// DELETE /orders/2
// Sem conteúdo no corpo (body) da requisição
```

##### **Exemplos de resposta**

```javascript
// HTTP Status 200
"Pedido excluído com sucesso."
```
---
