# Custom Checkout App 🎨

This project allows you to customize the native VTEX checkout, generating the files that you can later replace from the administration console of your VTEX store. `https://{accountName}.myvtex.com/admin/portal/#/sites/default/code`.

Through a proxy software you can map the local files with which you can see the changes you make in development mode before updating your store's checkout.

From the scope of the VTEX checkout you have access to the following objects:

**Important**: To use the vtexjs global variable from TypeScript files, it is recommended to declare this variable inside the component, to avoid linter errors.

```bash
declare let vtexjs: any;
```

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

## Checkout confirmation page

This page consumes the data of the request through a queryParam called og to display it in the default template, to directly access the data you can do it by reading the global variable:

```bash
dataLayer
```

However, you can also consult the data of the order from the following official vtex endpoint
[Get Order](https://developers.vtex.com/vtex-developer-docs/reference/getorder#response-body-example)

## Libraries with global Scope

From the browser console you can type $ or Jquery and for underscore _ and you will be able to see the instances of the respective libraries.

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
| `/orderPlaced/?og=###`      | This route shows the information corresponding to the purchase with their respective codes for order tracking. **Important**: The vtexjs variable is not available in this path. |

## Available Scripts ⚡

In the project directory, you can run:

### `Build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

```bash
npm run build
```

### `Start`

It works in the same way as build but additionally while you are modifying, It generating new files for the `dist` folder.

```bash
npm run start
```

### `Serve`

It works in a similar way to Build and Start but additionally initializes a local server on port 9000, it can be accessed as follows <http://localhost:9000/>

```bash
npm run serve
```

## Environments

Inside the "environments" folder you can find the configuration files .dev.env, .qa.env, .prod.env, there you can add your environment variables.\
With the previous commands and the command :dev, :qa, :product for instance:

```bash
npm run start:dev
```

***If you don't set environment, dev is taken by default value***

## Project structure

```bash
src/
.
├── axiosInstance.ts
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
│   ├── ConfirmationPage
│   │   ├── index.tsx
│   │   └── styles.scss
│   ├── Footer
│   │   ├── index.tsx
│   │   └── styles.scss
│   ├── Header
│   │   ├── index.tsx
│   │   └── styles.scss
│   ├── HtmlTooltip
│   │   └── index.tsx
│   ├── Layout
│   │   ├── Layout.module.scss
│   │   └── index.tsx
│   ├── PaymentData
│   │   ├── index.tsx
│   │   └── styles.scss
│   ├── Preloader
│   │   ├── Preloader.module.scss
│   │   └── index.tsx
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
├── constants.ts
├── dane.json
├── helpers.ts
├── index.html
├── index.tsx
├── redux
│   ├── UI
│   │   ├── action.ts
│   │   ├── actionTypes.ts
│   │   ├── reducer.ts
│   │   └── selectors.ts
│   ├── reducer.ts
│   └── store.ts
├── styles
│   ├── _classes.scss
│   ├── _mixins.scss
│   ├── _variables.scss
│   └── index.scss
├── theme.ts
└── types
    └── orderForm.d.ts
```

## The files that you must add to the checkout from the VTEX administrator are

The same js and css files should be assigned to the content of the confirmation page files:

- checkout-confirmation-footer
- checkout-confirmation-header

```bash
dist/
├── checkout6-custom.css
├── checkout6-custom.css.map
├── checkout6-custom.js
├── checkout6-custom.js.LICENSE.txt
├── checkout6-custom.js.map
└── index.html
```

## Learn More 🛠️

- [React](https://es.reactjs.org/docs/getting-started.html)
- [Webpack](https://webpack.js.org/configuration)
- [Sass](https://sass-lang.com)
- [Babel](https://github.com/babel/babel-loader)
- [Axios](https://github.com/axios/axios)
- [Material UI](https://mui.com)
- [Checkout Vtex](https://github.com/vtex/vtex.js/blob/master/docs/checkout/README.en.md)
- [OrderForm Custom Data](https://developers.vtex.com/vtex-developer-docs/reference/orderform-fields#customdata)
- [Update orderForm configuration](https://developers.vtex.com/vtex-developer-docs/reference/updateorderformconfiguration)
- [Add client profile](https://developers.vtex.com/vtex-rest-api/reference/addclientprofile)
- [CMS - Creating and editing a page template](https://help.vtex.com/tutorial/how-to-create-a-page-template--frequentlyAskedQuestions_1850)
- [Customizing the Checkout Confirmation pages](https://help.vtex.com/tutorial/customizing-the-checkout-confirmation-pages--7CbAZNHGI8uUO8aSgWmcsS)

## Author ✒️

- **Jeison Nisperuza** - [jnisperuza](https://github.com/jnisperuza) - [jnisperuza.github.io](https://jnisperuza.github.io/)
