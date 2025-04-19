<div align="center">
  <img src="assets/auto-flower-logo.png" alt="Auto Flower Logo" width="200">
</div>

# Auto Flower

Auto Flower is a dynamic CLI tool that generates random seed data for your Prisma-based database. It automatically reads your Prisma schema, generates realistic fake data for each model, and inserts it into your database. Perfect for quickly populating your development database with random, but realistic, data.

<hr>

## Features

- **Automatic Model Discovery**: Auto Flower inspects your Prisma schema and automatically generates data for all models.
- **Random Data Generation**: Utilizes [Faker.js](https://github.com/faker-js/faker) to generate realistic data for fields like names, emails, dates, and more.
- **Customizable Record Count**: Generate a customizable number of records for each model with the `--count` option.
- **Beautiful Table Output**: View the generated data in a nicely formatted console table using [console-table-printer](https://github.com/guyteixeira/console-table-printer).
- **Simple CLI**: Easy-to-use command-line interface with clear error handling and progress indicators.

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/loreBianchi/auto-flower.git
  ```

2. Navigate to the project directory:
  ```bash
  cd auto-flower
  ```

3. Install dependencies using pnpm:
  ```bash
  pnpm install
  ```

## Usage

Generate Seed Data for All Models: Run the following command to generate random data for your Prisma models. You can specify how many records to generate using the --count option.

```bash
pnpm exec tsx bin/cli.ts seed --count 10
```

This will generate 10 records for each model in your Prisma schema.

Customize the Number of Records: Use the --count option to specify how many records to generate for each model.

```bash
pnpm exec tsx bin/cli.ts seed --count 50
```

Generated Data: Once the data is generated, you will see a summary with a console table displaying the generated records.

## Configuration

Auto Flower works out-of-the-box with your Prisma schema. Simply ensure that your Prisma models are correctly defined in schema.prisma, and Auto Flower will take care of the rest.

The following configuration options are available:

--count <number>: The number of records to generate for each model (default is 5).

Example:

```bash
pnpm exec tsx bin/cli.ts seed --count 20
```

## How It Works

Auto Flower follows these steps to generate your seed data:

1. **Schema Analysis**: Parses your Prisma schema to understand your data models and their relationships
2. **Data Generation**: Creates realistic data for each field based on its type and constraints
3. **Relationship Handling**: Maintains referential integrity for relationships between models
4. **Database Insertion**: Uses the Prisma Client to safely insert the generated data into your database

## Supported Field Types

Auto Flower supports a wide range of Prisma field types:

- **String**: Names, emails, paragraphs, etc.
- **Int/Float**: Random numbers within appropriate ranges
- **Boolean**: Random true/false values
- **DateTime**: Dates within configurable ranges
- **Enums**: Random selection from available enum values
- **Relations**: Properly linked records maintaining referential integrity

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

Distributed under the MIT License. See LICENSE for more information.