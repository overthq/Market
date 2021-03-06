# Market

Market is an open-source e-commerce platform that aims to improve the online shopping and store management experience.

## Motivation

### For shoppers
The average online shopper usually has to create multiple accounts for every store they purchase from, and keep going back to get information on new arrivals, discounts and back-in-stock items. Market solves this by providing an app where shoppers can purchase items, discover and follow stores, get push notifications for updates and more, all from a single account.

### For store owners
Setting up an online store is difficult and expensive, and getting potential customers to discover your store is very difficult. Market solves this by providing an affordable, simple and easy-to-use dashboard to manage orders, inventory, analytics and all other information regarding store.

## Project Phase

This project is currently in the _pre-launch_ phase, being developed by the [members of the Overt community](https://discord.gg/t6wVzUh). [Overt](https://overt.dev) is a concept that creates open-source software to solve many of the problems we face in the world. You can read more [here](https://overt.dev), or follow Overt on Twitter [here](https://twitter.com/overt_hq).

It is important to not that on release, Market will be available in Nigeria only, but will potentially be launched in other countries based on demand.

## Getting Started

This section will help you get Market up and running in your development environment.

### Prerequisites

Before starting the installation process, the following are required:

- [Node.js](https://nodejs.org) (LTS or higher).
- [Yarn v1](https://yarnpkg.com)
- [PostgresQL](https://postgresql.com)
- [Docker](https://docker.com)
- [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli)

### Installation and Setup

To get Market's source code on your machine, run these commands:

```sh
# Clone the repository
git clone https://github.com/overthq/Market.git && cd Market

# Install general dependencies
yarn
```

Next, proceed to the following links for more information on how to set each project set up correctly.

- [App](app/README.md#installation-and-setup)
- [Dashboard](dashboard/README.md#installation-and-setup)
- [Hasura](hasura/README.md#installation-and-setup)
- [Auth](auth/README.md#isntallation-and-setup)
- [Storage](storage/README.md#isntallation-and-setup)

## Contributing

All forms of (positive) contribution are welcome to Market. Be sure to check out the [contribution guidelines](.github/CONTRIBUTING.md) before contributing.

## Tech Stack

Market is a TypeScript-based application. It is built with popular JS libraries/frameworks like React, React Native and Express. Here's what the stack looks like.

- Front-End
	- Framework: [React Native](https://facebook.github.io/react-native) and [Expo](https://expo.io)
- Back-End
  - Database: [PostgresQL](https://postgresql.com)
  - Server: [Hasura](https://hasura.io)
  - Caching: [Redis](https://redis.io)
  - Storage: [Cloudinary](https://cloudinary.com)

# License

[GNU GPLv3 License](LICENSE)

# Author

Oluwakorede Fashokun for [Overt](https://overt.dev)
