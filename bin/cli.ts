#!/usr/bin/env tsx

import { Command } from 'commander';
import chalk from 'chalk';
import { seedCommand } from '../src/commands/seed.js';

console.log(chalk.blueBright('🌱 Starting Auto Flower CLI...'));

try {
  console.log(chalk.green('🚧 Creating command instance...'));
  const program = new Command();
  
  console.log(chalk.green('🔧 Configuring program...'));
  program
    .name('auto-flower')
    .description('CLI tool to generate random data from Prisma schema')
    .version('0.1.0');

  console.log(chalk.greenBright('📦 Adding seed command...'));
  program.addCommand(seedCommand);

  console.log(chalk.yellow('📠 Parsing command line arguments...'));
  program.parse();
  
  console.log(chalk.bold.greenBright('Command execution completed successfully ✅'));
  console.log(chalk.bold.blueBright('🌱 Auto Flower CLI finished!'));
} catch (error) {
  console.error(chalk.red('❌ An error occurred during command execution:'));
  console.error(chalk.redBright('Please check the error details below:'));
  console.error(error instanceof Error ? error.stack : JSON.stringify(error));
  process.exit(1);
}
