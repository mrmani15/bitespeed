# FluxKart identity API

Fluxkart identity API is created for managing the identity of the fluxkart user. You can see the original [problem statement here](https://bitespeed.notion.site/Bitespeed-Backend-Task-Identity-Reconciliation-53392ab01fe149fab989422300423199)


### Demo Link

You can make POST request on this url with body parameters. (both field are optional but any one field must be provided)

```bash
{
    "email": "your_email",
    "phoneNumber": your_phone
}
```

```bash
https://bitespeed-6jhz.onrender.com/identify
```

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mrmani15/bitespeed.git
    ```

2. Navigate to the folder and install the necessary dependencies:

    ```bash
    npm install
    ```

3. Create an `.env` file and add the following environment variables:

    ```bash
    PORT=YOUR_PORT_NUMBER
    MONGO_URL=MONGODB_URL
    ```

4. You can start server 

    ```bash
    npm run dev
    ```


### Folder structure:

```
├──app
├────├── controllers             # it consists all the logic 
├────├── models                  # it consists all database query
├────├── routes                  # it consists routes
├────├── utils                   # it consist function utility for controller 
├── node_modules                 # 3rd party lib
├──index.js                      # main server file
├──.env                          # environement variable
├── package.json                 # package and dependencies
├── ReADME.md                    # Documentation
```
