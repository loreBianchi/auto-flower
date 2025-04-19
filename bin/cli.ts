#!/usr/bin/env tsx

import { Command } from 'commander';
import chalk from 'chalk';
import { seedCommand } from '../src/commands/seed.js';

console.log(chalk.blueBright('🌱 Starting Auto Flower CLI...'));

try {
  const program = new Command();

  program
    .name('auto-flower')
    .description('CLI tool to generate random data from a Prisma schema')
    .version('0.1.0');

  program.addCommand(seedCommand);

  program.parse();

  console.log(chalk.green('✅ Command executed successfully.'));
} catch (error) {
  console.error(chalk.red('❌ CLI execution failed:'));
  console.error(error instanceof Error ? error.stack : JSON.stringify(error));
  process.exit(1);
}
