import { Command } from 'commander';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { Table } from 'console-table-printer';
import ora from 'ora';
import { printHeader } from '../utils/figlet.js';

const prisma = new PrismaClient();

// Funzione per generare dati casuali
const generateRandomData = (model: string, fields: string[]) => {
  const data: any = {};
  
  fields.forEach(field => {
    switch (field) {
      case 'name':
        data[field] = faker.person.fullName();
        break;
      case 'email':
        data[field] = faker.internet.email();
        break;
      case 'content':
        data[field] = faker.lorem.paragraph();
        break;
      case 'title':
        data[field] = faker.lorem.sentence();
        break;
      default:
        data[field] = faker.word.sample();
    }
  });

  return data;
};

// Funzione per inserire dati in modo dinamico
async function insertData(model: string, count: number) {
  // Define fields based on the model instead of querying database schema
  const fieldsByModel: Record<string, string[]> = {
    'User': ['name', 'email'],
  };
  
  const fields = fieldsByModel[model] || [];
  
  if (fields.length === 0) {
    throw new Error(`No fields defined for model: ${model}`);
  }

  const dataToInsert = Array.from({ length: count }, () => generateRandomData(model, fields));
  
  // Inserisce dati nel modello
  // @ts-ignore
  const insertFunction = prisma[model].createMany ? prisma[model].createMany : prisma[model].create;

  const inserted = await insertFunction({
    data: dataToInsert,
  });

  return inserted;
}

// Funzione per stampare i dati in tabella
function printTable(data: any[]) {
  const table = new Table({
    title: 'Generated Data',
    columns: Object.keys(data[0]).map(key => ({ name: key, alignment: 'left' })),
  });

  data.forEach((item: any) => table.addRow(item));
  table.printTable();
}

// Comando di seeding
export const seedCommand = new Command()
  .command('seed')
  .description('Generates dynamic seed data for the database')
  .option('-c, --count <number>', 'Number of records to generate', '5')
  .action(async (options) => {
    printHeader();

    const count = parseInt(options.count, 10);

    console.log(`Generating data for all models...`);

    const spinner = ora('Generating data...').start();

    // Elenco dei modelli presenti nello schema Prisma
    const models = ['User']; // Only include models that exist in the schema

    for (const model of models) {
      try {
        const insertedData = await insertData(model, count);
        spinner.succeed(`Data generated for ${model} model!`);
        
        // Fetch the inserted data to display in the table
        // @ts-ignore - prisma dynamic property access
        const data = await prisma[model].findMany();
        if (data.length > 0) {
          printTable(data);
        }
      } catch (error) {
        spinner.fail(`Failed to generate data for ${model} model: ${error}`);
      }
    }

    spinner.succeed('Data generated successfully!');
  });
