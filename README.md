# README

## Prerequisites

* Ruby 2.2+
* Rails 4.2+
* Node.js 6.0.0+
* Yarn 0.25.2+
* Postgresql

## Usage

Run the bundle:

```bash
bundle install
```

Install the javascript dependences:

```bash
yarn
```

Database setup:

```bash
rails db:create
```

```bash
rails db:migrate
```

Run the app:

```bash
foreman start -f Procfile.dev
```

Access http://localhost:3000
