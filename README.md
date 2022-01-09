# Custom Checkout App 🎨

This project allows you to customize the native VTEX checkout, generating the files that you can later replace from the administration console of your VTEX store. `https://{accountName}.myvtex.com/admin/portal/#/sites/default/code`.

Through a proxy software you can map the local files with which you can see the changes you make in development mode before updating your store's checkout.

From the scope of the VTEX checkout you have access to the following objects:

```bash
vtexjs.checkout.getOrderForm().then((orderForm) => {});
```

```bash
const item = {
    id: 1001,
    quantity: 1,
    seller: '1',
};

vtexjs.checkout.addToCart([item], null, 1).then((orderForm) => {});
```

```bash
vtexjs.checkout.setCustomData({});
```

```bash
vtexjs.checkout.removeItems([{ index, quantity: 0 }]);
```

```bash
vtexjs.checkout.removeAllItems(orderForm.items).then((orderForm) => {});
```

```bash
vtexjs.checkout.sendAttachment('KEY_NAME', {});
```

## Libraries with global Scope

from the browser console you can type $ or Jquery and for underscore _ and you will be able to see the instances of the respective libraries.

- JQuery
- Underscore

## Routes

| Path    | Description    |
| ------------ | --------------- |
| `/#/cart`      | Shows the information of the products found in the orderForm. |
| `/#/email`      | Is only shown when the orderForm does not have an active session, so it requests the email to check if the user already exists. |
| `/#/profile`      | Request user information in case of being a user who is not yet registered. |
| `/#/shipping`      | Request location information to determine logistics. |
| `/#/payment`      | Allows you to select payment and billing methods. |

## Available Scripts ⚡

In the project directory, you can run:

### `Start`

Builds the app for production to the `dist` folder.\
additionally while you are modifying, It generating new files for the `dist` folder.

```bash
npm run start
```

### `Build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

```bash
npm run build
```

## Project structure

```bash
src/
├── axiosInstance.tsx
├── components
│   ├── App
│   │   └── index.tsx
│   ├── Cart
│   │   ├── index.tsx
│   │   └── styles.scss
│   ├── CartLinks
│   │   ├── index.tsx
│   │   └── styles.scss
│   ├── CartMoreOptions
│   │   ├── index.tsx
│   │   └── styles.scss
│   ├── CartTemplate
│   │   ├── index.tsx
│   │   └── styles.scss
│   ├── ClientProfileData
│   │   ├── index.tsx
│   │   └── styles.scss
│   ├── HtmlTooltip
│   │   └── index.tsx
│   ├── PaymentData
│   │   ├── index.tsx
│   │   └── styles.scss
│   ├── ShippingData
│   │   ├── index.tsx
│   │   └── styles.scss
│   ├── StyledDialog
│   │   ├── StyledDialog.module.scss
│   │   ├── Title
│   │   │   ├── Title.module.scss
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── StyledSnackbars
│   │   ├── StyledSnackbar.module.scss
│   │   └── index.tsx
│   └── Totalizers
│       ├── index.tsx
│       └── styles.scss
├── helpers.tsx
├── index.tsx
├── styles
│   ├── _mixins.scss
│   ├── _variables.scss
│   └── index.scss
└── typings.d.ts
```

### The files that you must add to the checkout from the VTEX administrator are

```bash
dist/
├── checkout6-custom.css
├── checkout6-custom.css.map
├── checkout6-custom.js
└── checkout6-custom.js.map
```

## Learn More 🛠️

- [React](https://es.reactjs.org/docs/getting-started.html)
- [Webpack](https://webpack.js.org/configuration)
- [Sass](https://sass-lang.com)
- [Babel](https://github.com/babel/babel-loader)
- [Axios](https://github.com/axios/axios)
- [Material UI](https://mui.com)

## Author ✒️

- **Jeison Nisperuza** - [jnisperuza](https://github.com/jnisperuza) - [jnisperuza.github.io](https://jnisperuza.github.io/)
