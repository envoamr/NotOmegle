## NotOmegle

A one-on-one text chat application.

Live version at [omegle.oamr.dev](https://omegle.oamr.dev)

## Websocket URL

In `app/page.js`, replace `URL` with your own Websocket API if you'd like to connect to your own backend.

## Exporting & Hosting

To create a NextJS static build (to be able to host on AWS S3), the option `output: 'export'` was added in `next.config.js`. Then, `npm run build` created an `out` folder to be uploaded to AWS S3. To simply host the `out` folder locally (instead of on AWS), run `npx serve -s out` and visit http://localhost:3000.

## Technologies used

- **ReactJS** (frontend)
- **NextJS** (simplifies React project)
- **TailwindCSS** (frontend styling)
- **AWS S3** (storing static version of site)
- **AWS Cloudfront** (CDN to deliver static site)
- **AWS API Gateway** (hosting Websocket API)
- **AWS Lambda** (responds to websocket requests)
- **AWS Dynamodb** (stores current users)
