import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import { printFiglet } from '../utils/figlet.js';
import { generateFakeUsers } from '../core/generator.js';
import { printUsersTable } from '../core/printer.js';

export const seedCommand = new Command('seed')
  .description('Generate random seed data for the database')
  .option('-c, --count <number>', 'Number of users to generate', '5')
  .option('--only <models...>', 'Only generate specific models')
  .option('--skip <models...>', 'Skip specific models')
  .action(async (options) => {
    printFiglet('Auto Flower');

    const count = parseInt(options.count, 10);
    const spinner = ora('Generating fake data...').start();

    try {
      // Simulate async behavior
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const users = generateFakeUsers(count);
      spinner.succeed('Data generation complete!');

      printUsersTable(users);

      console.log(
        chalk.greenBright(`\n✅ Successfully generated ${count} user(s).`)
      );
    } catch (err) {
      spinner.fail('Something went wrong.');
      console.error(chalk.red(err instanceof Error ? err.message : String(err)));
    }
  });
