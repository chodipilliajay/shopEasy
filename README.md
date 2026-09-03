# ShopEasy


## Important
- Registration and login
- User/admin role-based access
- Product catalog, search and categories
- Product details and image slider
- Add/update/remove cart items
- Checkout and Razorpay-style demo payment
- Order creation and tracking timeline
- Profile update
- Password update
- Forgot-password/reset flow UI
- Admin dashboard, product creation/deletion, users and orders
- Persistent data using browser localStorage

No real payment is made and no real email is sent.

## Build for deployment

```bash
npm run build
```

The production files are generated in `dist/`.

## Demo accounts

Admin:
- Email: admin@shopeasy.demo
- Password: admin123

User:
- Email: demo@shopeasy.demo
- Password: demo123

## Publish

This is a Vite static site. You can deploy the project to any static host that supports Vite builds. Use:
- Build command: `npm run build`
- Publish directory: `dist`

## For your project explanation

Say that this build is a frontend demonstration layer with local persistence. The production architecture can connect the same UI to Express/MongoDB APIs, JWT/cookies, Cloudinary and Razorpay by replacing the localStorage service layer with API calls.

## Reset demo data

Open browser DevTools Console and run:

```js
localStorage.clear();
location.reload();
```
